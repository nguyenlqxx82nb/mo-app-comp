"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * react-native-swiper
 * @author leecade<leecade@163.com>
 */
const react_1 = __importStar(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_native_1 = require("react-native");
/**
 * Default styles
 * @type {StyleSheetPropType}
 */
const styles = {
    container: {
        backgroundColor: 'transparent',
        position: 'relative',
        flex: 1
    },
    wrapperIOS: {
        backgroundColor: 'transparent'
    },
    wrapperAndroid: {
        backgroundColor: 'transparent',
        flex: 1
    },
    slide: {
        backgroundColor: 'transparent'
    },
    pagination_x: {
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    pagination_y: {
        position: 'absolute',
        right: 15,
        top: 0,
        bottom: 0,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    title: {
        height: 30,
        justifyContent: 'center',
        position: 'absolute',
        paddingLeft: 10,
        bottom: -30,
        left: 0,
        flexWrap: 'nowrap',
        width: 250,
        backgroundColor: 'transparent'
    },
    buttonWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 50,
        color: '#007aff'
    }
};
// missing `module.exports = exports['default'];` with babel6
// export default React.createClass({
class Slide extends react_1.PureComponent {
    constructor(props) {
        super(props);
        /**
         * Init states
         * @return {object} states
         */
        ///state = this.initState(this.props)
        /**
         * Initial render flag
         * @type {bool}
         */
        this.initialRender = true;
        /**
         * autoplay timer
         * @type {null}
         */
        this.autoplayTimer = null;
        this.loopJumpTimer = null;
        // UNSAFE_componentWillUpdate(nextProps, nextState) {
        //   // If the index has changed, we notify the parent via the onIndexChanged callback
        //   if (this.state.index !== nextState.index)
        //     {this.props.onIndexChanged(nextState.index);}
        // }
        // componentDidUpdate(prevProps) {
        //   // If autoplay props updated to true, autoplay immediately
        //   if (this.props.autoplay && !prevProps.autoplay) {
        //     this.autoplay();
        //   }
        //   if (this.props.children !== prevProps.children) {
        //     if (this.props.loadMinimal && Platform.OS === 'ios') {
        //       this.setState({ ...this.props, index: this.state.index });
        //     } else {
        //       this.setState(
        //         this.initState({ ...this.props, index: this.state.index }, true)
        //       );
        //     }
        //   }
        // }
        this.initState = (props, updateIndex = false) => {
            // set the current state
            const state = this.state || { width: 0, height: 0, offset: { x: 0, y: 0 } };
            const initState = {
                autoplayEnd: false,
                children: null,
                loopJump: false,
                offset: {}
            };
            // Support Optional render page
            initState.children = Array.isArray(props.children)
                ? props.children.filter(child => child)
                : props.children;
            // console.log('initState children length ', initState.children.length);
            initState.total = initState.children ? initState.children.length || 1 : 0;
            // console.log('initState ', initState);
            if (state.total === initState.total && !updateIndex) {
                // retain the index
                initState.index = state.index;
            }
            else {
                initState.index =
                    initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0;
            }
            // Default: horizontal
            const { width, height } = react_native_1.Dimensions.get('window');
            initState.dir = props.horizontal === false ? 'y' : 'x';
            if (props.width) {
                initState.width = props.width;
            }
            else if (this.state && this.state.width) {
                initState.width = this.state.width;
            }
            else {
                initState.width = width;
            }
            if (props.height) {
                initState.height = props.height;
            }
            else if (this.state && this.state.height) {
                initState.height = this.state.height;
            }
            else {
                initState.height = height;
            }
            initState.offset[initState.dir] =
                initState.dir === 'y' ? height * props.index : width * props.index;
            this.internals = {
                ...this.internals,
                isScrolling: false
            };
            return initState;
        };
        this.onLayout = event => {
            const { width, height } = event.nativeEvent.layout;
            const offset = (this.internals.offset = {});
            const state = { width, height };
            if (this.state.total > 1) {
                let setup = this.state.index;
                if (this.props.loop) {
                    setup++;
                }
                offset[this.state.dir] =
                    this.state.dir === 'y' ? height * setup : width * setup;
            }
            // only update the offset in state if needed, updating offset while swiping
            // causes some bad jumping / stuttering
            if (!this.state.offset) {
                state.offset = offset;
            }
            // related to https://github.com/leecade/react-native-swiper/issues/570
            // contentOffset is not working in react 0.48.x so we need to use scrollTo
            // to emulate offset.
            if (this.initialRender && this.state.total > 1) {
                this.scrollView.scrollTo({ ...offset, animated: false });
                this.initialRender = false;
            }
            this.setState(state);
        };
        this.loopJump = () => {
            if (!this.state.loopJump) {
                return;
            }
            const i = this.state.index + (this.props.loop ? 1 : 0);
            const scrollView = this.scrollView;
            this.loopJumpTimer = setTimeout(() => {
                if (scrollView.setPageWithoutAnimation) {
                    scrollView.setPageWithoutAnimation(i);
                }
                else {
                    if (this.state.index === 0) {
                        scrollView.scrollTo(this.props.horizontal === false
                            ? { x: 0, y: this.state.height, animated: false }
                            : { x: this.state.width, y: 0, animated: false });
                    }
                    else if (this.state.index === this.state.total - 1) {
                        this.props.horizontal === false
                            ? this.scrollView.scrollTo({
                                x: 0,
                                y: this.state.height * this.state.total,
                                animated: false
                            })
                            : this.scrollView.scrollTo({
                                x: this.state.width * this.state.total,
                                y: 0,
                                animated: false
                            });
                    }
                }
            }, 
            // Important Parameter
            // ViewPager 50ms, ScrollView 300ms
            scrollView.setPageWithoutAnimation ? 50 : 300);
        };
        /**
         * Automatic rolling
         */
        this.autoplay = () => {
            if (!Array.isArray(this.state.children) ||
                !this.props.autoplay ||
                this.internals.isScrolling ||
                this.state.autoplayEnd) {
                return;
            }
            this.autoplayTimer && clearTimeout(this.autoplayTimer);
            this.autoplayTimer = setTimeout(() => {
                if (!this.props.loop &&
                    (this.props.autoplayDirection
                        ? this.state.index === this.state.total - 1
                        : this.state.index === 0)) {
                    return this.setState({ autoplayEnd: true });
                }
                this.scrollBy(this.props.autoplayDirection ? 1 : -1);
            }, this.props.autoplayTimeout * 1000);
        };
        /**
         * Scroll begin handle
         * @param  {object} e native event
         */
        this.onScrollBegin = e => {
            // update scroll state
            this.internals.isScrolling = true;
            this.props.onScrollBeginDrag &&
                this.props.onScrollBeginDrag(e, this.fullState(), this);
        };
        /**
         * Scroll end handle
         * @param  {object} e native event
         */
        this.onScrollEnd = e => {
            // update scroll state
            this.internals.isScrolling = false;
            // making our events coming from android compatible to updateIndex logic
            if (!e.nativeEvent.contentOffset) {
                if (this.state.dir === 'x') {
                    e.nativeEvent.contentOffset = {
                        x: e.nativeEvent.position * this.state.width
                    };
                }
                else {
                    e.nativeEvent.contentOffset = {
                        y: e.nativeEvent.position * this.state.height
                    };
                }
            }
            this.updateIndex(e.nativeEvent.contentOffset, this.state.dir, () => {
                this.autoplay();
                this.loopJump();
            });
            // if `onMomentumScrollEnd` registered will be called here
            this.props.onMomentumScrollEnd &&
                this.props.onMomentumScrollEnd(e, this.fullState(), this);
        };
        /*
         * Drag end handle
         * @param {object} e native event
         */
        this.onScrollEndDrag = e => {
            const { contentOffset } = e.nativeEvent;
            const { horizontal } = this.props;
            const { children, index } = this.state;
            const { offset } = this.internals;
            const previousOffset = horizontal ? offset.x : offset.y;
            const newOffset = horizontal ? contentOffset.x : contentOffset.y;
            if (previousOffset === newOffset &&
                (index === 0 || index === children.length - 1)) {
                this.internals.isScrolling = false;
            }
        };
        /**
         * Update index after scroll
         * @param  {object} offset content offset
         * @param  {string} dir    'x' || 'y'
         */
        this.updateIndex = (offset, dir, cb) => {
            const { onIndexChanged } = this.props;
            const state = this.state;
            // Android ScrollView will not scrollTo certain offset when props change
            let index = state.index;
            if (!this.internals.offset) 
            // Android not setting this onLayout first? https://github.com/leecade/react-native-swiper/issues/582
            {
                this.internals.offset = {};
            }
            const diff = offset[dir] - this.internals.offset[dir];
            const step = dir === 'x' ? state.width : state.height;
            let loopJump = false;
            // Do nothing if offset no change.
            if (!diff) {
                return;
            }
            // Note: if touch very very quickly and continuous,
            // the variation of `index` more than 1.
            // parseInt() ensures it's always an integer
            index = parseInt(index + Math.round(diff / step));
            if (onIndexChanged) {
                onIndexChanged(index);
            }
            if (this.props.loop) {
                if (index <= -1) {
                    index = state.total - 1;
                    offset[dir] = step * state.total;
                    loopJump = true;
                }
                else if (index >= state.total) {
                    index = 0;
                    offset[dir] = step;
                    loopJump = true;
                }
            }
            const newState = {};
            newState.index = index;
            newState.loopJump = loopJump;
            this.internals.offset = offset;
            // only update offset in state if loopJump is true
            if (loopJump) {
                // when swiping to the beginning of a looping set for the third time,
                // the new offset will be the same as the last one set in state.
                // Setting the offset to the same thing will not do anything,
                // so we increment it by 1 then immediately set it to what it should be,
                // after render.
                if (offset[dir] === this.internals.offset[dir]) {
                    newState.offset = { x: 0, y: 0 };
                    newState.offset[dir] = offset[dir] + 1;
                    this.setState(newState, () => {
                        this.setState({ offset: offset }, cb);
                    });
                }
                else {
                    newState.offset = offset;
                    this.setState(newState, cb);
                }
            }
            else {
                this.setState(newState, cb);
            }
        };
        /**
         * Scroll by index
         * @param  {number} index offset index
         * @param  {bool} animated
         */
        this.scrollBy = (index, animated = true) => {
            if (this.internals.isScrolling || this.state.total < 2) {
                return;
            }
            // console.log('scrollBy ', index, this.state.total);
            const state = this.state;
            const diff = (this.props.loop ? 1 : 0) + index + this.state.index;
            let x = 0;
            let y = 0;
            if (state.dir === 'x') {
                x = diff * state.width;
            }
            if (state.dir === 'y') {
                y = diff * state.height;
            }
            this.scrollView.scrollTo({ x, y, animated });
            // update scroll state
            this.internals.isScrolling = true;
            this.setState({
                autoplayEnd: false
            });
            // trigger onScrollEnd manually in android
            if (!animated || react_native_1.Platform.OS !== 'ios') {
                setImmediate(() => {
                    this.onScrollEnd({
                        nativeEvent: {
                            position: diff
                        }
                    });
                });
            }
        };
        /**
         * Scroll to index
         * @param  {number} index page
         * @param  {bool} animated
         */
        this.scrollTo = (index, animated = true) => {
            if (this.internals.isScrolling ||
                this.state.total < 2 ||
                index == this.state.index) {
                return;
            }
            const state = this.state;
            const diff = this.state.index + (index - this.state.index);
            let x = 0;
            let y = 0;
            if (state.dir === 'x') {
                x = diff * state.width;
            }
            if (state.dir === 'y') {
                y = diff * state.height;
            }
            this.scrollView && this.scrollView.scrollTo({ x, y, animated });
            // update scroll state
            this.internals.isScrolling = true;
            this.setState({
                autoplayEnd: false
            });
            // trigger onScrollEnd manually in android
            if (!animated || react_native_1.Platform.OS !== 'ios') {
                setImmediate(() => {
                    this.onScrollEnd({
                        nativeEvent: {
                            position: diff
                        }
                    });
                });
            }
        };
        this.scrollViewPropOverrides = () => {
            const props = this.props;
            let overrides = {};
            /*
            const scrollResponders = [
              'onMomentumScrollBegin',
              'onTouchStartCapture',
              'onTouchStart',
              'onTouchEnd',
              'onResponderRelease',
            ]
            */
            for (let prop in props) {
                // if(~scrollResponders.indexOf(prop)
                if (typeof props[prop] === 'function' &&
                    prop !== 'onMomentumScrollEnd' &&
                    prop !== 'renderPagination' &&
                    prop !== 'onScrollBeginDrag') {
                    let originResponder = props[prop];
                    overrides[prop] = e => originResponder(e, this.fullState(), this);
                }
            }
            return overrides;
        };
        /**
         * Render pagination
         * @return {object} react-dom
         */
        this.renderPagination = () => {
            // By default, dots only show when `total` >= 2
            if (this.state.total <= 1) {
                return null;
            }
            let dots = [];
            const ActiveDot = this.props.activeDot || (<react_native_1.View style={[
                {
                    backgroundColor: this.props.activeDotColor || '#007aff',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3
                },
                this.props.activeDotStyle
            ]}/>);
            const Dot = this.props.dot || (<react_native_1.View style={[
                {
                    backgroundColor: this.props.dotColor || 'rgba(0,0,0,.2)',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3
                },
                this.props.dotStyle
            ]}/>);
            for (let i = 0; i < this.state.total; i++) {
                dots.push(i === this.state.index
                    ? react_1.default.cloneElement(ActiveDot, { key: i })
                    : react_1.default.cloneElement(Dot, { key: i }));
            }
            return (<react_native_1.View pointerEvents="none" style={[
                styles['pagination_' + this.state.dir],
                this.props.paginationStyle
            ]}>
        {dots}
      </react_native_1.View>);
        };
        this.renderTitle = () => {
            const child = this.state.children[this.state.index];
            const title = child && child.props && child.props.title;
            const titleStyle = styles.title;
            return title ? (<react_native_1.View style={titleStyle}>
        {this.state.children[this.state.index].props.title}
      </react_native_1.View>) : null;
        };
        this.renderNextButton = () => {
            let button = null;
            if (this.props.loop || this.state.index !== this.state.total - 1) {
                button = this.props.nextButton || <react_native_1.Text style={styles.buttonText}>›</react_native_1.Text>;
            }
            return (<react_native_1.TouchableOpacity onPress={() => button !== null && this.scrollBy(1)} disabled={this.props.disableNextButton}>
        <react_native_1.View>{button}</react_native_1.View>
      </react_native_1.TouchableOpacity>);
        };
        this.renderPrevButton = () => {
            let button = null;
            if (this.props.loop || this.state.index !== 0) {
                button = this.props.prevButton || <react_native_1.Text style={styles.buttonText}>‹</react_native_1.Text>;
            }
            return (<react_native_1.TouchableOpacity onPress={() => button !== null && this.scrollBy(-1)} disabled={this.props.disablePrevButton}>
        <react_native_1.View>{button}</react_native_1.View>
      </react_native_1.TouchableOpacity>);
        };
        this.renderButtons = () => {
            return (<react_native_1.View pointerEvents="box-none" style={[
                styles.buttonWrapper,
                {
                    width: this.state.width,
                    height: this.state.height
                },
                this.props.buttonWrapperStyle
            ]}>
        {this.renderPrevButton()}
        {this.renderNextButton()}
      </react_native_1.View>);
        };
        this.refScrollView = view => {
            this.scrollView = view;
        };
        this.onPageScrollStateChanged = state => {
            switch (state) {
                case 'dragging':
                    return this.onScrollBegin(undefined);
                case 'idle':
                case 'settling':
                    if (this.props.onTouchEnd) {
                        this.props.onTouchEnd();
                    }
            }
        };
        this.renderScrollView = pages => {
            return (<react_native_1.ScrollView ref={this.refScrollView} {...this.props} {...this.scrollViewPropOverrides()} contentContainerStyle={[styles.wrapperIOS, this.props.style]} contentOffset={this.state.offset} onScrollBeginDrag={this.onScrollBegin} onMomentumScrollEnd={this.onScrollEnd} onScrollEndDrag={this.onScrollEndDrag} style={this.props.scrollViewStyle}>
        {pages}
      </react_native_1.ScrollView>);
        };
        this.state = this.initState({ ...props, index: 0 }, true);
    }
    componentDidMount() {
        // this.state = this.initState({ ...this.props, index: 0 }, true);
        this.autoplay();
    }
    componentWillUnmount() {
        this.autoplayTimer && clearTimeout(this.autoplayTimer);
        this.loopJumpTimer && clearTimeout(this.loopJumpTimer);
    }
    // include internals with state
    fullState() {
        return Object.assign({}, this.state, this.internals);
    }
    /**
     * Default render
     * @return {object} react-dom
     */
    render() {
        const { index, total, width, height, children } = this.state;
        const { containerStyle, loop, loadMinimal, loadMinimalSize, loadMinimalLoader, renderPagination, showsButtons, showsPagination } = this.props;
        // let dir = state.dir
        // let key = 0
        const loopVal = loop ? 1 : 0;
        let pages = [];
        const pageStyle = [{ width: width, height: height }, styles.slide];
        const pageStyleLoading = {
            width,
            height,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        };
        // For make infinite at least total > 1
        if (total > 1) {
            // Re-design a loop model for avoid img flickering
            pages = Object.keys(children);
            if (loop) {
                pages.unshift(total - 1 + '');
                pages.push('0');
            }
            pages = pages.map((page, i) => {
                if (loadMinimal) {
                    if ((i >= index + loopVal - loadMinimalSize &&
                        i <= index + loopVal + loadMinimalSize) ||
                        // The real first swiper should be keep
                        (loop && i === 1) ||
                        // The real last swiper should be keep
                        (loop && i === total - 1)) {
                        return (<react_native_1.View style={pageStyle} key={i}>
                {children[page]}
              </react_native_1.View>);
                    }
                    else {
                        return (<react_native_1.View style={pageStyleLoading} key={i}>
                {loadMinimalLoader ? loadMinimalLoader : <react_native_1.ActivityIndicator />}
              </react_native_1.View>);
                    }
                }
                else {
                    return (<react_native_1.View style={pageStyle} key={i}>
              {children[page]}
            </react_native_1.View>);
                }
            });
        }
        else {
            pages = (<react_native_1.View style={pageStyle} key={0}>
          {children}
        </react_native_1.View>);
        }
        return (<react_native_1.View style={[styles.container, containerStyle]} onLayout={this.onLayout}>
        {this.renderScrollView(pages)}
        {showsPagination &&
            (renderPagination
                ? renderPagination(index, total, this)
                : this.renderPagination())}
        {this.renderTitle()}
        {showsButtons && this.renderButtons()}
      </react_native_1.View>);
    }
}
exports.default = Slide;
/**
 * Props Validation
 * @type {Object}
 */
Slide.propTypes = {
    horizontal: prop_types_1.default.bool,
    // children: PropTypes.node.isRequired,
    containerStyle: prop_types_1.default.oneOfType([prop_types_1.default.object, prop_types_1.default.number]),
    style: prop_types_1.default.oneOfType([
        prop_types_1.default.object,
        prop_types_1.default.number,
        prop_types_1.default.array
    ]),
    scrollViewStyle: prop_types_1.default.oneOfType([prop_types_1.default.object, prop_types_1.default.number]),
    pagingEnabled: prop_types_1.default.bool,
    showsHorizontalScrollIndicator: prop_types_1.default.bool,
    showsVerticalScrollIndicator: prop_types_1.default.bool,
    bounces: prop_types_1.default.bool,
    scrollsToTop: prop_types_1.default.bool,
    removeClippedSubviews: prop_types_1.default.bool,
    automaticallyAdjustContentInsets: prop_types_1.default.bool,
    showsPagination: prop_types_1.default.bool,
    showsButtons: prop_types_1.default.bool,
    disableNextButton: prop_types_1.default.bool,
    disablePrevButton: prop_types_1.default.bool,
    loadMinimal: prop_types_1.default.bool,
    loadMinimalSize: prop_types_1.default.number,
    loadMinimalLoader: prop_types_1.default.element,
    loop: prop_types_1.default.bool,
    autoplay: prop_types_1.default.bool,
    autoplayTimeout: prop_types_1.default.number,
    autoplayDirection: prop_types_1.default.bool,
    index: prop_types_1.default.number,
    renderPagination: prop_types_1.default.func,
    dotStyle: prop_types_1.default.oneOfType([
        prop_types_1.default.object,
        prop_types_1.default.number,
        prop_types_1.default.array
    ]),
    activeDotStyle: prop_types_1.default.oneOfType([
        prop_types_1.default.object,
        prop_types_1.default.number,
        prop_types_1.default.array
    ]),
    dotColor: prop_types_1.default.string,
    activeDotColor: prop_types_1.default.string,
    /**
     * Called when the index has changed because the user swiped.
     */
    onIndexChanged: prop_types_1.default.func
};
/**
 * Default props
 * @return {object} props
 * @see http://facebook.github.io/react-native/docs/scrollview.html
 */
Slide.defaultProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    scrollsToTop: false,
    removeClippedSubviews: true,
    automaticallyAdjustContentInsets: false,
    showsPagination: true,
    showsButtons: false,
    disableNextButton: false,
    disablePrevButton: false,
    loop: true,
    loadMinimal: false,
    loadMinimalSize: 1,
    autoplay: false,
    autoplayTimeout: 2.5,
    autoplayDirection: true,
    index: 0,
    onIndexChanged: () => null
};
//# sourceMappingURL=index.js.map