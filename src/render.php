<?php
/**
 */

// Extract attributes
$slick_attributes = $attributes ?? [];

// Current post ID (needed for meta source)
$post_id = 0;
if (!empty($block) && isset($block->context['postId'])) {
    $post_id = intval($block->context['postId']);
} elseif (function_exists('get_the_ID')) {
    $post_id = intval(get_the_ID());
}
// Base settings
$autoplay = filter_var($slick_attributes['autoplay'] ?? true, FILTER_VALIDATE_BOOLEAN);
$autoplaySpeed = intval($slick_attributes['autoplaySpeed'] ?? 3000);
$arrows = filter_var($slick_attributes['arrows'] ?? true, FILTER_VALIDATE_BOOLEAN);
$dots = filter_var($slick_attributes['dots'] ?? true, FILTER_VALIDATE_BOOLEAN);
$infinite = filter_var($slick_attributes['infinite'] ?? true, FILTER_VALIDATE_BOOLEAN);
$speed = intval($slick_attributes['speed'] ?? 500);
$slidesToShow = intval($slick_attributes['slidesToShow'] ?? 1);
$slidesToScroll = intval($slick_attributes['slidesToScroll'] ?? 1);
$fade = filter_var($slick_attributes['fade'] ?? false, FILTER_VALIDATE_BOOLEAN);
$centerMode = filter_var($slick_attributes['centerMode'] ?? false, FILTER_VALIDATE_BOOLEAN);
$variableWidth = filter_var($slick_attributes['variableWidth'] ?? false, FILTER_VALIDATE_BOOLEAN);
$adaptiveHeight = filter_var($slick_attributes['adaptiveHeight'] ?? false, FILTER_VALIDATE_BOOLEAN);
$pauseOnHover = filter_var($slick_attributes['pauseOnHover'] ?? true, FILTER_VALIDATE_BOOLEAN);
$swipe = filter_var($slick_attributes['swipe'] ?? true, FILTER_VALIDATE_BOOLEAN);
$responsive = filter_var($slick_attributes['responsive'] ?? true, FILTER_VALIDATE_BOOLEAN);
$fixedHeight = filter_var($slick_attributes['fixedHeight'] ?? false, FILTER_VALIDATE_BOOLEAN);
$slideHeight = $slick_attributes['slideHeight'] ?? '400px';
$objectFit = $slick_attributes['objectFit'] ?? 'cover';
$imageSize = $slick_attributes['imageSize'] ?? 'full';
$gap = intval($slick_attributes['gap'] ?? 0);
// Option: auto-hide arrows when all slides are visible
$autoHideArrows = filter_var($slick_attributes['autoHideArrows'] ?? false, FILTER_VALIDATE_BOOLEAN);
// New block attributes
$aspectRatioAttr = $slick_attributes['aspectRatio'] ?? 'auto';
$showFigcaptionAttr = filter_var($slick_attributes['showFigcaption'] ?? false, FILTER_VALIDATE_BOOLEAN);
// Lightbox / Fancybox option
$enableLightbox = filter_var($slick_attributes['enableLightbox'] ?? false, FILTER_VALIDATE_BOOLEAN);

// Prepare aspect ratio style if any (from block attribute)
$aspect_ratio_style = '';
if (!empty($aspectRatioAttr) && $aspectRatioAttr !== 'auto') {
    // Expect values like "1/1", "4/3", "16/9" -> convert to "1 / 1"
    $parts = explode('/', $aspectRatioAttr);
    if (count($parts) === 2 && is_numeric($parts[0]) && is_numeric($parts[1])) {
        $aspect_ratio_style = sprintf('aspect-ratio: %d / %d;', intval($parts[0]), intval($parts[1]));
    }
}
// Prepare slick options
$slick_options = [
    'autoplay' => $autoplay,
    'autoplaySpeed' => $autoplaySpeed,
    'arrows' => $arrows,
    'dots' => $dots,
    'infinite' => $infinite,
    'speed' => $speed,
    'slidesToShow' => $slidesToShow,
    'slidesToScroll' => $slidesToScroll,
    'fade' => $fade,
    'centerMode' => $centerMode,
    'variableWidth' => $variableWidth,
    'adaptiveHeight' => $adaptiveHeight,
    'pauseOnHover' => $pauseOnHover,
    'swipe' => $swipe,
];

