<?php
/**
 * Plugin Name:       UP Slick Slider Block
 * Description:       A WordPress block for creating beautiful sliders using Slick JS
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:          1.1.0
 * Author:           GEHIN Nicolas
 * License:          GPL-2.0-or-later
 * License URI:      https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:      up-bk-slick-slider
 *
 * @package          up-bk-slick-slider
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Registers the block using the metadata loaded from the `block.json` manifest.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function up_bk_slick_slider_block_init() {
    // Register Slick assets
    wp_register_script(
        'slick-carousel-js',
        plugins_url('assets/slick/slick.min.js', __FILE__),
        array('jquery'),
        '1.8.1',
        true
    );

    wp_register_style(
        'slick-carousel-css',
        plugins_url('assets/slick/slick.css', __FILE__),
        array(),
        '1.8.1'
    );

    wp_register_style(
        'slick-carousel-theme',
        plugins_url('assets/slick/slick-theme.css', __FILE__),
        array('slick-carousel-css'),
        '1.8.1'
    );

    // Register block style
    wp_register_style(
        'up-bk-slick-slider-style',
        plugins_url('build/index.css', __FILE__),
        array(),
       null
    );

    // Register block
    register_block_type(__DIR__, array(
        'render_callback' => 'up_bk_slick_slider_render_callback'
    ));

    // Always enqueue Slick assets and block styles on the frontend
    if (!is_admin()) {
        wp_enqueue_script('jquery');
        wp_enqueue_script('slick-carousel-js');
        wp_enqueue_style('slick-carousel-css');
        wp_enqueue_style('slick-carousel-theme');
    }
}
add_action('init', 'up_bk_slick_slider_block_init');

/**
 * Render callback function.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      The block instance.
 * @return string Returns the block content.
 */
function up_bk_slick_slider_render_callback($attributes, $content, $block) {
    // Ensure scripts and styles are enqueued
    wp_enqueue_script('slick-carousel-js');
    wp_enqueue_style('slick-carousel-css');
    wp_enqueue_style('slick-carousel-theme');

    ob_start();
    require plugin_dir_path(__FILE__) . 'build/render.php';
    return ob_get_clean();
}
