/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './styles.scss';
import Edit from './edit';
import metadata from '../block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(metadata.name, {
    ...metadata,
    title: __('UP Slick Slider', 'up-bk-slick-slider'),
    description: __('Create beautiful sliders using Slick JS', 'up-bk-slick-slider'),
    edit: Edit,
    save: () => null, // Dynamic block, render handled by PHP
});
