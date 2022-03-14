import React from 'react';
import { StyleSheet, Text, TextStyle, Linking, TouchableWithoutFeedback, View } from 'react-native';
import { Color, Constants, toast, Utils } from 'mo-app-common';
import { findAll } from 'highlight-words-core';


export interface WrapTextProps {
  fixSize?: boolean;
  f?: 'r' | 'm' | 'b'; // fontFamily b: bold, m: medium, r: regular
  s?: number; // fontSize
  c?: string; // Color
  st?: TextStyle | TextStyle[]; // style
  styles?: TextStyle | TextStyle[]; // style
  lh?: number; // lineHeight
  nl?: number; // numberOfLines
  children?: any; //children
  up?: boolean; // upperCase
  ml?: number; // maxlength
  onPress?: () => void; // press text
  onLongPress?: () => void; // press text
  onCopy?: (link?: string) => void; // press text
  onLayout?: (event: any) => void;
  ignoreHighlight?: boolean;
  searchWords?: string[] // use highlight word
  highlightStyle?: TextStyle; // use highlight word
}

export const WrapText = (props: WrapTextProps) => {
  let styleFontSize = {};
  // Neu la font to
  if (Constants.TextSize === 2 && !props.fixSize) {
    let fontSize = getFontSize(props.st || props.styles) || props.s || 14;
    fontSize += 2;
    styleFontSize = { fontSize: fontSize, lineHeight: fontSize + 8 };
  }

  let fixStyle = {};
  fixStyle = { ...getFont(props), ...getSize(props), ...getColor(props) };

  if (props.searchWords && !props.ignoreHighlight) {
    const searchWords = props.searchWords;
    const textToHighlight = props.children;

    const searchConvert = searchWords.map(word => {
      return Utils.removeSign(word);
    });
    const valueConvert = Utils.removeSign(textToHighlight);
    const chunks = findAll({ searchWords: searchConvert, textToHighlight: valueConvert });
    return (
      <Text style={[styles.labelText, props.styles, props.st || {}, fixStyle, styleFontSize]}
        numberOfLines={props.nl || 1}
        allowFontScaling={true}
        {...props}>
        {chunks.map((chunk, index) => {
          const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
          return (!chunk.highlight) ? text
            : (
              <Text
                key={index}
                style={chunk.highlight && props.highlightStyle}>
                {text}
              </Text>
            );
        })}
      </Text>
    );
  }
  return (
      <Text style={[styles.labelText, props.styles, props.st || {}, fixStyle, styleFontSize]}
        numberOfLines={props.nl || 1}
        allowFontScaling={true}
        {...props}>
        { props.children ? props.up ? convertMaxlength(props.children.toUpperCase(), props.ml) : convertMaxlength(props.children, props.ml) : ''}
      </Text>
  );
};

const convertMaxlength = (text: string, maxLength: number) => {
  if (!maxLength || text.length <= maxLength) {
    return text;
  }
  return `${text.substr(0, 3)}...${text.substring(text.length - maxLength + 6, text.length)}`;

};

const onGotoLinkHandler = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    toast('Không thể mở trang web!');
  }
};

export const WrapMultiLineText = (props: WrapTextProps) => { 
  const {children } = props;
  const lines = `${children}`.split("\n");
  const results: any[] = [];
  for (let i=0; i<lines.length; i++) {
    if (lines[i]) {
      results.push(WrapLineText(props, lines[i]));
    }
  }
  return (
    <View style={styles.textColumn}>
      {
        results.map((part: any, _index: number) => {
          return part;
        })
      }
    </View>
  );
}

const WrapLineText = (props:WrapTextProps, text: string = "") => {
  const { onCopy } = props;
  const re = /(https?:\/\/[^\s]+)/gi;
  let parts: any = `${text}`.split(re);
  const propsIgnoreHighlight = { ...props, ... { ignoreHighlight: true } };
  const _props = props.searchWords ? props : propsIgnoreHighlight;
  const results: any[] = [];
  for (let i = 0; i < parts.length; i++) {
    if ((i - 1) % 2 === 0) {
      results.push(
        <WrapLink key={'link_' + i} 
          textProps={{..._props}} 
          textValue={parts[i]}
          onLongPress={(val) => { onCopy && onCopy(val) }}
          onPress={(val) => {
            const url = val.toLowerCase();
            onGotoLinkHandler(url);
          }}>
        </WrapLink>);
      continue;
    }
    results.push(<WrapTextPhone key={'text_' + i} {..._props}>{parts[i]}</WrapTextPhone>);
  }
  return (
    <View style={styles.textRow}>
      {
        results.map((part: any, _index: number) => {
          return part;
        })
      }
    </View>
  );
}

export const WrapTextLink = (props: WrapTextProps) => {
  const {children } = props;
  return WrapLineText(props, children);
};

