"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
exports.default = react_native_1.StyleSheet.create({
    modalIconContainer: {
        position: 'absolute',
        top: -22,
        left: (mo_app_common_1.Device.ModalWidth / 2) - 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 8
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingTop: 30,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: mo_app_common_1.Device.ModalWidth
    },
    modalNotification: {
        alignItems: 'center',
        justifyContent: 'center',
        height: mo_app_common_1.Constants.Height,
        paddingHorizontal: mo_app_common_1.Constants.Width * 0.1,
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
        zIndex: 20,
        backgroundColor: '#000',
        opacity: 0.5
    },
    title: { fontSize: 16, marginTop: 5, marginBottom: 15, lineHeight: 22, textAlign: 'center', marginHorizontal: 15 },
    scrollContainer: { maxHeight: mo_app_common_1.Constants.Height * 2 / 3, alignItems: 'center', justifyContent: 'center' },
    contentText: { marginTop: 5, lineHeight: 20, marginHorizontal: 10 },
    linkText: { paddingTop: 5, lineHeight: 30, fontWeight: '600' },
    buttonContainer: { marginTop: 20, marginBottom: 15, flexDirection: 'row' },
    smallButtonText: { fontSize: 13, lineHeight: 16 },
    buttonText: { fontSize: 16, lineHeight: 22 },
    rippleButton: { justifyContent: 'center', alignItems: 'center', height: 32 },
    listContent: { width: mo_app_common_1.Device.ModalWidth - 40, flexDirection: 'column', justifyContent: 'flex-start' }
});
//# sourceMappingURL=styles.js.map