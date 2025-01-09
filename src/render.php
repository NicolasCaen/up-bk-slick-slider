<?php
/**
 * Render the slider block
 */

// Extract attributes
$slick_attributes = $attributes ?? [];

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

// Dimension settings
$fixedHeight = filter_var($slick_attributes['fixedHeight'] ?? false, FILTER_VALIDATE_BOOLEAN);
$slideHeight = $slick_attributes['slideHeight'] ?? '400px';
$objectFit = $slick_attributes['objectFit'] ?? 'cover';
$gap = intval($slick_attributes['gap'] ?? 0);

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
    
    // Format for tablet
    if (!empty($slick_attributes['breakpoints']['tablet']['settings'])) {
        $tablet_settings = $slick_attributes['breakpoints']['tablet']['settings'];
        $tablet_settings['gap'] = intval($tablet_settings['gap'] ?? $gap);
        $responsive_array[] = [
            'breakpoint' => 1024,
            'settings' => $tablet_settings
        ];
    }
    
    // Format for mobile
    if (!empty($slick_attributes['breakpoints']['mobile']['settings'])) {
        $mobile_settings = $slick_attributes['breakpoints']['mobile']['settings'];
        $mobile_settings['gap'] = intval($mobile_settings['gap'] ?? $gap);
        $responsive_array[] = [
            'breakpoint' => 480,
            'settings' => $mobile_settings
        ];
    }
    
    $slick_options['responsive'] = $responsive_array;
}

$slides = !empty($slick_attributes['slides']) ? $slick_attributes['slides'] : [];

// Initial styles
$initial_styles = [];
if ($fixedHeight) {
    $initial_styles[] = sprintf('--slide-height: %s', esc_attr($slideHeight));
}
$initial_styles[] = sprintf('--desktop-gap: %dpx', $gap);
$initial_styles[] = sprintf('--desktop-object-fit: %s', esc_attr($objectFit));

$style_string = implode('; ', $initial_styles);

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

// Apply filters to allow customization of arrows
$left_arrow = apply_filters('bk_slider_arrow_left_' . $arrow_type, $left_arrow);
$right_arrow = apply_filters('bk_slider_arrow_right_' . $arrow_type, $right_arrow);
?>

<div class="wp-block-up-bk-slick-slider" 
    data-arrow-position="<?php echo esc_attr($arrow_position); ?>"
    <?php echo $nav_styles; ?>>
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
            <div class="slick-slide-item" tabindex="-1">
                <img 
                    src="<?php echo esc_url($slide['url']); ?>" 
                    alt="<?php echo esc_attr($slide['alt']); ?>"
                    decoding="async"
                />
            </div>
        <?php endforeach; ?>
    </div>
</div>
