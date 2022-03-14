import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export class KeyboardScrollView extends React.PureComponent<any, any> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const { contentContainerStyle, style, children, extraScrollHeight } = this.props;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={contentContainerStyle ? contentContainerStyle : {}}
        style={style ? style : {}}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={extraScrollHeight ? extraScrollHeight : Platform.OS === 'android' ? 150 : 120}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        {children}
      </KeyboardAwareScrollView>
    );
  }
}
