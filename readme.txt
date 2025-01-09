=== UP BK Slick Slider ===
Contributors: GEHIN Nicolas
Tags: block, slider, slick
Requires at least: 6.1
Tested up to: 6.4
Stable tag: 1.4
Requires PHP: 7.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A WordPress block for creating beautiful sliders using Slick JS.

== Description ==

This plugin adds a Gutenberg block that allows you to create beautiful and responsive sliders using the Slick JS library.

Features:
* Easy-to-use interface in the Gutenberg editor
* Multiple slides support
* Customizable settings (autoplay, speed, arrows, dots, etc.)
* Responsive design with breakpoint controls
* Support for fixed height slides
* Gap control between slides
* Multiple arrow positions and styles
* Dynamic visibility control for arrows and dots

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/up-bk-slick-slider` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Use the block editor to add the 'UP BK Slick Slider' block to your pages or posts

== Frequently Asked Questions ==

= What settings can I customize? =

Yes, you can customize various settings in the block sidebar, including:
* Autoplay and autoplay speed
* Navigation arrows and dots visibility
* Arrow position and style
* Slide transition effects
* Number of slides to show
* Gap between slides
* Fixed height option
* Object-fit behavior
* Responsive breakpoint settings

== Changelog ==

= 1.4 =
* Added: Responsive breakpoints support with customizable settings for different screen sizes
* Added: Dynamic data attributes for controlling slider behavior
* Added: Arrow position and style customization options
* Added: Improved gap handling with CSS variables
* Added: Better object-fit control for images
* Changed: Moved slider styles from inline to SCSS file for better organization
* Changed: Improved responsive settings handling with breakpoints
* Fixed: Arrow visibility issues in responsive mode
* Fixed: Gap calculation in slider items
* Fixed: Object-fit handling across different screen sizes
* Fixed: File structure organization (moved files from build to src)

= 1.3 =
* Amélioration de la gestion responsive des slides
* Correction des gaps entre les slides
* Ajustement dynamique des hauteurs et de l'object-fit en fonction de la taille de l'écran

= 1.2.0 =
* Amélioration : Gestion améliorée des paramètres responsifs
* Correction : Les panneaux de paramètres restent ouverts lors des modifications
* Correction : Meilleure gestion des types de données pour les paramètres du slider

= 1.1.0 =
* Added view.js for frontend slider initialization
* Improved block registration with block.json
* Fixed build process and file structure

= 1.0.0 =
* Initial release

== Upgrade Notice ==

= 1.4 =
This version includes significant improvements to responsive controls, arrow and dot visibility management, and better styling organization. Update for better control over your sliders across different screen sizes.

= 1.3 =
This version includes improvements to the responsive management of slides, correction of gaps between slides, and dynamic adjustment of heights and object-fit based on screen size.

= 1.1.0 =
This version includes improvements to the build process and fixes issues with the slider initialization on the frontend.

= 1.0.0 =
Initial release of the plugin.
