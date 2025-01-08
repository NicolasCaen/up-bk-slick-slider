document.addEventListener('DOMContentLoaded', function () {
    // Vérifier que jQuery est disponible
    if (typeof jQuery === 'undefined') {
        console.error('jQuery is not loaded');
        return;
    }

    // Vérifier que slick est disponible
    if (typeof jQuery.fn.slick === 'undefined') {
        console.error('Slick is not loaded');
        return;
    }

    const sliders = document.querySelectorAll('.wp-block-up-bk-slick-slider .slick-slider');
    
    if (sliders.length === 0) {
        console.log('No sliders found on page');
        return;
    }

    console.log('Found', sliders.length, 'slider(s)');

    sliders.forEach(function (slider, index) {
        // Helper function to parse boolean attributes
        const parseBool = (value) => value === 'true';
        
        // Helper function to parse integer attributes
        const parseInt = (value, defaultValue) => {
            const parsed = Number(value);
            return isNaN(parsed) ? defaultValue : parsed;
        };

        // Log all data attributes
        console.log('Slider', index, 'data attributes:', slider.dataset);

        const options = {
            autoplay: parseBool(slider.dataset.autoplay),
            autoplaySpeed: parseInt(slider.dataset.autoplaySpeed, 3000),
            arrows: parseBool(slider.dataset.arrows),
            dots: parseBool(slider.dataset.dots),
            infinite: parseBool(slider.dataset.infinite),
            speed: parseInt(slider.dataset.speed, 500),
            slidesToShow: parseInt(slider.dataset.slidesToShow, 1),
            slidesToScroll: parseInt(slider.dataset.slidesToScroll, 1),
            fade: parseBool(slider.dataset.fade),
            centerMode: parseBool(slider.dataset.centerMode),
            adaptiveHeight: parseBool(slider.dataset.adaptiveHeight),
            pauseOnHover: parseBool(slider.dataset.pauseOnHover),
            swipe: parseBool(slider.dataset.swipe)
        };

        // Add responsive breakpoints if enabled
        if (parseBool(slider.dataset.responsiveEnabled)) {
            try {
                const responsive = JSON.parse(slider.dataset.responsive);
                console.log('Parsed responsive settings:', responsive);
                if (Array.isArray(responsive) && responsive.length > 0) {
                    options.responsive = responsive;
                }
            } catch (e) {
                console.error('Error parsing responsive settings:', e);
            }
        } else {
            console.log('Responsive mode is disabled for this slider');
        }

        // Initialize Slick
        try {
            console.log('Initializing slider', index, 'with options:', options);
            jQuery(slider).slick(options);
            console.log('Slider', index, 'initialized successfully');
        } catch (e) {
            console.error('Error initializing slider', index, ':', e);
        }
    });
});