// Add responsive settings
if ($responsive && !empty($slick_attributes['breakpoints'])) {
    $responsive_array = [];

    // Tablet
    if (!empty($slick_attributes['breakpoints']['tablet']['settings'])) {
        $tablet_settings = $slick_attributes['breakpoints']['tablet']['settings'];
        $tablet_settings['gap'] = intval($tablet_settings['gap'] ?? $gap);
        $responsive_array[] = [
            'breakpoint' => 1024,
            'settings' => $tablet_settings,
        ];
    }

    // Mobile
    if (!empty($slick_attributes['breakpoints']['mobile']['settings'])) {
        $mobile_settings = $slick_attributes['breakpoints']['mobile']['settings'];
        $mobile_settings['gap'] = intval($mobile_settings['gap'] ?? $gap);
        $responsive_array[] = [
            'breakpoint' => 480,
            'settings' => $mobile_settings,
        ];
    }

    if (!empty($responsive_array)) {
        $slick_options['responsive'] = $responsive_array;
    }
}

$slides = !empty($slick_attributes['slides']) ? $slick_attributes['slides'] : [];

// If image source is meta, read IDs from the specified meta key (CSV of IDs)
if (($slick_attributes['imageSource'] ?? '') === 'meta') {
    $meta_key = isset($slick_attributes['metaKey']) ? trim((string) $slick_attributes['metaKey']) : '';
    if ($meta_key !== '' && $post_id) {
        $raw = get_post_meta($post_id, $meta_key, true);
     
        if (is_string($raw) && $raw !== '') {
            $id_list = array_map('trim', explode(',', $raw));
            $ids = array_filter(array_map('intval', $id_list));
           
            if (!empty($ids)) {
                $built = [];
                foreach ($ids as $aid) {
                    $url = wp_get_attachment_url($aid);
                    if (!$url) { continue; }
                    $alt = get_post_meta($aid, '_wp_attachment_image_alt', true);
                    $built[] = [
                        'id' => $aid,
                        'url' => $url,
                        'alt' => is_string($alt) ? $alt : '',
                    ];
                }
                if (!empty($built)) {
                    $slides = $built;
                }
            }
        }
    }
}

// Compute initial arrows visibility to avoid flash on first paint
// If auto-hide is enabled, start with arrows hidden; JS will enable if needed.
$initial_show_arrows = $autoHideArrows ? false : $arrows;

// Initial styles
$initial_styles = [];
if ($fixedHeight) {
    $initial_styles[] = sprintf('--slide-height: %s', esc_attr($slideHeight));
}
$initial_styles[] = sprintf('--desktop-gap: %dpx', $gap);
$initial_styles[] = sprintf('--desktop-object-fit: %s', esc_attr($objectFit));

// Inline style string used on the slider container
$style_string = implode('; ', $initial_styles);


// Lightbox group for Fancybox (unique per slider render)
$lightbox_group = '';
if ($enableLightbox && !empty($slides)) {
    $lightbox_group = 'up-bk-slick-slider-' . uniqid();
}


// Get arrow SVG content based on type
$arrow_type = $attributes['arrowType'] ?? 'type1';
$arrow_position = $attributes['arrowPosition'] ?? 'sides';

$nav_styles = sprintf(
    'style="--nav-icon-size: %s; --nav-gap: %sem; --nav-radius: %s; --nav-padding: %sem;"',
    esc_attr($attributes['navIconSize'] ?? '24px'),
    esc_attr($attributes['navGap'] ?? 1),
    esc_attr($attributes['navRadius'] ?? '50%'),
    esc_attr($attributes['navPadding'] ?? 0.5)
);

$left_arrow_path = plugin_dir_path(__DIR__) . 'assets/arrows/' . $arrow_type . '/arrow-left.svg';
$right_arrow_path = plugin_dir_path(__DIR__) . 'assets/arrows/' . $arrow_type . '/arrow-right.svg';

$left_arrow = file_exists($left_arrow_path) ? file_get_contents($left_arrow_path) : '';
$right_arrow = file_exists($right_arrow_path) ? file_get_contents($right_arrow_path) : '';

// Filters to customize arrows
$left_arrow = apply_filters('bk_slider_arrow_left_' . $arrow_type, $left_arrow);
$right_arrow = apply_filters('bk_slider_arrow_right_' . $arrow_type, $right_arrow);

// Get block alignment class
$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'wp-block-up-bk-slick-slider',
    'data-arrow-position' => $arrow_position,
    'data-show-arrows' => $initial_show_arrows ? 'true' : 'false',
    'data-show-dots' => $dots ? 'true' : 'false',
    'data-auto-hide-arrows' => $autoHideArrows ? 'true' : 'false',
]);

