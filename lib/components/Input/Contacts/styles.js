"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
exports.default = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 14
    },
    dropContainer: {
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 15
    },
    containerRow: {
        flexDirection: 'row'
    },
    label: {
        paddingVertical: 4,
        lineHeight: 16,
        fontSize: 13,
        textAlign: 'left'
    },
    wrapForm: {
        height: 32,
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 12,
        paddingRight: 6,
        width: mo_app_common_1.Constants.Width - 2 * 14 - 40 - 12,
    },
    rowContent: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: mo_app_common_1.Color.border,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    disableForm: {
        backgroundColor: mo_app_common_1.Color.disable
    },
    clearButton: {
        width: 32,
        height: 32,
        position: 'absolute',
        right: 0
    },
});
//# sourceMappingURL=styles.js.map