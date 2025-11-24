# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning where applicable.

## [1.8.0] - 2025-11-24

### Added
- Option d'activer un lightbox Fancybox synchronisé avec le slider.
- Bouton unique sous le slider qui ouvre Fancybox sur l'image correspondant au slide courant (index synchronisé via l'événement `afterChange` de Slick, en ignorant les slides clonés).
- Réutilisation des SVG de flèches du slider comme flèches de navigation Fancybox pour une interface cohérente.

### Changed
- Amélioration de l'intégration Slick/Fancybox pour une logique plus simple et plus fiable (suppression des overlays complexes et gestion par bouton dédié).

## [1.7.4] - 2025-10-15

### Added
- New aspect ratio options: 2:1, 1:2, 3:4, 2:3, 9:16, 5:4, 4:5

## [1.7.2] - 2025-10-07

### Added
- Editor preview shows a more realistic layout: displays `slidesToShow + 1` items in a horizontal strip, respects `aspectRatio`/`slideHeight`, and uses `gap` spacing.
- New option: `autoHideArrows` to automatically hide arrows when all slides are visible. Exposed in the Navigation panel.
- Button “Convertir en Custom Gallery” when source is Meta or Post Images. Converts current IDs to a gallery and switches `imageSource` to `gallery`.
- Info notice in Sources panel explaining that meta/post data is read on editor load and the page should be saved/reloaded after meta changes.

### Changed
- Arrows are initially hidden on first paint when auto-hide is enabled to avoid flicker; JS re-evaluates on init/breakpoint/resize/window load.
- Editor preview always shows arrow placeholders positioned according to current settings.

### Fixed
- “Edit gallery” button in editor preview now opens the media modal correctly.
- More robust slidesToShow resolution per breakpoint in frontend view.

## [1.7.0] - 2025-10-07

### Added
- Image source "Meta (IDs CSV)": ability to pull images from a post meta key containing a comma-separated list of attachment IDs.
  - New block attribute: `metaKey`.
  - Server-side render (`src/render.php`) reads the meta, validates IDs, and builds slides.
- Image size selector in the editor.
  - New block attribute: `imageSize` (default `full`).
  - Frontend uses `wp_get_attachment_image_url(ID, imageSize)` when an attachment ID is available.

### Changed
- Rewrote `src/index.js` to register the block using `block.json` metadata and dynamic render (`save: () => null`).
- README updated with documentation for Meta source and Image Size.

### Fixed
- Dots visibility syncing with runtime settings across breakpoints.
- Inline CSS variables restored for gap and object-fit (ensuring spacing is applied).
- Removed duplicate responsive/meta blocks introduced by accidental undo, restoring clean render logic.
- Ensured both navigation arrows SVGs load correctly.

## [1.6.x] - 2025-09-xx
- Internal improvements and minor fixes.

[1.7.2]: https://example.com/compare/v1.7.0...v1.7.2
[1.7.0]: https://example.com/compare/v1.6.1...v1.7.0