?>
<div <?php echo $wrapper_attributes; ?> <?php echo $nav_styles; ?>>
    <?php if ($enableLightbox) : ?>
        <style>
            .wp-block-up-bk-slick-slider__lightbox {
           position: absolute;
           bottom: 1rem;
           right:.25rem;
      
            }
            .wp-block-up-bk-slick-slider__lightbox-button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding:.5em;
                border-radius:1000px;
                width: 2.5rem;
                height:2.5rem;
                border: 1px solid currentColor;
                font-size: 0.875rem;
                text-decoration: none;
                cursor: pointer;
                color:var(--wp--preset--color--base-2);
                background: rgba(255,255,255,.8);
                border-color:transparent;
                transition: all 0.2s ease;
                box-shadow: 0 2px 6px rgba(0,0,0,0.15);

            }
            .wp-block-up-bk-slick-slider__lightbox-button:hover {
                background: var(--wp--preset--color--base-2);
                color: white ;
            }
        </style>
    <?php endif; ?>
    <div class="wp-block-up-bk-slick-slider__nav">
        <div class="wp-block-up-bk-slick-slider__nav__arrow wp-block-up-bk-slick-slider__nav__arrow--prev">
            <?php echo $left_arrow; ?>
            <span class="screen-reader-text"><?php echo esc_html__('Previous slide', 'up-bk-slick-slider'); ?></span>
        </div>
        <div class="wp-block-up-bk-slick-slider__nav__arrow wp-block-up-bk-slick-slider__nav__arrow--next">
            <?php echo $right_arrow; ?>
            <span class="screen-reader-text"><?php echo esc_html__('Next slide', 'up-bk-slick-slider'); ?></span>
        </div>

    </div>

    <div class="slick-slider<?php echo $fixedHeight ? ' fixed-height' : ''; ?>"
        role="region"
        aria-label="<?php echo esc_attr__('Image Slider', 'up-bk-slick-slider'); ?>"
        data-slick='<?php echo wp_json_encode($slick_options); ?>'
        style="<?php echo $style_string; ?>">
        <?php foreach ($slides as $slide) : ?>
            <?php
                $img_id = isset($slide['id']) ? intval($slide['id']) : 0;
                $img_url = isset($slide['url']) ? $slide['url'] : '';
                $img_alt = isset($slide['alt']) ? $slide['alt'] : '';
                if ($img_id) {
                    $sized = wp_get_attachment_image_url($img_id, $imageSize);
                    if ($sized) {
                        $img_url = $sized;
                    }
                }
                $caption = '';
                if ($showFigcaptionAttr && $img_id) {
                    $caption = wp_get_attachment_caption($img_id);
                    if (!$caption) {
                        $attachment = get_post($img_id);
                        if ($attachment) {
                            $caption = $attachment->post_excerpt ?: $attachment->post_title;
                        }
                    }
                }
                $img_style = trim($aspect_ratio_style . ' object-fit: ' . esc_attr($objectFit) . ';');
                $lightbox_url = '';
                if ($enableLightbox && $img_id) {
                    $full_url = wp_get_attachment_image_url($img_id, 'full');
                    if ($full_url) {
                        $lightbox_url = $full_url;
                    }
                }
                if ($enableLightbox && !$lightbox_url && !empty($slide['url'])) {
                    $lightbox_url = $slide['url'];
                }
            ?>
            <div class="slick-slide-item" tabindex="-1"<?php echo ($enableLightbox && $lightbox_url) ? ' data-lightbox-src="' . esc_url($lightbox_url) . '"' : ''; ?><?php echo ($enableLightbox && $lightbox_url && !empty($lightbox_group)) ? ' data-lightbox-group="' . esc_attr($lightbox_group) . '"' : ''; ?>>
                <figure class="slick-slide-figure" style="<?php echo esc_attr($aspect_ratio_style); ?>">
                    <img 
                        src="<?php echo esc_url($img_url); ?>" 
                        alt="<?php echo esc_attr($img_alt); ?>"
                        decoding="async"
                        style="<?php echo esc_attr($img_style); ?>"
                    />
                    <?php if ($showFigcaptionAttr && !empty($caption)) : ?>
                        <figcaption class="slick-slide-caption"><?php echo esc_html($caption); ?></figcaption>
                    <?php endif; ?>
                </figure>
            </div>
        <?php endforeach; ?>
    </div>

    <?php if ($enableLightbox && !empty($slides) && !empty($lightbox_group)) : ?>
        <div class="wp-block-up-bk-slick-slider__lightbox">
            <button type="button" class="wp-block-up-bk-slick-slider__lightbox-button" data-index="0" data-lightbox-group="<?php echo esc_attr($lightbox_group); ?>">
                
<svg width="2.5rem" height="2.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </button>
        </div>
    <?php endif; ?>
</div>

