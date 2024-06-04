<?php

function create_wp_user_for_client($client_data) {
    $username_base = sanitize_user(strtolower($client_data['prenom'] . '.' . $client_data['nom']));
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
        'user_email' => $client_data['email'],
        'first_name' => $client_data['prenom'],
        'last_name'  => $client_data['nom'],
        'role'       => 'client'
    );

    $user_id = wp_insert_user($user_data);

    // Vérifiez si la création de l'utilisateur a réussi
    if (!is_wp_error($user_id)) {
        // Log réussi
        error_log("Utilisateur WordPress créé avec succès : ID $user_id");

        // Mettre à jour la table des clients avec l'ID de l'utilisateur WordPress
        global $wpdb;
        $wpdb->update(
            $wpdb->prefix . 'mcdf_clients',
            array('wp_user_id' => $user_id),
            array('id' => $client_data['id']) // Assurez-vous que cet ID est correct
        );

        // Log de mise à jour
        error_log("Table des clients mise à jour pour le client avec ID " . $client_data['id']);

    } else {
        // Gérer l'erreur lors de la création de l'utilisateur
        error_log("Erreur lors de la création de l'utilisateur WordPress : " . $user_id->get_error_message());
    }
}

// Ajout d'un client dans la BDD
function handle_client_submission(WP_REST_Request $request) {
    global $wpdb;
    $data = $request->get_json_params();

    $table_name = $wpdb->prefix . 'mcdf_clients';
    
    // Utilisation de la fonction WordPress pour nettoyer et sécuriser les données
    $insert_data = array(
        'civilite' => sanitize_text_field($data['civilite']),
        'nom' => sanitize_text_field($data['nom']),
        'prenom' => sanitize_text_field($data['prenom']),
        'email' => sanitize_email($data['email']),
        'telephone' => sanitize_text_field($data['telephone']),
        'entreprise_nom' => sanitize_text_field($data['entreprise_nom']),
        'adresse_entreprise' => sanitize_text_field($data['adresse_entreprise']),
        'secteur_activite' => sanitize_text_field($data['secteur_activite']),
        'taille_entreprise' => sanitize_text_field($data['taille_entreprise']),
        'role_client' => sanitize_text_field($data['role_client']),
        'date_enregistrement' => sanitize_text_field($data['date_enregistrement'])
    );

    $result = $wpdb->insert($table_name, $insert_data);

    if ($result) {
        // Obtenez l'ID du client inséré
        $client_id = $wpdb->insert_id;

        // Préparez les données pour créer un utilisateur WordPress
        $client_data_wp = array_merge($data, array('id' => $client_id));

        // Créez l'utilisateur WordPress et mettez à jour la table des clients
        create_wp_user_for_client($client_data_wp);

        return new WP_REST_Response('Client ajouté avec succès', 200);
    } else {
        return new WP_REST_Response('Erreur lors de l\'ajout du client', 500);
    }
}


// Récupération des clients de la BDD
function get_clients_data(WP_REST_Request $request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'mcdf_clients';
    
    $query = "SELECT * FROM $table_name";
    $results = $wpdb->get_results($query, ARRAY_A);

    if (!empty($results)) {
        return new WP_REST_Response($results, 200);
    } else {
        return new WP_REST_Response('Aucun client trouvé', 404);
    }
}

function get_client_by_id(WP_REST_Request $request) {
    global $wpdb;
    $id = $request['id'];
    $table_name = $wpdb->prefix . 'mcdf_clients';
    
    $query = $wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $id);
    $client = $wpdb->get_row($query, ARRAY_A);

    if ($client) {
        return new WP_REST_Response($client, 200);
    } else {
        return new WP_REST_Response('Client non trouvé', 404);
    }
}


function delete_client(WP_REST_Request $request) {
    global $wpdb;

    // Vérifiez le nonce pour la sécurité
    $nonce = isset($_SERVER['HTTP_X_WP_NONCE']) ? $_SERVER['HTTP_X_WP_NONCE'] : '';
    if ( ! wp_verify_nonce($nonce, 'wp_rest') ) {
        return new WP_REST_Response('Nonce invalide, action non autorisée', 403); // Retourner une erreur si le nonce est invalide
    }

    $id = $request['id'];
    $table_name = $wpdb->prefix . 'mcdf_clients';

    $result = $wpdb->delete($table_name, array('id' => $id));

    if ($result) {
        return new WP_REST_Response('Client supprimé avec succès', 200);
    } else {
        return new WP_REST_Response('Erreur lors de la suppression du client', 500);
    }
}


function client_api_routes() {
    register_rest_route('mcdf/v1', '/clients/', array(
        'methods' => 'POST',
        'callback' => 'handle_client_submission',
    ));
    register_rest_route('mcdf/v1', '/clients/', array(
        'methods' => 'GET',
        'callback' => 'get_clients_data',
    ));
    register_rest_route('mcdf/v1', '/clients/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'get_client_by_id',
        'args' => array(
            'id' => array(
                'validate_callback' => function($param, $request, $key) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
    register_rest_route('mcdf/v1', '/clients/(?P<id>\d+)', array(
        'methods' => 'DELETE',
        'callback' => 'delete_client',
    ));
}

add_action('rest_api_init', 'client_api_routes');

