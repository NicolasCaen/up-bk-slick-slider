/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './styles.scss';
import Edit from './edit';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType('up-bk/slick-slider', {
    apiVersion: 3,
    title: __('UP Slick Slider', 'up-bk-slick-slider'),
    description: __('Add a beautiful slider to your content.', 'up-bk-slick-slider'),
    category: 'media',
    icon: 'slides',
    supports: {
        html: false,
        align: ['wide', 'full']
    },
    attributes: {
        slides: {
            type: 'array',
            default: []
        },
        imageSource: {
            type: 'string',
            default: 'upload'
        },
        gap: {
            type: 'number',
            default: 10
        },
        fixedHeight: {
            type: 'boolean',
            default: false
        },
        slideHeight: {
            type: 'string',
            default: '400px'
        },
        objectFit: {
            type: 'string',
            default: 'cover'
        },
        autoplay: {
            type: 'boolean',
            default: true
        },
        autoplaySpeed: {
            type: 'number',
            default: 3000
        },
        arrows: {
            type: 'boolean',
            default: true
        },
        arrowType: {
            type: 'string',
            default: 'type1'
        },
        arrowPosition: {
            type: 'string',
            default: 'center'
        },
        dots: {
            type: 'boolean',
            default: true
        },
        infinite: {
            type: 'boolean',
            default: true
        },
        speed: {
            type: 'number',
            default: 500
        },
        slidesToShow: {
            type: 'number',
            default: 1
        },
        slidesToScroll: {
            type: 'number',
            default: 1
        },
        fade: {
            type: 'boolean',
            default: false
        },
        centerMode: {
            type: 'boolean',
            default: false
        },
        adaptiveHeight: {
            type: 'boolean',
            default: false
        },
        pauseOnHover: {
            type: 'boolean',
            default: true
        },
        swipe: {
            type: 'boolean',
            default: true
        },
        responsive: {
            type: 'boolean',
            default: true
        },
        breakpoints: {
            type: 'object',
            default: {
                tablet: {
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        dots: true,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        infinite: true,
                        speed: 500,
                        fade: false,
                        centerMode: false,
                        adaptiveHeight: false,
                        pauseOnHover: true,
                        swipe: true,
                        fixedHeight: false,
                        slideHeight: '400px',
                        objectFit: 'cover',
                        gap: 10
                    }
                },
                mobile: {
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        infinite: true,
                        speed: 500,
                        fade: false,
                        centerMode: false,
                        adaptiveHeight: false,
                        pauseOnHover: true,
                        swipe: true,
                        fixedHeight: false,
                        slideHeight: '300px',
                        objectFit: 'cover',
                        gap: 5
                    }
                }
            }
        }
    },
    edit: Edit,
    save: () => null // Dynamic block, render handled by PHP
});
