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

if (!function_exists('wp_get_list_item_separator')) {
    function wp_get_list_item_separator() {
        return '<!-- wp:list-item -->';
    }
}

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
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'wp-block-up-bk-slick-slider']); ?>>
    <?php if (!empty($slick_attributes['slides'])) : ?>
        <div class="slick-slider" 
             data-autoplay="<?php echo esc_attr($slick_attributes['autoplay'] ?? true); ?>"
             data-autoplay-speed="<?php echo esc_attr($slick_attributes['autoplaySpeed'] ?? 3000); ?>"
             data-arrows="<?php echo esc_attr($slick_attributes['arrows'] ?? true); ?>"
             data-dots="<?php echo esc_attr($slick_attributes['dots'] ?? true); ?>"
             data-infinite="<?php echo esc_attr($slick_attributes['infinite'] ?? true); ?>"
             data-speed="<?php echo esc_attr($slick_attributes['speed'] ?? 500); ?>"
             data-slides-to-show="<?php echo esc_attr($slick_attributes['slidesToShow'] ?? 1); ?>"
             data-slides-to-scroll="<?php echo esc_attr($slick_attributes['slidesToScroll'] ?? 1); ?>"
             data-fade="<?php echo esc_attr($slick_attributes['fade'] ?? false); ?>"
             data-center-mode="<?php echo esc_attr($slick_attributes['centerMode'] ?? false); ?>"
             data-adaptive-height="<?php echo esc_attr($slick_attributes['adaptiveHeight'] ?? false); ?>"
             data-pause-on-hover="<?php echo esc_attr($slick_attributes['pauseOnHover'] ?? true); ?>"
             data-swipe="<?php echo esc_attr($slick_attributes['swipe'] ?? true); ?>">
            <?php foreach ($slick_attributes['slides'] as $slide) : ?>
                <?php if (!empty($slide['url'])) : ?>
                    <div>
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
