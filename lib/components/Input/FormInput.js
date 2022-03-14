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
exports.FormInput = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../index");
const react_native_autogrow_textinput_1 = require("react-native-autogrow-textinput");
const styles_1 = __importDefault(require("./styles"));
class FormInput extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.onClearInputTextHandle = () => {
            this.setState({ value: '', clearShow: false }, () => {
                this.validate();
            });
        };
        this.setValue = (value) => {
            this.setState({ value: value });
        };
        this.onSubmitHandle = () => {
            const { value } = this.state;
            const { onSubmit } = this.props;
            if (onSubmit) {
                onSubmit(value);
            }
        };
        this.onValueEditHandle = (value) => {
            const clear = value ? true : false;
            this.setState({ value, clearShow: clear }, () => {
                this.validate();
            });
        };
        this.validate = () => {
            const { validType, emptyErrorMessage, emailInvalidMessage, phoneInvalidMessage, numberInvalidMessage } = this.props;
            const { value } = this.state;
            if (this.checkValidate(value)) {
                this.setState({ error: false, errorMessage: '' });
                return true;
            }
            const _value = value && value.trim();
            let error = {};
            if (!_value) {
                error = { errorMessage: emptyErrorMessage, error: true };
                this.setState(error);
                return false;
            }
            switch (validType) {
                // case 1: // empty valid
                //     this.setState({ errorMessage: emptyErrorMessage, error: true });
                //     break;
                case 'email': // email
                    // this.setState({ errorMessage: emailInvalidMessage, error: true });
                    error = { errorMessage: emailInvalidMessage, error: true };
                    break;
                case 'phone': // phone
                    // this.setState({ errorMessage: phoneInvalidMessage, error: true });
                    error = { errorMessage: phoneInvalidMessage, error: true };
                    break;
                case 'number': // number
                    // this.setState({ errorMessage: numberInvalidMessage, error: true });
                    error = { errorMessage: numberInvalidMessage, error: true };
                    break;
                default:
                    break;
            }
            this.setState(error);
            return false;
        };
        this.checkValidate = (value) => {
            const { validType, validRequire } = this.props;
            if (!value) {
                return false;
            }
            const _value = value && value.trim();
            if (!_value) {
                return false;
            }
            if (validRequire) {
                switch (validType) {
                    case 'text': // empty valid
                        return true;
                    case 'email': // email
                        return this.validateEmail(_value);
                    case 'phone': // phone
                        return this.validatePhone(_value);
                    case 'number': // number
                        return this.validateNumber(_value);
                    default:
                        return true;
                }
            }
            return true;
        };
        this.validateEmail = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        };
        this.validatePhone = (phone) => {
            const re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            return re.test(phone.toLowerCase());
        };
        this.validateNumber = (value) => {
            const number = parseInt(value);
            if (!number) {
                return false;
            }
            if (value.charAt(0) === '0') {
                return false;
            }
            return true;
        };
        this.onUpdateHandler = () => {
            const { onUpdate } = this.props;
            const { value } = this.state;
            if (onUpdate) {
                onUpdate(value);
            }
        };
        this.onTogglePasswordHandler = (val) => {
            console.log('onTogglePasswordHandler ', val);
            this.setState({ isSecureText: val });
        };
        this.state = {
            enable: this.props.enable,
            value: this.props.text,
            error: false,
            errorMessage: '',
            clearShow: this.props.text ? true : false,
            isSecureText: this.props.isPassword
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { text } = this.props;
        if (nextProps.text && nextProps.text !== text) {
            this.setValue(nextProps.text);
        }
    }
    componentDidMount() {
        if (this.props.autoValidate) {
            this.validate();
        }
    }
    getValue() {
        const { validType } = this.props;
        if (validType === 'number') {
            return parseInt(this.state.value);
        }
        return this.state.value;
    }
    render() {
        const { placeholder, label, multiLine, validType, updateType, containerStyle, icon, isPassword } = this.props;
        const { value, error, errorMessage, clearShow, enable, isSecureText } = this.state;
        if (!enable) {
            return (<react_native_1.View style={[styles_1.default.formInputWrap, containerStyle]}>
                    <index_1.WrapText f={'r'} st={[{ marginBottom: 8 }]}>{label}</index_1.WrapText>
                    <react_native_1.View style={[styles_1.default.inputWrap, { height: 32, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: mo_app_common_1.Color.disable }]}>
                        <index_1.WrapText f={'m'} s={14}>{value}</index_1.WrapText>
                    </react_native_1.View>
                </react_native_1.View>);
        }
        const keyboardType = validType === 'number' ? 'numeric' : validType === 'phone' ? 'phone-pad' : 'default';
        const hasLabel = label ? true : false;
        const hasIcon = icon ? true : false;
        const color = value ? mo_app_common_1.Color.text : mo_app_common_1.Color.textSecondary;
        return (<react_native_1.View style={[styles_1.default.formInputWrap, containerStyle]}>
                {hasLabel &&
            <index_1.WrapText f={'m'} s={14} st={[{ marginBottom: 8, lineHeight: 16 }]}>{label}</index_1.WrapText>}

                <react_native_1.View style={[styles_1.default.inputWrap,
            error ? { borderColor: mo_app_common_1.Color.red } : {},
            multiLine ? { alignItems: 'flex-start', padding: 10, minHeight: 80 } : {}]}>
                    {hasIcon && <mo_app_common_1.CustomIcon name={icon} size={15} style={{ color: color, marginRight: 12 }}/>}
                    {!updateType && !multiLine &&
            <react_native_1.TextInput style={[styles_1.default.formInput, multiLine ? styles_1.default.optionInput : {}]} underlineColorAndroid="transparent" placeholderTextColor={mo_app_common_1.Color.textSecondary} ref={(comp) => { this.textRef = comp; }} placeholder={placeholder} keyboardType={keyboardType} onChangeText={this.onValueEditHandle} onSubmitEditing={this.onSubmitHandle} returnKeyType="next" value={value} numberOfLines={1} secureTextEntry={isSecureText}/>}
                    {multiLine &&
            <react_native_autogrow_textinput_1.AutoGrowingTextInput style={[styles_1.default.formInput]} underlineColorAndroid="transparent" placeholderTextColor={mo_app_common_1.Color.textSecondary} ref={(comp) => { this.textRef = comp; }} placeholder={placeholder} onChangeText={this.onValueEditHandle} onSubmitEditing={this.onSubmitHandle} returnKeyType="next" value={value}/>}

                    {!multiLine && !updateType && !isPassword && clearShow &&
            <react_native_1.View style={styles_1.default.rightButton}>
                            <index_1.ButtonRipple vector={true} name={'clear_text'} size={9} color={mo_app_common_1.Color.text} onPress={this.onClearInputTextHandle}/>
                        </react_native_1.View>}

                    {isPassword && <index_1.PasswordToggle onActive={this.onTogglePasswordHandler}/>}

                    {updateType &&
            <index_1.WrapText>{value || 'Chưa có thông tin'}</index_1.WrapText>}

                    {updateType &&
            <react_native_1.TouchableOpacity onPress={this.onUpdateHandler} style={styles_1.default.updateButton}>
                            <index_1.WrapText st={{ color: mo_app_common_1.Color.primary }}>{mo_app_common_1.CommonLanguage.Update}</index_1.WrapText>
                        </react_native_1.TouchableOpacity>}

                </react_native_1.View>
                {error &&
            <index_1.WrapText f={'r'} s={14} st={{ marginTop: 5, color: mo_app_common_1.Color.red }}>{errorMessage}</index_1.WrapText>}
            </react_native_1.View>);
    }
}
exports.FormInput = FormInput;
FormInput.defaultProps = {
    placeholder: '',
    label: '',
    text: '',
    validType: 'text',
    validRequire: true,
    emptyErrorMessage: '',
    emailInvalidMessage: '',
    phoneInvalidMessage: 'Số điện thoại không hợp lệ',
    numberInvalidMessage: 'Vui lòng nhập số hợp lệ',
    multiLine: false,
    updateType: false,
    containerStyle: {},
    autoValidate: true,
    enable: true
};
//# sourceMappingURL=FormInput.js.map