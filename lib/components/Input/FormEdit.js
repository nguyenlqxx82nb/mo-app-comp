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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormEdit = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../index");
const FormInput_1 = require("./FormInput");
class FormEdit extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this._item = null;
        this.changeEditStatus = (editStatus) => {
            this.setState({
                editStatus: editStatus
            });
        };
        this.getValue = () => {
            const { editType } = this.props;
            const { selectedKey } = this.state;
            if (editType === 'Input') // input edit
             {
                return this.inputEditRef.getValue();
            }
            if (editType === 'Dropdown') // dropdown edit
             {
                return this.formEditRef.getValue();
            }
            if (editType === 'Datepicker') // picker date
             {
                return this.state.value;
            }
            if (editType === 'CCD') {
                return selectedKey;
            }
            return this.state.value;
        };
        this.getValueByKey = () => {
            const { selectedKey } = this.state;
            const { items } = this.props;
            const resultItem = items && items.find((item) => {
                if (item.id === selectedKey) {
                    return item;
                }
            });
            if (resultItem) {
                return resultItem.name || resultItem.value;
            }
            return '';
        };
        this.getSelectedItem = () => {
            const { selectedKey } = this.state;
            const { items } = this.props;
            const findItem = items && items.find((item) => {
                if (item.id === selectedKey) {
                    return item;
                }
            });
            return findItem;
        };
        this.setValue = (value) => {
            // const { editType } = this.props;
            this.setState({ value: value });
            if (value && value.trim !== '') {
                this.setState({ error: false });
            }
        };
        this.getDisplayValue = () => {
            const { editType } = this.props;
            const { value } = this.state;
            // const value = (editStatus) ? this.state.value : this.props.value;
            const display = value ? value : mo_app_common_1.CommonLanguage.Undefined;
            if (editType === 'CCD') {
                return this.getValueByKey();
            }
            return display;
        };
        this.validate = () => {
            const { validRequire, editType } = this.props;
            const { selectedKey, value } = this.state;
            if (editType === 'Input') // input edit
             {
                return this.inputEditRef.validate();
            }
            if (editType === 'Dropdown') // dropdown edit
             {
                return true;
            }
            if (editType === 'Datepicker') // picker date
             {
                if ((!value || value.trim() === '') && validRequire) {
                    this.setState({ error: true });
                }
                else {
                    this.setState({ error: false });
                }
                return true;
            }
            if (editType === 'CCD' && !selectedKey) {
                this.setState({ error: true });
                return;
            }
            this.setState({ error: false });
            return true;
        };
        this.setData = (data) => {
            this.setState({ data: data });
        };
        this.getLabel = () => {
            const { label, editType, fieldType } = this.props;
            if (editType !== 'CCD') {
                return label;
            }
            switch (fieldType) {
                case 'GPLX':
                    return 'Giấy phép lại xe';
                case 'PASSPORT':
                    return 'Hộ chiếu';
                case 'CMND':
                    return 'Chứng minh nhân dân';
                case 'CCCD':
                    return 'Căn cước công dân';
                case 'CMNDQD':
                    return 'Chứng minh thư quân đội';
                default:
                    return 'Số CMT/CCCN';
            }
        };
        this.onCityPressHandler = () => {
            const { enable, selectedKey } = this.state;
            const { items } = this.props;
            if (!enable) {
                return;
            }
            this.hideKeyboard();
            const modal = {
                content: <index_1.ListModal items={items} selectedKey={selectedKey} emptyMsg={'Vui lòng chọn tỉnh thành'} onSelectItem={this.onSelectItemHandler}/>
            };
            mo_app_common_1.pushModal(modal);
            return;
        };
        this.onSelectItemHandler = (selectedKey) => {
            this.setState({ selectedKey: selectedKey }, () => {
                this.validate();
            });
        };
        this.hideKeyboard = () => {
            react_native_1.Keyboard.dismiss();
        };
        this.state = {
            value: this.props.value,
            editStatus: this.props.editStatus,
            error: false,
            data: this.props.data,
            enable: props.enable,
            selectedKey: props.selectedKey
        };
        this._item = this.props.item;
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { value } = this.props;
        if (nextProps.value && nextProps.value !== value) {
            // console.log('value ', value, ', nextProps ', nextProps.value);
            this.setValue(nextProps.value);
        }
    }
    render() {
        const { placeholder, emptyErrorMessage, formatType, isUpdateType, onUpdate, containerStyle, editType, validRequire, onOpenDatepicker, validType, 
        // width,
        // marginLeft,
        // dropdownLabel,
        // currentItem,
        numberOfLines, multiLine, 
        // selectedKey,
        readOnly, autoValidate, icon, isPassword } = this.props;
        const { value, error, 
        // data,
        enable } = this.state;
        const label = this.getLabel();
        // const hasLabel = label ? true : false;
        // const hasIcon = icon ? true : false;
        // const valueByKey = this.getValueByKey();
        // const color = !valueByKey && !value ? Color.textSecondary : Color.text;
        if (!readOnly) {
            if (editType === 'Input') {
                return (<FormInput_1.FormInput ref={comp => { this.inputEditRef = comp; }} 
                // style={this.props.inputStyle}
                containerStyle={containerStyle} validRequire={validRequire} validType={validType} placeholder={placeholder} autoValidate={autoValidate} emptyErrorMessage={emptyErrorMessage} text={value} label={label} updateType={isUpdateType} onUpdate={onUpdate} multiLine={multiLine} icon={icon} enable={enable} isPassword={isPassword}/>);
            }
            // if (editType === 2) // Drop down edit
            // {
            //     if (!enable) {
            //         return (
            //             <View style={[styles.container, containerStyle]}>
            //                 <WrapText type={'t-s'} textStyle={{ marginBottom: 8, lineHeight: 16, fontSize: 14 }}>{label}</WrapText>
            //                 <View style={[styles.wrapForm, styles.disableForm]}>
            //                     <WrapText type={'t'} textStyle={{ lineHeight: 16, fontSize: 14 }}>{value}</WrapText>
            //                 </View>
            //             </View>
            //         );
            //     }
            //     return (
            //         <View style={[styles.dropContainer, containerStyle]}>
            //             <WrapText type={'t-s'} textStyle={{ marginBottom: 8, lineHeight: 16 }}>{label}</WrapText>
            //             <Dropdown
            //                 ref={comp => { this.formEditRef = comp;}}
            //                 selectedKey={selectedKey}
            //                 width={width}
            //                 marginLeft={marginLeft}
            //                 currentItem={currentItem}
            //                 label={dropdownLabel}
            //                 data={data}
            //                 enable={enable}
            //             />
            //         </View>
            //     );
            // }
            if (editType === 'Datepicker') // Datepicker edit
             {
                if (!enable) {
                    return (<react_native_1.View style={[styles.container, containerStyle]}>
                            <index_1.WrapText f={'r'} st={{ marginBottom: 8 }}>{label}</index_1.WrapText>
                            <react_native_1.View style={[styles.wrapForm, styles.disableForm]}>
                                <index_1.WrapText>{value}</index_1.WrapText>
                            </react_native_1.View>
                        </react_native_1.View>);
                }
                return (<react_native_1.TouchableOpacity style={[styles.container, containerStyle, error ? { borderColor: mo_app_common_1.Color.red } : {},]} onPress={enable ? onOpenDatepicker : null}>
                        <index_1.WrapText f={'r'} st={{ marginBottom: 8 }}>{label}</index_1.WrapText>
                        <react_native_1.View style={styles.wrapForm}>
                            <index_1.WrapText>{value}</index_1.WrapText>
                            <mo_app_common_1.CustomIcon name="transaction-history" size={16} color={enable ? mo_app_common_1.Color.text : mo_app_common_1.Color.disable}/>
                        </react_native_1.View>
                        {error &&
                    <index_1.WrapText f={'r'} st={[{ marginTop: 5, color: mo_app_common_1.Color.red },]}>{emptyErrorMessage}</index_1.WrapText>}
                    </react_native_1.TouchableOpacity>);
            }
            if (editType === 'CCD') {
                if (!enable) {
                    return (<react_native_1.View style={[styles.container, containerStyle]}>
                            <index_1.WrapText f={'r'} st={{ marginBottom: 8 }}>{label}</index_1.WrapText>
                            <react_native_1.View style={[styles.wrapForm, styles.disableForm]}>
                                <index_1.WrapText>{value}</index_1.WrapText>
                            </react_native_1.View>
                        </react_native_1.View>);
                }
            }
            // if (editType === 5)
            // {
            //     return (
            //         <View style={[styles.container, containerStyle]}>
            //             { hasLabel && <WrapText type={'t-s'} textStyle={{ marginBottom: 8, lineHeight: 16, fontSize: 14 }}>{label}</WrapText>}
            //             <TouchableOpacity style={[styles.wrapForm, !enable ? styles.disableForm : {}]}
            //                 activeOpacity={0.99}
            //                 onPress={this.onCityPressHandler}>
            //                 {
            //                     hasIcon && <CustomIcon name={icon} size={15} style={{ color: color, marginRight: 12}}/>
            //                 }
            //                 <WrapText type={'label'} textStyle={{ lineHeight: 16, fontSize: 14, color: color }}>{valueByKey || placeholder}</WrapText>
            //             </TouchableOpacity>
            //             {
            //                 error &&
            //                 <WrapText type={'n'} textStyle={[{ marginTop: 5, lineHeight: 16, color: Color.red }]}>{emptyErrorMessage}</WrapText>
            //             }
            //         </View>
            //     );
            // }
        }
        if (formatType === 'column') {
            return (<react_native_1.View style={[styles.container, containerStyle]}>
                    <index_1.WrapText f={'r'} st={styles.label}>{label}</index_1.WrapText>
                    <index_1.WrapText nl={numberOfLines} f={'r'} st={styles.label}>{this.getDisplayValue()}</index_1.WrapText>
                </react_native_1.View>);
        }
        if (formatType === 'row') {
            return (<react_native_1.View style={[styles.container, styles.containerRow, containerStyle]}>
                    <index_1.WrapText f={'r'} st={[styles.label, { width: '35%' }]}>{label}</index_1.WrapText>
                    <index_1.WrapText st={[styles.label, { width: '65%' }]}>{this.getDisplayValue()}</index_1.WrapText>
                </react_native_1.View>);
        }
    }
}
exports.FormEdit = FormEdit;
FormEdit.defaultProps = {
    label: '',
    value: '',
    validRequire: true,
    emptyErrorMessage: '',
    placeholder: '',
    editStatus: false,
    readOnly: false,
    inputStyle: {},
    formatType: 'column',
    editType: 'Input',
    isUpdateType: false,
    data: [],
    item: null,
    selectLabel: '',
    validType: 'text',
    onUpdate: () => null,
    containerStyle: {},
    width: mo_app_common_1.Constants.Width,
    marginLeft: 0,
    dropdownLabel: '',
    numberOfLines: 1,
    multiLine: false,
    fieldType: '',
    selectedKey: '',
    items: [],
    autoValidate: true
};
const styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 15,
    },
    dropContainer: {
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 15
    },
    containerRow: {
        flexDirection: 'row'
    },
    label: {
        paddingVertical: 4,
        lineHeight: 16,
        fontSize: 13,
        textAlign: 'left'
    },
    wrapForm: {
        borderRadius: 5,
        borderColor: mo_app_common_1.Color.border,
        borderWidth: 1,
        height: 32,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 6
    },
    disableForm: {
        backgroundColor: mo_app_common_1.Color.disable
    }
});
//# sourceMappingURL=FormEdit.js.map