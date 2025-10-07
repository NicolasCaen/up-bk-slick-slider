=== UP BK Slick Slider ===
Contributors: GEHIN Nicolas
Tags: block, slider, slick
Requires at least: 6.1
Tested up to: 6.4
Stable tag: 1.7.2
Requires PHP: 7.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Create beautiful and responsive sliders using Slick JS.

== Description ==

UP BK Slick Slider is a powerful WordPress block that allows you to create beautiful, responsive sliders using the popular Slick JS library. Perfect for showcasing images in a professional and engaging way.

= Features =

* Easy-to-use block interface
* Responsive design
* Multiple image sources (Media Gallery or Post Images)
* Customizable navigation arrows and dots
* Autoplay options
* Variable width and fixed height options
* Customizable slide gaps
* Multiple slides display
* Touch-enabled navigation
* RTL support
* Accessibility features

= Key Settings =

* Image Source Selection (Media Gallery or Post Images)
* Autoplay with customizable speed
* Navigation arrows with multiple styles and positions
* Navigation dots
* Number of slides to show and scroll
* Slide gap adjustment
* Fixed height option with customizable height
* Variable width option
* Image fit options (cover/contain)
* Responsive breakpoints
* Navigation customization (size, gap, radius, padding)

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/up-bk-slick-slider` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Use the block editor to add the 'UP Slick Slider' block to your content
4. Configure the slider settings in the block sidebar

== Frequently Asked Questions ==

= Can I customize the slider's appearance? =

Yes, the plugin offers extensive customization options including slide dimensions, navigation styles, and responsive settings.

= Is the slider responsive? =

Yes, the slider is fully responsive and adapts to different screen sizes.

= Can I display multiple slides at once? =

Yes, you can configure the slider to display multiple slides simultaneously and control how many slides to scroll at a time.

== Changelog ==

= 1.7.2 =
* Added: Editor preview now shows slidesToShow + 1 items in a horizontal strip, respects aspect ratio/slide height, and applies the gap spacing.
* Added: New option `autoHideArrows` to automatically hide arrows when all slides are visible (with proper init/breakpoint/resize/window load handling).
* Added: “Convertir en Custom Gallery” button for Meta/Post sources to build a gallery from current IDs.
* Changed: Arrows start hidden on first paint when auto-hide is enabled to avoid flicker; JS re-evaluates after load.
* Fixed: “Edit gallery” button opens the media modal correctly in editor preview.

= 1.6.1 =
* Correction d'un bug : import de  MediaPlaceholder pour l'ajout de post images
* Correction d'un bug : ajout de post images support

= 1.6.0 =
* Amélioration : Ajout du support complet des attributs de bloc Gutenberg (styles, alignement, etc.)
* Amélioration : Meilleure gestion des largeurs et des styles dans l'éditeur
* Amélioration : Optimisation de l'affichage dans l'interface d'administration
* Amélioration : Nettoyage et optimisation du code

= 1.5.0 =
* Amélioration : Gestion améliorée des flèches de navigation avec un nouveau système de positionnement
* Amélioration : Ajout du support de la largeur variable (variableWidth) dans les paramètres généraux et responsifs
* Amélioration : Meilleure gestion de l'accessibilité avec l'attribut inert au lieu de aria-hidden
* Amélioration : Les flèches de navigation sont maintenant toujours présentes dans le DOM et contrôlées via CSS
* Correction : Les flèches de navigation se mettent correctement à jour lors des changements de breakpoint
* Correction : Meilleure gestion des événements resize pour la mise à jour des options responsives

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

= 1.6.0 =
This version adds post images support and improves accessibility. Update recommended for all users.

= 1.5.0 =
This version includes significant improvements to navigation arrow management, variable width support, and accessibility enhancements. Update for better control over your sliders.

= 1.4 =
This version includes significant improvements to responsive controls, arrow and dot visibility management, and better styling organization. Update for better control over your sliders across different screen sizes.

= 1.3 =
This version includes improvements to the responsive management of slides, correction of gaps between slides, and dynamic adjustment of heights and object-fit based on screen size.

= 1.1.0 =
This version includes improvements to the build process and fixes issues with the slider initialization on the frontend.

= 1.0.0 =
Initial release of the plugin.

== Screenshots ==

1. Slider block in the editor
2. Slider settings panel
3. Frontend display example
4. Mobile responsive view
