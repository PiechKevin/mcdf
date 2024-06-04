<?php

add_action( 'rest_api_init', function () {
    register_rest_route( 'mcdf/v1', '/sessions', array(
          'methods' => 'POST',
          'callback' => 'ajouter_session_handler',
    ) );
 });
 
 function ajouter_session_handler( $request ) {
    global $wpdb;

    $params = $request->get_json_params();

    $table_name = $wpdb->prefix . 'mcdf_sessions_formations';

    $data = array(
        'id_formation' => sanitize_text_field( $params['id_formation'] ), // Correspond à "ID Formation"
        'id_client' => sanitize_text_field( $params['id_client'] ), // Correspond à "ID Client"
        'date_debut' => sanitize_text_field( $params['date_debut'] ), // Correspond à "Date de début"
        'date_fin' => sanitize_text_field( $params['date_fin'] ), // Correspond à "Date de fin"
        'lieu' => sanitize_text_field( $params['lieu'] ), // Correspond à "Lieu"
        'statut' => sanitize_text_field( $params['statut'] ), // Correspond à "Statut"
        'capacite' => intval( $params['capacite'] ), // Correspond à "Capacité"
        'commentaires' => sanitize_textarea_field( $params['commentaires'] ), // Correspond à "Commentaires"
    );

    $result = $wpdb->insert( $table_name, $data );

    if ( false === $result ) {
        return new WP_Error( 'db_error', 'Erreur lors de l\'insertion dans la base de données', array( 'status' => 500 ) );
    }

    return new WP_REST_Response( array( 'message' => 'Formation ajoutée avec succès', 'id' => $wpdb->insert_id ), 200 );
}

 