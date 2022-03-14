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
const react_1 = __importStar(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../index");
const react_native_status_bar_height_1 = require("react-native-status-bar-height");
class WrapModal extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.onKeyboardShowHandler = (e) => {
            if (!this.isOpen) {
                return false;
            }
            const { position, showPos } = this.props;
            const keyboardHeight = mo_app_common_1.Constants.Height - e.endCoordinates.screenY;
            const offset = (position === 'bottom' && showPos !== 'center') ? keyboardHeight : 100;
            this.scrollTop(-1 * offset);
        };
        this.onKeyboardHideHandler = () => {
            this.scrollToOrigin();
        };
        this.onBackAndroidHandler = () => {
            this.close();
            return false;
        };
        this.init = () => {
            setTimeout(() => {
                const { autoOpen } = this.props;
                if (autoOpen) {
                    this.setState({ isOpen: true });
                    this.show();
                }
            }, 0);
        };
        this.close = () => {
            const { overlayOpacityAnim } = this.state;
            const { onClose } = this.props;
            this.isOpen = false;
            react_native_1.Animated.timing(overlayOpacityAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(_finish => {
                this.setState({ isOpen: false });
                if (onClose) {
                    onClose();
                }
                setTimeout(() => {
                    mo_app_common_1.Constants.ModalShowing = false;
                    react_native_1.DeviceEventEmitter.emit(mo_app_common_1.Constants.EmitCode.PopModal);
                }, 100);
            });
            this.hideContent();
        };
        this.scrollTop = (offsetTop) => {
            const { topAnim } = this.state;
            react_native_1.Animated.timing(topAnim, {
                toValue: this.currentTop + offsetTop,
                duration: 50,
                useNativeDriver: true,
            }).start();
        };
        this.scrollToOrigin = () => {
            const { topAnim } = this.state;
            react_native_1.Animated.timing(topAnim, {
                toValue: this.currentTop,
                duration: 50,
                useNativeDriver: true,
            }).start();
        };
        this.onContentLayoutHandler = (e) => {
            if (e && e.nativeEvent) {
                this.contentHeight = e.nativeEvent.layout.height;
                this.showContent();
            }
        };
        this.onOverlayPressHandler = () => {
            const { overlayClose } = this.props;
            // console.log('onOverlayPressHandler ', overlayClose);
            if (overlayClose) {
                this.close();
            }
        };
        const { contentHeight, position } = this.props;
        this.contentHeight = 0;
        const top = position === 'bottom' ? mo_app_common_1.Constants.Height : position === 'top' ? -1 * mo_app_common_1.Constants.Height : (mo_app_common_1.Constants.Height - contentHeight) / 2;
        this.state = {
            contentHeight: contentHeight,
            backdropOpacity: 0,
            isOpen: false,
            overlayOpacityAnim: new react_native_1.Animated.Value(0),
            contentOpacityAnim: new react_native_1.Animated.Value(0),
            topAnim: new react_native_1.Animated.Value(top),
            scaleAnim: new react_native_1.Animated.Value(position === 'center' ? 0.7 : 1)
        };
    }
    componentDidMount() {
        if (react_native_1.Platform.OS === 'android') {
            react_native_1.BackHandler.addEventListener('hardwareBackPress', this.onBackAndroidHandler);
        }
        if (react_native_1.Platform.OS === 'ios') {
            react_native_1.Keyboard.addListener('keyboardDidShow', this.onKeyboardShowHandler);
            react_native_1.Keyboard.addListener('keyboardWillHide', this.onKeyboardHideHandler);
        }
        else {
            react_native_1.Keyboard.addListener('keyboardDidShow', this.onKeyboardShowHandler);
            react_native_1.Keyboard.addListener('keyboardDidHide', this.onKeyboardHideHandler);
        }
        this.init();
    }
    componentWillUnmount() {
        if (react_native_1.Platform.OS === 'android') {
            react_native_1.BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroidHandler);
        }
        // Keyboard.removeListener('keyboardWillShow', this.onKeyboardShowHandler);
        react_native_1.Keyboard.removeListener('keyboardWillHide', this.onKeyboardHideHandler);
        react_native_1.Keyboard.removeListener('keyboardDidShow', this.onKeyboardShowHandler);
        react_native_1.Keyboard.removeListener('keyboardDidHide', this.onKeyboardHideHandler);
    }
    show() {
        const { overlayOpacity } = this.props;
        const { overlayOpacityAnim } = this.state;
        this.isOpen = true;
        // overlay animate
        react_native_1.Animated.timing(overlayOpacityAnim, {
            toValue: overlayOpacity,
            duration: 150,
            useNativeDriver: true,
        }).start();
    }
    showContent() {
        const { position, showPos, onShowCompleted } = this.props;
        const { topAnim, contentOpacityAnim, scaleAnim } = this.state;
        if (position === 'center') {
            this.currentTop = (mo_app_common_1.Constants.Height - this.contentHeight) / 2;
            topAnim.setValue(this.currentTop);
            react_native_1.Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                if (onShowCompleted) {
                    onShowCompleted();
                }
            });
        }
        if (position === 'bottom') {
            this.currentTop = showPos === 'center' ? (mo_app_common_1.Constants.Height - this.contentHeight) / 2 : mo_app_common_1.Constants.Height - this.contentHeight;
            react_native_1.Animated.timing(topAnim, {
                toValue: this.currentTop,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                if (onShowCompleted) {
                    onShowCompleted();
                }
            });
        }
        if (position === 'top') {
            react_native_1.Animated.timing(topAnim, {
                toValue: (mo_app_common_1.Constants.Height - this.contentHeight) / 2,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                if (onShowCompleted) {
                    onShowCompleted();
                }
            });
        }
        react_native_1.Animated.timing(contentOpacityAnim, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
        }).start();
    }
    hideContent() {
        const { position } = this.props;
        const { topAnim, contentOpacityAnim, scaleAnim } = this.state;
        // Animated.timing(topAnim , {
        //   toValue: 3 * Constants.Height / 4,
        //   duration: 0,
        //   useNativeDriver: true,
        // }).start();
        if (position === 'bottom') {
            react_native_1.Animated.timing(topAnim, {
                toValue: mo_app_common_1.Constants.Height,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
        if (position === 'top') {
            react_native_1.Animated.timing(topAnim, {
                toValue: -1 * mo_app_common_1.Constants.Height / 2,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
        if (position === 'canter') {
            react_native_1.Animated.timing(scaleAnim, {
                toValue: 0.2,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
        react_native_1.Animated.timing(contentOpacityAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }
    render() {
        const { children, hasCloseButton } = this.props;
        const { isOpen, overlayOpacityAnim, topAnim, contentOpacityAnim, contentHeight } = this.state;
        const transformContentStyle = {
            transform: [{
                    translateY: topAnim,
                }]
        };
        const contentStyle = contentHeight ? { height: contentHeight } : {};
        if (!isOpen) {
            return <react_native_1.View />;
        }
        return (<react_native_1.View style={styles.container} ref={comp => (this.modalRef = comp)}>

        <react_native_1.TouchableWithoutFeedback onPress={this.onOverlayPressHandler}>
          <react_native_1.Animated.View style={[styles.overlayContainer, { opacity: overlayOpacityAnim }]}/>
        </react_native_1.TouchableWithoutFeedback>

        <react_native_1.Animated.View onLayout={this.onContentLayoutHandler} style={[styles.contentContainer, contentStyle, transformContentStyle, { opacity: contentOpacityAnim }]}>
          {children}
        </react_native_1.Animated.View>
        {hasCloseButton &&
            <react_native_1.View style={styles.buttonBack}>
                <index_1.ButtonRipple name={'close'} size={20} color={'#fff'} onPress={() => {
                this.close();
            }}/>
            </react_native_1.View>}
      </react_native_1.View>);
    }
}
exports.default = WrapModal;
WrapModal.propTypes = {
    containerStyle: prop_types_1.default.object,
    isOpen: prop_types_1.default.bool,
    backDropClose: prop_types_1.default.bool,
    overlayOpacity: prop_types_1.default.number,
    autoOpen: prop_types_1.default.bool,
    contentHeight: prop_types_1.default.number,
    showPos: prop_types_1.default.string,
    position: prop_types_1.default.string,
    hasCloseButton: prop_types_1.default.bool,
    overlayClose: prop_types_1.default.bool,
};
WrapModal.defaultProps = {
    containerStyle: {},
    isOpen: false,
    backDropClose: true,
    autoOpen: false,
    contentHeight: 0,
    overlayOpacity: 0.75,
    position: 'center',
    showPos: 'bottom',
    hasCloseButton: false,
    overlayClose: true
};
const styles = react_native_1.StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: mo_app_common_1.Device.ToolbarHeight
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000'
    },
    contentContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBack: {
        position: 'absolute',
        top: react_native_status_bar_height_1.getStatusBarHeight() + 5,
        left: 5,
        width: 40,
        height: 40
    },
});
//# sourceMappingURL=WrapModal.js.map