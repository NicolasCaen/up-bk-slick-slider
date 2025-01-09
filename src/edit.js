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
    SelectControl,
    TextControl,
    TabPanel,
    Notice
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const {
        slides,
        imageSource,
        gap,
        fixedHeight,
        slideHeight,
        objectFit,
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
        breakpoints,
        responsive,
        arrowType,
        arrowPosition
    } = attributes;

    const blockProps = useBlockProps();
    const [attachments, setAttachments] = useState([]);
    const [tabletPanelOpen, setTabletPanelOpen] = useState(false);
    const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(0);

    // Récupérer l'ID du post courant
    const postId = useSelect((select) => {
        const { getCurrentPostId } = select('core/editor');
        return getCurrentPostId();
    }, []);

    // Charger les images attachées au post
    useEffect(() => {
        if (postId) {
            apiFetch({
                path: `/wp/v2/media?parent=${postId}&per_page=100&media_type=image`,
            }).then((media) => {
                const images = media.map(item => ({
                    id: item.id,
                    url: item.source_url,
                    alt: item.alt_text || '',
                }));
                setAttachments(images);
            });
        }
    }, [postId]);

    // Mettre à jour les slides quand la source change
    useEffect(() => {
        if (imageSource === 'post' && attachments && attachments.length > 0) {
            setAttributes({ slides: attachments });
        }
    }, [imageSource, attachments]);

    const onSelectImages = (images) => {
        const newSlides = images.map(image => ({
            id: image.id,
            url: image.url,
            alt: image.alt || '',
        }));
        setAttributes({ slides: newSlides });
    };

    const updateBreakpointSetting = (device, field, value) => {
        const newBreakpoints = JSON.parse(JSON.stringify(breakpoints)); // Deep clone
        newBreakpoints[device].settings[field] = value;
        setAttributes({ breakpoints: newBreakpoints });
    };

    // Définition des types de flèches disponibles
    const arrowTypes = [
        { label: __('Type 1', 'up-bk-slick-slider'), value: 'type1' },
        { label: __('Type 2', 'up-bk-slick-slider'), value: 'type2' },
    ];

    // Définition des positions de flèches disponibles
    const arrowPositions = [
        { label: __('Outside', 'up-bk-slick-slider'), value: 'outside' },
        { label: __('Inside', 'up-bk-slick-slider'), value: 'inside' },
    ];

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Slider Content', 'up-bk-slick-slider')} initialOpen={true}>
                    <SelectControl
                        label={__('Image Source', 'up-bk-slick-slider')}
                        value={imageSource}
                        options={[
                            { label: __('Custom Gallery', 'up-bk-slick-slider'), value: 'gallery' },
                            { label: __('Post Images', 'up-bk-slick-slider'), value: 'post' },
                        ]}
                        onChange={(value) => setAttributes({ imageSource: value })}
                    />

                    {imageSource === 'gallery' && (
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
                    )}

                    {imageSource === 'post' && (
                        <>
                            {attachments && attachments.length > 0 ? (
                                <p>{__(`Using ${attachments.length} images uploaded to this post`, 'up-bk-slick-slider')}</p>
                            ) : (
                                <Notice status="info" isDismissible={false}>
                                    {__('No images uploaded to this post yet. Upload some images using the media library.', 'up-bk-slick-slider')}
                                </Notice>
                            )}
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Slide Dimensions', 'up-bk-slick-slider')} initialOpen={false}>
                    <ToggleControl
                        label={__('Fixed Height', 'up-bk-slick-slider')}
                        help={__('Enable to set a fixed height for all slides', 'up-bk-slick-slider')}
                        checked={fixedHeight}
                        onChange={(value) => setAttributes({ fixedHeight: value })}
                    />
                    {fixedHeight && (
                        <>
                            <TextControl
                                label={__('Slide Height', 'up-bk-slick-slider')}
                                help={__('Enter a value with unit (e.g., 400px, 50vh, etc.)', 'up-bk-slick-slider')}
                                value={slideHeight}
                                onChange={(value) => setAttributes({ slideHeight: value })}
                                placeholder="400px"
                            />
                            <SelectControl
                                label={__('Image Fit', 'up-bk-slick-slider')}
                                value={objectFit}
                                options={[
                                    { label: __('Cover - Fill the space', 'up-bk-slick-slider'), value: 'cover' },
                                    { label: __('Contain - Show entire image', 'up-bk-slick-slider'), value: 'contain' },
                                ]}
                                onChange={(value) => setAttributes({ objectFit: value })}
                                help={__('Choose how the image should fit within the slide', 'up-bk-slick-slider')}
                            />
                        </>
                    )}
                    <RangeControl
                        label={__('Gap between slides', 'up-bk-slick-slider')}
                        value={gap}
                        onChange={(value) => setAttributes({ gap: value })}
                        min={0}
                        max={300}
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
                </PanelBody>

                {arrows && (
                    <PanelBody 
                        title={__('Navigation', 'up-bk-slick-slider')}
                        initialOpen={false}
                    >
                        <SelectControl
                            label={__('Arrow Style', 'up-bk-slick-slider')}
                            value={arrowType}
                            options={arrowTypes}
                            onChange={(value) => setAttributes({ arrowType: value })}
                        />
                        <SelectControl
                            label={__('Arrow Position', 'up-bk-slick-slider')}
                            value={arrowPosition}
                            options={arrowPositions}
                            onChange={(value) => setAttributes({ arrowPosition: value })}
                        />
                    </PanelBody>
                )}

                <PanelBody title={__('Advanced Settings', 'up-bk-slick-slider')} initialOpen={false}>
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
                        max={8}
                        step={1}
                    />
                    <RangeControl
                        label={__('Slides to Scroll', 'up-bk-slick-slider')}
                        value={slidesToScroll}
                        onChange={(value) => setAttributes({ slidesToScroll: value })}
                        min={1}
                        max={8}
                        step={1}
                    />
                    <ToggleControl
                        label={__('Fade Effect', 'up-bk-slick-slider')}
                        checked={fade}
                        onChange={(value) => setAttributes({ fade: value })}
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

                <PanelBody title={__('Responsive Settings', 'up-bk-slick-slider')} initialOpen={false}>
                    <ToggleControl
                        label={__('Enable Responsive Mode', 'up-bk-slick-slider')}
                        checked={responsive}
                        onChange={(value) => setAttributes({ responsive: value })}
                    />

                    {responsive && (
                        <>
                            <PanelBody 
                                title={__('Tablet Settings (≤ 1024px)', 'up-bk-slick-slider')} 
                                initialOpen={tabletPanelOpen}
                                onToggle={() => setTabletPanelOpen(!tabletPanelOpen)}
                            >
                                <ToggleControl
                                    label={__('Fixed Height', 'up-bk-slick-slider')}
                                    checked={breakpoints.tablet.settings.fixedHeight}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'fixedHeight', value)}
                                />
                                {breakpoints.tablet.settings.fixedHeight && (
                                    <TextControl
                                        label={__('Slide Height', 'up-bk-slick-slider')}
                                        value={breakpoints.tablet.settings.slideHeight}
                                        onChange={(value) => updateBreakpointSetting('tablet', 'slideHeight', value)}
                                        help={__('Enter height with units (e.g., 400px, 50vh, var(--my-height))', 'up-bk-slick-slider')}
                                    />
                                )}
                                <SelectControl
                                    label={__('Object Fit', 'up-bk-slick-slider')}
                                    value={breakpoints.tablet.settings.objectFit}
                                    options={[
                                        { label: 'Cover', value: 'cover' },
                                        { label: 'Contain', value: 'contain' },
                                        { label: 'Fill', value: 'fill' },
                                        { label: 'None', value: 'none' },
                                    ]}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'objectFit', value)}
                                />
                                <RangeControl
                                    label={__('Gap between slides (px)', 'up-bk-slick-slider')}
                                    value={breakpoints.tablet.settings.gap}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'gap', value)}
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                                <RangeControl
                                    label={__('Slides to Show', 'up-bk-slick-slider')}
                                    value={breakpoints.tablet.settings.slidesToShow}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'slidesToShow', value)}
                                    min={1}
                                    max={10}
                                />
                                <RangeControl
                                    label={__('Slides to Scroll', 'up-bk-slick-slider')}
                                    value={breakpoints.tablet.settings.slidesToScroll}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'slidesToScroll', value)}
                                    min={1}
                                    max={10}
                                />
                                <ToggleControl
                                    label={__('Show Arrows', 'up-bk-slick-slider')}
                                    checked={breakpoints.tablet.settings.arrows}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'arrows', value)}
                                />
                                <ToggleControl
                                    label={__('Show Dots', 'up-bk-slick-slider')}
                                    checked={breakpoints.tablet.settings.dots}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'dots', value)}
                                />
                                <ToggleControl
                                    label={__('Autoplay', 'up-bk-slick-slider')}
                                    checked={breakpoints.tablet.settings.autoplay}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'autoplay', value)}
                                />
                                {breakpoints.tablet.settings.autoplay && (
                                    <RangeControl
                                        label={__('Autoplay Speed (ms)', 'up-bk-slick-slider')}
                                        value={breakpoints.tablet.settings.autoplaySpeed}
                                        onChange={(value) => updateBreakpointSetting('tablet', 'autoplaySpeed', value)}
                                        min={1000}
                                        max={10000}
                                        step={500}
                                    />
                                )}
                                <ToggleControl
                                    label={__('Infinite Loop', 'up-bk-slick-slider')}
                                    checked={breakpoints.tablet.settings.infinite}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'infinite', value)}
                                />
                                <RangeControl
                                    label={__('Animation Speed (ms)', 'up-bk-slick-slider')}
                                    value={breakpoints.tablet.settings.speed}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'speed', value)}
                                    min={100}
                                    max={3000}
                                    step={100}
                                />
                                <ToggleControl
                                    label={__('Fade Effect', 'up-bk-slick-slider')}
                                    checked={breakpoints.tablet.settings.fade}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'fade', value)}
                                />
                                <ToggleControl
                                    label={__('Center Mode', 'up-bk-slick-slider')}
                                    checked={breakpoints.tablet.settings.centerMode}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'centerMode', value)}
                                />
                                <ToggleControl
                                    label={__('Adaptive Height', 'up-bk-slick-slider')}
                                    checked={breakpoints.tablet.settings.adaptiveHeight}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'adaptiveHeight', value)}
                                />
                                <ToggleControl
                                    label={__('Pause on Hover', 'up-bk-slick-slider')}
                                    checked={breakpoints.tablet.settings.pauseOnHover}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'pauseOnHover', value)}
                                />
                                <ToggleControl
                                    label={__('Enable Swipe', 'up-bk-slick-slider')}
                                    checked={breakpoints.tablet.settings.swipe}
                                    onChange={(value) => updateBreakpointSetting('tablet', 'swipe', value)}
                                />
                            </PanelBody>

                            <PanelBody 
                                title={__('Mobile Settings (≤ 480px)', 'up-bk-slick-slider')} 
                                initialOpen={mobilePanelOpen}
                                onToggle={() => setMobilePanelOpen(!mobilePanelOpen)}
                            >
                                <ToggleControl
                                    label={__('Fixed Height', 'up-bk-slick-slider')}
                                    checked={breakpoints.mobile.settings.fixedHeight}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'fixedHeight', value)}
                                />
                                {breakpoints.mobile.settings.fixedHeight && (
                                    <TextControl
                                        label={__('Slide Height', 'up-bk-slick-slider')}
                                        value={breakpoints.mobile.settings.slideHeight}
                                        onChange={(value) => updateBreakpointSetting('mobile', 'slideHeight', value)}
                                        help={__('Enter height with units (e.g., 400px, 50vh, var(--my-height))', 'up-bk-slick-slider')}
                                    />
                                )}
                                <SelectControl
                                    label={__('Object Fit', 'up-bk-slick-slider')}
                                    value={breakpoints.mobile.settings.objectFit}
                                    options={[
                                        { label: 'Cover', value: 'cover' },
                                        { label: 'Contain', value: 'contain' },
                                        { label: 'Fill', value: 'fill' },
                                        { label: 'None', value: 'none' },
                                    ]}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'objectFit', value)}
                                />
                                <RangeControl
                                    label={__('Gap between slides (px)', 'up-bk-slick-slider')}
                                    value={breakpoints.mobile.settings.gap}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'gap', value)}
                                    min={0}
                                    max={100}
                                    step={1}
                                />
                                <RangeControl
                                    label={__('Slides to Show', 'up-bk-slick-slider')}
                                    value={breakpoints.mobile.settings.slidesToShow}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'slidesToShow', value)}
                                    min={1}
                                    max={10}
                                />
                                <RangeControl
                                    label={__('Slides to Scroll', 'up-bk-slick-slider')}
                                    value={breakpoints.mobile.settings.slidesToScroll}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'slidesToScroll', value)}
                                    min={1}
                                    max={10}
                                />
                                <ToggleControl
                                    label={__('Show Arrows', 'up-bk-slick-slider')}
                                    checked={breakpoints.mobile.settings.arrows}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'arrows', value)}
                                />
                                <ToggleControl
                                    label={__('Show Dots', 'up-bk-slick-slider')}
                                    checked={breakpoints.mobile.settings.dots}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'dots', value)}
                                />
                                <ToggleControl
                                    label={__('Autoplay', 'up-bk-slick-slider')}
                                    checked={breakpoints.mobile.settings.autoplay}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'autoplay', value)}
                                />
                                {breakpoints.mobile.settings.autoplay && (
                                    <RangeControl
                                        label={__('Autoplay Speed (ms)', 'up-bk-slick-slider')}
                                        value={breakpoints.mobile.settings.autoplaySpeed}
                                        onChange={(value) => updateBreakpointSetting('mobile', 'autoplaySpeed', value)}
                                        min={1000}
                                        max={10000}
                                        step={500}
                                    />
                                )}
                                <ToggleControl
                                    label={__('Infinite Loop', 'up-bk-slick-slider')}
                                    checked={breakpoints.mobile.settings.infinite}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'infinite', value)}
                                />
                                <RangeControl
                                    label={__('Animation Speed (ms)', 'up-bk-slick-slider')}
                                    value={breakpoints.mobile.settings.speed}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'speed', value)}
                                    min={100}
                                    max={3000}
                                    step={100}
                                />
                                <ToggleControl
                                    label={__('Fade Effect', 'up-bk-slick-slider')}
                                    checked={breakpoints.mobile.settings.fade}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'fade', value)}
                                />
                                <ToggleControl
                                    label={__('Center Mode', 'up-bk-slick-slider')}
                                    checked={breakpoints.mobile.settings.centerMode}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'centerMode', value)}
                                />
                                <ToggleControl
                                    label={__('Adaptive Height', 'up-bk-slick-slider')}
                                    checked={breakpoints.mobile.settings.adaptiveHeight}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'adaptiveHeight', value)}
                                />
                                <ToggleControl
                                    label={__('Pause on Hover', 'up-bk-slick-slider')}
                                    checked={breakpoints.mobile.settings.pauseOnHover}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'pauseOnHover', value)}
                                />
                                <ToggleControl
                                    label={__('Enable Swipe', 'up-bk-slick-slider')}
                                    checked={breakpoints.mobile.settings.swipe}
                                    onChange={(value) => updateBreakpointSetting('mobile', 'swipe', value)}
                                />
                            </PanelBody>
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div className="wp-block-up-bk-slick-slider-editor">
                {!slides.length ? (
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
