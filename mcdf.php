<?php
/**
 * Plugin Name: Mon Centre de Formation
 * Description: MCDF
 * Version: 0.1
 * Author: Piech Kevin
 */


require_once(__DIR__ . '/init.php');                        //Initialisation du Plugin
require_once(__DIR__ . '/restapi/stagiaires-api.php');     //Routes API pour les stagiaires
require_once(__DIR__ . '/restapi/clients-api.php');     //Routes API pour les stagiaires
require_once(__DIR__ . '/restapi/formation-api.php');     //Routes API pour les stagiaires
require_once(__DIR__ . '/restapi/session-api.php');     //Routes API pour les stagiaires
require_once(__DIR__ . '/restapi/generatePdf-api.php');     //Routes API pour la génération de PDF


function my_plugin_enqueue_scripts() {
  wp_enqueue_style('animate-css', plugin_dir_url(__FILE__) . 'css/animate.min.css', array(), '1.0.0');
}

add_action('wp_enqueue_scripts', 'my_plugin_enqueue_scripts');

function my_theme_enqueue_styles() {
  wp_enqueue_style('style_mcdf', plugin_dir_url(__FILE__) . 'css/style.css', array(), '1.0.0');
}

add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');


register_activation_hook(__FILE__, 'plugin_activation');

// Fonction pour mettre en file d'attente le script React
function enqueue_react_app_script() {
  $directory = plugin_dir_path( __FILE__ ) . 'build/static/js/';
  $files = glob($directory . 'main*.js');
  if (count($files) > 0) {
      $fileName = basename($files[0]);

      // Mettre en file d'attente le script React
      wp_enqueue_script('my_react_app', plugin_dir_url( __FILE__ ) . 'build/static/js/' . $fileName, [], null, true);

      // Préparation des données pour le script
      $script_data = array(
          'nonce' => wp_create_nonce('wp_rest'),
          'apiUrl' => home_url('/wp-json/')
      );

      // Localiser le script et transmettre les données
      wp_localize_script('my_react_app', 'appLocalizer', $script_data);

      // Logs pour le debugging
      error_log('Script React mis en file d’attente.');
      error_log('Données localisées pour le script: ' . print_r($script_data, true));
  } else {
      error_log('Script React non trouvé: ' . $directory);
  }
}
add_action('wp_enqueue_scripts', 'enqueue_react_app_script');


  // Fonction pour créer le shortcode
function form_stagiaire_shortcode() {
  return '<div id="stagiaire-form-root"></div>';
}
add_shortcode('form_stagiaire', 'form_stagiaire_shortcode');

  // Fonction pour créer le shortcode
  function form_formation_shortcode() {
    return '<div id="formation-form-root"></div>';
  }
  add_shortcode('form_formation', 'form_formation_shortcode');

  // Fonction pour créer le shortcode
  function stagiaires_table_shortcode() {
    return '<div id="stagiaires-table-root"></div>';
}
add_shortcode('stagiaires_table', 'stagiaires_table_shortcode');

  // Fonction pour créer le shortcode
  function session_form_shortcode() {
    return '<div id="session-form-root"></div>';
}
add_shortcode('session_form', 'session_form_shortcode');

  // Fonction pour créer le shortcode
  function client_form_shortcode() {
    return '<div id="client-form-root"></div>';
}
add_shortcode('client_form', 'client_form_shortcode');

