<?php
/**
 * Plugin Name: Mon Centre de Formation
 * Description: Un exemple de plugin WordPress avec React.
 * Version: 0.1
 * Author: Piech Kevin
 */

// Fonction pour mettre en file d'attente le script React
function enqueue_react_app_script() {
    $directory = plugin_dir_path( __FILE__ ) . 'build/static/js/';
    $files = glob($directory . 'main*.js');
    if (count($files) > 0) {
      $fileName = basename($files[0]);
      wp_enqueue_script('my_react_app', plugin_dir_url( __FILE__ ) . 'build/static/js/' . $fileName, [], null, true);
    }
  }
  add_action('wp_enqueue_scripts', 'enqueue_react_app_script');

  include_once plugin_dir_path(__FILE__) . 'includes/formations.php';