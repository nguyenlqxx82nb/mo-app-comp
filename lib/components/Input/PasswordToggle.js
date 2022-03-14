"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mo_app_common_1 = require("mo-app-common");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const index_1 = require("../index");
class PasswordToggle extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.componentDidMount = () => {
        };
        this.onChangeShow = () => {
            const { onActive } = this.props;
            const { active } = this.state;
            const newActive = !active;
            // console.log('onChangeShow ', active, newActive);
            this.setState({ active: newActive });
            if (onActive) {
                onActive(newActive);
            }
        };
        this.state = {
            active: true,
        };
    }
    render() {
        const { active } = this.state;
        const color = this.props.color || mo_app_common_1.Color.text;
        return (<react_native_1.View style={{ position: 'absolute', right: 5, top: 0 }}>
            {active &&
            <react_native_1.View style={{ width: 32, height: 32 }}>
                    <index_1.ButtonRipple name={'show_info'} size={20} color={color} onPress={this.onChangeShow.bind(this)}/>
                </react_native_1.View>}
            {!active &&
            <react_native_1.View style={{ width: 32, height: 32 }}>
                    <index_1.ButtonRipple name={'hide_info'} size={20} color={color} onPress={this.onChangeShow.bind(this)}/>
                </react_native_1.View>}
            </react_native_1.View>);
    }
}
exports.default = PasswordToggle;
//# sourceMappingURL=PasswordToggle.js.map