"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_native_1 = require("react-native");
const src_1 = __importDefault(require("./ImageZoomViewer/src"));
const index_1 = require("../index");
const styles_1 = __importDefault(require("./styles"));
const mo_app_common_1 = require("mo-app-common");
class ZoomImageViewer extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this._images = [];
        this.setImages = (images, index) => {
            let convertImages = [];
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    let item = {
                        url: images[i],
                        props: {},
                        freeHeight: true
                    };
                    convertImages.push(item);
                }
                this.setState({ images: convertImages, index: index });
            }
        };
        this.open = (images = null, index) => {
            if (images) {
                this.setImages(images, index);
            }
            this.modalRef.open();
        };
        this.hide = () => {
            if (this.modalRef) {
                this.modalRef.close();
            }
        };
        this._renderFooter = (currentIndex) => {
            const { images } = this.state;
            if (images) {
                return (<react_native_1.View style={styles_1.default.viewFooter}>
                {images.map((_image, index) => {
                    return (<react_native_1.View style={[
                        { backgroundColor: (index === currentIndex) || (currentIndex === -1 && index === 0) ? mo_app_common_1.Color.primary : '#fff' },
                        styles_1.default.viewFooternumbel
                    ]}/>);
                })}
                </react_native_1.View>);
            }
        };
        const { index } = this.props;
        this.state = {
            index: index,
        };
    }
    componentDidMount() {
        const { images } = this.props;
        this.setImages(images, 0);
        setTimeout(() => {
            react_native_1.Keyboard.dismiss();
        }, 10);
    }
    render() {
        const { autoOpen, index } = this.props;
        const { images } = this.state;
        return (<index_1.WrapModal ref={comp => { this.modalRef = comp; }} overlayOpacity={0.95} autoOpen={autoOpen}>
                <react_native_1.View style={styles_1.default.contentContainer}>
                    <src_1.default imageUrls={images} index={index} backgroundColor={'transparent'} renderFooter={this._renderFooter} enableSwipeDown={true}/>

                    <react_native_1.View style={styles_1.default.buttonBack}>
                        <index_1.ButtonRipple name={'close'} size={20} color={'#fff'} onPress={() => {
            this.hide();
        }}/>
                    </react_native_1.View>
                </react_native_1.View>

            </index_1.WrapModal>);
    }
}
exports.default = ZoomImageViewer;
ZoomImageViewer.propTypes = {
    images: prop_types_1.default.array,
    index: prop_types_1.default.number,
    autoOpen: prop_types_1.default.bool
};
ZoomImageViewer.defaultProps = {
    images: [],
    index: 0,
    autoOpen: false
};
//# sourceMappingURL=ZoomImageViewer.js.map