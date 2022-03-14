"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const index_1 = require("../index");
const mo_app_common_1 = require("mo-app-common");
const styles_1 = __importDefault(require("./styles"));
class RadioButton extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.toggleActive = () => {
            const { active } = this.state;
            const { onSelectedChange, value, radioItems } = this.props;
            if (active) {
                return;
            }
            if (onSelectedChange) {
                onSelectedChange(!active, value);
            }
            radioItems.forEach((item) => {
                if (item && (item.getValue() !== value)) {
                    item.setActive(false);
                }
            });
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
            <mo_app_common_1.CustomIcon name={'empty_radio'} size={14} style={{ color: mo_app_common_1.Color.text }}/>}
                    {active &&
            <mo_app_common_1.CustomIcon name={'selected_radio'} size={14} style={{ color: mo_app_common_1.Color.primary }}/>}
                    {labelRight && <index_1.WrapText st={[textStyle, { marginLeft: 10 }]}>{labelRight}</index_1.WrapText>}
                </react_native_1.View>
            </react_native_1.TouchableOpacity>);
    }
}
exports.default = RadioButton;
// static propTypes = {
//     active: PropTypes.bool,
//     value: PropTypes.string,
//     onActiveChange: PropTypes.func,
//     labelRight: PropTypes.string,
//     labelLeft: PropTypes.string,
//     textStyle: PropTypes.object,
//     containerStyle: PropTypes.object,
//     radioItems: PropTypes.array,
// }
RadioButton.defaultProps = {
    active: false,
    value: '',
    textStyle: {},
    containerStyle: {},
    radioItems: [],
};
//# sourceMappingURL=index.js.map