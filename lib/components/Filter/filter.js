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
exports.FilterModal = void 0;
const react_1 = __importStar(require("react"));
// import PropTypes from 'prop-types';
const react_native_1 = require("react-native");
const index_1 = require("../index");
const mo_app_common_1 = require("mo-app-common");
const styles_1 = __importDefault(require("./styles"));
// components
const Item_1 = __importDefault(require("./Item"));
class FilterModal extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.show = () => {
            this.modalRef.show();
        };
        this.close = () => {
            if (this.modalRef) {
                this.modalRef.close();
            }
        };
        this.onApplyHandler = () => {
            const { onApply } = this.props;
            this.close();
            if (onApply) {
                const filter = this.buildFilter();
                const values = this.getValues();
                onApply(filter, values);
            }
        };
        this.onRestoreHandler = () => {
            this.close();
            if (this.props.onRestore) {
                this.props.onRestore();
            }
        };
        this.pushItemRef = (ref, index) => {
            if (this.itemRefs.length <= index && ref) {
                this.itemRefs.push(ref);
            }
        };
        this.buildFilter = () => {
            let filterObj = {};
            this.itemRefs.forEach((itemRef) => {
                const filter = itemRef.buildFilter();
                filterObj = { ...filterObj, ...filter };
            });
            return filterObj;
        };
        this.getValues = () => {
            let values = [];
            this.itemRefs.forEach((itemRef) => {
                const value = itemRef.getValue();
                values.push(value);
            });
            return values;
        };
        this.itemRefs = [];
        this.state = {};
        react_native_1.Keyboard.dismiss();
    }
    componentDidMount() { }
    render() {
        const { filterConfigs, height } = this.props;
        const heightStyle = height ? { height: height } : {};
        return (<index_1.WrapModal ref={(comp) => { this.modalRef = comp; }} autoOpen={true} overlayOpacity={0.85} position={'bottom'}>
                <react_native_1.View style={[styles_1.default.voucherContainer]}>
                    <react_native_1.View style={[styles_1.default.header]}>
                        <react_native_1.TouchableOpacity onPress={this.onRestoreHandler}>
                            <react_native_1.View style={styles_1.default.buttonWrap}>
                                <mo_app_common_1.CustomIcon name={'reset'} size={16} style={{ color: mo_app_common_1.Color.primary, marginRight: 7 }}/>
                                <index_1.WrapText> {mo_app_common_1.CommonLanguage.Restore} </index_1.WrapText>
                            </react_native_1.View>
                        </react_native_1.TouchableOpacity>

                        <react_native_1.TouchableOpacity onPress={this.onApplyHandler}>
                                <react_native_1.View style={styles_1.default.buttonWrap}>
                                <mo_app_common_1.CustomIcon name={'success'} size={16} style={{ color: mo_app_common_1.Color.primary, marginRight: 7 }}/>
                                <index_1.WrapText st={{ color: mo_app_common_1.Color.primary }}>{mo_app_common_1.CommonLanguage.Apply}</index_1.WrapText>
                            </react_native_1.View>
                        </react_native_1.TouchableOpacity>
                    </react_native_1.View>

                    <react_native_1.ScrollView style={[styles_1.default.scrollContent, heightStyle]} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {filterConfigs.map((filter, index) => {
            return <Item_1.default ref={(ref) => { this.pushItemRef(ref, index); }} key={`${index}`} {...filter}/>;
        })}
                    </react_native_1.ScrollView>
                </react_native_1.View>
            </index_1.WrapModal>);
    }
}
exports.FilterModal = FilterModal;
FilterModal.defaultProps = {
    myPoint: 2000,
    provinces: [],
};
//# sourceMappingURL=filter.js.map