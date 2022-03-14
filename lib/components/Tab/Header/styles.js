"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const styles = react_native_1.StyleSheet.create({
    container: {
        width: mo_app_common_1.Constants.Width,
        height: 44,
        position: 'absolute',
        top: mo_app_common_1.Constants.HeaderHeight,
        left: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        opacity: 1,
    },
    tabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: mo_app_common_1.Constants.Width / 2,
    },
    tabText: {
        fontSize: 16,
        fontFamily: mo_app_common_1.Constants.fontMedium,
        color: mo_app_common_1.Color.textSecondary,
        lineHeight: 22,
        marginTop: 5
    },
    textActive: {
        color: mo_app_common_1.Color.primary,
    },
    underline: {
        position: 'absolute',
        height: 4,
        width: 40,
        borderRadius: 2,
        backgroundColor: mo_app_common_1.Color.primary,
        bottom: 0,
        left: mo_app_common_1.Constants.Width / 4 - 20,
    },
    badge: {
        backgroundColor: mo_app_common_1.Color.red,
        paddingHorizontal: 4,
        height: 14,
        borderRadius: 7,
        // position: 'absolute',
        // top: 0,
        // right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 2
    }
});
exports.default = styles;
//# sourceMappingURL=styles.js.map