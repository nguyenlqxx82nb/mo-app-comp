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
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const index_1 = require("../../index");
const mo_app_common_1 = require("mo-app-common");
// const identify_data = [
//     {
//         key: 'CCCD',
//         name: 'Căn cước công dân',
//     },
//     {
//         key: 'CMND',
//         name: 'Chứng minh nhân dân',
//     },
//     {
//         key: 'PASSPORT',
//         name: 'Hộ chiếu',
//     },
//     {
//         key: 'GPLX',
//         name: 'Giấy phép lái xe',
//     },
//     {
//         key: 'CMNDQD',
//         name: 'Chứng minh thư quân đội',
//     },
// ];
class CccdModal extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.close = () => {
            const { onClose } = this.props;
            if (onClose) {
                onClose();
            }
        };
        this.getPlaceholder = (type) => {
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
        this.itemRowRender = ({ item }) => {
            const { selectedKey } = this.state;
            if (item) {
                const { idKey } = this.props;
                const key = idKey ? item[idKey] : item.id;
                const isSelected = key === selectedKey ? true : false;
                return (<react_native_1.TouchableOpacity style={{ paddingLeft: 12, paddingVertical: 10, paddingRight: 12, justifyContent: 'space-between', flexDirection: 'row' }} onPress={this.onItemPress.bind(this, item)}>
                    <index_1.WrapText st={{ fontSize: 12, lineHeight: 16 }}>{item.name}</index_1.WrapText>
                    {isSelected &&
                    <mo_app_common_1.CustomIcon name={'tick'} size={12} color={mo_app_common_1.Color.primary}/>}
                </react_native_1.TouchableOpacity>);
            }
            return <react_native_1.View />;
        };
        this.onItemPress = (item) => {
            const { idKey } = this.props;
            const key = !idKey ? item.id : item[idKey];
            this.setState({
                selectedKey: key
            });
        };
        this.keyExtractor = (_item, index) => {
            return `${index}`;
        };
        this.onSelectCompleteHandler = () => {
            const { onSelectItemChanged, items } = this.props;
            const { currIndex } = this.state;
            react_native_1.Keyboard.dismiss();
            if (onSelectItemChanged) {
                onSelectItemChanged(items[currIndex]);
            }
            this.close();
        };
        this.onSearchValueChangedHandler = (searchValue) => {
            const { items } = this.props;
            const newItems = items.filter((item) => {
                if (!searchValue || searchValue === '') {
                    return true;
                }
                return mo_app_common_1.Utils.removeSign(item.name.toLowerCase()).includes(mo_app_common_1.Utils.removeSign(searchValue.toLowerCase()));
            });
            this.setState({
                items: newItems
            });
        };
        this.onSelectItemHandler = () => {
            react_native_1.Keyboard.dismiss();
            const { onSelectItem } = this.props;
            const value = this.valueRef.getValue();
            const { type } = this.state;
            if (!value) {
                switch (type) {
                    case 'GPLX':
                        mo_app_common_1.toast('Vui lòng nhập giấy phép lại xe');
                        break;
                    case 'PASSPORT':
                        mo_app_common_1.toast('Vui lòng nhập hộ chiếu');
                        break;
                    case 'CMND':
                        mo_app_common_1.toast('Vui lòng nhập chứng minh nhân dân');
                        break;
                    case 'CCCD':
                        mo_app_common_1.toast('Vui lòng nhập căn cước công dân');
                        break;
                    case 'CMNDQD':
                        mo_app_common_1.toast('Vui lòng nhập chứng minh thư quân đội');
                        break;
                    default:
                        break;
                }
                return;
            }
            const newValue = value.trim().replace(/\s/g, '');
            if (newValue.length < 6 || newValue.length > 12) {
                switch (type) {
                    case 'GPLX':
                        mo_app_common_1.toast('Giấy phép lại xe không hợp lệ');
                        break;
                    case 'PASSPORT':
                        mo_app_common_1.toast('Hộ chiếu không hợp lệ');
                        break;
                    case 'CMND':
                        mo_app_common_1.toast('Chứng minh nhân dân không hợp lệ');
                        break;
                    case 'CCCD':
                        mo_app_common_1.toast('Căn cước công dân không hợp lệ');
                        break;
                    case 'CMNDQD':
                        mo_app_common_1.toast('Chứng minh thư quân đội không hợp lệ');
                        break;
                    default:
                        break;
                }
                return;
            }
            if (onSelectItem) {
                // console.log('onSelectItem ', type, newValue);
                onSelectItem(type, newValue);
            }
            this.modalRef.close();
        };
        this.onSelectTypeHandler = (type) => {
            setTimeout(() => {
                this.valueRef.setValue('');
                const placeholder = this.getPlaceholder(type);
                this.setState({ type: type, placeholder: placeholder });
            }, 10);
        };
        const { type, value } = this.props;
        const _type = type ? type : 'CCCD';
        this.state = {
            value: value,
            type: _type,
            placeholder: this.getPlaceholder(_type)
        };
    }
    render() {
        const { containerStyle, value } = this.props;
        const { placeholder } = this.state;
        return (<index_1.WrapModal ref={(comp) => { this.modalRef = comp; }} autoOpen={true} onClosed={this.close} backDropClose={true} position={'bottom'} showPos={'center'} containerStyle={containerStyle}>
                <react_native_1.TouchableOpacity style={{ width: mo_app_common_1.Device.ModalWidth, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingHorizontal: 14, paddingTop: 24, borderRadius: 10 }} onPress={() => { }}>
                    
                    <index_1.LoginInput ref={comp => { this.valueRef = comp; }} containerStyle={{ marginTop: 18 }} placeHolder={placeholder} text={value} 
        // onValueChanged={this.onSearchValueChangedHandler}
        // icon={'search1'}
        keyType={index_1.KeyType.next} keyboardType={index_1.KeyboardType.default}/>

                    <react_native_1.View style={{ height: 62, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <index_1.ButtonRipple key={1} onPress={this.onSelectItemHandler} containerStyle={{ width: '50%', justifyContent: 'center', alignItems: 'center', height: 40 }} height={40} content={<index_1.WrapText st={{ color: mo_app_common_1.Color.primary, fontSize: 16, lineHeight: 20 }}> {'Hoàn tất'} </index_1.WrapText>}/>
                        <index_1.ButtonRipple key={2} onPress={() => { react_native_1.Keyboard.dismiss(); this.modalRef.close(); }} containerStyle={{ width: '50%', justifyContent: 'center', alignItems: 'center', height: 40 }} height={40} content={<index_1.WrapText st={{ color: mo_app_common_1.Color.textSecondary, fontSize: 16, lineHeight: 20 }}> {'Huỷ bỏ'} </index_1.WrapText>}/>
                    </react_native_1.View>
                </react_native_1.TouchableOpacity>
            </index_1.WrapModal>);
    }
}
exports.default = CccdModal;
//# sourceMappingURL=index.js.map