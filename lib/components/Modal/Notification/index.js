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
const styles_1 = __importDefault(require("./styles"));
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../../index");
class NotificationModal extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.close = () => {
            const { onClose } = this.props;
            if (onClose) {
                onClose();
            }
        };
        this.hide = () => {
            this.modalRef.close();
        };
        this.setData = (content, iconName, iconColor, textAlign, link) => {
            this.setState({
                content: content,
                iconName: iconName,
                iconColor: iconColor,
                textAlign: textAlign ? textAlign : 'center',
                opacity: 1,
                link: link
            });
            this.modalRef.show();
        };
        this.setContent = (content) => {
            this.setState({
                content: content,
                opacity: 1
            });
            this.modalRef.show();
        };
        this.setIcon = (iconName, iconColor) => {
            this.setState({
                iconName: iconName,
                iconColor: iconColor,
                opacity: 1
            });
            this.modalRef.show();
        };
        this.onCancelHandle = () => {
            if (this.modalRef) {
                this.modalRef.close();
            }
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        };
        this.onOkHandle = () => {
            if (this.props.autoClose) {
                if (this.modalRef) {
                    this.modalRef.close();
                }
            }
            if (this.props.onOk) {
                this.props.onOk();
            }
        };
        this.goToURL = (url) => {
            react_native_1.Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    react_native_1.Linking.openURL(url);
                }
            });
        };
        this.onGotoLinkHandler = (link) => {
            const { onGotoLink } = this.props;
            this.hide();
            if (onGotoLink) {
                onGotoLink(link);
            }
        };
        this.renderContentText = (value) => {
            var re = /(https?:\/\/[^\s]+)/g;
            let parts = value && `${value}`.split(re);
            for (let i = 1; i < parts.length; i += 2) {
                parts[i] = <index_1.WrapText key={'link' + i} st={{ fontSize: 14, lineHeight: 18, textDecorationLine: 'underline' }} onPress={this.onGotoLinkHandler.bind(this, parts[i])}>{parts[i]}</index_1.WrapText>;
            }
            return (<index_1.WrapText>{parts.map((part, _index) => {
                return part;
            })}</index_1.WrapText>);
        };
        const { content, iconColor, iconName, buttons, textAlign, link } = this.props;
        this.state = {
            opacity: 0,
            content: content,
            iconName: iconName,
            iconColor: iconColor,
            buttons: buttons,
            textAlign: textAlign,
            link: link
        };
    }
    componentDidMount() { }
    show() {
        this.modalRef.show();
    }
    setDataItem(item) {
        this.item = item;
    }
    getDataItem() {
        const { item } = this.props;
        return this.item || item;
    }
    render() {
        const { children, isLargeSize, backDropClose, autoOpen, type, position, showPos, overlayClose, title, items } = this.props;
        const { content, iconName, iconColor, buttons, textAlign } = this.state;
        const _buttons = buttons ? buttons :
            [
                { name: mo_app_common_1.CommonLanguage.Agree, },
                { name: mo_app_common_1.CommonLanguage.Cancel }
            ];
        const buttonWidth = `${100 / _buttons.length}%`;
        const paddingHori = (isLargeSize) ? { paddingHorizontal: 15 } : {};
        let containerStyle = { ...styles_1.default.modalNotification, ...paddingHori };
        let iconContainer = (isLargeSize) ? { left: (mo_app_common_1.Constants.Width - 30) / 2 - 30 } : {};
        const hlColor = (type === 'delete') ? mo_app_common_1.Color.red : mo_app_common_1.Color.primary;
        const isListItem = (items && items.length > 0) ? true : false;
        return (<index_1.WrapModal ref={(comp) => { this.modalRef = comp; }} autoOpen={autoOpen} onClosed={this.close} backDropClose={backDropClose} overlayClose={overlayClose} containerStyle={containerStyle} position={position} showPos={showPos}>

        <react_native_1.View style={[styles_1.default.contentContainer]}>
          {title && <index_1.WrapText nl={2} st={[styles_1.default.title]}>{mo_app_common_1.Utils.capitalize(title)}</index_1.WrapText>}

          <react_native_1.View style={styles_1.default.scrollContainer}>
            <react_native_1.ScrollView style={{ flexGrow: 0 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
              {isListItem &&
            <react_native_1.View style={styles_1.default.listContent}>
                {items.map((item, index) => {
                const isLastIndex = index === items.length - 1 ? true : false;
                if (item.point) {
                    const key = item.point > 0 ? 'Tăng' : 'Giảm';
                    const color = item.point < 0 ? mo_app_common_1.Color.red : mo_app_common_1.Color.secondary;
                    const point = item.point > 0 ? `+${mo_app_common_1.Utils.formatThousand(item.point)}` : `-${mo_app_common_1.Utils.formatThousand(Math.abs(item.point))}`;
                    return (<index_1.WrapText f={'r'} nl={100} st={[{ textAlign: 'left' }, isLastIndex ? { paddingBottom: 0 } : { paddingBottom: 10 }]}>
                            {key}{': '} <index_1.WrapText st={{ color: color }}>{`${point} điểm`}</index_1.WrapText>
                        </index_1.WrapText>);
                }
                if (!item.key || !item.value) {
                    return <react_native_1.View />;
                }
                return (<index_1.WrapText f={'r'} nl={100} st={[{ textAlign: 'justify' }, isLastIndex ? { paddingBottom: 0 } : { paddingBottom: 10 }]}>
                          {mo_app_common_1.Utils.capitalize(item.key)}{': '}{this.renderContentText(item.value)}
                      </index_1.WrapText>);
            })}
                </react_native_1.View>}
              {content &&
            <index_1.WrapText nl={100} st={[styles_1.default.contentText, { textAlign: textAlign },]}>
                  {content}
                </index_1.WrapText>}
              {children}
            </react_native_1.ScrollView>
          </react_native_1.View>

          <react_native_1.View style={styles_1.default.buttonContainer}>
              {_buttons.map((button, index) => {
            if (index === 0) {
                if (button.type === 2) {
                    return (<react_native_1.View key={`${index}`} style={{ paddingRight: 0, width: '50%' }}>
                          <index_1.WrapButton text={button.name} type={'border'} containerStyle={{ marginTop: 0 }} textStyle={styles_1.default.smallButtonText} size={'s'} onPress={button.onPress}/>
                        </react_native_1.View>);
                }
                return (<index_1.ButtonRipple key={index} onPress={this.onOkHandle.bind(this)} containerStyle={[styles_1.default.rippleButton, { width: buttonWidth }]} height={32} content={<index_1.WrapText st={[styles_1.default.buttonText, { color: hlColor }]}> {button.name} </index_1.WrapText>}/>);
            }
            if (index === 1) {
                if (button.type === 2) {
                    return (<react_native_1.View key={index} style={{ paddingLeft: 0, width: '50%' }}>
                          <index_1.WrapButton text={button.name} type={'solid'} containerStyle={{ marginTop: 0 }} textStyle={styles_1.default.smallButtonText} size={'s'} iconRight={'next-page'} iconSize={10} onPress={button.onPress}/>
                        </react_native_1.View>);
                }
                return (<index_1.ButtonRipple key={index} onPress={this.onCancelHandle.bind(this)} containerStyle={[styles_1.default.rippleButton, { width: buttonWidth }]} color={mo_app_common_1.Color.primary} content={<index_1.WrapText st={[styles_1.default.buttonText, { color: mo_app_common_1.Color.textSecondary }]}> {button.name} </index_1.WrapText>}/>);
            }
        })}
          </react_native_1.View>

          <react_native_1.View style={[styles_1.default.modalIconContainer, iconContainer]}>
            <mo_app_common_1.CustomIcon name={iconName} size={35} style={{ color: iconColor }}/>
          </react_native_1.View>

        </react_native_1.View>
      </index_1.WrapModal>);
    }
}
exports.default = NotificationModal;
NotificationModal.propTypes = {
    children: prop_types_1.default.node,
    type: prop_types_1.default.string,
    content: prop_types_1.default.string,
    onOk: prop_types_1.default.func,
    onCancel: prop_types_1.default.func,
    onClose: prop_types_1.default.func,
    iconName: prop_types_1.default.string,
    iconColor: prop_types_1.default.string,
    buttons: prop_types_1.default.array,
    autoClose: prop_types_1.default.bool,
    isLargeSize: prop_types_1.default.bool,
    isOpen: prop_types_1.default.bool,
    backDropClose: prop_types_1.default.bool,
    textAlign: prop_types_1.default.string,
    autoOpen: prop_types_1.default.bool,
    item: prop_types_1.default.object,
    showPos: prop_types_1.default.string,
    position: prop_types_1.default.string,
    overlayClose: prop_types_1.default.bool,
    title: prop_types_1.default.string,
};
NotificationModal.defaultProps = {
    iconName: 'warning_popup',
    iconColor: mo_app_common_1.Color.red,
    hlColor: mo_app_common_1.Color.primary,
    autoClose: true,
    isLargeSize: false,
    backDropClose: true,
    textAlign: 'center',
    autoOpen: false,
    type: 'info',
    position: 'center',
    showPos: 'center',
    overlayClose: true
};
//# sourceMappingURL=index.js.map