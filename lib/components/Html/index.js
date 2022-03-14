"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_render_html_1 = __importDefault(require("react-native-render-html"));
const react_native_auto_height_image_1 = __importDefault(require("react-native-auto-height-image"));
const HTMLUtils_1 = require("react-native-render-html/src/HTMLUtils");
const styles_1 = __importDefault(require("./styles"));
const lodash_1 = __importDefault(require("lodash"));
const mo_app_common_1 = require("mo-app-common");
const { width } = react_native_1.Dimensions.get('window');
const tags = lodash_1.default.without(HTMLUtils_1.IGNORED_TAGS, 'table', 'caption', 'col', 'colgroup', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr');
const renderers = {
    img: (htmlAttribs) => {
        const { src } = htmlAttribs;
        if (!src) {
            return false;
        }
        const newWidth = width - 28;
        return (<react_native_auto_height_image_1.default source={{ uri: src }} width={newWidth}/>);
    },
};
class WrapHTMLRender extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { html } = this.props;
        let textSize = {};
        if (mo_app_common_1.Constants.TextSize === 2) {
            textSize = { fontSize: 15, lineHeight: 19 };
        }
        return (<react_native_render_html_1.default html={html} ignoredTags={tags} ignoredStyles={['font-family', 'display', 'block', 'font-size']} renderers={renderers} imagesMaxWidth={react_native_1.Dimensions.get('window').width - 28} tagsStyles={{
            p: { ...styles_1.default.descText, ...textSize }
        }}/>);
    }
}
exports.default = WrapHTMLRender;
//# sourceMappingURL=index.js.map