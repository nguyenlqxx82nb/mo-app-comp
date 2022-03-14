"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
exports.default = react_native_1.StyleSheet.create({
    modalContainer: {
        margin: 0,
        height: 300,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        elevation: 9,
    },
    myVoucherContainer: {
        margin: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#fff',
        height: 280,
        marginBottom: mo_app_common_1.Device.isIphoneX ? 34 : 0,
        elevation: 9,
    },
    voucherContainer: {
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'column',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        height: 54,
        borderBottomWidth: 0.5,
        borderColor: mo_app_common_1.Color.border,
        paddingHorizontal: 14,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    scrollContent: {
        maxHeight: mo_app_common_1.Constants.Height - mo_app_common_1.Constants.HeaderHeight - 5 - 55,
        paddingBottom: 20,
    },
    filterHeader: {
        paddingHorizontal: 14,
        backgroundColor: mo_app_common_1.Color.divider,
        width: '100%',
        height: 34,
        alignItems: 'center',
        flexDirection: 'row'
    },
    groupContent: {
        paddingVertical: 10,
        width: '100%',
    },
    groupContentBox: {
        padding: 15,
    },
    groupContentCate: {
        paddingTop: 8,
        paddingBottom: 18,
        paddingLeft: 15,
        paddingRight: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    containerFilterItem: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 14,
    },
    groupItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    label: {
        fontFamily: mo_app_common_1.Constants.fontMedium,
        color: mo_app_common_1.Color.text,
        fontSize: 14,
        lineHeight: 20,
    },
    buttonWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 30
    },
    // container: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     padding: 10,
    //     borderWidth: 1,
    //     borderRadius: 16,
    //     backgroundColor: '#fff',
    //     marginTop:10,
    // },
    text: {
        lineHeight: 16,
        fontSize: 14,
        fontFamily: mo_app_common_1.Constants.fontMedium,
    },
    sliderPointContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        marginVertical: 5,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: mo_app_common_1.Color.light,
    },
    sliderValueContainer: {
        position: 'absolute',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    regionDropdownContainer: {
        height: 36,
        width: '100%',
    },
    pointLabelLimit: {
        right: 0,
        bottom: 5,
        flexDirection: 'row',
        textAlign: 'right',
        justifyContent: 'flex-end',
        width: 120,
    },
});
//# sourceMappingURL=styles.js.map