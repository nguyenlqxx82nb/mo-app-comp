"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const react_native_status_bar_height_1 = require("react-native-status-bar-height");
exports.default = react_native_1.StyleSheet.create({
    dotStyle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#fff',
        margin: 3
    },
    activeDotStyle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: mo_app_common_1.Color.primary,
        margin: 3
    },
    buttonBack: {
        position: 'absolute',
        top: react_native_status_bar_height_1.getStatusBarHeight() + 5,
        left: 5,
        width: 40,
        height: 40
    },
    contentContainer: {
        flex: 1,
        width: mo_app_common_1.Constants.Width,
        height: mo_app_common_1.Constants.Height,
        backgroundColor: 'transparent'
    },
    modalContainer: {
        width: mo_app_common_1.Constants.Width,
        backgroundColor: 'transparent',
        height: mo_app_common_1.Constants.Height,
        opacity: 0,
        elevation: 11
    },
    viewFooter: {
        width: mo_app_common_1.Constants.Width,
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row'
    },
    viewFooternumbel: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5
    }
});
//# sourceMappingURL=styles.js.map