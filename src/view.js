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
        const parseInteger = (value, defaultValue) => {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? defaultValue : parsed;
        };

        // Log all data attributes
        console.log('Slider', index, 'data attributes:', slider.dataset);

        // Base options
        const options = {
            autoplay: parseBool(slider.dataset.autoplay),
            autoplaySpeed: parseInteger(slider.dataset.autoplaySpeed, 3000),
            arrows: parseBool(slider.dataset.arrows),
            dots: parseBool(slider.dataset.dots),
            infinite: parseBool(slider.dataset.infinite),
            speed: parseInteger(slider.dataset.speed, 500),
            slidesToShow: parseInteger(slider.dataset.slidesToShow, 1),
            slidesToScroll: parseInteger(slider.dataset.slidesToScroll, 1),
            fade: parseBool(slider.dataset.fade),
            centerMode: parseBool(slider.dataset.centerMode),
            adaptiveHeight: parseBool(slider.dataset.adaptiveHeight),
            pauseOnHover: parseBool(slider.dataset.pauseOnHover),
            swipe: parseBool(slider.dataset.swipe),
            responsive: null
        };

        // Add responsive breakpoints if enabled
        if (parseBool(slider.dataset.responsiveEnabled)) {
            try {
                const responsiveData = slider.dataset.responsive;
                if (responsiveData) {
                    options.responsive = JSON.parse(responsiveData);
                    console.log('Using responsive settings:', options.responsive);
                }
            } catch (e) {
                console.error('Error parsing responsive settings:', e);
            }
        }

        // Initialize Slick
        try {
            console.log('Initializing slider with options:', options);
            const $slider = jQuery(slider);
            
            // Destroy if already initialized
            if ($slider.hasClass('slick-initialized')) {
                $slider.slick('unslick');
            }
            
            // Initialize with options
            $slider.slick(options);
            console.log('Slider initialized successfully');
        } catch (e) {
            console.error('Error initializing slider:', e);
        }
    });
});
