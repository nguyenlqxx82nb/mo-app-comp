import React, { PureComponent } from 'react';
import { View, Animated, ScrollView } from 'react-native';
import styles from './styles';
import { Constants, Color } from 'mo-app-common';
import { ButtonRipple } from '../../Button';
import { WrapText } from '../../Text';

export interface ITabHeader {
	name: string;
	disable?: boolean;
	width?: number;
	hasBadge?: boolean;
	badgeNumber?: number;

}

export interface ITabHeaderProps {
	tabs: Array<ITabHeader>,
	currentIndex: number,
	onTabPress?: any,
	onTabSelectedChanged?: any
	contentWidth?: number;
}

const TAB_HEIGHT = 45;

export class TabHeader extends PureComponent<ITabHeaderProps, any> {
	static defaultProps = {
		tabs: [],
		currentIndex: 0,
		contentWidth: Constants.Width
	};

	_isShow = true;
	_currentScroll: number = 0;
	_height: number = 50;
	_scrollRef: ScrollView;

	constructor(props: ITabHeaderProps) {
		super(props);
		const { tabs } = this.props;
		const badges: Array<number> = [];
		for (let i = 0; i < tabs.length; i++) {
			badges.push(0);
		}
		this.state = {
			currentIndex: this.props.currentIndex,
			scrollYAnimated: new Animated.Value(0),
			badges: badges
		};
	}

	show = () => {
		if (this._isShow) {
			return;
		}

		const { scrollYAnimated } = this.state;
		Animated.timing(scrollYAnimated, { toValue: 0, duration: 150, useNativeDriver: false }).start();
		this._isShow = true;
	}

	hide = () => {
		if (!this._isShow) {
			return;
		}

		const { scrollYAnimated } = this.state;
		Animated.timing(scrollYAnimated, { toValue: -this._height, duration: 150, useNativeDriver: false }).start();
		this._isShow = false;
	}

	onTabPressHandler = (index: number) => {
		const { onTabSelectedChanged, onTabPress, tabs } = this.props;
		const { currentIndex } = this.state;

		if (tabs.length > index && currentIndex !== index && !tabs[index].disable) {
			this.setState({ currentIndex: index });
			if (onTabSelectedChanged) {
				onTabSelectedChanged(index);
			}
			// scroll tab
			this.scrollTab(index);
		}
		if (onTabPress) {
			onTabPress(index);
		}
	}

	scrollTab = (selectedIndex: number) => {
		const { tabs } = this.props;
		let scrollX = 0;
		const width = Constants.Width / tabs.length;
		if (selectedIndex >= 3) {
			for (let i = 0; i <= selectedIndex - 2; i++) {
				scrollX += (tabs[i].width || width || 0);
			}
		}
		setTimeout(() => {
			this._scrollRef.scrollTo({ x: scrollX });
		}, 50);
	}

	scrollChange = (scrollY: any) => {
		// scroll len
		if (this._currentScroll <= scrollY) {
			if (scrollY <= this._height) {
				this.show();
				return;
			}
			else {
				this.hide();
			}
		}
		else {
			this.show();
		}

		this._currentScroll = scrollY;
	}

	updateBadge = (index: number, badgeNumber: number) => {
		const { badges } = this.state;
		badges[index] = badgeNumber;
		this.setState({ badges: badges });
		setTimeout(() => {
			this.forceUpdate();
		}, 0);
	}

	render() {
		const { tabs } = this.props;
		const { currentIndex } = this.state;
		const contentWidth = this.props.contentWidth || Constants.Width;
		const width = contentWidth / tabs.length;
	
		return (
			<ScrollView
				ref={ref => { this._scrollRef = ref; }}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={[styles.container, {height: TAB_HEIGHT, left: (Constants.Width - contentWidth) / 2 }]}>
				{
					tabs.map((tab: ITabHeader, index: number) => {
						const tabActive = (index === currentIndex);
						// const hasBadge = tab.badge && tab.badge > 0 ? true : false;
						const tabWidth = tab.width || width;
						return (
							<ButtonRipple
								key={`${index}`}
								onPress={this.onTabPressHandler.bind(this, index, tab)}
								containerStyle={[styles.tabContainer, { width: tabWidth }]}
								width={tabWidth}
								height={TAB_HEIGHT - 1}
								color={Color.primary}
								radius={10}
								content={
									<View style={[styles.tabContainer, { width: tabWidth }]}>
										<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
											<WrapText f={'m'} s={14} c={tabActive ? Color.primary : Color.textSecondary}>{tab.name}</WrapText>
											{tab.hasBadge && <View style={styles.badge}>
												{tab.badgeNumber > 0 && <WrapText f={'r'} s={10} c={'#fff'}>{tab.badgeNumber}</WrapText>}</View>
											}
										</View>
										{tabActive && <View style={[styles.underline, { left: (tabWidth / 2 - 20) }]} />}
									</View>
								}
							/>
						);
					})
				}
			</ScrollView>
		);
	}
}
