"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
exports.default = react_native_1.StyleSheet.create({
    rowItem: {
        paddingLeft: 8, paddingRight: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 7, overflow: 'hidden'
    },
    leftRow: {
        flexDirection: 'row', alignItems: 'center',
        flex: 1,
        marginRight: 30
    },
    collapseButton: {
        width: 28,
        height: 28
    },
    checkboxButton: {
        width: 28,
        height: 28
    },
    name: {
        fontSize: 12, lineHeight: 16
    }
});
//# sourceMappingURL=styles.js.map