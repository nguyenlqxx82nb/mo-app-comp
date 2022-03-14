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
class RadioModal extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.getCurrIndex = () => {
            const { selectedKey, items } = this.props;
            let currIndex = 0;
            if (!selectedKey || !items) {
                return currIndex;
            }
            items.forEach((item, index) => {
                if (item.key === selectedKey) {
                    currIndex = index;
                }
            });
            return currIndex;
        };
        this.close = () => {
            const { onClose } = this.props;
            this.setState({ visible: false });
            if (onClose) {
                onClose();
            }
            setTimeout(() => {
                react_native_1.DeviceEventEmitter.emit(mo_app_common_1.Constants.EmitCode.PopModal);
            }, 150);
        };
        this.onSelectItemHandler = (selectedIndex) => {
            const { items } = this.props;
            items.map((item, index) => {
                if (index === selectedIndex) {
                    item.selected = true;
                    item.ref.setType('solid');
                }
                else {
                    item.selected = false;
                    item.ref.setType('none');
                }
                return item;
            });
            this.setState({
                currIndex: selectedIndex
            });
        };
        this.onSelectCompleteHandler = () => {
            const { onSelectItem, items } = this.props;
            const { currIndex } = this.state;
            if (onSelectItem) {
                onSelectItem(items[currIndex].key);
            }
            this.close();
        };
        this.state = {
            visible: props.visible,
            currIndex: this.getCurrIndex()
        };
    }
    render() {
        const { items, containerStyle } = this.props;
        const { currIndex } = this.state;
        return (<index_1.WrapModal ref={(comp) => { this.modalRef = comp; }} autoOpen={true} onClosed={this.close} backDropClose={true} position={'bottom'} showPos={'center'} containerStyle={containerStyle}>
                <react_native_1.View style={{ width: mo_app_common_1.Device.ModalWidth, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 24, paddingBottom: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                    {items &&
            items.map((item, index) => {
                return (<index_1.WrapButton ref={ref => { item.ref = ref; }} key={index} type={index === currIndex ? 'solid' : 'none'} textColor={index === currIndex ? '#fff' : mo_app_common_1.Color.text} containerStyle={{ marginTop: 0 }} text={item.name} textStyle={{ fontSize: 18, lineHeight: 24 }} onPress={() => {
                    this.onSelectItemHandler(index);
                }}/>);
            })}
                    <index_1.WrapButton type={'none'} containerStyle={{ marginTop: 10 }} textStyle={{ fontSize: 20, lineHeight: 24 }} onPress={this.onSelectCompleteHandler} text={'Hoàn tất'}/>
                </react_native_1.View>
            </index_1.WrapModal>);
    }
}
exports.default = RadioModal;
//# sourceMappingURL=index.js.map