"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapText = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const WrapText = (props) => {
    let styleFontSize = {};
    // Neu la font to
    if (mo_app_common_1.Constants.TextSize === 2) {
        let fontSize = getFontSize(props.st) || 14;
        fontSize += 2;
        styleFontSize = { fontSize: fontSize, lineHeight: fontSize + 6 };
    }
    let fixStyle = {};
    fixStyle = { ...getFont(props), ...getSize(props), ...getColor(props) };
    return (<react_native_1.Text style={[styles.labelText, fixStyle, props.st || {}, styleFontSize]} numberOfLines={props.nl || 1} allowFontScaling={true} {...props}>
        {props.children ? props.up ? props.children.toUpperCase() : props.children : ''}
    </react_native_1.Text>);
};
exports.WrapText = WrapText;
const getFontSize = (styles) => {
    if (!styles) {
        return styles;
    }
    let fontSize;
    if (styles instanceof Array) {
        styles.forEach(style => {
            if (style.fontSize) {
                fontSize = style.fontSize;
            }
        });
        return fontSize;
    }
    if (styles.fontSize) {
        fontSize = styles.fontSize;
    }
    return fontSize;
};
const getFont = (props) => {
    const f = props.f;
    if (!f) {
        return {};
    }
    if (f === 'b') {
        return { fontFamily: mo_app_common_1.Constants.fontBold };
    }
    if (f === 'm') {
        return { fontFamily: mo_app_common_1.Constants.fontMedium };
    }
    if (f === 'r') {
        return { fontFamily: mo_app_common_1.Constants.fontRegular };
    }
    return {};
};
const getSize = (props) => {
    const s = props.s;
    if (!s) {
        return {};
    }
    return { fontSize: s, lineHeight: props.lh ? props.lh : s + 6 };
};
const getColor = (props) => {
    const c = props.c;
    if (!c) {
        return {};
    }
    return { color: c };
};
const styles = react_native_1.StyleSheet.create({
    labelText: {
        color: mo_app_common_1.Color.text,
        backgroundColor: 'transparent',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'left',
        width: undefined,
        fontFamily: mo_app_common_1.Constants.fontMedium,
    },
});
//# sourceMappingURL=index.js.map