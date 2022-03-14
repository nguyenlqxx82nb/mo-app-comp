"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
class Indicator extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.show = () => {
            this.setState({ isShow: true });
        };
        this.hide = () => {
            if (this.state.isShow) {
                this.setState({ isShow: false });
            }
        };
        this.render = () => {
            const { isShow } = this.state;
            return (isShow) ?
                <react_native_1.ActivityIndicator style={styles.indicator} color={mo_app_common_1.Color.primary} size="large"/> : <react_native_1.View />;
        };
        this.state = {
            isShow: this.props.isShow,
        };
    }
}
exports.default = Indicator;
Indicator.defaultProps = {
    isShow: false,
};
const styles = react_native_1.StyleSheet.create({
    indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
//# sourceMappingURL=index.js.map