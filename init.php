<?php
error_log('Plugin activation - création des tables et des rôles');
/**
 * Initialisation du plugin.
 */

// Création de la table des stagiaires.
function create_stagiaires_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'mcdf_stagiaires'; 

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        civilite VARCHAR(100) NOT NULL,
        nom VARCHAR(100) NOT NULL,
        prenom VARCHAR(100) NOT NULL,
        email VARCHAR(150),
        telephone VARCHAR(20),
        adresse TEXT,
        date_naissance DATE,
        date_inscription DATE,
        niveau_formation VARCHAR(100),
        situation_professionnelle VARCHAR(100),
        handicape BOOLEAN DEFAULT false,
        objectifs_formation TEXT,
        entreprise_id mediumint(9),
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    if (!empty($wpdb->last_error)) {
        error_log('Erreur lors de la création de la table stagiaires : ' . $wpdb->last_error);
    }
}

// Création de la table des clients.
function create_clients_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'mcdf_clients'; 

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        civilite VARCHAR(100) NOT NULL,
        nom VARCHAR(100) NOT NULL,
        prenom VARCHAR(100) NOT NULL,
        email VARCHAR(150),
        telephone VARCHAR(20),
        entreprise_nom VARCHAR(150),
        adresse_entreprise TEXT,
        secteur_activite VARCHAR(100),
        taille_entreprise VARCHAR(50),
        role_client VARCHAR(100),
        date_enregistrement DATE,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

// Création de la table du catalogue de formations.
function create_catalogue_formations_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'mcdf_catalogue_formations'; 

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        titre VARCHAR(255),
        sous_titre VARCHAR(255),
        descrip TEXT,
        les_plus TEXT,
        modalites_positionnement TEXT,
        public_cible VARCHAR(255),
        prerequis VARCHAR(255),
        modalites_prise_en_charge VARCHAR(255),
        categorie_action VARCHAR(255),
        prestation_realisee VARCHAR(255),
        code_nfs INT,
        modalites_delais_acces TEXT,
        duree_jours DECIMAL(5, 2),
        duree_heures DECIMAL(5, 2),
        tarif_ht_h DECIMAL(10, 2),
        montant_ht VARCHAR(255),
        taux_reussite DECIMAL(5, 2),
        taux_retour_enquetes DECIMAL(5, 2),
        nb_stagiaires INT,
        taux_abandon DECIMAL(5, 2),
        taux_interruption DECIMAL(5, 2),
        taux_satisfaction DECIMAL(5, 2),
        modalites_evaluation TEXT,
        methode_mobilisee TEXT,
        moyens_logistiques TEXT,
        accessibilite_public TEXT,
        objectifs_visés TEXT,
        certification_visee VARCHAR(255),
        code_certif VARCHAR(255),
        niveau VARCHAR(255),
        code_rome VARCHAR(255),
        certificateur VARCHAR(255),
        formacode VARCHAR(255),
        code_cpf VARCHAR(255),
        code_repertoire_specifique VARCHAR(255),
        code_rncp VARCHAR(255),
        derniere_revision DATE,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}


// Création de la table des sessions de formations.
function create_sessions_formations_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'mcdf_sessions_formations'; 

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        id_formation mediumint(9) NOT NULL,
        id_client mediumint(9) NOT NULL,
        date_debut DATE,
        date_fin DATE,
        lieu VARCHAR(255),
        statut VARCHAR(100),
        capacite INT,
        inscription_ouverte BOOLEAN DEFAULT true,
        commentaires TEXT,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

// Création de la table des inscriptions.
function create_inscriptions_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'mcdf_inscriptions'; 

    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        id_session mediumint(9) NOT NULL,
        id_stagiaire mediumint(9) NOT NULL,
        date_inscription DATE,
        statut VARCHAR(100),
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

function create_custom_roles() {
    // Créer un rôle pour le client
    if (!get_role('client')) {
        add_role('client', 'Client', [
            'read' => true,  // Permet seulement de lire
            // Ajoutez d'autres capacités si nécessaire
        ]);
    }

    // Créer un rôle pour le stagiaire
    if (!get_role('stagiaire')) {
        add_role('stagiaire', 'Stagiaire', [
            'read' => true,  // Permet seulement de lire
            // Ajoutez d'autres capacités si nécessaire
        ]);
    }

    // Ajoutez d'autres rôles si nécessaire
}

// Fonction d'activation du plugin qui initialise les tables.
function plugin_activation() {
    error_log('Plugin activation - création des tables et des rôles');
    // Création des tables
    create_stagiaires_table();
    create_clients_table();
    create_catalogue_formations_table();
    create_sessions_formations_table();
    create_inscriptions_table();

    // Création des rôles personnalisés
    create_custom_roles();
}

