
import React from 'react';
import { TouchableOpacity, StyleSheet, View, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Color, Constants, CustomIcon } from 'mo-app-common';
import { WrapText } from '../Text';

export interface WrapButtonProps {
  button?: object;
  text?: string;
  onPress?: any;
  containerStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  containerColor?: string;
  textColor?: string;
  rippleColor?: string;
  rippleRound?: boolean;
  selected?: boolean;
  type?: 'none' | 'solid' | 'border';
  iconLeft?: string;
  iconRight?: string;
  icon?: string;
  iconRightStyle?: string;
  iconLeftStyle?: string;
  iconStyle?: string;
  iconSize?: number;
  bold?: boolean;
  size?: 't' | 's' | 'ms' | 'm' | 'l'; // tiny: t, s: small , m: medium , l: large
  enable?: boolean;
  whiteTheme?: boolean;
  width?: string | number;
  loading?: boolean;
  hasShadow?: boolean;
  textUpperCase?: boolean;
  active?: boolean;
  badgeNumber?: number;
  borderColor?: string;
  hasBadge?: boolean;
  bgColor?: string;
};

export class WrapButton extends React.PureComponent<WrapButtonProps, any> {

  static defaultProps = {
    text: '',
    rippleColor: '#ccc',
    rippleRound: true,
    selected: true,
    enable: true,
    type: 'solid',// none, border
    containerStyle: {},
    textStyle: {},
    iconStyle: {},
    iconRightStyle: {},
    iconLeftStyle: {},
    iconSize: 20,
    bold: false,
    size: 'm',
    whiteTheme: false,
    width: '100%',
    loading: false,
    badgeNumber: 0,
    borderColor: Color.border
  }

  constructor(props: WrapButtonProps) {
    super(props);
    const { enable, type, loading } = this.props;
    this.state = {
      enable: enable,
      type: type,
      loading: loading
    };
  }

  componentDidMount() {
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (nextProps.enable !== this.props.enable) {
      this.setState({ enable: nextProps.enable });
    }
  }

  setEnable = (enable: boolean) => {
    this.setState({ enable: enable });
  }

  setType = (type: string) => {
    this.setState({ type: type });
  }

  getTextSize = () => {
    const { size } = this.props;
    if (size === 't') {
      return { fontSize: 10, lineHeight: 12 };
    }
    if (size === 's') {
      return { fontSize: 12, lineHeight: 14 };
    }
    if (size === 'ms') {
      return { fontSize: 14, lineHeight: 18 };
    }
    if (size === 'm') {
      return { fontSize: 16, lineHeight: 20 };
    }
    if (size === 'l') {
      return { fontSize: 18, lineHeight: 22 };
    }
  }

  setLoadingStatus = (loading: boolean) => {
    this.setState({ loading: loading });
  }

  onPressHandler = () => {
    const { loading } = this.state;
    const { onPress } = this.props;
    if (!loading && onPress) {
      onPress();
    }
  }

