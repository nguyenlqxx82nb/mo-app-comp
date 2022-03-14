"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const react_native_auto_height_image_1 = __importDefault(require("react-native-auto-height-image"));
//import GLOBALS from '../DataManagers/Globals.js';
const styles = react_native_1.StyleSheet.create({
    pageContainer: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        flex: 1,
        // margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    badgeContainer: {
        position: 'absolute',
        backgroundColor: mo_app_common_1.Color.primary,
        top: -10,
        right: -10,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeNumber: {
        color: '#fff',
        fontSize: 12,
    },
    badgeSolidContainer: {
        position: 'absolute',
        backgroundColor: mo_app_common_1.Color.red,
        top: -2,
        right: 2,
        width: 6,
        height: 6,
        borderRadius: 3,
    },
});
class ButtonRipple extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this._badge = 0;
        this.renderBadge = () => {
            const { badgeType, badge } = this.props;
            if (badgeType === 'number') {
                return (badge > 0) ?
                    <react_native_1.View style={[styles.badgeContainer]}><react_native_1.Text style={styles.badgeNumber}>{badge}</react_native_1.Text></react_native_1.View> : null;
            }
            else if (badgeType === 'solid') {
                return (badge > 0) ?
                    <react_native_1.View style={[styles.badgeSolidContainer]}/> : <react_native_1.View />;
            }
        };
        this.setIconType = (type) => {
            if (type === this._iconType) {
                return;
            }
            this._iconType = type;
            this.forceUpdate();
        };
        this.setIcon = (name, color) => {
            this.setState({ name: name, color: color });
        };
        this.updateBagde = (number) => {
            this.setState({ badgeNumber: number });
        };
        this.onPressHandler = () => {
            const { onPress } = this.props;
            setTimeout(() => {
                if (onPress) {
                    onPress();
                }
            }, 0);
        };
        this.onViewContainerLayout = (e) => {
            const width = e.nativeEvent.layout.width;
            const height = e.nativeEvent.layout.height;
            if (this._rippleView) {
                this._rippleView.setNativeProps({
                    style: {
                        top: height / 2 - width / 2,
                        left: 0,
                        width: width,
                        height: width,
                        borderRadius: width / 2,
                    },
                });
            }
            if (this.contentRef) {
                this.contentRef.setNativeProps({
                    style: {
                        width: width,
                        height: height
                    },
                });
            }
        };
        const { maxOpacity } = this.props;
        this._badge = this.props.badge;
        this.state = {
            containerSize: { width: 1, height: 1 },
            maxOpacity,
            scaleValue: new react_native_1.Animated.Value(0.01),
            opacityValue: new react_native_1.Animated.Value(0),
            status: this.props.status,
            badgeNumber: this.props.badge,
            name: this.props.name
        };
        this._iconType = this.props.iconType;
        this.renderRippleView = this.renderRippleView.bind(this);
        this.onPressedIn = this.onPressedIn.bind(this);
        this.onPressedOut = this.onPressedOut.bind(this);
        this.find_dimesions = this.find_dimesions.bind(this);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { name } = this.props;
        if (nextProps.name !== name) {
            this.setState({ name: nextProps.name });
        }
    }
    onPressedIn() {
        this.state.opacityValue.setValue(this.state.maxOpacity);
        react_native_1.Animated.timing(this.state.scaleValue, {
            toValue: 1,
            duration: 150,
            easing: react_native_1.Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: react_native_1.Platform.OS === 'android',
        }).start(() => {
        });
    }
    onPressedOut() {
        react_native_1.Animated.timing(this.state.opacityValue, {
            toValue: 0,
            useNativeDriver: react_native_1.Platform.OS === 'android',
        }).start(() => {
            this.state.scaleValue.setValue(0.01);
            this.state.opacityValue.setValue(0);
        });
    }
    renderRippleView() {
        const { color, width, height } = this.props;
        const { scaleValue, opacityValue } = this.state;
        let style = {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 5,
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
            backgroundColor: color,
        };
        if (width && height) {
            style = { ...style, ...{
                    top: height / 2 - width / 2,
                    left: 0,
                    width: width,
                    height: width,
                    borderRadius: width / 2,
                } };
        }
        return (<react_native_1.Animated.View ref={component => { this._rippleView = component; }} style={style}/>);
    }
    renderImageView() {
        const { size, iconSource, name1, vector, text, textStyle, color } = this.props;
        const { name } = this.state;
        // const iconSize = { width: size, height: size };
        var iconName = (this._iconType === 1) ? name : name1;
        var iconColor = color; //(this.props.status == GLOBALS.ICON_STATUS.ONLINE)?color:'#C0C0C0';
        if (text.content === '') {
            if (!vector) {
                return (<react_native_auto_height_image_1.default source={iconSource} width={size}/>);
            }
            else {
                return (<mo_app_common_1.CustomIcon ref={ref => (this._icon = ref)} name={iconName} size={size} style={{ color: iconColor }}/>);
            }
        }
        else {
            if (!vector) {
                if (text.layout === 1) {
                    return (<react_native_1.View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <react_native_auto_height_image_1.default source={iconSource} width={size}/>
                            <react_native_1.Text style={textStyle}>{text.content}</react_native_1.Text>
                        </react_native_1.View>);
                }
                else {
                    return (<react_native_1.View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <react_native_auto_height_image_1.default source={iconSource} width={size}/>
                            <react_native_1.Text style={textStyle}>{text.content}</react_native_1.Text>
                        </react_native_1.View>);
                }
            }
            else {
                if (name === '') {
                    return (<react_native_1.View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <react_native_1.Text style={textStyle}>{text.content}</react_native_1.Text>
                        </react_native_1.View>);
                }
                else {
                    if (text.layout === 1) {
                        return (<react_native_1.View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <mo_app_common_1.CustomIcon ref={ref => (this._icon = ref)} name={iconName} size={size} style={{ color: iconColor }}/>
                                <react_native_1.Text style={textStyle}>{text.content}</react_native_1.Text>
                            </react_native_1.View>);
                    }
                    else {
                        return (<react_native_1.View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <mo_app_common_1.CustomIcon ref={ref => (this._icon = ref)} name={iconName} size={size} style={{ color: iconColor }}/>
                                <react_native_1.Text style={textStyle}>{text.content}</react_native_1.Text>
                            </react_native_1.View>);
                    }
                }
            }
        }
    }
    render() {
        const { content, width, height, containerStyle } = this.props;
        if (content) {
            return (<react_native_1.View style={containerStyle} onLayout={this.onViewContainerLayout}>
                    <react_native_1.TouchableWithoutFeedback onPressIn={this.onPressedIn} onPressOut={this.onPressedOut} onPress={this.onPressHandler}>
                        <react_native_1.View ref={ref => { this.contentRef = ref; }} style={[styles.iconContainer, { width: width, height: height }]}>
                            {content}
                            {this.renderRippleView()}
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>
                </react_native_1.View>);
        }
        return (<react_native_1.View onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout); }} style={{ flex: 1 }}>
                <react_native_1.TouchableWithoutFeedback onPressIn={this.onPressedIn} onPressOut={this.onPressedOut} onPress={this.onPressHandler}>
                    <react_native_1.View style={[styles.iconContainer]}>
                        {this.renderRippleView()}
                        <react_native_1.View>
                            {this.renderImageView()}
                            {this.renderBadge()}
                        </react_native_1.View>
                    </react_native_1.View>
                </react_native_1.TouchableWithoutFeedback>
            </react_native_1.View>);
    }
    find_dimesions(layout) {
        const { fit } = this.props;
        const { width, height } = layout;
        let _size = Math.max(width, height);
        if (!fit) {
            this._rippleView.setNativeProps({
                style: {
                    top: (height - _size) / 2,
                    left: (width - _size) / 2,
                    width: _size,
                    height: _size,
                    borderRadius: _size / 2,
                },
            });
        }
        else {
            this._rippleView.setNativeProps({
                style: {
                    top: 0,
                    left: 0,
                    width: width,
                    height: height,
                    borderRadius: height / 2,
                }
            });
        }
    }
}
ButtonRipple.defaultProps = {
    badge: 0,
    badgeType: 'number',
    name1: '',
    iconType: 1,
    children: null,
    onPress: null,
    color: mo_app_common_1.Color.primary,
    underlayColor: null,
    square: true,
    size: 24,
    disabled: false,
    percent: 90,
    maxOpacity: 0.16,
    style: {},
    vector: true,
    textColor: '#fff',
    fit: false,
    status: true,
    text: {
        content: '',
        layout: 1,
    }
};
// ButtonRipple.propTypes = propTypes;
// ButtonRipple.defaultProps = defaultProps;
exports.default = ButtonRipple;
//# sourceMappingURL=ButtonRipple.js.map