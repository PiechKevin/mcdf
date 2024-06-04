<?php

function create_wp_user_for_stagiaire($stagiaire_data) {
    $username_base = sanitize_user(strtolower($stagiaire_data['prenom'] . '.' . $stagiaire_data['nom']));
    $username = $username_base;
    $counter = 1;

    // Vérifier si le nom d'utilisateur existe et ajouter un numéro si nécessaire
    while (username_exists($username)) {
        $username = $username_base . '.' . $counter;
        $counter++;
    }

    $password = wp_generate_password(); // Génère un mot de passe sécurisé
    $user_data = array(
        'user_login' => $username,
        'user_pass'  => $password,
        'user_email' => $stagiaire_data['email'],
        'first_name' => $stagiaire_data['prenom'],
        'last_name'  => $stagiaire_data['nom'],
        'role'       => 'stagiaire'
    );

    $user_id = wp_insert_user($user_data);

    // Vérifiez si la création de l'utilisateur a réussi
    if (!is_wp_error($user_id)) {
        // Log réussi
        error_log("Utilisateur WordPress créé avec succès : ID $user_id");

        // Mettre à jour la table des stagiaires avec l'ID de l'utilisateur WordPress
        global $wpdb;
        $wpdb->update(
            $wpdb->prefix . 'mcdf_stagiaires',
            array('wp_user_id' => $user_id),
            array('id' => $stagiaire_data['id']) // Assurez-vous que cet ID est correct
        );

        // Log de mise à jour
        error_log("Table des stagiaires mise à jour pour le stagiaire avec ID " . $stagiaire_data['id']);

    } else {
        // Gérer l'erreur lors de la création de l'utilisateur
        error_log("Erreur lors de la création de l'utilisateur WordPress : " . $user_id->get_error_message());
    }
}

// Ajout d'un stagiaire dans la BDD
function handle_stagiaire_submission(WP_REST_Request $request) {
    global $wpdb;
    $data = $request->get_json_params();

    $table_name = $wpdb->prefix . 'mcdf_stagiaires';
    $result = $wpdb->insert($table_name, array(
        'civilite' => sanitize_text_field($data['civilite']),
        'nom' => sanitize_text_field($data['nom']),
        'prenom' => sanitize_text_field($data['prenom']),
        'email' => sanitize_email($data['email']),
        'telephone' => sanitize_text_field($data['telephone']),
        'adresse' => sanitize_textarea_field($data['adresse']),
        'date_naissance' => $data['date_naissance'], // Assurez-vous que c'est une date valide
        'niveau_formation' => sanitize_text_field($data['niveau_formation']),
        'situation_professionnelle' => sanitize_text_field($data['situation_professionnelle']),
        'handicape' => $data['handicape'] ? 1 : 0, // Convertissez en 1 ou 0 pour la base de données
        'date_inscription' => current_time('mysql'),
        // 'objectifs_formation' => si vous avez ce champ dans le formulaire
        // 'entreprise_id' => si vous avez un ID d'entreprise associé
    ));
    if ($result) {
        // Obtenez l'ID du stagiaire inséré
        $stagiaire_id = $wpdb->insert_id;
    
        // Préparez les données pour créer un utilisateur WordPress
        $stagiaire_data_wp = array_merge($data, array('id' => $stagiaire_id));
    
        // Créez l'utilisateur WordPress et mettez à jour la table des stagiaires
        create_wp_user_for_stagiaire($stagiaire_data_wp);
    
        return new WP_REST_Response('Stagiaire ajouté avec succès', 200);
    } else {
        return new WP_REST_Response('Erreur lors de l\'ajout du stagiaire', 500);
    }
}

// Récupération des stagiaires de la BDD
function get_stagiaires_data(WP_REST_Request $request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'mcdf_stagiaires';
    
    $query = "SELECT * FROM $table_name";
    $results = $wpdb->get_results($query, ARRAY_A);

    if (!empty($results)) {
        return new WP_REST_Response($results, 200);
    } else {
        return new WP_REST_Response('Aucun stagiaire trouvé', 404);
    }
}

function get_stagiaire_by_id(WP_REST_Request $request) {
    global $wpdb;
    $id = $request['id'];
    $table_name = $wpdb->prefix . 'mcdf_stagiaires';
    
    $query = $wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $id);
    $stagiaire = $wpdb->get_row($query, ARRAY_A);

    if ($stagiaire) {
        return new WP_REST_Response($stagiaire, 200);
    } else {
        return new WP_REST_Response('Stagiaire non trouvé', 404);
    }
}


function delete_stagiaire(WP_REST_Request $request) {
    global $wpdb;

    // Vérifiez le nonce pour la sécurité
    $nonce = isset($_SERVER['HTTP_X_WP_NONCE']) ? $_SERVER['HTTP_X_WP_NONCE'] : '';
    if ( ! wp_verify_nonce($nonce, 'wp_rest') ) {
        return new WP_REST_Response('Nonce invalide, action non autorisée', 403); // Retourner une erreur si le nonce est invalide
    }

    $id = $request['id'];
    $table_name = $wpdb->prefix . 'mcdf_stagiaires';

    $result = $wpdb->delete($table_name, array('id' => $id));

    if ($result) {
        return new WP_REST_Response('Stagiaire supprimé avec succès', 200);
    } else {
        return new WP_REST_Response('Erreur lors de la suppression du stagiaire', 500);
    }
}


function stagiaire_api_routes() {
    register_rest_route('mcdf/v1', '/stagiaires/', array(
        'methods' => 'POST',
        'callback' => 'handle_stagiaire_submission',
    ));
    register_rest_route('mcdf/v1', '/stagiaires/', array(
        'methods' => 'GET',
        'callback' => 'get_stagiaires_data',
    ));
    register_rest_route('mcdf/v1', '/stagiaires/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'get_stagiaire_by_id',
        'args' => array(
            'id' => array(
                'validate_callback' => function($param, $request, $key) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
    register_rest_route('mcdf/v1', '/stagiaires/(?P<id>\d+)', array(
        'methods' => 'DELETE',
        'callback' => 'delete_stagiaire',
    ));
}

add_action('rest_api_init', 'stagiaire_api_routes');

