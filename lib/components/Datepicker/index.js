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
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../index");
const react_native_1 = require("react-native");
// import DateTimePicker from '@react-native-community/datetimepicker';
const react_native_date_picker_1 = __importDefault(require("react-native-date-picker"));
class DatePickerModal extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.cancel = () => {
            this.hideDatePickerModal();
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        };
        this.onDateChangeHandler = async (selectedDate) => {
            let options = this.state.options;
            options.date = selectedDate;
            this.setState({
                options: options
            });
        };
        this.onDateSelectedHandler = () => {
            this.modalRef.close();
            if (this.props.onDatePicked) {
                this.props.onDatePicked(this.state.options.date);
            }
        };
        this.close = () => {
            const { onClose } = this.props;
            if (onClose) {
                onClose();
            }
            setTimeout(() => {
                react_native_1.DeviceEventEmitter.emit(mo_app_common_1.Constants.EmitCode.PopModal);
            }, 150);
        };
        const { options } = this.props;
        this.state = {
            options: options
        };
    }
    getSelectedDate() {
        const { options } = this.state;
        return (options) ? options.date : null;
    }
    showDatePickerModal() {
        this.setState({
            datePickerVisible: true
        });
    }
    hideDatePickerModal() {
        this.setState({
            datePickerVisible: false
        });
    }
    render() {
        const { containerStyle } = this.props;
        // const { date } = this.state.options;
        let datePickerProps = {};
        if (this.state.options) {
            if (this.state.options.date) {
                datePickerProps.date = this.state.options.date ? this.state.options.date : new Date(1980, 1, 1);
                // console.log('date picker ', datePickerProps.date, this.state.options.date);
            }
            if (this.state.options.minDate) {
                datePickerProps.minimumDate = this.state.options.minDate;
            }
            if (this.state.options.maxDate) {
                datePickerProps.maximumDate = this.state.options.maxDate;
            }
        }
        else {
            datePickerProps.date = new Date(1980, 1, 1);
        }
        let dpOptionsProps = {
            date: datePickerProps.date,
            textColor: mo_app_common_1.Color.textSecondary,
            mode: 'date',
            style: { width: mo_app_common_1.Device.ModalWidth, paddingBottom: 0 },
            //locale={'VI'}
            onDateChange: this.onDateChangeHandler
        };
        if (react_native_1.Platform.OS === 'ios') {
            dpOptionsProps = { ...dpOptionsProps, ...{ locale: 'vi' } };
        }
        return (<index_1.WrapModal ref={(comp) => { this.modalRef = comp; }} autoOpen={true} onClosed={this.close} backDropClose={true} position={'bottom'} showPos={'center'} containerStyle={containerStyle}>
            <react_native_1.View style={{ width: mo_app_common_1.Device.ModalWidth, backgroundColor: '#fff', paddingHorizontal: 0, paddingTop: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
              <react_native_date_picker_1.default {...dpOptionsProps}/>
            <react_native_1.View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
              <react_native_1.TouchableOpacity onPress={this.onDateSelectedHandler.bind(this)}>
                <index_1.WrapText st={styles.buttonTextStyle}>{'Hoàn tất'}</index_1.WrapText>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
          </react_native_1.View>
      </index_1.WrapModal>);
    }
}
exports.default = DatePickerModal;
DatePickerModal.propTypes = {
    /**
     * Date picked handler.
     *
     * This is called when the user selected the date from picker
     * The first and only argument is a Date object representing the picked
     * date and time.
     */
    onDatePicked: prop_types_1.default.func,
    /**
     * Date Cancelled handler.
     *
     * This is called when the user dismissed the picker.
     */
    onCancel: prop_types_1.default.func,
    /**
    * Ok button label
    */
    okLabel: prop_types_1.default.string,
    /**
    * Cancel button label
    */
    cancelLabel: prop_types_1.default.string,
    locale: prop_types_1.default.string,
};
DatePickerModal.defaultProps = {
    okLabel: 'Ok',
    cancelLabel: 'Cancel',
    locale: 'vi_VI',
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    background: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 16,
        margin: 16,
        borderRadius: 8
    },
    buttonTextStyle: {
        textAlign: 'center',
        fontSize: 22,
        lineHeight: 26,
        color: mo_app_common_1.Color.primary
    }
});
//# sourceMappingURL=index.js.map