import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Linking } from 'react-native';
import styles from './styles';
import { CommonLanguage, Color, CustomIcon, Constants, Styles, Utils} from 'mo-app-common';
import { WrapText } from '../../Text';
import { WrapButton, ButtonRipple }  from '../../Button';
import  WrapModal from '../WrapModal';

export default class NotificationModal extends PureComponent<any, any> {
  static propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    content: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    buttons: PropTypes.array,
    autoClose: PropTypes.bool,
    isLargeSize: PropTypes.bool,
    isOpen: PropTypes.bool,
    backDropClose: PropTypes.bool,
    textAlign: PropTypes.string,
    autoOpen: PropTypes.bool,
    item: PropTypes.object,
    showPos: PropTypes.string,
    position: PropTypes.string,
    overlayClose: PropTypes.bool,
    title: PropTypes.string,
    titleTextAlign: PropTypes.string,
    contentColor: PropTypes.string,
    contentFontFamily: PropTypes.string,
    ignoreIcon: PropTypes.bool,
    wrapperPaddingTop: PropTypes.number,
    wrapperBorderRadius: PropTypes.number,
  };

  static defaultProps = {
    iconName: 'warning_popup',
    iconColor: Color.red,
    hlColor: Color.primary,
    autoClose: true,
    isLargeSize: false,
    backDropClose: true,
    textAlign: 'center',
    autoOpen: false,
    type: 'info',
    position: 'center',
    showPos: 'center',
    overlayClose: true,
    ignoreIcon: false,
    titleTextAlign: 'center',
    contentColor: Color.text,
    wrapperPaddingTop: 30,
    wrapperBorderRadius: 20,
    contentFontFamily: Constants.fontMedium,
  };

  item: any;
  modalRef: any;

  constructor(props: any) {
    super(props);
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

  close = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  hide = () => {
    this.modalRef.close();
  }

  show() {
    this.modalRef.show();
  }

  setData = (content, iconName, iconColor, textAlign, link) => {
    this.setState({
      content: content,
      iconName: iconName,
      iconColor: iconColor,
      textAlign: textAlign ? textAlign : 'center',
      opacity: 1,
      link : link
    });

    this.modalRef.show();
  }

  setDataItem(item) {
    this.item = item;
  }

  getDataItem() {
    const { item } = this.props;
    return this.item || item;
  }

  setContent = (content) => {
    this.setState({
      content: content,
      opacity: 1
    });

    this.modalRef.show();
  }

  setIcon = (iconName, iconColor) => {
    this.setState({
      iconName: iconName,
      iconColor: iconColor,
      opacity: 1
    });

    this.modalRef.show();
  }

  onCancelHandle = () => {
    const { autoClose, onCancel } = this.props;
    if (this.modalRef && autoClose) {
      this.modalRef.close();
    }
    if (onCancel) {
      onCancel();
    }
  }

  onOkHandle = () => {
    const { autoClose, onOk } = this.props;
    if (autoClose && this.modalRef) {
      this.modalRef.close();
    }
    if (onOk) {
      onOk();
    }
  }

  goToURL = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  onGotoLinkHandler = (link) => {
    const { onGotoLink } = this.props;
    this.hide();
    if (onGotoLink) {
      onGotoLink(link);
    }
  }

  renderContentText = (value) => {
    var re = /(https?:\/\/[^\s]+)/g;
    let parts: any = value && `${value}`.split(re);
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = <WrapText key={'link' + i} st={{fontSize: 14, lineHeight: 18, textDecorationLine: 'underline'}} onPress={this.onGotoLinkHandler.bind(this, parts[i])}>{parts[i]}</WrapText>;
    }
    return (
      <WrapText>{
        parts.map((part: any, _index: number) => {
          return part;
        })
      }</WrapText>
    );
  }

  render() {
    const { children, isLargeSize, backDropClose, autoOpen, type, position, showPos, overlayClose, title, 
      items, ignoreIcon, titleTextAlign, contentColor, wrapperPaddingTop, wrapperBorderRadius, contentFontFamily } = this.props;
    const { content, iconName, iconColor, buttons, textAlign } = this.state;
    const _buttons = buttons ? buttons :
    [
      { name: CommonLanguage.Agree, },
      { name: CommonLanguage.Cancel }
    ];
    const buttonWidth = `${100 / _buttons.length}%`;
    const paddingHori = (isLargeSize) ? { paddingHorizontal: 15 } : {};
    let containerStyle = { ...styles.modalNotification, ...paddingHori };
    let iconContainer = (isLargeSize) ? { left: (Constants.Width - 30) / 2 - 30 } : {};

    const hlColor = (type === 'delete') ? Color.red : Color.primary;
    const isListItem = ( items && items.length > 0 ) ? true : false;
    return (
      <WrapModal
        ref={ (comp) => {this.modalRef = comp;}}
        autoOpen={autoOpen}
        backDropClose={backDropClose}
        overlayClose={overlayClose}
        containerStyle={containerStyle}
        position={position}
        showPos={showPos}>

        <View style={[styles.contentContainer, {paddingTop: wrapperPaddingTop, borderRadius: wrapperBorderRadius}]}>
          {
            title && <WrapText nl={2} st={[styles.title]} styles={[{textAlign: titleTextAlign, fontFamily: Constants.fontMedium}]}>{ Utils.capitalize(title)}</WrapText>
          }

          <View style={styles.scrollContainer}>
            <ScrollView style={{ flexGrow: 0 }}
              contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
              showsVerticalScrollIndicator={false}>
              {
                isListItem &&
                <View style={styles.listContent}>
                {
                  items.map( (item, index) => {
                    const isLastIndex = index === items.length - 1 ? true : false;
                    if (item.point) {
                      const key = item.point > 0 ? 'Tăng' : 'Giảm';
                      const color = item.point < 0 ? Color.red : Color.secondary;
                      const point = item.point > 0 ? `+${Utils.formatThousand(item.point)}` : `-${Utils.formatThousand(Math.abs(item.point))}`;
                      return (
                        <WrapText f={'r'} nl={100} st={[{textAlign: 'left'}, isLastIndex ? { paddingBottom: 0 } : {paddingBottom: 10}]}>
                            {key}{': '} <WrapText st={{color: color}}>{ `${point} điểm`}</WrapText>
                        </WrapText>
                      );
                    }
                    if (!item.key || !item.value) {
                      return <View />;
                    }
                    return (
                      <WrapText f={'r'} nl={100} st={[{textAlign: 'justify'}, isLastIndex ? { paddingBottom: 0 } : {paddingBottom: 10}]}>
                          {Utils.capitalize(item.key)}{': '}{this.renderContentText(item.value)}
                      </WrapText>
                    );
                  })
                }
                </View>
              }
              {
                content &&
                <WrapText nl={100} c={contentColor} st={[styles.contentText, {textAlign: textAlign, fontFamily: contentFontFamily }]}>
                  {
                    content
                  }
                </WrapText>
              }
              {children}
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
              {
                _buttons.map((button, index) => {
                  if (index === 0) {
                    if (button.type === 2) {
                      return (
                        <View
                          key={`${index}`}
                          style={{ paddingRight: 0, width: '50%' }}>
                          <WrapButton
                            text={button.name}
                            type={'border'}
                            containerStyle={{ marginTop: 0 }}
                            textStyle={styles.smallButtonText}
                            size={'s'}
                            onPress={button.onPress}/>
                        </View>
                      );
                    }
                    return (
                      <View style={[{width: buttonWidth, height: 32, alignItems: 'center'}]}>
                        <ButtonRipple
                          key={index}
                          onPress={this.onOkHandle.bind(this)}>
                          <WrapText st={[styles.rippleButton, styles.buttonText, {color: hlColor}]}> {button.name} </WrapText>
                        </ButtonRipple>
                      </View>
                    );
                  }
                  if (index === 1) {
                    if (button.type === 2) {
                      return (
                        <View key={index} style={{ paddingLeft: 0, width: '50%' }}>
                          <WrapButton
                            text={button.name}
                            type={'solid'}
                            containerStyle={{ marginTop: 0 }}
                            textStyle={styles.smallButtonText}
                            size={'s'}
                            iconRight={'next-page'}
                            iconSize={10}
                            onPress={button.onPress}
                          />
                        </View>
                      );
                    }
                    return (
                      <View style={{width: buttonWidth, height: 32, alignItems: 'center'}}>
                        <ButtonRipple
                          key={index}
                          onPress={this.onCancelHandle.bind(this)}
                          color={Color.primary}>
                            <WrapText st={[styles.rippleButton, styles.buttonText, {color: Color.textSecondary}]}> {button.name} </WrapText>
                          </ButtonRipple>
                      </View>
                        
                    );
                  }
                })
              }
          </View>

          { !ignoreIcon &&
            <View style={[styles.modalIconContainer, iconContainer]}>
              <CustomIcon name={iconName} size={35} style={{ color: iconColor }} />
            </View>
          }

        </View>
      </WrapModal>
    );
  }
}
