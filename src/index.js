import { registerBlockType, createBlock } from '@wordpress/blocks';
import Edit from './edit';
import metadata from '../block.json';
import './styles.scss';

registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: () => null,
    transforms: {
        from: [
            {
                type: 'block',
                blocks: ['core/gallery'],
                transform: (attributes = {}, innerBlocks = []) => {
                    // Newer gallery uses innerBlocks (core/image). Legacy used attributes.images
                    let images = [];
                    if (Array.isArray(innerBlocks) && innerBlocks.length) {
                        images = innerBlocks
                            .filter((b) => b.name === 'core/image')
                            .map((b) => ({ id: b.attributes.id, url: b.attributes.url, alt: b.attributes.alt || '' }))
                            .filter((img) => img.url);
                    } else if (Array.isArray(attributes.images)) {
                        images = attributes.images
                            .map((img) => ({ id: img.id, url: img.url, alt: img.alt || '' }))
                            .filter((img) => img.url);
                    }
                    return createBlock(
                        metadata.name,
                        { imageSource: 'gallery', slides: images }
                    );
                },
            },
        ],
        to: [
            {
                type: 'block',
                blocks: ['core/gallery'],
                transform: ({ slides = [] }) => {
                    const innerBlocks = (slides || [])
                        .filter((s) => s && s.url)
                        .map((s) => createBlock('core/image', { id: s.id, url: s.url, alt: s.alt || '' }));
                    return createBlock('core/gallery', {}, innerBlocks);
                },
            },
        ],
    },
});
