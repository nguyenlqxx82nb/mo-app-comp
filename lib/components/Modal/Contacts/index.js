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
const index_1 = require("../../index");
const mo_app_common_1 = require("mo-app-common");
const styles_1 = __importDefault(require("./styles"));
class ContactsModal extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.close = () => {
            const { onClose } = this.props;
            if (onClose) {
                onClose();
            }
        };
        this.itemRowRender = ({ item }) => {
            if (item) {
                const { idKey } = this.props;
                const key = idKey ? item[idKey] : item.id;
                return (<react_native_1.TouchableOpacity style={styles_1.default.row} onPress={this.onItemPress.bind(this, item)} key={key}>
                    <index_1.WrapText f={'r'} st={{ fontSize: 12, lineHeight: 16 }}>{item.name}</index_1.WrapText>
                    <index_1.WrapText f={'r'} st={{ fontSize: 12, lineHeight: 16, marginTop: 2 }}>{item.phone}</index_1.WrapText>
                </react_native_1.TouchableOpacity>);
            }
            return <react_native_1.View />;
        };
        this.onItemPress = (item) => {
            const { onItemSelected } = this.props;
            this.modalRef.close();
            if (onItemSelected) {
                onItemSelected(item.id, item);
            }
        };
        this.keyExtractor = (_item, index) => {
            return `${index}`;
        };
        this.searchItems = (searchValue) => {
            const { items } = this.props;
            const search = searchValue ? mo_app_common_1.Utils.removeSign(searchValue.toLowerCase()) : '';
            const newItems = items.filter((item) => {
                if (!search || search === '') {
                    return true;
                }
                const name = mo_app_common_1.Utils.removeSign(item.name.toLowerCase());
                const phone = mo_app_common_1.Utils.removeSign(item.id.toLowerCase());
                return name.includes(search) || phone.includes(search);
            });
            this.setState({
                items: newItems
            });
        };
        this.onSubmitHandler = () => {
            const { value } = this.state;
            const { onSubmit } = this.props;
            this.modalRef.close();
            // if (!value) {
            //     toast('Vui lòng nhập số điện thoại');
            // }
            if (onSubmit) {
                onSubmit(value);
            }
        };
        this.onValueEditHandler = (value) => {
            const { onValueChanged } = this.props;
            this.setState({ value: value });
            this.searchItems(value);
            if (onValueChanged) {
                onValueChanged(value);
            }
        };
        this.onClearInputTextHandler = () => {
            this.setState({ value: '' });
            this.searchItems('');
        };
        this.onModalShowCompletedHandler = () => {
            const { autoFocus } = this.props;
            if (autoFocus) {
                setTimeout(() => {
                    this.input && this.input.focus();
                }, 50);
            }
        };
        const { items, selectedKey } = this.props;
        this.state = {
            selectedKey: selectedKey,
            items: items,
            value: selectedKey
        };
    }
    componentDidMount() {
        setTimeout(() => {
            const { selectedKey } = this.props;
            this.searchItems(selectedKey);
        }, 0);
    }
    render() {
        const { containerStyle, placeholder } = this.props;
        const { items, value } = this.state;
        const hasRemove = value ? true : false;
        return (<index_1.WrapModal ref={(comp) => { this.modalRef = comp; }} autoOpen={true} onClosed={this.close} backDropClose={true} position={'bottom'} showPos={'center'} onShowCompleted={this.onModalShowCompletedHandler} containerStyle={containerStyle}>
                <react_native_1.View style={styles_1.default.container}>
                    <react_native_1.View style={styles_1.default.inputWrap}>
                        <react_native_1.TextInput style={[styles_1.default.input]} underlineColorAndroid="transparent" placeholderTextColor={mo_app_common_1.Color.textSecondary} ref={(comp) => (this.input = comp)} placeholder={placeholder} onChangeText={this.onValueEditHandler} onSubmitEditing={this.onSubmitHandler} value={value} keyboardType={'default'} returnKeyType={'done'}/>
                        {hasRemove &&
            <react_native_1.View style={styles_1.default.rightButton}>
                                <index_1.ButtonRipple name={'clear_text'} size={9} color={mo_app_common_1.Color.text} onPress={this.onClearInputTextHandler}/>
                            </react_native_1.View>}
                    </react_native_1.View>

                    <react_native_1.View style={styles_1.default.contentContainer}>
                        {<react_native_1.FlatList keyboardShouldPersistTaps={'handled'} data={items} style={[{ width: '100%' }]} renderItem={this.itemRowRender} keyExtractor={this.keyExtractor} showsVerticalScrollIndicator={false} 
        //scrollEnabled={visibleItemCount < itemCount}
        contentContainerStyle={{ padding: 0 }}/>}
                        {items && !items.length &&
            <react_native_1.View style={styles_1.default.noneContainer}>
                                <index_1.WrapText st={{ color: mo_app_common_1.Color.textSecondary, fontSize: 12, lineHeight: 14 }}>{'Không có kết quả phù hợp'}</index_1.WrapText> 
                            </react_native_1.View>}
                    </react_native_1.View>
                </react_native_1.View>
            </index_1.WrapModal>);
    }
}
exports.default = ContactsModal;
ContactsModal.defaultProps = {
    placeholder: 'Số điện thoại',
    autoFocus: true
};
//# sourceMappingURL=index.js.map