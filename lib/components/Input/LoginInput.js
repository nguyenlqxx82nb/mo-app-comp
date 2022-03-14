"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInput = exports.KeyType = exports.KeyboardType = exports.InputType = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../index");
const react_native_autogrow_textinput_1 = require("react-native-autogrow-textinput");
const moment_1 = __importDefault(require("moment"));
var InputType;
(function (InputType) {
    InputType["text"] = "text";
    InputType["radio"] = "radio";
    InputType["phone"] = "phone";
    InputType["email"] = "email";
    InputType["cmt"] = "cmt";
    InputType["date"] = "date";
    InputType["list"] = "list";
    InputType["name"] = "name";
})(InputType = exports.InputType || (exports.InputType = {}));
var KeyboardType;
(function (KeyboardType) {
    KeyboardType["default"] = "default";
    KeyboardType["numeric"] = "numeric";
    KeyboardType["email"] = "email-address";
    KeyboardType["phone"] = "phone-pad";
    KeyboardType["ascii"] = "ascii-capable";
    KeyboardType["punctuation"] = "numbers-and-punctuation";
    KeyboardType["url"] = "url";
    KeyboardType["pad"] = "number-pad";
    KeyboardType["phonePad"] = "name-phone-pad";
    KeyboardType["decimalPad"] = "decimal-pad";
    KeyboardType["twitter"] = "twitter";
    KeyboardType["webSearch"] = "web-search";
    KeyboardType["visiblePass"] = "visible-password";
})(KeyboardType = exports.KeyboardType || (exports.KeyboardType = {}));
var KeyType;
(function (KeyType) {
    KeyType["done"] = "done";
    KeyType["go"] = "go";
    KeyType["next"] = "next";
    KeyType["search"] = "search";
    KeyType["send"] = "send";
})(KeyType = exports.KeyType || (exports.KeyType = {}));
class LoginInput extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.onClearInputTextHandle = () => {
            this.setState({ value: '' });
        };
        this.onSubmitHandler = () => {
            const { value } = this.state;
            const { onSubmit } = this.props;
            if (onSubmit) {
                onSubmit(value);
            }
        };
        this.onValueEditHandler = (value) => {
            const { validType, type, onValueChanged } = this.props;
            if (validType === 3 || type === InputType.phone) {
                const regex = /^[0-9\b]+$/;
                if (!regex.test(value)) {
                    this.setState({ value: value.slice(0, -1) });
                }
                this.setState({ value });
                return;
            }
            this.setState({ value });
            if (onValueChanged) {
                onValueChanged(value);
            }
        };
        this.focus = () => {
            this.input.focus();
        };
        this.validate = () => {
            const { type, cmtInvalidMessage, emailInvalidMessage, phoneInvalidMessage, minLength, maxLength, minLengthMessage, maxLengthMessage, } = this.props;
            react_native_1.Keyboard.dismiss();
            let value = this.getValue();
            value = value ? `${this.getValue()}` : undefined;
            if (this.checkValidate(value)) {
                return { error: false, message: '' };
            }
            if (!value || value.trim() === '') {
                return { message: this.getEmptyMessageError(), error: true };
            }
            if (minLength && value.trim().length < minLength) {
                return { message: minLengthMessage, error: true };
            }
            if (maxLength && value.trim().length > maxLength) {
                return { message: maxLengthMessage, error: true };
            }
            switch (type) {
                case InputType.email: // email
                    return { message: emailInvalidMessage, error: true };
                case InputType.phone: // phone
                    return { message: phoneInvalidMessage || mo_app_common_1.CommonLanguage.PhoneNumberValid, error: true };
                case InputType.cmt: // cmt
                    return { message: cmtInvalidMessage || 'Số CMT/CCCD không hợp lệ', error: true };
                default:
                    return { message: '', error: true };
            }
        };
        this.getEmptyMessageError = () => {
            const { emptyErrorMessage, type } = this.props;
            if (emptyErrorMessage) {
                return emptyErrorMessage;
            }
            if (type === InputType.phone) {
                return mo_app_common_1.CommonLanguage.PhoneEmpty;
            }
            if (type === InputType.email) {
                return mo_app_common_1.CommonLanguage.EmailEmpty;
            }
            if (type === InputType.name) {
                return 'Vui lòng nhập họ và tên';
            }
            if (type === InputType.cmt) {
                return 'Vui lòng chọn giấy tờ định danh';
            }
            if (type === InputType.date) {
                return 'Vui lòng nhập ngày sinh';
            }
        };
        this.checkValidate = (value) => {
            const { minLength, maxLength, type, validRequire } = this.props;
            if (validRequire) {
                if (!value || value.trim() === '') {
                    return false;
                }
                if (minLength && value.trim().length < minLength) {
                    return false;
                }
                if (maxLength && value.trim().length > maxLength) {
                    return false;
                }
                switch (type) {
                    case InputType.email: // email
                        return this.validateEmail(value);
                    case InputType.phone: // phone
                        return this.validatePhone(value);
                    // case InputType.cmt: // id number
                    //     return this.validateIdNumber(value);
                    default:
                        return true;
                }
            }
            return true;
        };
        this.validateEmail = (email) => {
            if (!email) {
                return false;
            }
            const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        };
        this.validatePhone = (phone) => {
            if (!phone) {
                return;
            }
            const re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            return re.test(phone.toLowerCase());
        };
        /**
         * validate id number
         * @param id
         */
        this.validateIdNumber = (id) => {
            // if (!/^[0-9]+$/.test(id)){
            //     return false;
            // }
            const length = id.length;
            if (length !== 9 && length !== 12) {
                return false;
            }
            return true;
        };
        this.getValue = () => {
            const { type, idKey } = this.props;
            const { selectedKey, value } = this.state;
            if (type === InputType.radio || type === InputType.list) {
                if (!selectedKey) {
                    return undefined;
                }
                const item = this.getItemByKey(selectedKey);
                return item ? (idKey ? item[idKey] : (item.key || item.id)) : undefined;
            }
            if (type === InputType.date) {
                if (this.selectedDate) {
                    const newVal = moment_1.default(this.selectedDate).local().format('DD-MM-YYYY'); // moment(value, 'YYYY-MM-DD');
                    // console.log('getValue1 ', value, newVal);
                    return newVal;
                }
                return undefined;
            }
            return value;
        };
        this.setValue = (value) => {
            this.setState({ value: value });
        };
        this.getStyleTheme = () => {
            const { focus, value } = this.state;
            const { theme } = this.props;
            let styleTheme = {
                backgroundColor: { backgroundColor: mo_app_common_1.Color.border },
                placeholderColor: mo_app_common_1.Color.textSecondary,
                iconColor: focus || value ? mo_app_common_1.Color.text : mo_app_common_1.Color.textSecondary,
                color: focus || value ? mo_app_common_1.Color.text : mo_app_common_1.Color.textSecondary
            };
            if (theme === 'blue') {
                styleTheme = {
                    backgroundColor: { backgroundColor: focus || value ? '#fff' : '#94D8BC' },
                    placeholderColor: focus ? mo_app_common_1.Color.textSecondary : '#fff',
                    iconColor: focus || value ? mo_app_common_1.Color.text : '#fff',
                    color: focus || value ? mo_app_common_1.Color.text : '#fff'
                };
            }
            return styleTheme;
        };
        this.getCmtPlaceholder = (type = 'CCCD') => {
            switch (type) {
                case 'CCCD':
                    return 'Nhập CCCD';
                case 'PASSPORT':
                    return 'Nhập hộ chiếu';
                case 'CMND':
                    return 'Nhập CMND';
                case 'CMNDQD':
                    return 'Nhập CMNDQD';
                case 'GPLX':
                    return 'Nhập GPLX';
                default:
                    return 'Nhập số';
            }
        };
        this.onTogglePasswordHandle = (val) => {
            // console.log('onTogglePasswordHandle ', val);
            this.setState({ password: val });
        };
        this.onBlur = () => {
            this.setState({ focus: false });
        };
        this.onFocus = () => {
            this.setState({ focus: true });
        };
        this.onPressHandler = () => {
            const { type, items, emptyErrorMessage } = this.props;
            const { value, selectedKey, cmtType } = this.state;
            react_native_1.Keyboard.dismiss();
            // Radio
            if (type === InputType.radio) {
                const modal = {
                    content: <index_1.RadioModal items={items} selectedKey={selectedKey} onSelectItem={this.onSelectItemHandler}/>
                };
                mo_app_common_1.pushModal(modal);
                return;
            }
            // list
            if (type === InputType.list) {
                const modal = {
                    content: <index_1.ListModal items={items} selectedKey={selectedKey} emptyMsg={emptyErrorMessage} onSelectItem={this.onSelectItemHandler}/>
                };
                mo_app_common_1.pushModal(modal);
                return;
            }
            // cmt
            if (type === InputType.cmt) {
                const modal = {
                    content: <index_1.CccdModal type={cmtType} value={value} emptyMsg={emptyErrorMessage} onSelectItem={this.onSelectCmtItemHandler}/>
                };
                mo_app_common_1.pushModal(modal);
                return;
            }
            // Open DatePicker
            if (type === InputType.date) {
                const date = value && value !== '' ? moment_1.default(value, 'DD/MM/YYYY').toDate() : new Date(1980, 0, 1);
                const options = {
                    date: date,
                    minDate: new Date('01/01/1900'),
                    maxDate: new Date()
                };
                const modal = {
                    content: <index_1.DatePicker ref={(comp) => { this.datePickerRef = comp; }} options={options} onDatePicked={this.onDatePickedHandler} onCancel={this.onDatePickerCancelHandler}/>
                };
                mo_app_common_1.pushModal(modal);
                return;
            }
        };
        this.onSelectItemHandler = (selectedKey) => {
            this.setState({ selectedKey: selectedKey });
        };
        this.onSelectCmtItemHandler = (type, value) => {
            // console.log('onSelectCmtItemHandler ', type, value);
            this.setState({ value: value, cmtType: type });
        };
        this.onDatePickedHandler = (date) => {
            const _date = moment_1.default.utc(date).local().format('DD/MM/YYYY');
            this.selectedDate = date;
            this.setState({ value: _date, datePickerVisible: false });
        };
        this.onDatePickerCancelHandler = () => {
            this.setState({ datePickerVisible: false });
        };
        this.getItemByKey = (key) => {
            const { items, idKey } = this.props;
            if (!key || !items) {
                return undefined;
            }
            let currItem;
            items.forEach(item => {
                if (idKey ? item[idKey] : (item.key || item.id) === key) {
                    currItem = item;
                }
            });
            return currItem;
        };
        this.getCmtType = () => {
            const { cmtType } = this.state;
            return cmtType;
        };
        this.state = {
            value: this.props.text,
            error: false,
            password: this.props.password,
            focus: false,
            radioModalVisible: false,
            selectedKey: this.props.selectedKey,
            datePickerVisible: false,
            cmtType: this.props.cmtType,
            cmtPlaceholder: this.getCmtPlaceholder(this.props.cmtType)
        };
    }
    render() {
        const { placeHolder, keyType, keyboardType, icon, containerStyle, isTogglePassword, textStyle, type, multiple, maxLength } = this.props;
        const { value, password, selectedKey } = this.state;
        const styleTheme = this.getStyleTheme();
        const currItem = this.getItemByKey(selectedKey);
        const fontSize = mo_app_common_1.Constants.TextSize === 1 ? 12 : 14;
        if (multiple) {
            return (<react_native_1.View style={[styles.textAreaContainer, containerStyle]}>
                    <react_native_autogrow_textinput_1.AutoGrowingTextInput style={[styles.textArea, { fontSize: fontSize, lineHeight: fontSize + 4 }]} underlineColorAndroid="transparent" placeholderTextColor={mo_app_common_1.Color.textSecondary} ref={(comp) => { this.textAreaRef = comp; }} placeholder={placeHolder} onChangeText={this.onValueEditHandler} onSubmitEditing={this.onSubmitHandler} returnKeyType="next" maxLength={maxLength} value={value}/>
                </react_native_1.View>);
        }
        return (<react_native_1.View style={[styles.inputWrap, { borderRadius: 5, paddingHorizontal: 12 }, styleTheme.backgroundColor, containerStyle]}>
                {icon !== '' &&
            <mo_app_common_1.CustomIcon style={{ marginRight: 10 }} name={icon} size={20} color={currItem ? mo_app_common_1.Color.text : styleTheme.iconColor}/>}
                {(type !== InputType.radio && type !== InputType.date && type !== InputType.list && type !== InputType.cmt) &&
            <react_native_1.TextInput style={[styles.input, textStyle, { color: styleTheme.color }]} underlineColorAndroid="transparent" placeholderTextColor={styleTheme.placeholderColor} ref={(comp) => (this.input = comp)} onBlur={() => this.onBlur()} onFocus={() => this.onFocus()} placeholder={placeHolder} onChangeText={this.onValueEditHandler} onSubmitEditing={this.onSubmitHandler} keyboardType={keyboardType} returnKeyType={keyType} value={value} maxLength={maxLength} secureTextEntry={password}/>}
                {(type === InputType.radio || type === InputType.list) &&
            <react_native_1.TouchableOpacity style={styles.input} onPress={this.onPressHandler}>
                        <index_1.WrapText st={{ color: currItem ? mo_app_common_1.Color.text : styleTheme.color }}>{currItem ? currItem.name : placeHolder}</index_1.WrapText>
                    </react_native_1.TouchableOpacity>}
                {(type === InputType.cmt) &&
            <react_native_1.TouchableOpacity style={styles.input} onPress={this.onPressHandler}>
                        <index_1.WrapText st={{ color: value ? mo_app_common_1.Color.text : styleTheme.color }}>{value ? value : 'Chọn giấy tờ định danh'}</index_1.WrapText>
                    </react_native_1.TouchableOpacity>}
                {type === InputType.date &&
            <react_native_1.TouchableOpacity style={styles.input} onPress={this.onPressHandler}>
                        <index_1.WrapText st={{ color: value ? mo_app_common_1.Color.text : styleTheme.color }}>{value || placeHolder}</index_1.WrapText>
                    </react_native_1.TouchableOpacity>}
                {isTogglePassword && <index_1.PasswordToggle color={styleTheme.iconColor} onActive={this.onTogglePasswordHandle}/>}
            </react_native_1.View>);
    }
}
exports.LoginInput = LoginInput;
LoginInput.defaultProps = {
    placeHolder: '',
    label: '',
    text: '',
    validType: 1,
    validRequire: true,
    emptyErrorMessage: '',
    emailInvalidMessage: '',
    phoneInvalidMessage: '',
    keyType: KeyType.next,
    keyboardType: KeyboardType.default,
    icon: '',
    password: false,
    containerStyle: {},
    isTogglePassword: false,
    minLengthMessage: '',
    maxLengthMessage: '',
    textStyle: {},
    multiple: false,
    cmtType: 'CCCD',
    maxLength: 10000
};
const styles = react_native_1.StyleSheet.create({
    inputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomWidth: 1,
        marginTop: 20,
    },
    input: {
        color: mo_app_common_1.Color.text,
        height: 40,
        marginLeft: 0,
        paddingHorizontal: 0,
        paddingTop: 0,
        paddingBottom: 0,
        flex: 1,
        textAlign: 'left',
        fontFamily: mo_app_common_1.Constants.fontMedium,
        fontSize: 14,
        justifyContent: 'center'
    },
    textAreaContainer: {
        paddingTop: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: mo_app_common_1.Color.border,
        borderRadius: 6,
        minHeight: 120,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    textArea: {
        padding: 0,
        paddingTop: 0,
        margin: 0,
        width: '100%',
        fontFamily: mo_app_common_1.Constants.fontRegular,
        color: mo_app_common_1.Color.text
    }
});
//# sourceMappingURL=LoginInput.js.map