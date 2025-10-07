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

    const sliders = document.querySelectorAll('.wp-block-up-bk-slick-slider');
    
    if (sliders.length === 0) {
        console.log('No sliders found on page');
        return;
    }

    console.log('Found', sliders.length, 'slider(s)');

    // Fonction pour débouncer les appels
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    sliders.forEach(function (sliderWrapper, index) {
        const slider = sliderWrapper.querySelector('.slick-slider');
        const prevArrow = sliderWrapper.querySelector('.wp-block-up-bk-slick-slider__nav__arrow--prev');
        const nextArrow = sliderWrapper.querySelector('.wp-block-up-bk-slick-slider__nav__arrow--next');
        const dotsContainer = sliderWrapper.querySelector('.slick-dots');

        // Helper function to parse boolean attributes
        const parseBool = (value) => value === 'true';
        
        // Helper function to parse integer attributes
        const parseInteger = (value, defaultValue) => {
            const parsed = parseInt(value, 10);
            return isNaN(parsed) ? defaultValue : parsed;
        };

        // Log all data attributes
        console.log('Slider', index, 'data attributes:', slider.dataset);

        // Fonction pour gérer l'accessibilité des slides
        function updateSlideAccessibility($slider, currentSlide) {
            const slides = $slider[0].querySelectorAll('.slick-slide');
            slides.forEach((slide, index) => {
                // Supprimer aria-hidden qui est ajouté par Slick
                slide.removeAttribute('aria-hidden');
                
                if (index === currentSlide) {
                    // Slide actif
                    slide.inert = false;
                    slide.setAttribute('tabindex', '0');
                } else {
                    // Slides inactifs
                    slide.inert = true;
                    slide.setAttribute('tabindex', '-1');
                }
            });
        }

        // Fonction pour mettre à jour l'affichage des flèches
        function updateArrowsVisibility(settings) {
            if (settings && typeof settings.arrows !== 'undefined') {
                const showArrows = settings.arrows === true || settings.arrows === 'true';
                sliderWrapper.setAttribute('data-show-arrows', showArrows);
            }
        }

        // Fonction pour mettre à jour l'affichage des dots
        function updateDotsVisibility(settings) {
            if (settings && typeof settings.dots !== 'undefined') {
                const showDots = settings.dots === true || settings.dots === 'true';
                sliderWrapper.setAttribute('data-show-dots', showDots);
            }
        }

        // Fonction pour mettre à jour les options en fonction de la taille de l'écran
        function updateResponsiveSettings() {
            const $slider = jQuery(slider);
            if ($slider.hasClass('slick-initialized')) {
                const currentSettings = $slider.slick('slickGetOption', null);
                updateArrowsVisibility({
                    arrows: currentSettings.arrows
                });
                updateDotsVisibility({
                    dots: currentSettings.dots
                });
            }
        }

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
            accessibility: true,
            beforeChange: function(event, slick, currentSlide, nextSlide) {
                const $slider = jQuery(slick.$slider);
                updateSlideAccessibility($slider, nextSlide);
            },
            afterChange: function(event, slick, currentSlide) {
                const $slider = jQuery(slick.$slider);
                updateSlideAccessibility($slider, currentSlide);
            },
            init: function(slick) {
                const $slider = jQuery(slick.$slider);
                // Initialisation de l'accessibilité
                updateSlideAccessibility($slider, 0);
            }
        };

        // Initialiser l'affichage des flèches avec les options par défaut
        updateArrowsVisibility(options);
        // Initialiser l'affichage des dots avec les options par défaut
        updateDotsVisibility(options);

        // Add responsive breakpoints if enabled
        if (parseBool(slider.dataset.responsiveEnabled)) {
            try {
                const responsiveData = slider.dataset.responsive;
                if (responsiveData) {
                    const responsive = JSON.parse(responsiveData);
                    responsive.forEach(breakpoint => {
                        const originalSettings = breakpoint.settings;
                        breakpoint.settings = {
                            ...originalSettings,
                            onBreakpoint: function(breakpoint) {
                                const $slider = jQuery(slider);
                                // Mise à jour de l'affichage des flèches pour ce breakpoint
                                updateArrowsVisibility(originalSettings);
                                
                                if (originalSettings.fixedHeight !== undefined) {
                                    const $slider = jQuery(slider);
                                    if (originalSettings.fixedHeight) {
                                        $slider.addClass('fixed-height');
                                        slider.style.setProperty('--slide-height', originalSettings.slideHeight || 'auto');
                                    } else {
                                        $slider.removeClass('fixed-height');
                                        slider.style.removeProperty('--slide-height');
                                    }
                                }
                            }
                        };
                    });
                    options.responsive = responsive;
                }
            } catch (e) {
                console.error('Error parsing responsive settings:', e);
            }
        }

        // Initialize Slick
        try {
            const $slider = jQuery(slider);
            
            // Destroy if already initialized
            if ($slider.hasClass('slick-initialized')) {
                $slider.slick('unslick');
            }
            
            // Initialize with options
            $slider.slick(options);

            // Configuration initiale de l'accessibilité
            const slides = slider.querySelectorAll('.slick-slide');
            slides.forEach((slide, index) => {
                if (index === 0) {
                    slide.inert = false;
                    slide.setAttribute('tabindex', '0');
                } else {
                    slide.inert = true;
                    slide.setAttribute('tabindex', '-1');
                }
            });

            // Gestion initiale de fixed-height
            const currentSettings = $slider.slick('slickGetOption', null);
            if (currentSettings.fixedHeight) {
                $slider.addClass('fixed-height');
                slider.style.setProperty('--slide-height', currentSettings.slideHeight || 'auto');
            }

            // Observer pour supprimer aria-hidden ajouté par Slick
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
                        const currentSlide = $slider.slick('slickCurrentSlide');
                        updateSlideAccessibility($slider, currentSlide);
                    }
                });
            });

            // Observer tous les slides
            const slidesObserved = slider.querySelectorAll('.slick-slide');
            slidesObserved.forEach(slide => {
                observer.observe(slide, {
                    attributes: true,
                    attributeFilter: ['aria-hidden']
                });
            });

            // Ajouter les gestionnaires d'événements pour les flèches personnalisées
            if (prevArrow) {
                prevArrow.addEventListener('click', function() {
                    $slider.slick('slickPrev');
                });
            }
            
            if (nextArrow) {
                nextArrow.addEventListener('click', function() {
                    $slider.slick('slickNext');
                });
            }

            // Mettre à jour les variables CSS en fonction des breakpoints
            function updateResponsiveStyles() {
                const width = window.innerWidth;
                const slickObj = $slider.slick('getSlick');
                const responsive = slickObj.options.responsive || [];
                
                // Trouver les paramètres actuels en fonction du breakpoint
                let currentSettings = slickObj.options;
                for (let i = 0; i < responsive.length; i++) {
                    if (width <= responsive[i].breakpoint) {
                        currentSettings = responsive[i].settings;
                    }
                }

                // Appliquer les variables CSS
                if (currentSettings.cssVariables) {
                    Object.entries(currentSettings.cssVariables).forEach(([key, value]) => {
                        slider.style.setProperty(key, value);
                    });
                }
            }

            // Mettre à jour les styles au chargement
            updateResponsiveStyles();

            // Mettre à jour les styles lors des changements de breakpoint
            $slider.on('breakpoint', updateResponsiveStyles);

            console.log('Slider initialized successfully');

            // Mettre à jour l'affichage des flèches avec les paramètres actuels
            updateArrowsVisibility({
                arrows: $slider.slick('slickGetOption', 'arrows')
            });
            // Mettre à jour l'affichage des dots avec les paramètres actuels
            updateDotsVisibility({
                dots: $slider.slick('slickGetOption', 'dots')
            });

            // Ajouter un événement pour détecter les changements de breakpoint
            $slider.on('breakpoint', function(event, slick, breakpoint) {
                const currentSettings = $slider.slick('slickGetOption', null);
                updateArrowsVisibility({
                    arrows: currentSettings.arrows
                });
                updateDotsVisibility({
                    dots: currentSettings.dots
                });
            });

            // Ajouter l'événement resize avec debounce
            window.addEventListener('resize', debounce(updateResponsiveSettings, 250));

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
