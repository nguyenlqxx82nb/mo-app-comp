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
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const Slide_1 = __importDefault(require("./Slide"));
const index_1 = require("../index");
class SlideShow extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.showZoomSlideImages = (items, index) => {
            const modal = {
                content: <index_1.ZoomImageViewer ref={comp => (this.slideshowModal = comp)} autoOpen={true} images={items} index={index}/>
            };
            mo_app_common_1.pushModal(modal);
            // let sharedElements: SharedElementsConfig = [];
            // sharedElements = [`photo.${item.id}`];
            // Router.push(
            //     <PagerScreen
            //         index={index}
            //         item={item}
            //         items={items} />,
            //     {
            //         sharedElements: sharedElements,
            //         transitionConfig: fadeIn(0, true),
            //     }
            // );
        };
    }
    componentDidMount() { }
    render() {
        const { containerStyle, width, height, images } = this.props;
        // const items = images.map( (item: any, index: number) => {
        //     return {
        //         id: index,
        //         url: item,
        //         props: {},
        //         freeHeight: true
        //     };
        // });
        return (<react_native_1.View style={[{ width: width, height: height }, containerStyle]}>
                {images.length > 0 &&
            <Slide_1.default showsButtons={false} dotColor={mo_app_common_1.Color.gray} activeDotColor={mo_app_common_1.Color.dark} removeClippedSubviews={false} paginationStyle={{ bottom: 15 }}>
                            {images.map((item, index) => {
                return (<react_native_1.TouchableOpacity key={`${index}`} activeOpacity={0.99} onPress={this.showZoomSlideImages.bind(this, images, index)}>
                                            <index_1.AsyncImage source={{ uri: item }} style={{ width: width, height: height }}/>
                                            
                                        </react_native_1.TouchableOpacity>);
            })}
                    </Slide_1.default>}
            </react_native_1.View>);
    }
}
exports.default = SlideShow;
SlideShow.defaultProps = {
    containerStyle: {},
    images: [],
    width: mo_app_common_1.Constants.Width,
    height: mo_app_common_1.Constants.Width * 9 / 16
};
//# sourceMappingURL=index.js.map