  render() {
    const { enable, type } = this.state;
    const {
      text,
      // onPress,
      containerStyle,
      textStyle,
      containerColor,
      textColor,
      iconLeft,
      iconRight,
      icon,
      iconStyle,
      iconRightStyle,
      iconLeftStyle,
      iconSize,
      bold,
      whiteTheme,
      width,
      size,
      loading,
      hasShadow,
      textUpperCase,
      active,
      badgeNumber,
      hasBadge,
      bgColor
    } = this.props;

    let _containerColor = '';
    let _textColor = '';
    let _buttonContainer = {};
    let _textStyle = {};
    let _borderColor = '';
    let _borderStyle = {};
    let spinnerColor = Color.primary;

    if (type === 'solid') {
      _containerColor =  bgColor || Color.primary;
      _textColor = whiteTheme ? Color.primary : '#fff';
      spinnerColor = whiteTheme ? Color.primary : '#fff';
    } else if (type === 'border') {
      _textColor = active ? Color.primary : Color.text;
      _borderColor = active ? Color.primary : Color.border;
      spinnerColor = _textColor;
    } else if (type === 'none') {
      _textColor = enable ? whiteTheme ? '#fff' : Color.primary : Color.disable;
      _containerColor = 'transparent';
    }

    if (bold) {
      _textStyle = { fontFamily: Constants.fontBold };
      // console.log('_textStyle ', _textStyle);
    }
    else {
      _textStyle = { fontFamily: Constants.fontMedium };
    }

    _borderStyle = type === 'none' ? {} : { ...styles.borderButton, ...{ borderColor: _borderColor } };
    _containerColor = containerColor ? containerColor : _containerColor;
    _textColor = textColor ? textColor : _textColor;
    _buttonContainer = { ...(type === 'solid') ? {} : _borderStyle };
    if (size === 's') {
      _buttonContainer = { ..._buttonContainer, ...{ paddingVertical: 8 } };
    }

    const textSize = this.getTextSize();
    _textStyle = { ..._textStyle, ...textSize, ...{ color: _textColor } };
    const _iconSize = textSize?.lineHeight;
    // const hasBadge = badgeNumber > 0 ? true : false;
    const badge = badgeNumber < 10 ? `0${badgeNumber}` : badgeNumber < 99 ? `${badgeNumber}` : '+99';
    const hasText = text ? true : false;
    const hasIcon = icon ? true : false;

    if (!enable) {
      _buttonContainer = {..._buttonContainer, ...{opacity: 0.3}};
    }
    if (!enable) {
      return (
        <View
          style={[styles.container, { width: width }, { backgroundColor: _containerColor }, _buttonContainer, containerStyle]}>
          {iconLeft ? (<CustomIcon name={iconLeft} color={_textColor} size={_iconSize} style={[styles.iconLeft, iconLeftStyle]} />) : (<View />)}
          {hasText && <WrapText fixSize={true} up={textUpperCase} st={[styles.text, _textStyle]}>{text}</WrapText> }
          {iconRight ? (<CustomIcon name={iconRight} color={_textColor} size={_iconSize} style={[styles.iconRight, iconRightStyle]} />) : (<View />)}
          {hasIcon && (<CustomIcon name={icon} color={_textColor} size={_iconSize} style={[iconStyle]} />) }
        </View>
      );
    }

    
    return (
      <TouchableOpacity
        style={[styles.container, { width: width }, { backgroundColor: _containerColor }, _buttonContainer, type === 'solid' && hasShadow ? styles.solidShadow : {}, containerStyle]}
        activeOpacity={0.75}
        onPress={this.onPressHandler}>
        {!loading &&
          (<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {iconLeft ? (<CustomIcon name={iconLeft} color={_textColor} size={_iconSize} style={[styles.iconLeft, iconLeftStyle]} />) : (<View />)}
            {hasText && <WrapText fixSize={true} up={textUpperCase} st={[styles.text, _textStyle, textStyle]}>{text}</WrapText> }
            {iconRight ? (<CustomIcon name={iconRight} color={_textColor} size={_iconSize} style={[styles.iconRight, iconRightStyle]} />) : (<View />)}
            {hasBadge && <View style={[styles.badge, active ? {backgroundColor: Color.primary} : {}]}><WrapText f={'r'} fixSize={true} s={8} c={'#fff'} lh={10} st={{ textAlign: 'center' }}>{badge}</WrapText></View>}
            {hasIcon && (<CustomIcon name={icon} color={_textColor} size={_iconSize} style={[iconStyle]} />) }
          </View>
          )}
        {
          loading && (
            <View style={{ height: textSize?.lineHeight, justifyContent: 'center', alignItems: 'center', paddingTop: 0 }}>
              <ActivityIndicator size="small" color={spinnerColor} />
            </View>
          )
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  borderButton: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 6.5,
    paddingHorizontal: 10,
  },
  text: {},
  iconLeft: {
    marginRight: 5,
  },
  iconRight: {
    marginLeft: 5,
  },
  solidShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  badge: {
    position: 'absolute',
    top: -15,
    right: -20,
    minWidth: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(166, 166, 166)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 7,
  }
});

