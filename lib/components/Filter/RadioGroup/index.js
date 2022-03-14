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
const styles_1 = __importDefault(require("../Item/styles"));
class RadioGroup extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.itemRefs = [];
        this.init = () => {
            const { data, value } = this.props;
            this.state = {
                value: value ? value : data.length ? data[0].key : ''
            };
        };
        this.onSelectedItemChangeHandler = (_active, value) => {
            this.setState({ value: value });
        };
        this.getValue = () => {
            const { value } = this.state;
            return value;
        };
        this.init();
    }
    componentDidMount() { }
    buildFilter() {
        const { buildFilter, data } = this.props;
        const { value } = this.state;
        const selectItem = data.filter((item) => {
            return item.key === value;
        });
        let filter = {};
        if (buildFilter && selectItem.length) {
            filter = buildFilter(selectItem[0]);
        }
        return filter;
    }
    render() {
        const { value } = this.state;
        const { data, title } = this.props;
        return (<react_native_1.View>
                <react_native_1.View style={styles_1.default.filterHeader}>
                    <index_1.WrapText>{title}</index_1.WrapText>
                </react_native_1.View>
                <react_native_1.View style={[styles_1.default.containerFilterItem, { paddingVertical: 8 }]}>
                    {data.map((item, index) => {
            const active = item.key === value;
            return (<index_1.Radio labelLeft={item.name} value={item.key} active={active} key={`${index}`} ref={(ref) => { this.itemRefs.length <= index && this.itemRefs.push(ref); }} radioItems={this.itemRefs} onSelectedChange={this.onSelectedItemChangeHandler} containerStyle={{ justifyContent: 'space-between' }}/>);
        })}
                </react_native_1.View>
            </react_native_1.View>);
    }
}
exports.default = RadioGroup;
RadioGroup.defaultProps = {
    data: []
};
//# sourceMappingURL=index.js.map