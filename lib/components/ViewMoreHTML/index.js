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
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const { width } = react_native_1.Dimensions.get('window');
class ViewMoreHTML extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.onLayout = (event) => {
            const { minHeight } = this.props;
            const { height } = event.nativeEvent.layout;
            // console.log('view more text ', height, minHeight);
            if (height < minHeight - 1) {
                this.setState({
                    shouldShowMore: false,
                });
                return;
            }
        };
        this.onPressSeeMore = () => {
            this.setState({
                textMore: !this.state.textMore,
            });
        };
        this.state = {
            shouldShowMore: true,
            textMore: false
        };
    }
    render() {
        const { textHTML, minHeight } = this.props;
        const { shouldShowMore, textMore } = this.state;
        return (<react_native_1.View>
                <react_native_1.View style={{ maxHeight: textMore ? 10000 : minHeight, overflow: 'hidden', width: width - 28, marginBottom: 5 }} onLayout={this.onLayout}>
                    <index_1.WrapHTMLRender html={textHTML}/>
                </react_native_1.View>
                {shouldShowMore ?
            <react_native_gesture_handler_1.TouchableOpacity style={styles_1.default.buttonContainer} onPress={this.onPressSeeMore}>
                        <index_1.WrapText c={mo_app_common_1.Color.primary}>{textMore ? mo_app_common_1.CommonLanguage.Compact : mo_app_common_1.CommonLanguage.ViewMore}</index_1.WrapText>
                    </react_native_gesture_handler_1.TouchableOpacity> : <react_native_1.View />}
            </react_native_1.View>);
    }
}
ViewMoreHTML.defaultProps = {
    minHeight: 250
};
exports.default = ViewMoreHTML;
//# sourceMappingURL=index.js.map