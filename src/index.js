import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from '../block.json';
import './styles.scss';

registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: () => null,
});
