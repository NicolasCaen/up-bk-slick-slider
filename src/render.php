<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Clone attributes to avoid modifying the original
$slick_attributes = $attributes;

// Ensure fade mode only works with slidesToShow = 1
if (!empty($slick_attributes['fade']) && $slick_attributes['fade']) {
    $slick_attributes['slidesToShow'] = 1;
    $slick_attributes['slidesToScroll'] = 1;
} else {
    // Only validate slidesToScroll if not in fade mode
    if (!empty($slick_attributes['slidesToScroll']) && !empty($slick_attributes['slidesToShow'])) {
        if ($slick_attributes['slidesToScroll'] > $slick_attributes['slidesToShow']) {
            $slick_attributes['slidesToScroll'] = $slick_attributes['slidesToShow'];
        }
    }
}

// Get the gap value and number of slides
$gap = !empty($slick_attributes['gap']) ? intval($slick_attributes['gap']) : 0;
$slides_count = !empty($slick_attributes['slides']) ? count($slick_attributes['slides']) : 0;
$slides_to_show = !empty($slick_attributes['slidesToShow']) ? intval($slick_attributes['slidesToShow']) : 1;

// Only apply gap if we have multiple slides and slidesToShow > 1
$apply_gap = $slides_count > 1 && $slides_to_show > 1 && $gap > 0;

// Prepare CSS variables
$css_vars = [];
if ($apply_gap) {
    $css_vars[] = sprintf('--gap-size: %dpx', $gap);
}

// Add height and object-fit variables if fixed height is enabled
if (!empty($slick_attributes['fixedHeight']) && !empty($slick_attributes['slideHeight'])) {
    $css_vars[] = sprintf('--slide-height: %s', $slick_attributes['slideHeight']);
    $css_vars[] = sprintf('--object-fit: %s', $slick_attributes['objectFit'] ?? 'cover');
}

// Convert boolean values to strings
$autoplay = isset($slick_attributes['autoplay']) ? ($slick_attributes['autoplay'] ? 'true' : 'false') : 'true';
$arrows = isset($slick_attributes['arrows']) ? ($slick_attributes['arrows'] ? 'true' : 'false') : 'true';
$dots = isset($slick_attributes['dots']) ? ($slick_attributes['dots'] ? 'true' : 'false') : 'true';
$infinite = isset($slick_attributes['infinite']) ? ($slick_attributes['infinite'] ? 'true' : 'false') : 'true';
$fade = isset($slick_attributes['fade']) ? ($slick_attributes['fade'] ? 'true' : 'false') : 'false';
$centerMode = isset($slick_attributes['centerMode']) ? ($slick_attributes['centerMode'] ? 'true' : 'false') : 'false';
$adaptiveHeight = isset($slick_attributes['adaptiveHeight']) ? ($slick_attributes['adaptiveHeight'] ? 'true' : 'false') : 'false';
$pauseOnHover = isset($slick_attributes['pauseOnHover']) ? ($slick_attributes['pauseOnHover'] ? 'true' : 'false') : 'true';
$swipe = isset($slick_attributes['swipe']) ? ($slick_attributes['swipe'] ? 'true' : 'false') : 'true';
$responsive = isset($slick_attributes['responsive']) ? ($slick_attributes['responsive'] ? 'true' : 'false') : 'true';

// Convert numeric values
$autoplaySpeed = isset($slick_attributes['autoplaySpeed']) ? intval($slick_attributes['autoplaySpeed']) : 3000;
$speed = isset($slick_attributes['speed']) ? intval($slick_attributes['speed']) : 500;
$slidesToShow = isset($slick_attributes['slidesToShow']) ? intval($slick_attributes['slidesToShow']) : 1;
$slidesToScroll = isset($slick_attributes['slidesToScroll']) ? intval($slick_attributes['slidesToScroll']) : 1;

// Prepare wrapper attributes
$wrapper_style = !empty($css_vars) ? implode(';', $css_vars) : '';
$wrapper_attributes = get_block_wrapper_attributes(['style' => $wrapper_style]);

// Prepare breakpoints only if responsive is enabled
$breakpoints = '[]';
if ($responsive === 'true' && !empty($slick_attributes['breakpoints'])) {
    $responsive_array = [];
    foreach ($slick_attributes['breakpoints'] as $device => $config) {
        $settings = $config['settings'];
        $responsive_array[] = [
            'breakpoint' => intval($config['breakpoint']),
            'settings' => [
                'slidesToShow' => intval($settings['slidesToShow']),
                'slidesToScroll' => intval($settings['slidesToScroll']),
                'arrows' => $settings['arrows'] ? true : false,
                'dots' => $settings['dots'] ? true : false,
                'autoplay' => $settings['autoplay'] ? true : false,
                'autoplaySpeed' => intval($settings['autoplaySpeed']),
                'infinite' => $settings['infinite'] ? true : false,
                'speed' => intval($settings['speed']),
                'fade' => $settings['fade'] ? true : false,
                'centerMode' => $settings['centerMode'] ? true : false,
                'adaptiveHeight' => $settings['adaptiveHeight'] ? true : false,
                'pauseOnHover' => $settings['pauseOnHover'] ? true : false,
                'swipe' => $settings['swipe'] ? true : false
            ]
        ];
    }
    // Sort breakpoints in descending order
    usort($responsive_array, function($a, $b) {
        return $b['breakpoint'] - $a['breakpoint'];
    });
    $breakpoints = wp_json_encode($responsive_array);
}
?>

<div <?php echo $wrapper_attributes; ?>>
    <?php if (!empty($slick_attributes['slides'])) : ?>
        <div class="slick-slider<?php echo !empty($slick_attributes['fixedHeight']) ? ' fixed-height' : ''; ?>"
             data-autoplay="<?php echo esc_attr($autoplay); ?>"
             data-autoplay-speed="<?php echo esc_attr($autoplaySpeed); ?>"
             data-arrows="<?php echo esc_attr($arrows); ?>"
             data-dots="<?php echo esc_attr($dots); ?>"
             data-infinite="<?php echo esc_attr($infinite); ?>"
             data-speed="<?php echo esc_attr($speed); ?>"
             data-slides-to-show="<?php echo esc_attr($slidesToShow); ?>"
             data-slides-to-scroll="<?php echo esc_attr($slidesToScroll); ?>"
             data-fade="<?php echo esc_attr($fade); ?>"
             data-center-mode="<?php echo esc_attr($centerMode); ?>"
             data-adaptive-height="<?php echo esc_attr($adaptiveHeight); ?>"
             data-pause-on-hover="<?php echo esc_attr($pauseOnHover); ?>"
             data-swipe="<?php echo esc_attr($swipe); ?>"
             data-responsive='<?php echo $breakpoints; ?>'
             data-responsive-enabled="<?php echo esc_attr($responsive); ?>"
             <?php if ($apply_gap) : ?>
             style="margin: 0 -<?php echo esc_attr($gap / 2); ?>px;"
             <?php endif; ?>>
            <?php foreach ($slick_attributes['slides'] as $slide) : ?>
                <?php if (!empty($slide['url'])) : ?>
                    <div <?php if ($apply_gap) : ?>style="padding: 0 <?php echo esc_attr($gap / 2); ?>px;"<?php endif; ?>>
                        <img src="<?php echo esc_url($slide['url']); ?>" 
                             alt="<?php echo esc_attr($slide['alt'] ?? ''); ?>"
                             class="slick-slide-image"
                             decoding="async" />
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>
