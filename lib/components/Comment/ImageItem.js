"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import PropTypes from 'prop-types';
const react_native_1 = require("react-native");
const index_1 = require("../index");
const styles_1 = __importDefault(require("./styles"));
class ImageItem extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { onPress, index, images, isReply } = this.props;
        return (<react_native_1.TouchableOpacity onPress={() => onPress()}>
                <index_1.AsyncImage style={[styles_1.default.image, isReply ? styles_1.default.replyImageSize : {}]} source={{
            uri: !isReply ? images[index] : images[index].link
        }}/>
                {index >= 3 && images.length > 4 &&
            <react_native_1.View style={[styles_1.default.imageOverlay, isReply ? styles_1.default.replyImageSize : {}]}>
                        <index_1.WrapText st={{ color: '#fff', fontSize: 20, lineHeight: 22 }}>{`+${images.length - 4}`}</index_1.WrapText>
                    </react_native_1.View>}
            </react_native_1.TouchableOpacity>);
    }
}
exports.default = ImageItem;
ImageItem.defaultProps = {
    images: [],
    index: 0,
    isReply: false,
    zoomImageViewer: {}
};
//# sourceMappingURL=ImageItem.js.map