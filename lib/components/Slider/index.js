"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_native_1 = require("react-native");
const DefaultMarker_1 = __importDefault(require("./DefaultMarker"));
const converters_1 = require("./converters");
const ViewPropTypes = require('react-native').ViewPropTypes; //|| View.propTypes;
class MultiSlider extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.startOne = () => {
            if (this.props.enabledOne) {
                this.props.onValuesChangeStart();
                this.setState({
                    onePressed: !this.state.onePressed,
                });
            }
        };
        this.startTwo = () => {
            if (this.props.enabledTwo) {
                this.props.onValuesChangeStart();
                this.setState({
                    twoPressed: !this.state.twoPressed,
                });
            }
        };
        this.moveOne = gestureState => {
            if (!this.props.enabledOne) {
                return;
            }
            //const unconfined = I18nManager.isRTL ? this.state.pastOne - gestureState.dx : gestureState.dx + this.state.pastOne;
            const unconfined = gestureState.dx + this.state.pastOne;
            var bottom = 0;
            var trueTop = this.state.positionTwo - (this.props.allowOverlap ? 0 : this.stepLength);
            var top = trueTop === 0 ? 0 : trueTop || this.props.sliderLength;
            var confined = unconfined < bottom
                ? bottom
                : unconfined > top ? top : unconfined;
            var slipDisplacement = this.props.touchDimensions.slipDisplacement;
            if (Math.abs(gestureState.dy) < slipDisplacement || !slipDisplacement) {
                var value = converters_1.positionToValue(confined, this.optionsArray, this.props.sliderLength);
                var snapped = converters_1.valueToPosition(value, this.optionsArray, this.props.sliderLength);
                this.setState({
                    positionOne: this.props.snapped ? snapped : confined,
                });
                if (value !== this.state.valueOne) {
                    this.setState({
                        valueOne: value,
                    }, () => {
                        var change = [this.state.valueOne];
                        if (this.state.valueTwo) {
                            change.push(this.state.valueTwo);
                        }
                        this.props.onValuesChange(change);
                    });
                }
            }
        };
        this.moveTwo = gestureState => {
            if (!this.props.enabledTwo) {
                return;
            }
            const unconfined = gestureState.dx + this.state.pastTwo; // I18nManager.isRTL ? this.state.pastTwo - gestureState.dx : gestureState.dx + this.state.pastTwo;
            var bottom = this.state.positionOne + (this.props.allowOverlap ? 0 : this.stepLength);
            var top = this.props.sliderLength;
            var confined = unconfined < bottom
                ? bottom
                : unconfined > top ? top : unconfined;
            var slipDisplacement = this.props.touchDimensions.slipDisplacement;
            if (Math.abs(gestureState.dy) < slipDisplacement || !slipDisplacement) {
                var value = converters_1.positionToValue(confined, this.optionsArray, this.props.sliderLength);
                var snapped = converters_1.valueToPosition(value, this.optionsArray, this.props.sliderLength);
                this.setState({
                    positionTwo: this.props.snapped ? snapped : confined,
                });
                if (value !== this.state.valueTwo) {
                    this.setState({
                        valueTwo: value,
                    }, () => {
                        this.props.onValuesChange([this.state.valueOne, this.state.valueTwo]);
                    });
                }
            }
        };
        this.endOne = gestureState => {
            if (gestureState.moveX === 0 && this.props.onToggleOne) {
                this.props.onToggleOne();
                return;
            }
            this.setState({
                pastOne: this.state.positionOne,
                onePressed: !this.state.onePressed,
            }, () => {
                var change = [this.state.valueOne];
                if (this.state.valueTwo) {
                    change.push(this.state.valueTwo);
                }
                this.props.onValuesChangeFinish(change);
            });
        };
        this.endTwo = gestureState => {
            if (gestureState.moveX === 0 && this.props.onToggleTwo) {
                this.props.onToggleTwo();
                return;
            }
            this.setState({
                twoPressed: !this.state.twoPressed,
                pastTwo: this.state.positionTwo,
            }, () => {
                this.props.onValuesChangeFinish([
                    this.state.valueOne,
                    this.state.valueTwo,
                ]);
            });
        };
        this.optionsArray = this.props.optionsArray ||
            converters_1.createArray(this.props.min, this.props.max, this.props.step);
        this.stepLength = this.props.sliderLength / this.optionsArray.length;
        var initialValues = this.props.values.map(value => converters_1.valueToPosition(value, this.optionsArray, this.props.sliderLength));
        this.state = {
            pressedOne: true,
            valueOne: this.props.values[0],
            valueTwo: this.props.values[1],
            pastOne: initialValues[0],
            pastTwo: initialValues[1],
            positionOne: initialValues[0],
            positionTwo: initialValues[1],
        };
    }
    UNSAFE_componentWillMount() {
        var customPanResponder = (start, move, end) => {
            return react_native_1.PanResponder.create({
                onStartShouldSetPanResponder: (_evt, _gestureState) => true,
                onStartShouldSetPanResponderCapture: (_evt, _gestureState) => true,
                onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
                onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => true,
                onPanResponderGrant: (_evt, _gestureState) => start(),
                onPanResponderMove: (_evt, gestureState) => move(gestureState),
                onPanResponderTerminationRequest: (_evt, _gestureState) => false,
                onPanResponderRelease: (_evt, gestureState) => end(gestureState),
                onPanResponderTerminate: (_evt, gestureState) => end(gestureState),
                onShouldBlockNativeResponder: (_evt, _gestureState) => true,
            });
        };
        this._panResponderOne = customPanResponder(this.startOne, this.moveOne, this.endOne);
        this._panResponderTwo = customPanResponder(this.startTwo, this.moveTwo, this.endTwo);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.onePressed || this.state.twoPressed) {
            return;
        }
        let nextState = {};
        if (nextProps.min !== this.props.min ||
            nextProps.max !== this.props.max ||
            nextProps.values[0] !== this.state.valueOne ||
            nextProps.sliderLength !== this.props.sliderLength ||
            nextProps.values[1] !== this.state.valueTwo ||
            (nextProps.sliderLength !== this.props.sliderLength &&
                nextProps.values[1])) {
            this.optionsArray = this.props.optionsArray ||
                converters_1.createArray(nextProps.min, nextProps.max, nextProps.step);
            this.stepLength = this.props.sliderLength / this.optionsArray.length;
            var positionOne = converters_1.valueToPosition(nextProps.values[0], this.optionsArray, nextProps.sliderLength);
            nextState.valueOne = nextProps.values[0];
            nextState.pastOne = positionOne;
            nextState.positionOne = positionOne;
            var positionTwo = converters_1.valueToPosition(nextProps.values[1], this.optionsArray, nextProps.sliderLength);
            nextState.valueTwo = nextProps.values[1];
            nextState.pastTwo = positionTwo;
            nextState.positionTwo = positionTwo;
        }
        if (nextState !== {}) {
            this.setState(nextState);
        }
    }
    render() {
        const { positionOne, positionTwo } = this.state;
        const { selectedStyle, unselectedStyle, sliderLength, markerOffsetX, markerOffsetY } = this.props;
        const twoMarkers = this.props.values.length === 2; // when allowOverlap, positionTwo could be 0, identified as string '0' and throwing 'RawText 0 needs to be wrapped in <Text>' error
        const trackOneLength = positionOne;
        const trackOneStyle = twoMarkers
            ? unselectedStyle
            : selectedStyle;
        const trackThreeLength = twoMarkers ? sliderLength - positionTwo : 0;
        const trackThreeStyle = unselectedStyle;
        const trackTwoLength = sliderLength - trackOneLength - trackThreeLength;
        const trackTwoStyle = twoMarkers
            ? selectedStyle
            : unselectedStyle;
        const Marker = this.props.customMarker;
        const MarkerLeft = this.props.customMarkerLeft;
        const MarkerRight = this.props.customMarkerRight;
        const isMarkersSeparated = this.props.isMarkersSeparated || false;
        const { 
        // slipDisplacement,
        // height,
        // width,
        borderRadius, } = this.props.touchDimensions;
        const touchStyle = {
            borderRadius: borderRadius || 0,
        };
        const markerContainerOne = { top: markerOffsetY - 24 + 5, left: trackOneLength + markerOffsetX - 24 };
        const markerContainerTwo = { top: markerOffsetY - 24 + 5, right: trackThreeLength + markerOffsetX - 24 };
        return (<react_native_1.View style={[styles.container, this.props.containerStyle]}>
        <react_native_1.View style={[styles.fullTrack, { width: sliderLength }]}>
          <react_native_1.View style={[
            styles.track,
            this.props.trackStyle,
            trackOneStyle,
            { width: trackOneLength },
        ]}/>
          <react_native_1.View style={[
            styles.track,
            this.props.trackStyle,
            trackTwoStyle,
            { width: trackTwoLength },
        ]}/>
          {twoMarkers &&
            <react_native_1.View style={[
                styles.track,
                this.props.trackStyle,
                trackThreeStyle,
                { width: trackThreeLength },
            ]}/>}
          <react_native_1.View style={[
            styles.markerContainer,
            markerContainerOne,
            this.props.markerContainerStyle,
            positionOne > sliderLength / 2 && styles.topMarkerContainer,
        ]}>
            <react_native_1.View style={[styles.touch, touchStyle]} ref={component => { this._markerOne = component; }} {...this._panResponderOne.panHandlers}>
                {isMarkersSeparated === false ?
            <Marker enabled={this.props.enabledOne} pressed={this.state.onePressed} markerStyle={[styles.marker, this.props.markerStyle]} pressedMarkerStyle={this.props.pressedMarkerStyle} currentValue={this.state.valueOne} valuePrefix={this.props.valuePrefix} valueSuffix={this.props.valueSuffix}/>
            :
                <MarkerLeft enabled={this.props.enabledOne} pressed={this.state.onePressed} markerStyle={[styles.marker, this.props.markerStyle]} pressedMarkerStyle={this.props.pressedMarkerStyle} currentValue={this.state.valueOne} valuePrefix={this.props.valuePrefix} valueSuffix={this.props.valueSuffix}/>}

            </react_native_1.View>
          </react_native_1.View>
          {twoMarkers &&
            positionOne !== this.props.sliderLength &&
            <react_native_1.View style={[styles.markerContainer, markerContainerTwo, this.props.markerContainerStyle]}>
            <react_native_1.View style={[styles.touch, touchStyle]} ref={component => { this._markerTwo = component; }} {...this._panResponderTwo.panHandlers}>
                {isMarkersSeparated === false ?
                <Marker pressed={this.state.twoPressed} markerStyle={this.props.markerStyle} pressedMarkerStyle={this.props.pressedMarkerStyle} currentValue={this.state.valueTwo} enabled={this.props.enabledTwo} valuePrefix={this.props.valuePrefix} valueSuffix={this.props.valueSuffix}/>
                :
                    <MarkerRight pressed={this.state.twoPressed} markerStyle={this.props.markerStyle} pressedMarkerStyle={this.props.pressedMarkerStyle} currentValue={this.state.valueTwo} enabled={this.props.enabledTwo} valuePrefix={this.props.valuePrefix} valueSuffix={this.props.valueSuffix}/>}
            </react_native_1.View>
          </react_native_1.View>}
        </react_native_1.View>
      </react_native_1.View>);
    }
}
exports.default = MultiSlider;
MultiSlider.propTypes = {
    values: prop_types_1.default.arrayOf(prop_types_1.default.number),
    onValuesChangeStart: prop_types_1.default.func,
    onValuesChange: prop_types_1.default.func,
    onValuesChangeFinish: prop_types_1.default.func,
    sliderLength: prop_types_1.default.number,
    touchDimensions: prop_types_1.default.object,
    customMarker: prop_types_1.default.func,
    customMarkerLeft: prop_types_1.default.func,
    customMarkerRight: prop_types_1.default.func,
    isMarkersSeparated: prop_types_1.default.bool,
    min: prop_types_1.default.number,
    max: prop_types_1.default.number,
    step: prop_types_1.default.number,
    optionsArray: prop_types_1.default.array,
    containerStyle: ViewPropTypes.style,
    trackStyle: ViewPropTypes.style,
    selectedStyle: ViewPropTypes.style,
    unselectedStyle: ViewPropTypes.style,
    markerContainerStyle: ViewPropTypes.style,
    markerStyle: ViewPropTypes.style,
    pressedMarkerStyle: ViewPropTypes.style,
    valuePrefix: prop_types_1.default.string,
    valueSuffix: prop_types_1.default.string,
    enabledOne: prop_types_1.default.bool,
    enabledTwo: prop_types_1.default.bool,
    onToggleOne: prop_types_1.default.func,
    onToggleTwo: prop_types_1.default.func,
    allowOverlap: prop_types_1.default.bool,
    snapped: prop_types_1.default.bool,
    markerOffsetX: prop_types_1.default.number,
    markerOffsetY: prop_types_1.default.number,
};
MultiSlider.defaultProps = {
    values: [0],
    onValuesChangeStart: () => {
    },
    onValuesChange: (_values) => {
    },
    onValuesChangeFinish: (_values) => {
    },
    step: 1,
    min: 0,
    max: 10,
    touchDimensions: {
        height: 50,
        width: 50,
        borderRadius: 15,
        slipDisplacement: 200,
    },
    customMarker: DefaultMarker_1.default,
    customMarkerLeft: DefaultMarker_1.default,
    customMarkerRight: DefaultMarker_1.default,
    markerOffsetX: 0,
    markerOffsetY: 0,
    sliderLength: 280,
    onToggleOne: undefined,
    onToggleTwo: undefined,
    enabledOne: true,
    enabledTwo: true,
    allowOverlap: false,
    snapped: false,
};
const styles = react_native_1.StyleSheet.create({
    container: {
        position: 'relative',
        height: 50,
        justifyContent: 'center',
    },
    fullTrack: {
        flexDirection: 'row',
    },
    track: {},
    marker: {},
    // selectedTrack: {
    //   ...Platform.select({
    //     ios: {
    //       backgroundColor: '#095FFF',
    //     },
    //     android: {
    //       backgroundColor: '#0D8675',
    //     },
    //   }),
    // },
    markerContainer: {
        position: 'absolute',
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topMarkerContainer: {
        zIndex: 1,
    },
    touch: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
});
//# sourceMappingURL=index.js.map