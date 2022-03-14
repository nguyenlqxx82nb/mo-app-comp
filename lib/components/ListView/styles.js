"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
exports.default = react_native_1.StyleSheet.create({
    container: {
        ...mo_app_common_1.Styles.container
    },
    loadingRow: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    allItemRow: {
        paddingHorizontal: 20, height: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'
    },
    noneItem: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noneText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 13,
        lineHeight: 18,
        marginHorizontal: 15,
        color: mo_app_common_1.Color.textSecondary
    },
});
//# sourceMappingURL=styles.js.map