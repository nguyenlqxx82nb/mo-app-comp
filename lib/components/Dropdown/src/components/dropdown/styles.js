"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
exports.default = react_native_1.StyleSheet.create({
    accessory: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...react_native_1.StyleSheet.absoluteFillObject,
    },
    picker: {
        backgroundColor: 'rgba(255, 255, 255, 1.0)',
        borderRadius: 4,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        position: 'absolute',
        ...react_native_1.Platform.select({
            ios: {
                shadowRadius: 2,
                shadowColor: 'rgba(0, 0, 0, 1.0)',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 1 },
            },
            android: {
                shadowRadius: 2,
                shadowColor: 'rgba(0, 0, 0, 1.0)',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 1 },
                elevation: 2,
            },
        }),
    },
    item: {
        textAlign: 'left',
    },
    scroll: {
        flex: 1,
        borderRadius: 2,
    },
    scrollContainer: {
        paddingVertical: 0,
    },
    menuDropdown: {
        height: 30,
        width: '100%',
        paddingLeft: 16,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: mo_app_common_1.Color.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    menuOpen: {
        borderWidth: 0,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        ...react_native_1.Platform.select({
            ios: {
                shadowRadius: 2,
                shadowColor: 'rgba(0, 0, 0, 1.0)',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 1 }
            },
            android: {
                shadowRadius: 2,
                shadowColor: 'rgba(0, 0, 0, 1.0)',
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 1 },
                elevation: 2,
            },
        }),
    },
    container: {
        flex: 1
    }
});
//# sourceMappingURL=styles.js.map