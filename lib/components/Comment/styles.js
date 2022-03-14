"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const imageW = mo_app_common_1.Constants.Width / 2 - 60;
const imageH = imageW * 150 / 267;
const imageWReply = imageW - 25;
const imageHReply = imageW * 150 / 267;
exports.default = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        marginTop: 12
    },
    cmItem: {
        flexDirection: 'row'
    },
    avatar: {
        borderRadius: 16,
        width: 32,
        height: 32,
    },
    avatar2: {
        borderRadius: 10,
        width: 20,
        height: 20,
    },
    replyContainer: {
        paddingHorizontal: 0,
        marginTop: 12
    },
    itemContentContainer: {
        flexDirection: 'column',
        paddingLeft: 5,
        paddingBottom: 12,
        marginRight: 0,
        flex: 1,
        flexGrow: 1,
    },
    itemContent: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: 'rgb(245,247,250)',
        borderRadius: 5,
        marginBottom: 5,
        marginTop: 3,
        alignSelf: 'flex-start',
    },
    viewNumber: {
        flex: 1,
        backgroundColor: 'rgba(1,1,1,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    image: {
        borderRadius: 4,
        width: imageW,
        height: imageH,
        marginLeft: 2,
        marginBottom: 2
    },
    replyImage: {
        borderRadius: 5,
        width: mo_app_common_1.Constants.Width / 2 - 70,
        height: mo_app_common_1.Constants.Width / 2 - 90
    },
    viewMoreAnswer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    divider: {
        height: 0,
        borderTopWidth: 0.5,
        borderTopColor: mo_app_common_1.Color.border,
        width: '100%',
    },
    imageContainer: {
        marginTop: 4,
        flexDirection: 'row',
        maxWidth: mo_app_common_1.Constants.Width,
        flexWrap: 'wrap'
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 4,
        borderRadius: 4,
        width: imageW,
        height: imageH,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.45)'
    },
    replyImageSize: {
        width: imageWReply,
        height: imageHReply
    }
});
//# sourceMappingURL=styles.js.map