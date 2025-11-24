<?php
/**
 * Plugin Name:       UP BK Slick Slider
 * Description:       A WordPress block for creating beautiful sliders using Slick JS
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.8.0
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

    // Register Fancybox assets
    wp_register_style(
        'up-bk-slick-slider-fancybox-css',
        'https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css',
        array(),
        '3.5.7'
    );

    wp_register_script(
        'up-bk-slick-slider-fancybox-js',
        'https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js',
        array('jquery'),
        '3.5.7',
        true
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

    $enable_lightbox = !empty($attributes['enableLightbox']);
    if ($enable_lightbox) {
        wp_enqueue_style('up-bk-slick-slider-fancybox-css');
        wp_enqueue_script('up-bk-slick-slider-fancybox-js');
        wp_add_inline_script(
            'up-bk-slick-slider-fancybox-js',
            "jQuery(function($){\n" .
            "  if (!$.fancybox) return;\n" .
            "  $('.wp-block-up-bk-slick-slider').each(function(){\n" .
            "    var wrapper = $(this);\n" .
            "    var slider = wrapper.find('.slick-slider');\n" .
            "    var btn = wrapper.find('.wp-block-up-bk-slick-slider__lightbox-button');\n" .
            "    if (!btn.length) return;\n" .
            "    // Update button data-index on slide change\n" .
            "    slider.on('afterChange', function(event, slick, currentSlide){\n" .
            "      btn.attr('data-index', currentSlide);\n" .
            "    });\n" .
            "    // Open Fancybox on button click\n" .
            "    btn.on('click', function(e){\n" .
            "      e.preventDefault();\n" .
            "      var group = $(this).data('lightbox-group');\n" .
            "      if (!group) return;\n" .
            "      var items = [];\n" .
            "      slider.find('.slick-slide-item[data-lightbox-group=\"' + group + '\"]').not('.slick-cloned').each(function(){\n" .
            "        var src = $(this).data('lightbox-src');\n" .
            "        if (src) { items.push({ src: src, type: 'image' }); }\n" .
            "      });\n" .
            "      if (!items.length) return;\n" .
            "      var index = parseInt($(this).attr('data-index'), 10) || 0;\n" .
            "      if (index < 0 || index >= items.length) { index = 0; }\n" .
            "      // Get slider arrows HTML\n" .
            "      var leftArrow = wrapper.find('.wp-block-up-bk-slick-slider__nav__arrow--prev').html();\n" .
            "      var rightArrow = wrapper.find('.wp-block-up-bk-slick-slider__nav__arrow--next').html();\n" .
            "      $.fancybox.open(items, {\n" .
            "        loop: true,\n" .
            "        buttons: ['close'],\n" .
            "        btnTpl: {\n" .
            "          arrowLeft: '<button data-fancybox-prev class=\"fancybox-button fancybox-button--arrow_left\" title=\"Previous\">' + leftArrow + '</button>',\n" .
            "          arrowRight: '<button data-fancybox-next class=\"fancybox-button fancybox-button--arrow_right\" title=\"Next\">' + rightArrow + '</button>'\n" .
            "        }\n" .
            "      }, index);\n" .
            "    });\n" .
            "  });\n" .
            "});"
        );
    }

    ob_start();
    // Use source render template directly (build may not exist in some environments)
    require plugin_dir_path(__FILE__) . 'src/render.php';
    return ob_get_clean();
}

