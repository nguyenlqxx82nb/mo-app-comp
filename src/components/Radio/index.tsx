import React from 'react';
import { TouchableOpacity, View, ViewStyle, TextStyle} from 'react-native';
import ButtonRipple  from '../Button/ButtonRipple';
import { WrapText } from '../Text';
import { Color, CustomIcon, Styles, Utils } from 'mo-app-common';
import styles from './styles';

export interface IRadioItem {
	id?: any,
	textStyle?: TextStyle;
	containerStyle?: ViewStyle | ViewStyle[];
	labelRight?: string;
	labelLeft?: string;
}

export interface IRadioProps {
	items: IRadioItem[];
	selectedKey?: any;
	isRequired?: boolean;
	onSelectedChange?: (item: IRadioItem) => void;
}

export interface IRadioState {
	items: IRadioItem[];
	selectedKey?: string | number;
}

export default class RadioButton extends React.PureComponent<IRadioProps, IRadioState> {
	static defaultProps = {
		items: [],
		isRequired: true
	};

	constructor(props: IRadioProps) {
		super(props);
		this.state = {
			items: this.props.items,
			selectedKey: this.props.selectedKey
		};
	}

	UNSAFE_componentWillReceiveProps(props: IRadioProps) {
		if (props.selectedKey !== this.state.selectedKey) {
			this.setState({
				selectedKey: props.selectedKey
			});
		}
	}

	onItemToggleActive = (selectedItem: IRadioItem) => {
		const { selectedKey } = this.state;
		const { onSelectedChange, isRequired } = this.props;

		if (selectedItem.id === selectedKey) {
			if (isRequired) {
				return;
			} else {
				if (onSelectedChange) {
					onSelectedChange(null);
				}
				this.setState({ selectedKey: undefined});
			}
			return;
		}

		if (onSelectedChange) {
			onSelectedChange(selectedItem);
		}
		
		this.setState({ selectedKey: selectedItem.id });
	}

	setSelectedKey = (key: string) =>{
		this.setState({selectedKey: key});
	}

	setActive = (active: boolean) => {
		// this.setState({ active: active });
	}

	getActive = () => {
		//const { active } = this.state;
		// return active;
	}

	getValue = () => {
		const { selectedKey } = this.state;
		return selectedKey;
	}

	renderItem = (item: IRadioItem, index: number) => {
		const { selectedKey } = this.state;
		const { labelLeft, labelRight, textStyle, containerStyle } = item;
		const active = selectedKey === item.id ;
		return (
			<ButtonRipple 
				key={index}
				radius={2}
				color={active ? Color.primary : Color.text}
				onPress={this.onItemToggleActive.bind(this, item)}>
				<View style={[styles.container, containerStyle]}>
					{
						labelLeft && <WrapText st={[Styles.Text_S_R, textStyle, { marginRight: 10 }]}>{labelLeft}</WrapText>
					}
					{
						!active &&
						<CustomIcon name={'radio_empty'} size={16} style={{ color: Color.text }} />
					}
					{
						active &&
						<CustomIcon name={'radio'} size={16} style={{ color: Color.primary }} />
					}
					{
						labelRight && <WrapText st={[Styles.Text_S_R, textStyle, { marginLeft: 10 }]}>{labelRight}</WrapText>
					}
				</View>
			</ButtonRipple>
		);
	}

	render() {
		const { items } = this.state;
		if (!items.length) {
			return null;
		}
		return (
			<View>
				{
					items.map((item: IRadioItem, index: number) => {
						return this.renderItem(item, index);
					})
				}
			</View>
		)
	}
}


