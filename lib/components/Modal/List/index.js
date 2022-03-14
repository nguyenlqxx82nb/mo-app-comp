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
class ListModal extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.close = () => {
            const { onClose } = this.props;
            if (onClose) {
                onClose();
            }
        };
        this.itemRowRender = ({ item, index }) => {
            const { selectedKey } = this.state;
            if (item) {
                const { idKey } = this.props;
                const key = idKey ? item[idKey] : item.id;
                const isSelected = key === selectedKey ? true : false;
                // console.log('itemRowRender isSelected ', selectedKey, key );
                return (<react_native_1.TouchableOpacity style={styles_1.default.item} key={index} onPress={this.onItemPress.bind(this, item)}>
                    <index_1.WrapText f={'r'} st={{ fontSize: 12, lineHeight: 16 }}>{item.name}</index_1.WrapText>
                    {isSelected &&
                    <mo_app_common_1.CustomIcon name={'tick'} size={12} color={mo_app_common_1.Color.primary}/>}
                </react_native_1.TouchableOpacity>);
            }
            return <react_native_1.View />;
        };
        this.shortItemRowRender = ({ item, index }) => {
            const { selectedKey } = this.state;
            if (item) {
                const { idKey } = this.props;
                const key = idKey ? item[idKey] : item.id;
                const isSelected = key === selectedKey ? true : false;
                return (<react_native_1.TouchableOpacity style={styles_1.default.shortItem} key={index} onPress={this.onItemPress.bind(this, item)}>
                    <index_1.WrapText f={'r'} st={{ fontSize: 12, lineHeight: 16 }}>{item.name}</index_1.WrapText>
                    {isSelected &&
                    <mo_app_common_1.CustomIcon name={'tick'} size={12} color={mo_app_common_1.Color.primary}/>}
                </react_native_1.TouchableOpacity>);
            }
            return <react_native_1.View />;
        };
        this.onItemPress = (item) => {
            const { onSelectItem, idKey } = this.props;
            const key = !idKey ? item.id : item[idKey];
            this.setState({
                selectedKey: key
            }, () => {
                if (onSelectItem) {
                    onSelectItem(key);
                }
                this.modalRef.close();
            });
        };
        this.keyExtractor = (_item, index) => {
            return `${index}`;
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
            const { selectedKey } = this.state;
            const { onSelectItem, emptyMsg } = this.props;
            if (!selectedKey) {
                mo_app_common_1.toast(emptyMsg || 'Vui lòng chọn giá trị');
                return;
            }
            if (onSelectItem) {
                onSelectItem(selectedKey);
            }
            this.modalRef.close();
        };
        const { items, selectedKey } = this.props;
        this.state = {
            selectedKey: selectedKey,
            items: items,
            shortList: items.length < 10 ? true : false
        };
    }
    render() {
        const { containerStyle } = this.props;
        const { items, shortList } = this.state;
        return (<index_1.WrapModal ref={(comp) => { this.modalRef = comp; }} autoOpen={true} onClosed={this.close} backDropClose={true} position={'bottom'} showPos={'center'} containerStyle={containerStyle}>
                {!shortList &&
            <react_native_1.View style={{ width: mo_app_common_1.Device.ModalWidth, backgroundColor: '#fff', paddingHorizontal: 14, paddingTop: 24, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <index_1.LoginInput ref={comp => { this.searchRef = comp; }} containerStyle={{ marginTop: 0 }} placeHolder={'Tìm kiếm'} onValueChanged={this.onSearchValueChangedHandler} icon={'search1'} keyType={index_1.KeyType.next} keyboardType={index_1.KeyboardType.default}/>

                        <react_native_1.View style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }}>
                            {<react_native_1.FlatList keyboardShouldPersistTaps={'handled'} data={items} style={[{ width: '100%' }]} renderItem={this.itemRowRender} keyExtractor={this.keyExtractor} showsVerticalScrollIndicator={false} 
            //scrollEnabled={visibleItemCount < itemCount}
            contentContainerStyle={{ padding: 0 }}/>}
                            {items && !items.length &&
                <react_native_1.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    <index_1.WrapText f={'r'} st={{ color: mo_app_common_1.Color.textSecondary, fontSize: 12, lineHeight: 14 }}>{'Không có kết quả phù hợp'}</index_1.WrapText> 
                                </react_native_1.View>}
                        </react_native_1.View>
                        <react_native_1.View style={{ height: 62, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <index_1.ButtonRipple key={1} onPress={this.onSelectItemHandler} containerStyle={{ width: '50%', justifyContent: 'center', alignItems: 'center', height: 40 }} height={40} content={<index_1.WrapText st={{ color: mo_app_common_1.Color.primary, fontSize: 16, lineHeight: 20 }}> {'Hoàn tất'} </index_1.WrapText>}/>
                            <index_1.ButtonRipple key={1} onPress={() => { this.modalRef.close(); }} containerStyle={{ width: '50%', justifyContent: 'center', alignItems: 'center', height: 40 }} height={40} content={<index_1.WrapText st={{ color: mo_app_common_1.Color.textSecondary, fontSize: 16, lineHeight: 20 }}> {'Huỷ bỏ'} </index_1.WrapText>}/>
                        </react_native_1.View>
                    </react_native_1.View>}
                {shortList &&
            <react_native_1.View style={{ width: mo_app_common_1.Constants.Width - 28, backgroundColor: '#fff', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
                        <react_native_1.View style={{ width: '100%', height: 32 * items.length }}>
                            {<react_native_1.FlatList keyboardShouldPersistTaps={'handled'} data={items} style={[{ width: '100%' }]} renderItem={this.shortItemRowRender} keyExtractor={this.keyExtractor} showsVerticalScrollIndicator={false} 
            //scrollEnabled={visibleItemCount < itemCount}
            contentContainerStyle={{ padding: 0 }}/>}
                        </react_native_1.View>
                    </react_native_1.View>}
            </index_1.WrapModal>);
    }
}
exports.default = ListModal;
//# sourceMappingURL=index.js.map