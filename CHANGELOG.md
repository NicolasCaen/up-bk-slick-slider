# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning where applicable.

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

[1.7.0]: https://example.com/compare/v1.6.1...v1.7.0
