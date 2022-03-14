/**
 * react-native-swiper
 * @author leecade<leecade@163.com>
 */
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default class Slide extends PureComponent<any, any> {
    /**
     * Props Validation
     * @type {Object}
     */
    static propTypes: {
        horizontal: PropTypes.Requireable<boolean>;
        containerStyle: PropTypes.Requireable<number | object>;
        style: PropTypes.Requireable<number | object>;
        scrollViewStyle: PropTypes.Requireable<number | object>;
        pagingEnabled: PropTypes.Requireable<boolean>;
        showsHorizontalScrollIndicator: PropTypes.Requireable<boolean>;
        showsVerticalScrollIndicator: PropTypes.Requireable<boolean>;
        bounces: PropTypes.Requireable<boolean>;
        scrollsToTop: PropTypes.Requireable<boolean>;
        removeClippedSubviews: PropTypes.Requireable<boolean>;
        automaticallyAdjustContentInsets: PropTypes.Requireable<boolean>;
        showsPagination: PropTypes.Requireable<boolean>;
        showsButtons: PropTypes.Requireable<boolean>;
        disableNextButton: PropTypes.Requireable<boolean>;
        disablePrevButton: PropTypes.Requireable<boolean>;
        loadMinimal: PropTypes.Requireable<boolean>;
        loadMinimalSize: PropTypes.Requireable<number>;
        loadMinimalLoader: PropTypes.Requireable<PropTypes.ReactElementLike>;
        loop: PropTypes.Requireable<boolean>;
        autoplay: PropTypes.Requireable<boolean>;
        autoplayTimeout: PropTypes.Requireable<number>;
        autoplayDirection: PropTypes.Requireable<boolean>;
        index: PropTypes.Requireable<number>;
        renderPagination: PropTypes.Requireable<(...args: any[]) => any>;
        dotStyle: PropTypes.Requireable<number | object>;
        activeDotStyle: PropTypes.Requireable<number | object>;
        dotColor: PropTypes.Requireable<string>;
        activeDotColor: PropTypes.Requireable<string>;
        /**
         * Called when the index has changed because the user swiped.
         */
        onIndexChanged: PropTypes.Requireable<(...args: any[]) => any>;
    };
    /**
     * Default props
     * @return {object} props
     * @see http://facebook.github.io/react-native/docs/scrollview.html
     */
    static defaultProps: {
        horizontal: boolean;
        pagingEnabled: boolean;
        showsHorizontalScrollIndicator: boolean;
        showsVerticalScrollIndicator: boolean;
        bounces: boolean;
        scrollsToTop: boolean;
        removeClippedSubviews: boolean;
        automaticallyAdjustContentInsets: boolean;
        showsPagination: boolean;
        showsButtons: boolean;
        disableNextButton: boolean;
        disablePrevButton: boolean;
        loop: boolean;
        loadMinimal: boolean;
        loadMinimalSize: number;
        autoplay: boolean;
        autoplayTimeout: number;
        autoplayDirection: boolean;
        index: number;
        onIndexChanged: () => any;
    };
    /**
     * Init states
     * @return {object} states
     */
    /**
     * Initial render flag
     * @type {bool}
     */
    initialRender: boolean;
    /**
     * autoplay timer
     * @type {null}
     */
    autoplayTimer: any;
    loopJumpTimer: any;
    internals: any;
    scrollView: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    initState: (props: any, updateIndex?: boolean) => any;
    fullState(): any;
    onLayout: (event: any) => void;
    loopJump: () => void;
    /**
     * Automatic rolling
     */
    autoplay: () => void;
    /**
     * Scroll begin handle
     * @param  {object} e native event
     */
    onScrollBegin: (e: any) => void;
    /**
     * Scroll end handle
     * @param  {object} e native event
     */
    onScrollEnd: (e: any) => void;
    onScrollEndDrag: (e: any) => void;
    /**
     * Update index after scroll
     * @param  {object} offset content offset
     * @param  {string} dir    'x' || 'y'
     */
    updateIndex: (offset: any, dir: any, cb: any) => void;
    /**
     * Scroll by index
     * @param  {number} index offset index
     * @param  {bool} animated
     */
    scrollBy: (index: any, animated?: boolean) => void;
    /**
     * Scroll to index
     * @param  {number} index page
     * @param  {bool} animated
     */
    scrollTo: (index: any, animated?: boolean) => void;
    scrollViewPropOverrides: () => {};
    /**
     * Render pagination
     * @return {object} react-dom
     */
    renderPagination: () => JSX.Element;
    renderTitle: () => JSX.Element;
    renderNextButton: () => JSX.Element;
    renderPrevButton: () => JSX.Element;
    renderButtons: () => JSX.Element;
    refScrollView: (view: any) => void;
    onPageScrollStateChanged: (state: any) => void;
    renderScrollView: (pages: any) => JSX.Element;
    /**
     * Default render
     * @return {object} react-dom
     */
    render(): JSX.Element;
}
