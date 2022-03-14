"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../index");
const styles_1 = __importDefault(require("./styles"));
class Checkbox extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.toggleActive = () => {
            const { active } = this.state;
            const { onActiveChange, value } = this.props;
            if (onActiveChange) {
                onActiveChange(!active, value);
            }
            this.setState({ active: !active });
        };
        this.setActive = (active) => {
            this.setState({ active: active });
        };
        this.getActive = () => {
            const { active } = this.state;
            return active;
        };
        this.getValue = () => {
            return this.props.value;
        };
        this.state = {
            active: this.props.active,
        };
    }
    render() {
        const { active } = this.state;
        const { labelLeft, labelRight, textStyle, containerStyle } = this.props;
        return (<react_native_1.TouchableOpacity onPress={this.toggleActive.bind(this)}>
                <react_native_1.View style={[styles_1.default.container, containerStyle]}>
                    {labelLeft && <index_1.WrapText st={[textStyle, { marginRight: 10 }]}>{labelLeft}</index_1.WrapText>}
                    {!active &&
            <mo_app_common_1.CustomIcon name={'empty_checkbox'} size={14} style={{ color: mo_app_common_1.Color.text }}/>}
                    {active &&
            <mo_app_common_1.CustomIcon name={'checked_checkbox'} size={14} style={{ color: mo_app_common_1.Color.primary }}/>}
                    {labelRight && <index_1.WrapText st={[textStyle, { marginLeft: 10 }]}>{labelRight}</index_1.WrapText>}
                </react_native_1.View>
            </react_native_1.TouchableOpacity>);
    }
}
exports.default = Checkbox;
Checkbox.defaultProps = {
    active: false,
    value: '',
    textStyle: {},
    containerStyle: {},
};
//# sourceMappingURL=index.js.map