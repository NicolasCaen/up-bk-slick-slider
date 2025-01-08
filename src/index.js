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
    title: __('UP Slick Slider', 'up-bk-slick-slider'),
    description: __('Create beautiful sliders using Slick JS', 'up-bk-slick-slider'),
    category: 'media',
    icon: 'slides',
    supports: {
        html: false,
        align: ['wide', 'full'],
        color: {
            background: true,
            text: true,
            gradients: true
        },
        spacing: {
            padding: true,
            margin: true
        }
    },
    edit: Edit,
    save: () => null // Dynamic block, render handled by PHP
});
