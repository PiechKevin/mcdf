<?php
/**
 * Plugin Name: My Hello World Plugin
 * Description: Un exemple de plugin WordPress avec React.
 * Version: 1.0
 * Author: Votre nom
 */

// Fonction pour mettre en file d'attente le script React
function enqueue_hello_world_script() {
    // Remplacez 'path/to/your/build/static/js/main.js' par le chemin réel vers votre fichier JavaScript compilé
    wp_enqueue_script('hello-world-js', plugin_dir_url(__FILE__) . 'build/static/js/main.feac310d.js', ['wp-element'], time(), true);
}
add_action('wp_enqueue_scripts', 'enqueue_hello_world_script');

// Fonction pour créer le shortcode
function hello_world_shortcode() {
    return '<div id="hello-world-root"></div>';
}
add_shortcode('hello_world', 'hello_world_shortcode');
