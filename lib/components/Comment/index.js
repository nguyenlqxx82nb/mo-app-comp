"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../index");
const styles_1 = __importDefault(require("./styles"));
const moment_1 = __importDefault(require("moment"));
require("moment/locale/vi");
const ImageItem_1 = __importDefault(require("./ImageItem"));
class CommentItem extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.getTimeAgo = (startTime) => {
            moment_1.default.locale(mo_app_common_1.Constants.Lang);
            const diffTime = moment_1.default.utc(startTime).local().fromNow(true);
            return mo_app_common_1.CommonLanguage.TimeAgo.replace('{time}', diffTime);
        };
        this.showZoomSlideImages = (images, index) => {
            const modal = {
                content: <index_1.ZoomImageViewer 
                // ref={comp => (this.slideshowModal = comp)}
                autoOpen={true} images={images} index={index}/>
            };
            mo_app_common_1.pushModal(modal);
        };
        this.layoutFullText = (event) => {
            const { height } = event.nativeEvent.layout;
            this.setState({
                showMore: false,
                id_conten: this.props.item.id,
                isMoreText: false,
            }, () => {
                if (height > 54) {
                    this.setState({
                        isMoreText: true
                    });
                }
            });
        };
        this.layoutTrimmedText = () => {
            this.setState({
                showMore: true,
            });
        };
        this.onPressMore = () => {
            const { moreText } = this.state;
            this.setState({
                moreText: !moreText
            });
        };
        this.renderFullText = () => {
            const { showMore, isMoreText, moreText, id_conten } = this.state;
            if (showMore && id_conten !== this.props.item.id) {
                return (<react_native_1.View onLayout={this.layoutFullText} style={styles_1.default.itemContent}>
                    <react_native_1.Text style={{ lineHeight: 18 }}>{this.props.item.content}</react_native_1.Text>
                </react_native_1.View>);
            }
            return (<react_native_1.View onLayout={this.layoutTrimmedText} style={styles_1.default.itemContent}>
                <react_native_1.Text style={{ lineHeight: 18 }} numberOfLines={moreText ? 3 : 20}> {this.props.item.content} </react_native_1.Text>
                {isMoreText && <react_native_1.Text style={{ color: mo_app_common_1.Color.primary }} onPress={this.onPressMore}>{moreText ? mo_app_common_1.CommonLanguage.ViewMore : mo_app_common_1.CommonLanguage.Compact}</react_native_1.Text>}
            </react_native_1.View>);
        };
        this.state = {
            showMore: true,
            isMoreText: false,
            moreText: true,
            id_conten: null
        };
    }
    renderImage(item, isReply = false) {
        return (<react_native_1.View style={styles_1.default.imageContainer}>
                {item.images.map((_image, index) => {
            if (index <= 3) {
                return (<ImageItem_1.default key={index} isReply={isReply} images={item.images} index={index} onPress={this.onOpenZoomImageViewer.bind(this, item.images, isReply, index)}/>);
            }
            return (<react_native_1.View />);
        })}
            </react_native_1.View>);
    }
    onOpenZoomImageViewer(images, isReply, index) {
        // const {onOpenZoomImages} = this.props;
        let imageList = [];
        if (isReply) {
            for (let i = 0; i < images.length; i++) {
                imageList.push(images[i].link);
            }
        }
        else {
            imageList = images;
        }
        this.showZoomSlideImages(imageList, index);
    }
    renderViewMore(onPress) {
        return (<react_native_1.Text style={{ color: mo_app_common_1.Color.primary }} onPress={onPress}>{mo_app_common_1.CommonLanguage.ViewMore}</react_native_1.Text>);
    }
    renderViewLess(onPress) {
        return (<react_native_1.Text style={{ color: mo_app_common_1.Color.primary }} onPress={onPress}>{mo_app_common_1.CommonLanguage.Compact}</react_native_1.Text>);
    }
    replyHandler() {
        const { onReply } = this.props;
        if (onReply) {
            onReply();
        }
    }
    viewMoreAnswerHandler() {
        const { onViewMoreAnswer } = this.props;
        if (onViewMoreAnswer) {
            onViewMoreAnswer();
        }
    }
    render() {
        const { item, hasDivider, fullWidthDivider, containerStyle, isAnswer, isReply } = this.props;
        let name;
        if (item.profile.name) {
            name = item.profile.name;
        }
        else if (item.profile.phone_number) {
            name = item.profile.phone_number.substring(0, 9) + '***';
        }
        if (!item.profile.name) {
            return (<react_native_1.View />);
        }
        return (<react_native_1.View style={[styles_1.default.container, containerStyle, isReply ? { marginTop: 0 } : {}]}>
                <react_native_1.View style={styles_1.default.cmItem}>
                    <index_1.AvatarImage avatar={item.profile.avatar}/>
                    <react_native_1.View style={styles_1.default.itemContentContainer}>
                        <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <index_1.WrapText st={{ fontSize: 12, marginRight: 5 }}>{name}</index_1.WrapText>
                        </react_native_1.View>
                        {item.content ?
            <react_native_1.View style={styles_1.default.itemContent}>
                                <index_1.WrapText nl={10}>{item.content}</index_1.WrapText>
                            </react_native_1.View> : <react_native_1.View />}
                        {item.images && item.images.length > 0 ? this.renderImage(item) : <react_native_1.View />}

                        <index_1.WrapText st={{ marginTop: 5 }}>{this.getTimeAgo(item.created_time)}</index_1.WrapText>
                        {!isAnswer &&
            <react_native_1.TouchableOpacity onPress={this.replyHandler.bind(this)}>
                                    <index_1.WrapText st={{ color: mo_app_common_1.Color.primary, marginTop: 5 }}>{mo_app_common_1.CommonLanguage.Reply}</index_1.WrapText>
                                </react_native_1.TouchableOpacity>}

                        {item.replies && item.replies.length > 0 && !isAnswer &&
            <react_native_1.View style={[styles_1.default.cmItem, styles_1.default.replyContainer]}>
                                    
                                    <index_1.AvatarImage avatar={item.replies[0].avatar} width={20}/>
                                    <react_native_1.View style={[styles_1.default.itemContentContainer, { paddingBottom: 0 }]}>
                                        <index_1.WrapText st={{ marginBottom: 5, fontSize: 12 }}>{item.replies[0].name}</index_1.WrapText>
                                        {item.replies[0].content ?
                <react_native_1.View style={styles_1.default.itemContent}>
                                                <index_1.WrapText nl={10} st={{ lineHeight: 18 }}>{item.replies[0].content}</index_1.WrapText>
                                            </react_native_1.View> : <react_native_1.View />}
                                        {item.replies[0].images && item.replies[0].images.length > 0 ? this.renderImage(item.replies[0], true) : null}
                                        <index_1.WrapText st={{ marginTop: 5 }}>{this.getTimeAgo(item.replies[0].created_time)}</index_1.WrapText>
                                    </react_native_1.View>
                                </react_native_1.View>}

                        {item.count_repl > 1 && !isAnswer &&
            <react_native_1.TouchableOpacity style={[styles_1.default.viewMoreAnswer, { marginTop: 8 }]} onPress={this.viewMoreAnswerHandler.bind(this)}>
                                    <index_1.WrapText st={{ color: mo_app_common_1.Color.primary }}>{mo_app_common_1.CommonLanguage.ViewMoreAnswer.replace('{number}', `${(item.count_repl - 1)}`)}</index_1.WrapText>
                                    <mo_app_common_1.CustomIcon name={'forward1'} size={8} style={{ marginLeft: 5, color: mo_app_common_1.Color.primary, transform: [{ rotateZ: '90deg' }] }}/>
                                </react_native_1.TouchableOpacity>}
                    </react_native_1.View>
                </react_native_1.View>
                {hasDivider && <react_native_1.View style={[styles_1.default.divider, (fullWidthDivider) ? {} : { marginLeft: 32, width: (mo_app_common_1.Constants.Width - 80) }]}/>}
            </react_native_1.View>);
    }
}
exports.default = CommentItem;
CommentItem.defaultProps = {
    item: {},
    hasDivider: true,
    fullWidthDivider: false,
    containerStyle: {},
    isReply: false,
    isAnswer: false,
};
//# sourceMappingURL=index.js.map