export const WrapTextPhone = (props: WrapTextProps) => {
  const { onCopy } = props;
  const propsIgnoreHighlight = { ...props, ... { ignoreHighlight: true } };
  const text = props.children;
  if (!text) {
    return <WrapEmailText {...props.searchWords ? props : propsIgnoreHighlight}>{''}</WrapEmailText>;
  }
  const re = /([0-9]{8,16})\b/g;
  if (!text.match(re)) {
    return <WrapEmailText {...props.searchWords ? props : propsIgnoreHighlight}>{text}</WrapEmailText>;
  }

  let parts: string[] = `${text}`.split(re);

  const results: any[] = [];
  for (let i = 0; i < parts.length; i++) {
    if ((i - 1) % 2 === 0) {
      results.push(
        <WrapLink key={'phone_' + i} 
          textProps={{...props.searchWords ? props : propsIgnoreHighlight}} 
          textValue={parts[i]}
          onLongPress={(val) => {
            if (onCopy) {
              onCopy(val); 
            }
          }}>
        </WrapLink>);
      continue;
    }
    results.push(<WrapEmailText key={'text_' + i} {...props.searchWords ? props : propsIgnoreHighlight}>{parts[i]}</WrapEmailText>);
  }
  return (
    <View style={styles.textRow}>{
      results.map((part: any, _index: number) => {
        return part;
      })
    }</View>
  );
};


export const WrapEmailText = (props: WrapTextProps) => {
  const { onCopy } = props;
  const propsIgnoreHighlight = { ...props, ... { ignoreHighlight: true } };
  const text = props.children;
  if (!text) {
    return <WrapText {...props.searchWords ? props : propsIgnoreHighlight}>{''}</WrapText>;
  }
  const re = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  if (!text.match(re)) {
    return <WrapText {...props.searchWords ? props : propsIgnoreHighlight}>{text}</WrapText>;
  }

  let parts: string[] = `${text}`.split(re);

  const results: any[] = [];
  for (let i = 0; i < parts.length; i++) {
    if ((i - 1) % 2 === 0) {
      results.push(
        <WrapLink key={'email_' + i} 
          textProps={{...props.searchWords ? props : propsIgnoreHighlight}} 
          textValue={parts[i]}
          onLongPress={(val) => { onCopy && onCopy(val) }}>
        </WrapLink>);
      continue;
    }
    results.push(<WrapText key={'text_' + i} {...props.searchWords ? props : propsIgnoreHighlight}>{parts[i]}</WrapText>);
  }
  return (
    <View style={styles.textRow}>{
      results.map((part: any, _index: number) => {
        return part;
      })
    }</View>
  );
};

interface IWrapLinkProps {
  textProps?: any;
  textValue?: string;
  onPress?: (val) => void;
  onLongPress?: (val) => void;
}

interface IWrapLinkState {
  hlStyle: any;
}

/**
 * Wrap link component
 */
class WrapLink extends React.PureComponent<IWrapLinkProps, IWrapLinkState> {
  constructor(props: IWrapLinkProps) {
    super(props);
    this.state = {
      hlStyle: {}
    }
  }

  /**
   * handle pressIn event
   */
  onPressInHandler = () => {
    this.setState({
      hlStyle: {
        backgroundColor: Color.green
      }
    });
  }

  /**
   * handle pressOut event
   */
  onPressOutHandler = () => {
    this.setState({
      hlStyle: {}
    });
  }

  /**
   * handle press event
   */
  onPressHandler = () => {
    const {onPress, textValue} = this.props;
    if (onPress) {
      onPress(textValue);
    }
  }

  /**
   * handle long press
   */
  onLongPressHandler = () => {
    const {onLongPress, textValue} = this.props;
    if (onLongPress) {
      onLongPress(textValue);
    }
  }

  render() {
    const { textProps, textValue } = this.props;
    const { hlStyle } = this.state;
    return (
      <TouchableWithoutFeedback
          onPressIn={this.onPressInHandler}
          onPressOut={this.onPressOutHandler}
          onPress={this.onPressHandler}
          onLongPress={this.onLongPressHandler}>
          <WrapText {...textProps} 
            styles={[{ textDecorationLine: 'underline' }, hlStyle]}>
            { textValue }
          </WrapText>
        </TouchableWithoutFeedback>
    )
  }
}


const getFontSize = (styles: any) => {
  if (!styles) {
    return styles;
  }
  let fontSize;
  if (styles instanceof Array) {
    styles.forEach(style => {
      if (style && style.fontSize) {
        fontSize = style.fontSize;
      }
    });
    return fontSize;
  }

  if (styles.fontSize) {
    fontSize = styles.fontSize;
  }

  return fontSize;
};

const getFont = (props: WrapTextProps) => {
  const f = props.f;
  if (!f) {
    return {};
  }
  if (f === 'b') {
    return { fontFamily: Constants.fontBold };
  }
  if (f === 'm') {
    return { fontFamily: Constants.fontMedium };
  }
  if (f === 'r') {
    return { fontFamily: Constants.fontRegular };
  }
  return {};
}

const getSize = (props: WrapTextProps) => {
  const s = props.s;
  if (!s) {
    return {};
  }
  return { fontSize: s, lineHeight: props.lh ? props.lh : s + 6 };
}

const getColor = (props: WrapTextProps) => {
  const c = props.c;
  if (!c) {
    return {};
  }
  return { color: c };
}

const styles = StyleSheet.create({
  labelText: {
    color: Color.text,
    backgroundColor: 'transparent',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
    width: undefined,
    fontFamily: Constants.fontMedium,
  },
  textRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },

  textColumn: {
    flexWrap: 'nowrap',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }

});
