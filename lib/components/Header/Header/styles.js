"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEADER_HEIGHT = exports.BUTTON_HEIGHT = exports.HEADER_CONTENT_HEIGHT = void 0;
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const react_native_status_bar_height_1 = require("react-native-status-bar-height");
exports.HEADER_CONTENT_HEIGHT = 45;
exports.BUTTON_HEIGHT = 40;
exports.HEADER_HEIGHT = react_native_status_bar_height_1.getStatusBarHeight() + exports.HEADER_CONTENT_HEIGHT;
exports.default = react_native_1.StyleSheet.create({
    container: { width: '100%', justifyContent: 'flex-end', position: 'absolute', top: 0, left: 0 },
    bgContainer: {
        width: '100%',
        zIndex: 0,
        justifyContent: 'flex-start',
    },
    bgContainerTop: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 2,
        backgroundColor: '#fff',
        height: exports.HEADER_HEIGHT,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // height: HEADER_CONTENT_HEIGHT,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 2,
    },
    title: {
        fontSize: 18,
        color: mo_app_common_1.Color.primary,
        fontFamily: mo_app_common_1.Constants.fontMedium,
    },
    leftButtonPanel: {
        width: exports.BUTTON_HEIGHT,
        height: exports.BUTTON_HEIGHT,
        left: 5,
        top: (exports.HEADER_CONTENT_HEIGHT - exports.BUTTON_HEIGHT) / 2,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    leftButton: {
        width: exports.BUTTON_HEIGHT,
        height: exports.BUTTON_HEIGHT,
        marginRight: 20,
        borderRadius: exports.BUTTON_HEIGHT / 2,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    rightButtonPanel: {
        width: exports.BUTTON_HEIGHT,
        height: exports.BUTTON_HEIGHT,
        right: 5,
        top: (exports.HEADER_CONTENT_HEIGHT - exports.BUTTON_HEIGHT) / 2,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    rightButton: {
        width: exports.BUTTON_HEIGHT,
        height: exports.BUTTON_HEIGHT,
        marginLeft: 0,
    },
    searchContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    filterButton: {
        borderRadius: 15,
        paddingVertical: 7,
        paddingHorizontal: 10,
        marginLeft: 10,
        marginRight: 8,
        borderWidth: 1,
        borderColor: mo_app_common_1.Color.border,
        flexDirection: 'row',
    },
    filterText: {
        fontSize: 14,
        lineHeight: 16,
        color: mo_app_common_1.Color.text,
        fontFamily: mo_app_common_1.Constants.fontMedium,
    },
    searchInputWrapp: {
        flex: 1,
        height: 32,
        borderRadius: 16,
        backgroundColor: mo_app_common_1.Color.light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingRight: 5,
        marginLeft: 15,
    },
    searchInput: {
        height: 30,
        marginTop: 0,
        marginLeft: 0,
        paddingHorizontal: 0,
        paddingTop: 0,
        paddingBottom: 0,
        flex: 1,
        textAlign: 'left',
        fontFamily: mo_app_common_1.Constants.fontRegular,
        paddingRight: 0,
        color: mo_app_common_1.Color.text,
    },
    filterCancelButton: {
        marginLeft: 8,
        marginRight: 10,
        height: 30,
        justifyContent: 'center',
    },
    wrapTitle: {
        width: mo_app_common_1.Constants.Width - 90,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    clearButton: {
        width: 30,
        height: 30,
    },
    badge: {
        backgroundColor: mo_app_common_1.Color.red,
        paddingHorizontal: 5,
        paddingVertical: 0,
        borderRadius: 12,
        // marginBottom: 5,
        // position: 'absolute',
        // top: 0,
        // right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 2
    }
});
//# sourceMappingURL=styles.js.map