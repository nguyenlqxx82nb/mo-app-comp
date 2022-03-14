"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapButton = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../index");
;
class WrapButton extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.setEnable = (enable) => {
            this.setState({ enable: enable });
        };
        this.setType = (type) => {
            this.setState({ type: type });
        };
        this.getTextSize = () => {
            const { size } = this.props;
            if (size === 's') {
                return { fontSize: 12, lineHeight: 14 };
            }
            if (size === 'm') {
                return { fontSize: 16, lineHeight: 20 };
            }
            if (size === 'l') {
                return { fontSize: 18, lineHeight: 22 };
            }
        };
        this.setLoadingStatus = (loading) => {
            this.setState({ loading: loading });
        };
        this.onPressHandler = () => {
            const { loading } = this.state;
            const { onPress } = this.props;
            if (!loading) {
                onPress();
            }
        };
        const { enable, type, loading } = this.props;
        this.state = {
            enable: enable,
            type: type,
            loading: loading
        };
    }
    componentDidMount() {
    }
    render() {
        const { enable, type } = this.state;
        const { text, 
        // onPress,
        containerStyle, textStyle, containerColor, textColor, iconLeft, iconRight, iconRightStyle, iconLeftStyle, iconSize, bold, whiteTheme, width, size, loading, hasShadow } = this.props;
        let _containerColor = '';
        let _textColor = '';
        let _buttonContainer = {};
        let _textStyle = {};
        let _borderColor = '';
        let _borderStyle = {};
        let spinnerColor = mo_app_common_1.Color.primary;
        if (type === 'solid') {
            _containerColor = (enable) ? (whiteTheme ? '#fff' : mo_app_common_1.Color.primary) : mo_app_common_1.Color.disable;
            _textColor = whiteTheme ? mo_app_common_1.Color.primary : '#fff';
            spinnerColor = whiteTheme ? mo_app_common_1.Color.primary : '#fff';
        }
        else if (type === 'border') {
            _textColor = enable ? whiteTheme ? '#fff' : mo_app_common_1.Color.primary : mo_app_common_1.Color.disable;
            _borderColor = enable ? whiteTheme ? '#fff' : mo_app_common_1.Color.primary : mo_app_common_1.Color.disable;
            spinnerColor = '#fff';
        }
        else if (type === 'none') {
            _textColor = enable ? whiteTheme ? '#fff' : mo_app_common_1.Color.primary : mo_app_common_1.Color.disable;
            _containerColor = 'transparent';
        }
        if (bold) {
            _textStyle = { fontFamily: mo_app_common_1.Constants.fontBold };
            // console.log('_textStyle ', _textStyle);
        }
        else {
            _textStyle = { fontFamily: mo_app_common_1.Constants.fontMedium };
        }
        _borderStyle = type === 'none' ? {} : { ...styles.borderButton, ...{ borderColor: _borderColor } };
        _containerColor = containerColor ? containerColor : _containerColor;
        _textColor = textColor ? textColor : _textColor;
        _buttonContainer = { ...(type === 'solid') ? {} : _borderStyle };
        if (size === 's') {
            _buttonContainer = { ..._buttonContainer, ...{ paddingVertical: 8 } };
        }
        const textSize = this.getTextSize();
        _textStyle = { ..._textStyle, ...textSize, ...{ color: _textColor } };
        if (!enable) {
            return (<react_native_1.View style={[styles.container, { width: width }, { backgroundColor: _containerColor }, _buttonContainer, containerStyle,]}>
          {iconLeft ? (<mo_app_common_1.CustomIcon name={iconLeft} color={_textColor} size={iconSize} style={[styles.iconLeft, iconLeftStyle]}/>) : (<react_native_1.View />)}
          <index_1.WrapText st={[styles.text, _textStyle]}>{text}</index_1.WrapText>
          {iconRight ? (<mo_app_common_1.CustomIcon name={iconRight} color={_textColor} size={iconSize} style={[styles.iconRight, iconRightStyle]}/>) : (<react_native_1.View />)}
        </react_native_1.View>);
        }
        return (<react_native_1.TouchableOpacity style={[styles.container, { width: width }, { backgroundColor: _containerColor }, _buttonContainer, type === 'solid' && hasShadow ? styles.solidShadow : {}, containerStyle]} onPress={this.onPressHandler}>
            {!loading &&
            (<react_native_1.View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {iconLeft ? (<mo_app_common_1.CustomIcon name={iconLeft} color={_textColor} size={iconSize} style={[styles.iconLeft, iconLeftStyle]}/>) : (<react_native_1.View />)}
                  <index_1.WrapText st={[styles.text, _textStyle, textStyle]}>{text}</index_1.WrapText>
                {iconRight ? (<mo_app_common_1.CustomIcon name={iconRight} color={_textColor} size={iconSize} style={[styles.iconRight, iconRightStyle]}/>) : (<react_native_1.View />)}
              </react_native_1.View>)}
            {loading && (<react_native_1.View style={{ height: textSize?.lineHeight, width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 0 }}>
                    <react_native_1.ActivityIndicator size="small" color={spinnerColor}/>
                </react_native_1.View>)}
        </react_native_1.TouchableOpacity>);
    }
}
exports.WrapButton = WrapButton;
WrapButton.defaultProps = {
    text: 'Button',
    rippleColor: '#ccc',
    rippleRound: true,
    selected: true,
    enable: true,
    type: 'solid',
    containerStyle: {},
    textStyle: {},
    iconRightStyle: {},
    iconLeftStyle: {},
    iconSize: 20,
    bold: false,
    size: 3,
    whiteTheme: false,
    width: '100%',
    loading: false,
};
const styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 5,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 9,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    borderButton: {
        borderWidth: 1,
        borderRadius: 23,
    },
    text: {},
    iconLeft: {
        marginRight: 5,
    },
    iconRight: {
        marginLeft: 5,
    },
    solidShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    }
});
//# sourceMappingURL=WrapButton.js.map