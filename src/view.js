document.addEventListener('DOMContentLoaded', function() {
    initSlickSliders();
});

function initSlickSliders() {
    const sliders = document.querySelectorAll('.wp-block-up-bk-slick-slider .slick-slider');
    
    sliders.forEach(slider => {
        const config = {
            autoplay: slider.dataset.autoplay === '1',
            autoplaySpeed: parseInt(slider.dataset.autoplaySpeed) || 3000,
            arrows: slider.dataset.arrows === '1',
            dots: slider.dataset.dots === '1',
            infinite: slider.dataset.infinite === '1',
            speed: parseInt(slider.dataset.speed) || 500,
            slidesToShow: parseInt(slider.dataset.slidesToShow) || 1,
            slidesToScroll: parseInt(slider.dataset.slidesToScroll) || 1,
            fade: slider.dataset.fade === '1',
            centerMode: slider.dataset.centerMode === '1',
            adaptiveHeight: slider.dataset.adaptiveHeight === '1',
            pauseOnHover: slider.dataset.pauseOnHover === '1',
            swipe: slider.dataset.swipe === '1',
            accessibility: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        try {
            // Unslick first if already initialized
            if (jQuery(slider).hasClass('slick-initialized')) {
                jQuery(slider).slick('unslick');
            }
            
            // Initialize Slick
            jQuery(slider).slick(config);
            
            console.log('Slick initialized with config:', config);
        } catch (error) {
            console.error('Error initializing Slick:', error);
        }
    });
}
