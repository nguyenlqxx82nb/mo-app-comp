
import { Color } from 'mo-app-common';
import React from 'react';
import { View } from 'react-native';
import ButtonRipple from './../Button/ButtonRipple';

interface Props {
	active?: boolean;
	onActive: any;
	color?: string
}

export default class PasswordToggle extends React.PureComponent<Props, any> {
	constructor(props: Props) {
		super(props);
		this.state = {
			active: true,
		};
	}

	componentDidMount = () => {
	}

	onChangeShow = () => {
		const { onActive } = this.props;
		const { active } = this.state;
		const newActive = !active;
		// console.log('onChangeShow ', active, newActive);
		this.setState({ active: newActive });
		if (onActive) {
			onActive(newActive);
		}
	}

	render() {
		const { active } = this.state;
		const color = this.props.color || Color.text;
		return (
			<View style={{ position: 'absolute', right: 5, top: 0 }}>
				{
					active &&
					<ButtonRipple
						name={'view_coded_info'}
						size={16}
						color={color}
						width={32}
						height={32}
						onPress={this.onChangeShow.bind(this)}
					/>
				}
				{
					!active &&
					<ButtonRipple
						name={'hide_password'}
						size={16}
						color={color}
						width={32}
						height={32}
						onPress={this.onChangeShow.bind(this)}
					/>
				}
			</View>
		);
	}
}

