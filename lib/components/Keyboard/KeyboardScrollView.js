"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardScrollView = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_keyboard_aware_scroll_view_1 = require("react-native-keyboard-aware-scroll-view");
class KeyboardScrollView extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { contentContainerStyle, style, children, extraScrollHeight } = this.props;
        return (<react_native_keyboard_aware_scroll_view_1.KeyboardAwareScrollView contentContainerStyle={contentContainerStyle ? contentContainerStyle : {}} style={style ? style : {}} showsVerticalScrollIndicator={false} extraScrollHeight={extraScrollHeight ? extraScrollHeight : react_native_1.Platform.OS === 'android' ? 150 : 120} enableOnAndroid={true} keyboardShouldPersistTaps="handled">
            {children}
        </react_native_keyboard_aware_scroll_view_1.KeyboardAwareScrollView>);
    }
}
exports.KeyboardScrollView = KeyboardScrollView;
//# sourceMappingURL=KeyboardScrollView.js.map