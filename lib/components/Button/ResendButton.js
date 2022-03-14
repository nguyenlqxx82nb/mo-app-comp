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
const index_1 = require("../index");
class ResendButton extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this._timeRemaining = 60;
        this.startTimeRemaining = () => {
            const { duration, buttonRemainingText } = this.props;
            this._timeRemaining = duration;
            this.setState({ resendPass: buttonRemainingText.replace('{time}', this._timeRemaining + '') });
            this.calcTimeRemaining();
        };
        this.calcTimeRemaining = () => {
            const { buttonText, buttonRemainingText } = this.props;
            if (this && this.sendPassBtn) {
                if (this._timeRemaining > 0) {
                    this.sendPassBtn.setEnable(false);
                    setTimeout(() => {
                        if (this && this.sendPassBtn) {
                            this._timeRemaining -= 1;
                            this.setState({ resendPass: buttonRemainingText.replace('{time}', this._timeRemaining + '') });
                            this.calcTimeRemaining();
                        }
                    }, 1000);
                }
                else {
                    this.sendPassBtn.setEnable(true);
                    this.setState({ resendPass: buttonText });
                }
            }
        };
        this.onPressHandler = () => {
            const { onPress } = this.props;
            if (onPress) {
                onPress();
            }
        };
        this._timeRemaining = this.props.duration;
        this.state = {
            resendPass: '',
        };
    }
    shouldComponentUpdate() {
        react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
        return true;
    }
    componentDidMount() { }
    render() {
        const { resendPass } = this.state;
        const { containerStyle, loading } = this.props;
        return (<index_1.WrapButton ref={comp => { this.sendPassBtn = comp; }} text={resendPass} type={'border'} containerStyle={containerStyle} loading={loading} onPress={this.onPressHandler}/>);
    }
}
// static propTypes = {
//     duration: PropTypes.number,
//     buttonText : PropTypes.string,
//     buttonRemainingText: PropTypes.string,
//     onPress : PropTypes.func
// };
ResendButton.defaultProps = {
    duration: 60,
    onPress: null,
    buttonText: mo_app_common_1.CommonLanguage.ResendPass,
    buttonRemainingText: mo_app_common_1.CommonLanguage.ResendPassRemaining
};
exports.default = ResendButton;
//# sourceMappingURL=ResendButton.js.map