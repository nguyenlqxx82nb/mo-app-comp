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
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.Props = void 0;
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const image_viewer_style_1 = require("./image-viewer.style");
class Props {
    constructor() {
        /**
         * 是否显示
         */
        this.show = false;
        /**
         * 图片数组
         */
        this.imageUrls = [];
        /**
         * 滑动到下一页的X阈值
         */
        this.flipThreshold = 80;
        /**
         * 当前页能滑到下一页X位置最大值
         */
        this.maxOverflow = 300;
        /**
         * 初始显示第几张图
         */
        this.index = 0;
        /**
         * 加载失败的图
         */
        this.failImageSource = undefined;
        /**
         * 背景颜色
         */
        this.backgroundColor = 'black';
        /**
         * style props for the footer container
         */
        this.footerContainerStyle = {};
        /**
         * Menu Context Values
         */
        this.menuContext = { saveToLocal: 'save to the album', cancel: 'cancel' };
        /**
         * 是否开启长按保存到本地的功能
         */
        this.saveToLocalByLongPress = true;
        /**
         * 是否允许缩放图片
         */
        this.enableImageZoom = true;
        this.style = {};
        /**
         * Enable swipe down to close image viewer.
         * When swipe down, will trigger onCancel.
         */
        this.enableSwipeDown = false;
        /**
         * 是否预加载图片
         */
        this.enablePreload = false;
        /**
         * 翻页时的动画时间
         */
        this.pageAnimateTime = 100;
        /**
         * 长按图片的回调
         */
        this.onLongPress = () => {
            //
        };
        /**
         * 单击回调
         */
        this.onClick = () => {
            //
        };
        /**
         * 双击回调
         */
        this.onDoubleClick = () => {
            //
        };
        /**
         * 图片保存到本地方法，如果写了这个方法，就不会调取系统默认方法
         * 针对安卓不支持 saveToCameraRoll 远程图片，可以在安卓调用此回调，调用安卓原生接口
         */
        this.onSave = () => {
            //
        };
        this.onMove = () => {
            //
        };
        /**
         * 自定义头部
         */
        this.renderHeader = () => {
            return null;
        };
        /**
         * 自定义尾部
         */
        this.renderFooter = () => {
            return null;
        };
        /**
         * 自定义计时器
         */
        this.renderIndicator = (currentIndex, allSize) => {
            return React.createElement(react_native_1.View, { style: image_viewer_style_1.simpleStyle.count }, React.createElement(react_native_1.Text, { style: image_viewer_style_1.simpleStyle.countText }, currentIndex + '/' + allSize));
        };
        /**
         * Render image component
         */
        this.renderImage = (props) => {
            return React.createElement(react_native_1.Image, props);
        };
        /**
         * 自定义左翻页按钮
         */
        this.renderArrowLeft = () => {
            return null;
        };
        /**
         * 自定义右翻页按钮
         */
        this.renderArrowRight = () => {
            return null;
        };
        /**
         * 弹出大图的回调
         */
        this.onShowModal = () => {
            //
        };
        /**
         * 取消看图的回调
         */
        this.onCancel = () => {
            //
        };
        /**
         * function that fires when user swipes down
         */
        this.onSwipeDown = () => {
            //
        };
        /**
         * 渲染loading元素
         */
        this.loadingRender = () => {
            return null;
        };
        /**
         * 保存到相册的回调
         */
        this.onSaveToCamera = () => {
            //
        };
        /**
         * 当图片切换时触发
         */
        this.onChange = () => {
            //
        };
    }
}
exports.Props = Props;
class State {
    constructor() {
        /**
         * 是否显示
         */
        this.show = false;
        /**
         * 当前显示第几个
         */
        this.currentShowIndex = 0;
        /**
         * 图片拉取是否完毕了
         */
        this.imageLoaded = false;
        /**
         * 图片长宽列表
         */
        this.imageSizes = [];
        /**
         * 是否出现功能菜单
         */
        this.isShowMenu = false;
    }
}
exports.State = State;
//# sourceMappingURL=image-viewer.type.js.map