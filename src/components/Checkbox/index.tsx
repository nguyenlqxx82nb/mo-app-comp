import React from 'react';
import { TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import { Color, CustomIcon, Styles } from 'mo-app-common';
import ButtonRipple from '../Button/ButtonRipple';
import { WrapText } from '../Text';
import styles from './styles';

export interface ICheckBoxItem {
	labelLeft?: string;
	labelRight?: string;
	active: boolean;
	value: any;
}

export interface ICheckboxProps {
	active?: boolean;
	value: any;
	textStyle?: TextStyle;
	containerStyle?: ViewStyle | ViewStyle[];
	onActiveChange?: (active: boolean, value: string | number) => void;
	labelRight?: string;
	labelLeft?: string;	
	renderLeft?: () => void;
	renderRight?: () => void;
}

export default class Checkbox extends React.PureComponent<ICheckboxProps, any> {
	static defaultProps = {
		active: false,	
		value: '',
		textStyle: {},
		containerStyle: {},
	};

	constructor(props: ICheckboxProps) {
		super(props);
		this.state = {
			active: this.props.active,
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps: any) {
		const { active } = this.state;
		if (active !== null && active !== nextProps.active) {
			this.setState({ active: nextProps.active });
		}
	}

	toggleActive = () => {
		const { active } = this.state;
		const { onActiveChange, value } = this.props;

		if (onActiveChange) {
			onActiveChange(!active, value);
		}

		this.setState({ active: !active });
	}

	setActive = (active: boolean) => {
		this.setState({ active: active });
	}

	getActive = () => {
		const { active } = this.state;
		return active;
	}

	getValue = () => {
		return this.props.value;
	}

	render() {
		const { active } = this.state;
		const { labelLeft, labelRight, textStyle, containerStyle, renderLeft, renderRight } = this.props;
		const onlyIcon = (!renderLeft && !labelLeft && !labelLeft && !labelRight) ? true : false;
		return (
			<ButtonRipple 
				color={active ? Color.primary : Color.text}
				radius={onlyIcon ? 20 : 1}
				onPress={this.toggleActive.bind(this)}>
				<View style={[styles.container, onlyIcon ? {paddingHorizontal: 12, paddingVertical: 12} : {}, containerStyle]}>
					{
						renderLeft && renderLeft()
					}
					{
						labelLeft && <WrapText st={[Styles.Text_S_R, textStyle, { marginRight: 8 }]}>{labelLeft}</WrapText>
					}
					{
						!active &&
						<CustomIcon name={'checkbox_empty'} size={16} style={{ color: Color.text }} />
					}
					{
						active &&
						<CustomIcon name={'checkbox'} size={16} style={{ color: Color.primary }} />
					}
					{
						labelRight && <WrapText st={[Styles.Text_S_R, textStyle, { marginLeft: 8 }]}>{labelRight}</WrapText>
					}
					{
						renderRight && renderRight()
					}
				</View>
			</ButtonRipple>
		);
	}
}


