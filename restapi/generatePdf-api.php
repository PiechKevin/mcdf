<?php

require_once __DIR__ . '/../vendor/autoload.php';
use Dompdf\Dompdf;
use WP_REST_Response;

function replace_placeholders($html, $stagiaireId) {
    //error_log('Activation de replace_placeholders');
    preg_match_all('/{{(\w+)\.(\w+)}}/', $html, $matches, PREG_SET_ORDER);

    foreach ($matches as $match) {
        $apiName = $match[1];  // Nom de l'API
        $dataKey = $match[2];  // Clé de la donnée

        // Construit l'URL de l'API en fonction du nom de l'API
        $api_url = get_site_url() . "/wp-json/mcdf/v1/$apiName/" . $stagiaireId;
        error_log('api-url : ' . $api_url);

        // Effectue une requête HTTP à l'API WordPress
        $response = wp_remote_get($api_url);
        if (is_wp_error($response)) {
            continue; // Passer au placeholder suivant en cas d'erreur
        }

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        //error_log('data : ' . json_encode($data));

        // Vérifier si la donnée demandée est disponible
        if (isset($data[$dataKey])) {
            // Remplace le placeholder par la donnée récupérée
            $html = str_replace("{{{$apiName}.{$dataKey}}}", $data[$dataKey], $html);
            error_log('html : ' . $html);
        }
    }

    return $html;
}


function generate_pdf($request) {
    $data = $request->get_json_params();
    $stagiaireId = $data['stagiaireId'] ?? null;
    $fileName = $data['fileName'] ?? 'mon_document.pdf';
    $templateName = $data['templateName'] ?? 'convocation';

    if (!$stagiaireId) {
        return new WP_REST_Response(['error' => 'No stagiaire ID provided'], 400);
    }

    $htmlTemplate = file_get_contents(__DIR__ . '/../pdf_template/' . $templateName . '.html');
    $htmlContent = replace_placeholders($htmlTemplate, $stagiaireId);

    // Création de l'instance Dompdf
    
    $dompdf = new Dompdf();
    $dompdf->set_option('isRemoteEnabled', true);
    $dompdf->loadHtml($htmlContent);

    // (Optionnel) Définir la taille de papier et l'orientation
    $dompdf->setPaper('A4', 'portrait');

    // Rendu du PDF
    $dompdf->render();

    // Stockage du PDF
    $upload_dir = wp_upload_dir();
    $stagiaire_path = $upload_dir['basedir'] . '/mcdf/' . $stagiaireId;
    if (!file_exists($stagiaire_path)) {
        wp_mkdir_p($stagiaire_path);
    }
    $pdf_path = $stagiaire_path . '/' . $fileName;
    file_put_contents($pdf_path, $dompdf->output());

    return new WP_REST_Response(['url' => $upload_dir['baseurl'] . '/mcdf/' . $stagiaireId . '/' . $fileName], 200);
}

add_action('rest_api_init', function () {
    register_rest_route('mcdf/v1', '/generate-pdf', array(
        'methods' => 'POST',
        'callback' => 'generate_pdf',
        'permission_callback' => function() {
            return current_user_can('edit_posts');
        }
    ));
});