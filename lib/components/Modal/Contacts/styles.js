"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
exports.default = react_native_1.StyleSheet.create({
    inputWrap: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: mo_app_common_1.Color.border,
        borderBottomWidth: 0.5,
        paddingLeft: 12,
    },
    input: {
        color: mo_app_common_1.Color.text,
        height: 32,
        paddingTop: 0,
        paddingBottom: 0,
        flex: 1,
        textAlign: 'left',
        fontFamily: mo_app_common_1.Constants.fontRegular,
        fontSize: 12,
        justifyContent: 'center',
    },
    rightButton: {
        width: 30,
        height: 30
    },
    row: {
        marginHorizontal: 12,
        justifyContent: 'center',
        //alignItems: 'center',
        height: 46,
        borderBottomColor: mo_app_common_1.Color.border,
        borderBottomWidth: 0.8
    },
    contentContainer: {
        width: '100%',
        height: 46 * 5 + 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        width: mo_app_common_1.Constants.Width - 20 * 2,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noneContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
//# sourceMappingURL=styles.js.map