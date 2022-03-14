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
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../../index");
const FormInput_1 = require("../FormInput");
const react_native_contacts_1 = __importDefault(require("react-native-contacts"));
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const styles_1 = __importDefault(require("./styles"));
class ContactsEdit extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.requestPermission = async () => {
            try {
                const granted = await react_native_1.PermissionsAndroid.request(react_native_1.PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
                if (granted === react_native_1.PermissionsAndroid.RESULTS.GRANTED) {
                    // console.log('You can use the contacts');
                    this.loadContacts();
                }
                else {
                    // always denied
                    console.log('Contacts permission denied');
                }
            }
            catch (err) {
                console.warn(err);
            }
        };
        this.loadContacts = () => {
            react_native_contacts_1.default.getAll().then(contacts => {
                // if (err === 'denied') {
                //     console.warn('Permission to access contacts was denied');
                // }
                this.setState({
                    loading: false,
                    contacts: contacts.map((contact) => {
                        const phone = contact.phoneNumbers && contact.phoneNumbers.length ? contact.phoneNumbers[0].number : '';
                        const id = phone ? phone.replace(/ /g, '') : '';
                        return {
                            name: react_native_1.Platform.OS === 'android' ? contact.displayName : `${contact.familyName} ${contact.givenName}`,
                            id: id,
                            phone: phone
                        };
                    })
                });
            });
        };
        this.onContactsPressHandler = () => {
            const { contacts, value } = this.state;
            const modal = {
                content: <index_1.ContactsModal items={contacts} selectedKey={value} onSubmit={this.onSubmitHandler} onItemSelected={this.onItemSelectedHandler}/>
            };
            mo_app_common_1.pushModal(modal);
            return;
        };
        this.onItemSelectedHandler = (value, item) => {
            this.setState({ value: value }, () => {
                this.validate();
            });
            const { onItemSelected } = this.props;
            if (onItemSelected) {
                onItemSelected(item);
            }
        };
        this.onSubmitHandler = (value) => {
            this.setState({ value: value }, () => {
                this.validate();
            });
        };
        this.validatePhone = (phone) => {
            phone = phone.replace('+84', '0');
            const re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            return re.test(phone.toLowerCase());
        };
        this.validate = () => {
            const { emptyErrorMessage, phoneInvalidMessage } = this.props;
            const { value, contacts } = this.state;
            if (contacts && !contacts.length) {
                return this.inputEditRef.validate();
            }
            if (!value) {
                this.setState({
                    error: true,
                    message: emptyErrorMessage
                }, () => {
                    console.log('phone error');
                    this.forceUpdate();
                });
                return false;
            }
            if (!this.validatePhone(value)) {
                this.setState({
                    error: true,
                    message: phoneInvalidMessage
                });
                return false;
            }
            this.setState({
                error: false
            });
            return true;
        };
        this.getValue = () => {
            const { value, contacts } = this.state;
            if (contacts && !contacts.length) {
                return this.inputEditRef.getValue();
            }
            return value;
        };
        this.onClearInputTextHandler = () => {
            this.setState({ value: '' }, () => {
                this.validate();
            });
        };
        this.state = {
            value: this.props.value,
            contacts: [],
            loading: false,
            error: false,
            message: ''
        };
    }
    componentDidMount() {
        if (react_native_1.Platform.OS === 'android') {
            this.requestPermission();
            return;
        }
        this.loadContacts();
    }
    render() {
        const { label, containerStyle, placeholder, autoValidate, emptyErrorMessage, icon } = this.props;
        const { value, contacts, error, message } = this.state;
        const isEmpty = value ? false : true;
        const hasLabel = label ? true : false;
        const hasIcon = icon ? true : false;
        // console.log('render ', error, message);
        if (contacts && !contacts.length) {
            return (<FormInput_1.FormInput ref={comp => { this.inputEditRef = comp; }} containerStyle={containerStyle} validRequire={true} validType={'text'} placeholder={placeholder} autoValidate={autoValidate} emptyErrorMessage={emptyErrorMessage} text={value} label={label} enable={true} icon={icon}/>);
        }
        const color = isEmpty ? mo_app_common_1.Color.textSecondary : mo_app_common_1.Color.text;
        return (<react_native_1.View style={[styles_1.default.container, containerStyle]}>
                {hasLabel && <index_1.WrapText st={{ marginBottom: 8 }}>{label}</index_1.WrapText>}
                <react_native_1.View style={styles_1.default.rowContent}>
                    <react_native_gesture_handler_1.TouchableOpacity style={[styles_1.default.wrapForm]} onPress={this.onContactsPressHandler}>
                        {hasIcon &&
            <mo_app_common_1.CustomIcon name={icon} size={15} style={{ color: color, paddingRight: 12 }}/>}
                        {!isEmpty && <index_1.WrapText>{value}</index_1.WrapText>}
                        {isEmpty && <index_1.WrapText c={mo_app_common_1.Color.textSecondary}>{placeholder}</index_1.WrapText>}
                    </react_native_gesture_handler_1.TouchableOpacity>
                    {!isEmpty &&
            <react_native_1.View style={styles_1.default.clearButton}>
                            <index_1.ButtonRipple name={'clear_text'} size={9} color={mo_app_common_1.Color.text} onPress={this.onClearInputTextHandler}/>
                        </react_native_1.View>}
                </react_native_1.View>
                {error && <index_1.WrapText f={'r'} st={{ lineHeight: 16, fontSize: 12, marginTop: 4, color: mo_app_common_1.Color.red }}>{message}</index_1.WrapText>}
            </react_native_1.View>);
    }
}
exports.default = ContactsEdit;
ContactsEdit.defaultProps = {
    label: '',
    autoValidate: false,
    placeholder: 'Số điện thoại',
    emptyErrorMessage: 'Vui lòng nhập số điện thoại',
    phoneInvalidMessage: 'Số điện thoại không hợp lệ'
};
//# sourceMappingURL=index.js.map