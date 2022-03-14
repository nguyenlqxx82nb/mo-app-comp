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
// import PropTypes from 'prop-types';
const react_native_1 = require("react-native");
// import { Dropdown } from '../../index';
// import { Constants } from 'mo-app-common';
const styles_1 = __importDefault(require("../Item/styles"));
class DropdownFilter extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.buildFilter = () => {
            const { buildFilter } = this.props;
            if (!buildFilter) {
                return {};
            }
            const value = this.getValue();
            return buildFilter(value);
        };
        this.getValue = () => {
            return this.ref.getValue();
        };
        this.state = {
            value: ''
        };
    }
    componentDidMount() { }
    render() {
        // const { data, keyField, defaultLabel, value} = this.props;
        return (<react_native_1.View>
                <react_native_1.View style={[styles_1.default.containerFilterItem]}>
                    
                </react_native_1.View>
            </react_native_1.View>);
    }
}
exports.default = DropdownFilter;
DropdownFilter.defaultProps = {
    data: []
};
//# sourceMappingURL=index.js.map