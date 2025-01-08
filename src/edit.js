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
    Notice,
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const {
        slides,
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

    const blockProps = useBlockProps({
        className: 'wp-block-up-bk-slick-slider'
    });

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
                <PanelBody title={__('Slider Settings', 'up-bk-slick-slider')}>
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
                    {fade && (
                        <Notice status="info" isDismissible={false}>
                            {__('Fade effect only works with one slide at a time.', 'up-bk-slick-slider')}
                        </Notice>
                    )}
                    {!fade && (
                        <>
                            <RangeControl
                                label={__('Slides to Show', 'up-bk-slick-slider')}
                                value={slidesToShow}
                                onChange={(value) => {
                                    setAttributes({ 
                                        slidesToShow: value,
                                        slidesToScroll: Math.min(value, slidesToScroll)
                                    });
                                }}
                                min={1}
                                max={5}
                            />
                            <RangeControl
                                label={__('Slides to Scroll', 'up-bk-slick-slider')}
                                value={slidesToScroll}
                                onChange={(value) => setAttributes({ slidesToScroll: value })}
                                min={1}
                                max={Math.min(5, slidesToShow)}
                            />
                        </>
                    )}
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

            <div className="slick-slider-wrapper">
                {slides && slides.length > 0 ? (
                    <div className="slick-slider">
                        {slides.map((slide, index) => (
                            <div key={index} className="slick-slide">
                                <img
                                    src={slide.url}
                                    alt={slide.alt}
                                    className="slick-slide-image"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImages}
                            allowedTypes={['image']}
                            multiple
                            gallery
                            value={slides ? slides.map(slide => slide.id) : []}
                            render={({ open }) => (
                                <Button
                                    onClick={open}
                                    className="components-button is-primary"
                                >
                                    {__('Add Images', 'up-bk-slick-slider')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                )}
            </div>
        </div>
    );
}
