"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
class WrapGradient extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { children } = this.props;
        return (<react_native_linear_gradient_1.default start={{ x: 1.0, y: 0 }} end={{ x: 0, y: 1.0 }} colors={['#9AD07C', '#73C689', '#52BC95', '#44B38A', '#24AAA9', '#19A7B6']} style={{ flex: 1 }}>
                {children}
            </react_native_linear_gradient_1.default>);
    }
}
exports.default = WrapGradient;
//# sourceMappingURL=index.js.map