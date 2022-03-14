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
const RadioGroup_1 = __importDefault(require("../RadioGroup"));
const Slider_1 = __importDefault(require("../Slider"));
const Dropdown_1 = __importDefault(require("../Dropdown"));
const CheckboxGroup_1 = __importDefault(require("../CheckboxGroup"));
const Category_1 = __importDefault(require("../Category"));
class FilterItem extends react_1.PureComponent {
    constructor(props) {
        super(props);
    }
    buildFilter() {
        return this.itemRef.buildFilter();
    }
    getValue() {
        return this.itemRef.getValue();
    }
    render() {
        const { type } = this.props;
        switch (type) {
            case 'radio':
                return (<RadioGroup_1.default {...this.props} ref={(ref) => { this.itemRef = ref; }}/>);
            case 'slider':
                return (<Slider_1.default {...this.props} ref={(ref) => { this.itemRef = ref; }}/>);
            case 'dropdown':
                return (<Dropdown_1.default {...this.props} ref={(ref) => { this.itemRef = ref; }}/>);
            case 'checkbox':
                return (<CheckboxGroup_1.default {...this.props} ref={(ref) => { this.itemRef = ref; }}/>);
            case 'category':
                return (<Category_1.default {...this.props} ref={(ref) => { this.itemRef = ref; }}/>);
            default:
                return null;
        }
    }
}
exports.default = FilterItem;
//# sourceMappingURL=index.js.map