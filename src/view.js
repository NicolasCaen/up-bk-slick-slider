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

    // Function to update CSS variables based on screen width
    function updateResponsiveStyles() {
        const sliders = document.querySelectorAll('.slick-slider');
        const width = window.innerWidth;

        sliders.forEach(slider => {
            const slickData = jQuery(slider).data('slick') || {};
            const responsive = slickData.responsive || [];
            
            // Find the current breakpoint settings
            let currentSettings = null;
            for (let i = 0; i < responsive.length; i++) {
                if (width <= responsive[i].breakpoint) {
                    currentSettings = responsive[i].settings;
                }
            }

            // Get the container element
            const container = slider.closest('.wp-block-up-bk-slick-slider');
            if (!container) return;

            if (width <= 480) {
                // Mobile styles
                const mobileSettings = responsive.find(r => r.breakpoint === 480)?.settings || {};
                if (mobileSettings.fixedHeight) {
                    slider.style.height = mobileSettings.slideHeight || '';
                    container.querySelectorAll('.slick-slide-item').forEach(item => {
                        item.style.height = mobileSettings.slideHeight || '';
                    });
                }
                container.querySelectorAll('.slick-slide-item img').forEach(img => {
                    img.style.objectFit = mobileSettings.objectFit || slider.style.getPropertyValue('--desktop-object-fit') || 'cover';
                });
                slider.style.setProperty('--gap', `${mobileSettings.gap || 0}px`);
            } else if (width <= 1024) {
                // Tablet styles
                const tabletSettings = responsive.find(r => r.breakpoint === 1024)?.settings || {};
                if (tabletSettings.fixedHeight) {
                    slider.style.height = tabletSettings.slideHeight || '';
                    container.querySelectorAll('.slick-slide-item').forEach(item => {
                        item.style.height = tabletSettings.slideHeight || '';
                    });
                }
                container.querySelectorAll('.slick-slide-item img').forEach(img => {
                    img.style.objectFit = tabletSettings.objectFit || slider.style.getPropertyValue('--desktop-object-fit') || 'cover';
                });
                slider.style.setProperty('--gap', `${tabletSettings.gap || 0}px`);
            } else {
                // Desktop styles - reset to default values
                const defaultGap = slider.style.getPropertyValue('--desktop-gap') || '0px';
                const defaultObjectFit = slider.style.getPropertyValue('--desktop-object-fit') || 'cover';
                const defaultHeight = slider.getAttribute('data-default-height') || '';

                slider.style.setProperty('--gap', defaultGap);
                if (defaultHeight) {
                    slider.style.height = defaultHeight;
                    container.querySelectorAll('.slick-slide-item').forEach(item => {
                        item.style.height = defaultHeight;
                    });
                }
                container.querySelectorAll('.slick-slide-item img').forEach(img => {
                    img.style.objectFit = defaultObjectFit;
                });
            }

            // Update slider
            const $jSlider = jQuery(slider);
            if ($jSlider.hasClass('slick-initialized')) {
                $jSlider.slick('setPosition');
            }
        });
    }

    // Store initial height as data attribute
    document.querySelectorAll('.slick-slider').forEach(slider => {
        const height = slider.style.height;
        if (height) {
            slider.setAttribute('data-default-height', height);
        }
    });

    // Update styles on load and resize
    updateResponsiveStyles();
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateResponsiveStyles, 250);
    });
});
