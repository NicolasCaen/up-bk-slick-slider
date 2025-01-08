import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    ToggleControl,
    RangeControl,
    TextControl,
    Notice,
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const {
        slides,
        gap,
        fixedHeight,
        slideHeight,
        autoplay,
        autoplaySpeed,
        arrows,
        dots,
        infinite,
        speed,
        slidesToShow,
        slidesToScroll,
        fade,
        centerMode,
        adaptiveHeight,
        pauseOnHover,
        swipe,
    } = attributes;

    const blockProps = useBlockProps();

    const onSelectImages = (images) => {
        const newSlides = images.map(image => ({
            id: image.id,
            url: image.url,
            alt: image.alt || '',
        }));
        setAttributes({ slides: newSlides });
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Slider Content', 'up-bk-slick-slider')} initialOpen={true}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImages}
                            allowedTypes={['image']}
                            multiple={true}
                            gallery={true}
                            value={slides.map(img => img.id)}
                            render={({ open }) => (
                                <Button
                                    onClick={open}
                                    variant="primary"
                                    className="editor-post-featured-image__toggle"
                                >
                                    {slides.length > 0
                                        ? __('Edit Gallery', 'up-bk-slick-slider')
                                        : __('Add Images', 'up-bk-slick-slider')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                </PanelBody>

                <PanelBody title={__('Slide Dimensions', 'up-bk-slick-slider')} initialOpen={false}>
                    <ToggleControl
                        label={__('Fixed Height', 'up-bk-slick-slider')}
                        help={__('Enable to set a fixed height for all slides', 'up-bk-slick-slider')}
                        checked={fixedHeight}
                        onChange={(value) => setAttributes({ fixedHeight: value })}
                    />
                    {fixedHeight && (
                        <TextControl
                            label={__('Slide Height', 'up-bk-slick-slider')}
                            help={__('Enter a value with unit (e.g., 400px, 50vh, etc.)', 'up-bk-slick-slider')}
                            value={slideHeight}
                            onChange={(value) => setAttributes({ slideHeight: value })}
                            placeholder="400px"
                        />
                    )}
                    <RangeControl
                        label={__('Gap between slides', 'up-bk-slick-slider')}
                        value={gap}
                        onChange={(value) => setAttributes({ gap: value })}
                        min={0}
                        max={100}
                        step={1}
                    />
                </PanelBody>

                <PanelBody title={__('Slider Settings', 'up-bk-slick-slider')} initialOpen={false}>
                    <ToggleControl
                        label={__('Autoplay', 'up-bk-slick-slider')}
                        checked={autoplay}
                        onChange={(value) => setAttributes({ autoplay: value })}
                    />
                    {autoplay && (
                        <RangeControl
                            label={__('Autoplay Speed (ms)', 'up-bk-slick-slider')}
                            value={autoplaySpeed}
                            onChange={(value) => setAttributes({ autoplaySpeed: value })}
                            min={1000}
                            max={10000}
                            step={500}
                        />
                    )}
                    <ToggleControl
                        label={__('Show Arrows', 'up-bk-slick-slider')}
                        checked={arrows}
                        onChange={(value) => setAttributes({ arrows: value })}
                    />
                    <ToggleControl
                        label={__('Show Dots', 'up-bk-slick-slider')}
                        checked={dots}
                        onChange={(value) => setAttributes({ dots: value })}
                    />
                    <ToggleControl
                        label={__('Infinite Loop', 'up-bk-slick-slider')}
                        checked={infinite}
                        onChange={(value) => setAttributes({ infinite: value })}
                    />
                    <RangeControl
                        label={__('Animation Speed (ms)', 'up-bk-slick-slider')}
                        value={speed}
                        onChange={(value) => setAttributes({ speed: value })}
                        min={100}
                        max={3000}
                        step={100}
                    />
                    <RangeControl
                        label={__('Slides to Show', 'up-bk-slick-slider')}
                        value={slidesToShow}
                        onChange={(value) => setAttributes({ slidesToShow: value })}
                        min={1}
                        max={6}
                        step={1}
                    />
                    <RangeControl
                        label={__('Slides to Scroll', 'up-bk-slick-slider')}
                        value={slidesToScroll}
                        onChange={(value) => setAttributes({ slidesToScroll: value })}
                        min={1}
                        max={6}
                        step={1}
                    />
                    <ToggleControl
                        label={__('Fade Effect', 'up-bk-slick-slider')}
                        checked={fade}
                        onChange={(value) => {
                            if (value) {
                                setAttributes({ 
                                    fade: value,
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                });
                            } else {
                                setAttributes({ fade: value });
                            }
                        }}
                    />
                    <ToggleControl
                        label={__('Center Mode', 'up-bk-slick-slider')}
                        checked={centerMode}
                        onChange={(value) => setAttributes({ centerMode: value })}
                    />
                    <ToggleControl
                        label={__('Adaptive Height', 'up-bk-slick-slider')}
                        checked={adaptiveHeight}
                        onChange={(value) => setAttributes({ adaptiveHeight: value })}
                    />
                    <ToggleControl
                        label={__('Pause on Hover', 'up-bk-slick-slider')}
                        checked={pauseOnHover}
                        onChange={(value) => setAttributes({ pauseOnHover: value })}
                    />
                    <ToggleControl
                        label={__('Enable Swipe', 'up-bk-slick-slider')}
                        checked={swipe}
                        onChange={(value) => setAttributes({ swipe: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div className="wp-block-up-bk-slick-slider-editor">
                {slides.length === 0 ? (
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImages}
                            allowedTypes={['image']}
                            multiple={true}
                            gallery={true}
                            value={[]}
                            render={({ open }) => (
                                <Button
                                    onClick={open}
                                    variant="primary"
                                    className="editor-post-featured-image__toggle"
                                >
                                    {__('Add Images', 'up-bk-slick-slider')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                ) : (
                    <div className="slider-preview">
                        {slides.map((slide, index) => (
                            <div key={index} className="slider-preview-item">
                                <img
                                    src={slide.url}
                                    alt={slide.alt}
                                />
                            </div>
                        ))}
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectImages}
                                allowedTypes={['image']}
                                multiple={true}
                                gallery={true}
                                value={slides.map(img => img.id)}
                                render={({ open }) => (
                                    <Button
                                        onClick={open}
                                        variant="secondary"
                                        className="edit-gallery-button"
                                    >
                                        {__('Edit Gallery', 'up-bk-slick-slider')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </div>
                )}
            </div>
        </div>
    );
}
