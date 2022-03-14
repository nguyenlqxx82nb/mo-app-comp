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
const mo_app_common_1 = require("mo-app-common");
class SelectionButton extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.setEnable = (enable) => {
            this.setState({ enable: enable });
        };
        this.setActive = (active) => {
            this.setState({ active: active });
        };
        this.getActive = () => {
            const { active } = this.state;
            return active;
        };
        this.getValue = () => {
            const { value } = this.props;
            return value;
        };
        this.onPressHandle = () => {
            const { active } = this.state;
            const { onPress } = this.props;
            this.setState({ active: !active });
            if (onPress) {
                onPress();
            }
        };
        const { enable, active } = this.props;
        this.state = {
            enable: enable,
            active: active,
        };
    }
    componentDidMount() {
        setTimeout(() => {
            const { enable } = this.props;
            this.setState({ enable: enable });
        }, 0);
    }
    render() {
        const { active } = this.state;
        const { text, containerStyle, textStyle, } = this.props;
        return (<react_native_1.TouchableOpacity style={[
            {
                marginRight: 10,
                marginTop: 10,
            },
            containerStyle,
        ]} onPress={this.onPressHandle}>
                <react_native_1.View style={[styles.container, (active) ? styles.activeContainer : {}]}>
                    <react_native_1.Text style={[
            styles.text,
            (active) ? styles.activeText : {},
            textStyle,
        ]}>
                        {text}
                    </react_native_1.Text>
                </react_native_1.View>
            </react_native_1.TouchableOpacity>);
    }
}
exports.default = SelectionButton;
// static propTypes = {
//     text: PropTypes.string,
//     onPress: PropTypes.func,
//     containerStyle: PropTypes.object,
//     textStyle: PropTypes.object,
//     enable: PropTypes.bool,
//     value: PropTypes.string,
//     rippleRound: PropTypes.bool,
//     rippleColor: PropTypes.string,
//     active: PropTypes.bool,
// };
SelectionButton.defaultProps = {
    text: '',
    enable: true,
    containerStyle: {},
    textStyle: {},
    value: '',
    rippleRound: true,
    rippleColor: mo_app_common_1.Color.light,
    active: false,
};
const styles = react_native_1.StyleSheet.create({
    wrappContainer: {
        borderRadius: 16,
        marginLeft: 10,
        marginTop: 10,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 18,
        flex: 1,
    },
    text: {
        lineHeight: 16,
        fontSize: 14,
        fontFamily: mo_app_common_1.Constants.fontMedium,
        color: mo_app_common_1.Color.text,
    },
    activeContainer: {
        borderColor: mo_app_common_1.Color.primary,
        backgroundColor: mo_app_common_1.Color.primary,
    },
    activeText: {
        color: '#fff',
    },
});
//# sourceMappingURL=SelectionButton.js.map