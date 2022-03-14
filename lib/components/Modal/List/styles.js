"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
exports.default = react_native_1.StyleSheet.create({
    shortItem: {
        marginHorizontal: 12,
        height: 32,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: mo_app_common_1.Color.border,
        borderBottomWidth: 0.5
    },
    item: { paddingLeft: 12, paddingVertical: 10, paddingRight: 12, justifyContent: 'space-between', flexDirection: 'row' }
});
//# sourceMappingURL=styles.js.map