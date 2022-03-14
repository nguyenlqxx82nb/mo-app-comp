"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const styles = react_native_1.StyleSheet.create({
    tabbar: {
        height: mo_app_common_1.Device.ToolbarHeight + 45,
        paddingBottom: mo_app_common_1.Device.ToolbarHeight,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 7,
        elevation: 5,
        zIndex: 20
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
        // ...Platform.select({
        //   ios: {
        //     justifyContent: Device.isIphoneX ? 'flex-start' : 'center',
        //     paddingTop: Device.isIphoneX ? 12 : 0,
        //   },
        //   android: {
        //     justifyContent: 'center',
        //   },
        // }),
    },
    tabLabel: {
        fontFamily: mo_app_common_1.Constants.fontMedium,
        fontSize: 10,
        color: mo_app_common_1.Color.textSecondary,
        marginTop: 2
    },
    topDivider: {
        height: 4,
        backgroundColor: '#fff',
        borderRadius: 2,
        width: 30,
    },
    qrButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: -35
    },
    qrButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: mo_app_common_1.Color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: mo_app_common_1.Color.primary,
        zIndex: 10,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2.22,
        elevation: 3,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBottom: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    }
});
exports.default = styles;
//# sourceMappingURL=style.js.map