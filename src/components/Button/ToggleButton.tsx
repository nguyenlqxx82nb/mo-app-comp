import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Color } from 'mo-app-common';
import ButtonRipple from './ButtonRipple';

export interface IToggleButtonProps {
	enable?: boolean;
	isChecked?: boolean;
	value: string | number;
	containerStyle?: ViewStyle;
	iconOn: string;
	iconOff: string;
	activeColor?: string;
	autoCheck?: boolean;
	iconSize?: number;
	onButtonPress?: (isChecked: boolean, value: string | number) => void;
}

export interface IToggleButtonState {
	checked: boolean;
}
export default class ToggleButton extends React.PureComponent<IToggleButtonProps, IToggleButtonState> {
	static defaultProps = {
		enable: true,
		value: '',
		isChecked: false,
		containerStyle: {},
		activeColor: Color.primary,
		autoCheck: true
	};

	constructor(props: IToggleButtonProps) {
		super(props);
		const { isChecked } = this.props;
		this.state = {
			checked: isChecked,
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps: IToggleButtonProps) {
		if (nextProps.isChecked !== this.state.checked) {
			this.setState({ checked: nextProps.isChecked });
		}
	}

	onButtonPressHandler = () => {
		const { checked } = this.state;
		const { onButtonPress, value, autoCheck } = this.props;

		if (onButtonPress) {
			onButtonPress(!checked, value);
		}
		if (autoCheck) {
			this.setState({ checked: !checked });
		}

	}

	setCheckedState = (isChecked: boolean) => {
		this.setState({ checked: isChecked });
	}

	getCheckedState = () => {
		const { checked } = this.state;
		return checked;
	}

	getValue = () => {
		return this.props.value;
	}

	render() {
		const { checked } = this.state;
		const { containerStyle, iconOff, iconOn, activeColor, iconSize } = this.props;
		const icon = checked ? iconOn : iconOff;
		const color = checked ? activeColor : Color.text;
		const size = iconSize || 16;
		return (
			<View style={containerStyle}>
				<ButtonRipple width = {30} height={30}  name={icon} size={size} color={color} onPress={this.onButtonPressHandler} />
			</View>
		);
	}
}