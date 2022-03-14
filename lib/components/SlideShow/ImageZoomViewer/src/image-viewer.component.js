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
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_image_pan_zoom_1 = __importDefault(require("react-native-image-pan-zoom"));
const image_viewer_style_1 = __importDefault(require("./image-viewer.style"));
const image_viewer_type_1 = require("./image-viewer.type");
// import { SharedElement } from '@components';
class ImageViewer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = new image_viewer_type_1.State();
        // 背景透明度渐变动画
        this.fadeAnim = new react_native_1.Animated.Value(0);
        // 当前基准位置
        this.standardPositionX = 0;
        // 整体位移，用来切换图片用
        this.positionXNumber = 0;
        this.positionX = new react_native_1.Animated.Value(0);
        this.width = 0;
        this.height = 0;
        this.styles = image_viewer_style_1.default(0, 0, 'transparent');
        // 是否执行过 layout. fix 安卓不断触发 onLayout 的 bug
        // private hasLayout = false;
        // 记录已加载的图片 index
        this.loadedIndex = new Map();
        this.handleLongPressWithIndex = new Map();
        this.imageRefs = [];
        /**
         * reset Image scale and position
         */
        this.resetImageByIndex = (index) => {
            this.imageRefs[index] && this.imageRefs[index].reset();
        };
        /**
         * 预加载图片
         */
        this.preloadImage = (index) => {
            if (index < this.state.imageSizes.length) {
                this.loadImage(index + 1);
            }
        };
        /**
         * 触发溢出水平滚动
         */
        this.handleHorizontalOuterRangeOffset = (offsetX = 0) => {
            this.positionXNumber = this.standardPositionX + offsetX;
            this.positionX.setValue(this.positionXNumber);
            const offsetXRTL = !react_native_1.I18nManager.isRTL ? offsetX : -offsetX;
            if (offsetXRTL < 0) {
                if (this.state.currentShowIndex || 0 < this.props.imageUrls.length - 1) {
                    this.loadImage((this.state.currentShowIndex || 0) + 1);
                }
            }
            else if (offsetXRTL > 0) {
                if (this.state.currentShowIndex || 0 > 0) {
                    this.loadImage((this.state.currentShowIndex || 0) - 1);
                }
            }
        };
        /**
         * 手势结束，但是没有取消浏览大图
         */
        this.handleResponderRelease = (vx = 0) => {
            const vxRTL = react_native_1.I18nManager.isRTL ? -vx : vx;
            const isLeftMove = react_native_1.I18nManager.isRTL
                ? this.positionXNumber - this.standardPositionX < -(this.props.flipThreshold || 0)
                : this.positionXNumber - this.standardPositionX > (this.props.flipThreshold || 0);
            const isRightMove = react_native_1.I18nManager.isRTL
                ? this.positionXNumber - this.standardPositionX > (this.props.flipThreshold || 0)
                : this.positionXNumber - this.standardPositionX < -(this.props.flipThreshold || 0);
            if (vxRTL > 0.7) {
                // 上一张
                this.goBack.call(this);
                // 这里可能没有触发溢出滚动，为了防止图片不被加载，调用加载图片
                if (this.state.currentShowIndex || 0 > 0) {
                    this.loadImage((this.state.currentShowIndex || 0) - 1);
                }
                return;
            }
            else if (vxRTL < -0.7) {
                // 下一张
                this.goNext.call(this);
                if (this.state.currentShowIndex || 0 < this.props.imageUrls.length - 1) {
                    this.loadImage((this.state.currentShowIndex || 0) + 1);
                }
                return;
            }
            if (isLeftMove) {
                // 上一张
                this.goBack.call(this);
            }
            else if (isRightMove) {
                // 下一张
                this.goNext.call(this);
                return;
            }
            else {
                // 回到之前的位置
                this.resetPosition.call(this);
                return;
            }
        };
        /**
         * 到上一张
         */
        this.goBack = () => {
            if (this.state.currentShowIndex === 0) {
                // 回到之前的位置
                this.resetPosition.call(this);
                return;
            }
            this.positionXNumber = !react_native_1.I18nManager.isRTL
                ? this.standardPositionX + this.width
                : this.standardPositionX - this.width;
            this.standardPositionX = this.positionXNumber;
            react_native_1.Animated.timing(this.positionX, {
                toValue: this.positionXNumber,
                duration: this.props.pageAnimateTime,
                useNativeDriver: true
            }).start();
            const nextIndex = (this.state.currentShowIndex || 0) - 1;
            this.setState({
                currentShowIndex: nextIndex
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(this.state.currentShowIndex);
                }
            });
        };
        /**
         * 到下一张
         */
        this.goNext = () => {
            if (this.state.currentShowIndex === this.props.imageUrls.length - 1) {
                // 回到之前的位置
                this.resetPosition.call(this);
                return;
            }
            this.positionXNumber = !react_native_1.I18nManager.isRTL
                ? this.standardPositionX - this.width
                : this.standardPositionX + this.width;
            this.standardPositionX = this.positionXNumber;
            react_native_1.Animated.timing(this.positionX, {
                toValue: this.positionXNumber,
                duration: this.props.pageAnimateTime,
                useNativeDriver: true
            }).start();
            const nextIndex = (this.state.currentShowIndex || 0) + 1;
            this.setState({
                currentShowIndex: nextIndex
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(this.state.currentShowIndex);
                }
            });
        };
        /**
         * 长按
         */
        this.handleLongPress = (image) => {
            if (this.props.saveToLocalByLongPress) {
                // 出现保存到本地的操作框
                this.setState({ isShowMenu: true });
            }
            if (this.props.onLongPress) {
                this.props.onLongPress(image);
            }
        };
        /**
         * 单击
         */
        this.handleClick = () => {
            if (this.props.onClick) {
                this.props.onClick(this.handleCancel, this.state.currentShowIndex);
            }
        };
        /**
         * 双击
         */
        this.handleDoubleClick = () => {
            if (this.props.onDoubleClick) {
                this.props.onDoubleClick(this.handleCancel);
            }
        };
        /**
         * 退出
         */
        this.handleCancel = () => {
            this.hasLayout = false;
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        };
        /**
         * 完成布局
         */
        this.handleLayout = (event) => {
            if (event.nativeEvent.layout.width !== this.width) {
                this.hasLayout = true;
                this.width = event.nativeEvent.layout.width;
                this.height = event.nativeEvent.layout.height;
                this.styles = image_viewer_style_1.default(this.width, this.height, this.props.backgroundColor || 'transparent');
                // 强制刷新
                this.forceUpdate();
                this.jumpToCurrentImage();
            }
        };
        /**
         * 保存当前图片到本地相册
         */
        this.saveToLocal = () => {
            if (!this.props.onSave) {
                react_native_1.CameraRoll.saveToCameraRoll(this.props.imageUrls[this.state.currentShowIndex || 0].url);
                this.props.onSaveToCamera(this.state.currentShowIndex);
            }
            else {
                this.props.onSave(this.props.imageUrls[this.state.currentShowIndex || 0].url);
            }
            this.setState({ isShowMenu: false });
        };
        this.handleLeaveMenu = () => {
            this.setState({ isShowMenu: false });
        };
        this.handleSwipeDown = () => {
            if (this.props.onSwipeDown) {
                this.props.onSwipeDown();
            }
            this.handleCancel();
        };
    }
    UNSAFE_componentWillMount() {
        this.init(this.props);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.index !== this.state.currentShowIndex) {
            this.setState({
                currentShowIndex: nextProps.index
            }, () => {
                // 立刻预加载要看的图
                this.loadImage(nextProps.index || 0);
                this.jumpToCurrentImage();
                // 显示动画
                react_native_1.Animated.timing(this.fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }).start();
            });
        }
    }
    /**
     * props 有变化时执行
     */
    init(nextProps) {
        if (nextProps.imageUrls.length === 0) {
            // 隐藏时候清空
            this.fadeAnim.setValue(0);
            return this.setState(new image_viewer_type_1.State());
        }
        // 给 imageSizes 塞入空数组
        const imageSizes = [];
        nextProps.imageUrls.forEach(imageUrl => {
            imageSizes.push({
                width: imageUrl.width || 0,
                height: imageUrl.height || 0,
                status: 'loading'
            });
        });
        this.setState({
            currentShowIndex: nextProps.index,
            imageSizes
        }, () => {
            // 立刻预加载要看的图
            this.loadImage(nextProps.index || 0);
            this.jumpToCurrentImage();
            // 显示动画
            react_native_1.Animated.timing(this.fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
        });
    }
    /**
     * 调到当前看图位置
     */
    jumpToCurrentImage() {
        // 跳到当前图的位置
        this.positionXNumber = this.width * (this.state.currentShowIndex || 0) * (react_native_1.I18nManager.isRTL ? 1 : -1);
        this.standardPositionX = this.positionXNumber;
        this.positionX.setValue(this.positionXNumber);
    }
    /**
     * 加载图片，主要是获取图片长与宽
     */
    loadImage(index) {
        if (!this.state.imageSizes[index]) {
            return;
        }
        if (this.loadedIndex.has(index)) {
            return;
        }
        this.loadedIndex.set(index, true);
        const image = this.props.imageUrls[index];
        const imageStatus = { ...this.state.imageSizes[index] };
        // 保存 imageSize
        const saveImageSize = () => {
            // 如果已经 success 了，就不做处理
            if (this.state.imageSizes[index] && this.state.imageSizes[index].status !== 'loading') {
                return;
            }
            const imageSizes = this.state.imageSizes.slice();
            imageSizes[index] = imageStatus;
            this.setState({ imageSizes });
        };
        if (this.state.imageSizes[index].status === 'success') {
            // 已经加载过就不会加载了
            return;
        }
        // 如果已经有宽高了，直接设置为 success
        if (this.state.imageSizes[index].width > 0 && this.state.imageSizes[index].height > 0) {
            imageStatus.status = 'success';
            saveImageSize();
            return;
        }
        // 是否加载完毕了图片大小
        // const sizeLoaded = false;
        // 是否加载完毕了图片
        let imageLoaded = false;
        // Tagged success if url is started with file:, or not set yet(for custom source.uri).
        if (!image.url || image.url.startsWith(`file:`)) {
            imageLoaded = true;
        }
        // 如果已知源图片宽高，直接设置为 success
        if (image.width && image.height) {
            if (this.props.enablePreload && imageLoaded === false) {
                react_native_1.Image.prefetch(image.url);
            }
            imageStatus.width = image.width;
            imageStatus.height = image.height;
            imageStatus.status = 'success';
            saveImageSize();
            return;
        }
        react_native_1.Image.getSize(image.url, (width, height) => {
            imageStatus.width = width;
            imageStatus.height = height;
            imageStatus.status = 'success';
            saveImageSize();
        }, () => {
            try {
                const data = react_native_1.Image.resolveAssetSource(image.props.source);
                imageStatus.width = data.width;
                imageStatus.height = data.height;
                imageStatus.status = 'success';
                saveImageSize();
            }
            catch (newError) {
                // Give up..
                imageStatus.status = 'fail';
                saveImageSize();
            }
        });
    }
    /**
     * 回到原位
     */
    resetPosition() {
        this.positionXNumber = this.standardPositionX;
        react_native_1.Animated.timing(this.positionX, {
            toValue: this.standardPositionX,
            duration: 150,
            useNativeDriver: true
        }).start();
    }
    /**
     * 获得整体内容
     */
    getContent() {
        // 获得屏幕宽高
        const screenWidth = this.width;
        const screenHeight = this.height;
        const ImageElements = this.props.imageUrls.map((image, index) => {
            if ((this.state.currentShowIndex || 0) > index + 1 || (this.state.currentShowIndex || 0) < index - 1) {
                return <react_native_1.View key={index} style={{ width: screenWidth, height: screenHeight }}/>;
            }
            if (!this.handleLongPressWithIndex.has(index)) {
                this.handleLongPressWithIndex.set(index, this.handleLongPress.bind(this, image));
            }
            let width = this.state.imageSizes[index] && this.state.imageSizes[index].width;
            let height = this.state.imageSizes[index] && this.state.imageSizes[index].height;
            const imageInfo = this.state.imageSizes[index];
            if (!imageInfo || !imageInfo.status) {
                return <react_native_1.View key={index} style={{ width: screenWidth, height: screenHeight }}/>;
            }
            // 如果宽大于屏幕宽度,整体缩放到宽度是屏幕宽度
            if (width > screenWidth) {
                const widthPixel = screenWidth / width;
                width *= widthPixel;
                height *= widthPixel;
            }
            // 如果此时高度还大于屏幕高度,整体缩放到高度是屏幕高度
            if (height > screenHeight) {
                const HeightPixel = screenHeight / height;
                width *= HeightPixel;
                height *= HeightPixel;
            }
            const Wrapper = ({ children, ...others }) => (<react_native_image_pan_zoom_1.default cropWidth={this.width} cropHeight={this.height} maxOverflow={this.props.maxOverflow} horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset} responderRelease={this.handleResponderRelease} onMove={this.props.onMove} onLongPress={this.handleLongPressWithIndex.get(index)} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} enableSwipeDown={this.props.enableSwipeDown} swipeDownThreshold={this.props.swipeDownThreshold} onSwipeDown={this.handleSwipeDown} pinchToZoom={this.props.enableImageZoom} enableDoubleClickZoom={this.props.enableImageZoom} doubleClickInterval={this.props.doubleClickInterval} {...others}>
          {children}
        </react_native_image_pan_zoom_1.default>);
            switch (imageInfo.status) {
                case 'loading':
                    return (<Wrapper key={index} style={{
                        ...this.styles.modalContainer,
                        ...this.styles.loadingContainer
                    }} imageWidth={screenWidth} imageHeight={screenHeight}>
              <react_native_1.View style={this.styles.loadingContainer}>{this.props.loadingRender()}</react_native_1.View>
            </Wrapper>);
                case 'success':
                    if (!image.props) {
                        image.props = {};
                    }
                    if (!image.props.style) {
                        image.props.style = {};
                    }
                    image.props.style = {
                        ...this.styles.imageStyle,
                        ...image.props.style,
                        width,
                        height
                    };
                    if (typeof image.props.source === 'number') {
                        // source = require(..), doing nothing
                    }
                    else {
                        if (!image.props.source) {
                            image.props.source = {};
                        }
                        image.props.source = {
                            uri: image.url,
                            ...image.props.source
                        };
                    }
                    if (this.props.enablePreload) {
                        this.preloadImage(this.state.currentShowIndex || 0);
                    }
                    return (<react_native_image_pan_zoom_1.default key={index} ref={el => (this.imageRefs[index] = el)} cropWidth={this.width} cropHeight={this.height} maxOverflow={this.props.maxOverflow} horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset} responderRelease={this.handleResponderRelease} onMove={this.props.onMove} onLongPress={this.handleLongPressWithIndex.get(index)} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} imageWidth={width} imageHeight={height} enableSwipeDown={this.props.enableSwipeDown} swipeDownThreshold={this.props.swipeDownThreshold} onSwipeDown={this.handleSwipeDown} panToMove={!this.state.isShowMenu} pinchToZoom={this.props.enableImageZoom && !this.state.isShowMenu} enableDoubleClickZoom={this.props.enableImageZoom && !this.state.isShowMenu} doubleClickInterval={this.props.doubleClickInterval}>
              
              {this.props.renderImage(image.props)}
            </react_native_image_pan_zoom_1.default>);
                case 'fail':
                    return (<Wrapper key={index} style={this.styles.modalContainer} imageWidth={this.props.failImageSource ? this.props.failImageSource.width : screenWidth} imageHeight={this.props.failImageSource ? this.props.failImageSource.height : screenHeight}>
              {this.props.failImageSource &&
                        this.props.renderImage({
                            source: {
                                uri: this.props.failImageSource.url
                            },
                            style: {
                                width: this.props.failImageSource.width,
                                height: this.props.failImageSource.height
                            }
                        })}
            </Wrapper>);
            }
        });
        return (<react_native_1.Animated.View style={{ zIndex: 9 }}>
        <react_native_1.Animated.View style={{ ...this.styles.container, opacity: this.fadeAnim }}>
          {this.props.renderHeader(this.state.currentShowIndex)}

          <react_native_1.View style={this.styles.arrowLeftContainer}>
            <react_native_1.TouchableWithoutFeedback onPress={this.goBack}>
              <react_native_1.View>{this.props.renderArrowLeft()}</react_native_1.View>
            </react_native_1.TouchableWithoutFeedback>
          </react_native_1.View>

          <react_native_1.View style={this.styles.arrowRightContainer}>
            <react_native_1.TouchableWithoutFeedback onPress={this.goNext}>
              <react_native_1.View>{this.props.renderArrowRight()}</react_native_1.View>
            </react_native_1.TouchableWithoutFeedback>
          </react_native_1.View>

          <react_native_1.Animated.View style={{
            ...this.styles.moveBox,
            transform: [{ translateX: this.positionX }],
            width: this.width * this.props.imageUrls.length
        }}>
            {ImageElements}
          </react_native_1.Animated.View>
          

          {this.props.imageUrls[this.state.currentShowIndex || 0] &&
            this.props.imageUrls[this.state.currentShowIndex || 0].originSizeKb &&
            this.props.imageUrls[this.state.currentShowIndex || 0].originUrl && (<react_native_1.View style={this.styles.watchOrigin}>
                <react_native_1.TouchableOpacity style={this.styles.watchOriginTouchable}>
                  <react_native_1.Text style={this.styles.watchOriginText}>查看原图(2M)</react_native_1.Text>
                </react_native_1.TouchableOpacity>
              </react_native_1.View>)}
          <react_native_1.View style={[{ bottom: 0, position: 'absolute', zIndex: 9 }, this.props.footerContainerStyle]}>
            {this.props.renderFooter(this.state.currentShowIndex || -1)}
          </react_native_1.View>
        </react_native_1.Animated.View>
      </react_native_1.Animated.View>);
    }
    getMenu() {
        if (!this.state.isShowMenu) {
            return null;
        }
        if (this.props.menus) {
            return (<react_native_1.View style={this.styles.menuContainer}>
          {this.props.menus({ cancel: this.handleLeaveMenu, saveToLocal: this.saveToLocal })}
        </react_native_1.View>);
        }
        return (<react_native_1.View style={this.styles.menuContainer}>
        <react_native_1.View style={this.styles.menuShadow}/>
        <react_native_1.View style={this.styles.menuContent}>
          <react_native_1.TouchableHighlight underlayColor="#F2F2F2" onPress={this.saveToLocal} style={this.styles.operateContainer}>
            <react_native_1.Text style={this.styles.operateText}>{this.props.menuContext.saveToLocal}</react_native_1.Text>
          </react_native_1.TouchableHighlight>
          <react_native_1.TouchableHighlight underlayColor="#F2F2F2" onPress={this.handleLeaveMenu} style={this.styles.operateContainer}>
            <react_native_1.Text style={this.styles.operateText}>{this.props.menuContext.cancel}</react_native_1.Text>
          </react_native_1.TouchableHighlight>
        </react_native_1.View>
      </react_native_1.View>);
    }
    render() {
        let childs = null;
        childs = (<react_native_1.View>
        {this.getContent()}
        {this.getMenu()}
      </react_native_1.View>);
        return (<react_native_1.View onLayout={this.handleLayout} style={{
            flex: 1,
            overflow: 'hidden',
            ...this.props.style
        }}>
        {childs}
      </react_native_1.View>);
    }
}
exports.default = ImageViewer;
ImageViewer.defaultProps = new image_viewer_type_1.Props();
//# sourceMappingURL=image-viewer.component.js.map