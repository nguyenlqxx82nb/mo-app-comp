import React from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import ButtonRipple from '../../Button/ButtonRipple';
import { Constants } from 'mo-app-common';
import styles from './style';

export default class BottomTab extends React.PureComponent<any, any> {
	static defaultProps = {
		disableIndex: []
	}
	constructor(props: any) {
		super(props);
		this.state = {
			curIndex: props.initialIndex,
			bottom: 0
		};
	}

	setCurrentTabIndex(index: number) {
		this.setState({ curIndex: index });
	}

	setDisableIndex = (_idxArr: Array<number>) => {}

	onPress = (route: any, index: number) => {
		const { onPress, onBottomTabPress, disableIndex } = this.props;
		const { curIndex } = this.state;
		
		Keyboard.dismiss();

		if (curIndex === index) {
			return;
		}
		if (!disableIndex.includes(index) && onPress) {
			this.setState({
				curIndex: index
			});
			onPress(route, index);
		}
		if (onBottomTabPress) {
			onBottomTabPress(index);
		}
	}

	handleOnBarcodePress = (code: string, index: number) => {
		const { onBarcodePress, onBottomTabPress, disableIndex } = this.props;
		const { curIndex } = this.state;
		if (curIndex === index) {
			return;
		}
		if (!disableIndex.includes(index)) {
			this.setState({
				curIndex: index
			});
			if (onBarcodePress) {
				onBarcodePress(code, index);
			}
		}
		if (onBottomTabPress) {
			onBottomTabPress(index);
		}
	}

	render() {
		const { activeTintColor, inactiveTintColor, routes } = this.props;
		const { curIndex, bottom } = this.state;
		return (
			<View style={[styles.tabbar, { bottom: bottom }]} >
				{routes && routes.map((route: any, index: number) => {
					const focused = index === curIndex;
					const tintColor = focused ? activeTintColor : inactiveTintColor;
					return (
						<ButtonRipple
							// radius={1}
							key={route.key}
							onPress={() => this.onPress(route, index)}> 
							<View
								style={[styles.tabContainer, {width: Constants.Width / routes.length}]}>
								<View style={[styles.topDivider, { backgroundColor: (focused) ? tintColor : 'transparent' }]} />
								<View style={styles.tabBottom}>
									<View ref={`tabItem${index}`} style={styles.tab}>
										{route.tabBarIcon({
											route,
											index,
											focused,
											color: tintColor,
										})}
										<Text style={[styles.tabLabel, { color: tintColor }]}>
											{route.label}
										</Text>
									</View>
								</View>
							</View>
						</ButtonRipple>
					);

				})}
			</View>
		);
	}
}

