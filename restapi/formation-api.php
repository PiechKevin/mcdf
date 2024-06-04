<?php

 function ajouter_formation_handler( $request ) {
    global $wpdb;

    $params = $request->get_json_params();

    $table_name = $wpdb->prefix . 'mcdf_catalogue_formations';

    $data = array(
        'titre' => sanitize_text_field( $params['titre'] ),
        'sous_titre' => sanitize_text_field( $params['sous_titre'] ),
        'descrip' => sanitize_textarea_field( $params['descrip'] ),
        'les_plus' => sanitize_textarea_field( $params['les_plus'] ),
        'modalites_positionnement' => sanitize_textarea_field( $params['modalites_positionnement'] ),
        'public_cible' => sanitize_textarea_field( $params['public_cible'] ),
        'prerequis' => sanitize_textarea_field( $params['prerequis'] ),
        'modalites_prise_en_charge' => sanitize_textarea_field( $params['modalites_prise_en_charge'] ),
        'categorie_action' => sanitize_text_field( $params['categorie_action'] ),
        'prestation_realisee' => sanitize_text_field( $params['prestation_realisee'] ),
        'code_nfs' => intval( $params['code_nfs'] ),
        'modalites_delais_acces' => sanitize_textarea_field( $params['modalites_delais_acces'] ),
        'duree_jours' => floatval( $params['duree_jours'] ),
        'duree_heures' => floatval( $params['duree_heures'] ),
        'tarif_ht_h' => floatval( $params['tarif_ht_h'] ),
        'montant_ht' => sanitize_text_field( $params['montant_ht'] ),
        'taux_reussite' => floatval( $params['taux_reussite'] ),
        'taux_retour_enquetes' => floatval( $params['taux_retour_enquetes'] ),
        'nb_stagiaires' => intval( $params['nb_stagiaires'] ),
        'taux_abandon' => floatval( $params['taux_abandon'] ),
        'taux_interruption' => floatval( $params['taux_interruption'] ),
        'taux_satisfaction' => floatval( $params['taux_satisfaction'] ),
        'modalites_evaluation' => sanitize_textarea_field( $params['modalites_evaluation'] ),
        'methode_mobilisee' => sanitize_textarea_field( $params['methode_mobilisee'] ),
        'moyens_logistiques' => sanitize_textarea_field( $params['moyens_logistiques'] ),
        'accessibilite_public' => sanitize_textarea_field( $params['accessibilite_public'] ),
        'objectifs_visés' => sanitize_textarea_field( $params['objectifs_visés'] ),
        'certification_visee' => sanitize_text_field( $params['certification_visee'] ),
        'code_certif' => sanitize_text_field( $params['code_certif'] ),
        'niveau' => sanitize_text_field( $params['niveau'] ),
        'code_rome' => sanitize_text_field( $params['code_rome'] ),
        'certificateur' => sanitize_text_field( $params['certificateur'] ),
        'formacode' => sanitize_text_field( $params['formacode'] ),
        'code_cpf' => sanitize_text_field( $params['code_cpf'] ),
        'code_repertoire_specifique' => sanitize_text_field( $params['code_repertoire_specifique'] ),
        'code_rncp' => sanitize_text_field( $params['code_rncp'] ),
        'derniere_revision' => sanitize_text_field( $params['derniere_revision'] ),
    );

    $result = $wpdb->insert( $table_name, $data );

    error_log('error ' . $wpdb->last_error);
    error_log('error ' . $result);


    // Log du résultat de l'insertion pour le débogage
    if ( false === $result ) {
        error_log('Erreur lors de l\'insertion dans la base de données: ' . $wpdb->last_error);
        return new WP_Error( 'db_error', 'Erreur lors de l\'insertion dans la base de données', array( 'status' => 500 ) );
    } else {
        error_log('Insertion réussie. ID de l\'enregistrement inséré: ' . $wpdb->insert_id);
    }

    return new WP_REST_Response( array( 'message' => 'Formation ajoutée avec succès', 'id' => $wpdb->insert_id ), 200 );
}

 // Récupération des formations de la BDD
function get_formations_data(WP_REST_Request $request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'mcdf_catalogue_formations';
    
    $query = "SELECT * FROM $table_name";
    $results = $wpdb->get_results($query, ARRAY_A);

    if (!empty($results)) {
        return new WP_REST_Response($results, 200);
    } else {
        return new WP_REST_Response('Aucune formation trouvé', 404);
    }
}

function get_formation_by_id(WP_REST_Request $request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'mcdf_catalogue_formations';
    
    // Retrieve the ID from the URL parameter
    $id = $request->get_param('id');
    $query = $wpdb->prepare("SELECT * FROM $table_name WHERE ID = %d", $id);
    $result = $wpdb->get_row($query, ARRAY_A);

    if (!empty($result)) {
        return new WP_REST_Response($result, 200);
    } else {
        return new WP_REST_Response('Formation not found', 404);
    }
}


function formation_api_routes() {
    register_rest_route( 'mcdf/v1', '/formations', array(
        'methods' => 'POST',
        'callback' => 'ajouter_formation_handler',
    ) );

    register_rest_route('mcdf/v1', '/formations/', array(
        'methods' => 'GET',
        'callback' => 'get_formations_data',
    ));
    
    // Register a new route for fetching a formation by ID
    register_rest_route('mcdf/v1', '/formations/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'get_formation_by_id',
    ));
}

add_action('rest_api_init', 'formation_api_routes');
