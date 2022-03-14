"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
exports.default = react_native_1.StyleSheet.create({
    formInputWrap: {
        // paddingHorizontal : 15,
        marginBottom: 15,
        flexDirection: 'column',
        width: '100%',
    },
    inputWrap: {
        width: '100%',
        borderRadius: 5,
        borderColor: mo_app_common_1.Color.border,
        borderWidth: 1,
        paddingLeft: 12,
        paddingRight: 6,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 0,
        flexDirection: 'row',
    },
    formInput: {
        fontSize: 14,
        fontFamily: mo_app_common_1.Constants.fontMedium,
        color: mo_app_common_1.Color.text,
        lineHeight: 16,
        height: 32,
        width: '100%',
        borderWidth: 0,
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    rightButton: {
        marginLeft: 0,
        width: 30,
        height: 30,
        marginRight: -5,
    },
    updateButton: {
        height: 32,
        marginRight: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionInput: {
        height: 85,
    },
});
//# sourceMappingURL=styles.js.map