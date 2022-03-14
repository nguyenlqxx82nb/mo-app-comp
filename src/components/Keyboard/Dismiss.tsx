
import React, { PureComponent } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export class DismissKeyboard extends PureComponent<any, any> {
	render() {
		const { children, style } = this.props;
		return (
			<TouchableWithoutFeedback
				style={style}
				onPress={() => Keyboard.dismiss()}>
				{ children}
			</TouchableWithoutFeedback>
		);
	}
}
