
import { Constants, Styles } from 'mo-app-common';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { WrapText } from '../../Text';
import { TabHeader } from '../Header';
import styles from './styles';

export interface ITabInfo {
	name: string;
	disable?: boolean;
	width?: number;
	hasBadge?: boolean;
	badgeNumber?: number;
	loaded?: boolean;
	content: React.ReactNode;
}

export interface ITabProps {
	tabInfo: Array<ITabInfo>;
	onTabPress?: any;
	currentIndex?: number,
	onSelectedTabChanged?: any
	messageEmptyData?: string;
	tabWidth?: number;
}

interface ITabState {
	tabWidth: number;
	currentIndex: number;
	tabHeaders: any[];
}

export class Tab extends PureComponent<ITabProps, ITabState> {
	tabHeaderRef: TabHeader;
	static defaultProps = {
		tabs: [],
		currentIndex: 0,
		messageEmptyTab: 'Chưa có thông tin dữ liệu hoặc thông tin dữ liệu trống.'
	}

	constructor(props: ITabProps) {
		super(props);

		this.state = {
			tabWidth: props.tabWidth || Constants.Width,
			currentIndex: this.props.currentIndex,
			tabHeaders: []
		};
	}

	componentDidMount() {
		this.getHeaderInfo();
	}

	getHeaderInfo = () => {
		const { tabInfo } = this.props;
		const currentHeader = tabInfo.map((item: ITabInfo) => {
			return {
				name: item.name,
				disable: item.disable,
				width: item.width,
				hasBadge: item.hasBadge,
				badgeNumber: item.badgeNumber
			}
		});
		this.setState({ tabHeaders: currentHeader });
	}

	onTabSelectedChangedHandler = (index: number) => {
		const { onSelectedTabChanged } = this.props;
		this.setState({
			currentIndex: index,
		});

		if (onSelectedTabChanged) {
			onSelectedTabChanged(index);
		}
	}

	getCurrentIndex = () => {
		const { currentIndex } = this.state;
		return currentIndex;
	}

	forceUpdateHeader = () => {
		this.getHeaderInfo();
	}

	onTabPressHandler = (index: number) => {
		const { onTabPress } = this.props;
		if (onTabPress) {
			onTabPress(index);
		}
	}

	onLayoutHandler = (event: any) => {
		const width = event.nativeEvent.layout.width;
		// console.log('onLayoutHandler width ', width);
		this.setState({
			tabWidth: width
		});
	}

	render() {
		const { tabInfo, messageEmptyData } = this.props;
		const { currentIndex, tabHeaders, tabWidth } = this.state;
	
		if (!tabInfo || !tabInfo.length) {
			return <View style={[Styles.Flex, Styles.CenterItem, { marginHorizontal: 16 }]}>
				<WrapText nl={3} st={[Styles.Text_M_R]} styles={{ textAlign: 'center' }}>
					{messageEmptyData}</WrapText>
			</View>;
		}
		tabInfo[currentIndex].loaded = true;

		return (
			<View style={{ flex: 1}} onLayout={this.onLayoutHandler}>
				{
					tabInfo.map((tab: ITabInfo, index: number) => {
						let zIndex = (currentIndex === index) ? 1 : 0;
						return (
							<View key={`${index}`} style={[styles.contentContainer, { zIndex: zIndex }]}>
								{ tab.loaded && tab.content}
							</View>);
					})
				}
				<TabHeader
					ref={(comp: any) => { this.tabHeaderRef = comp; }}
					tabs={tabHeaders}
					currentIndex={currentIndex}
					onTabSelectedChanged={this.onTabSelectedChangedHandler}
					onTabPress={this.onTabPressHandler}
					contentWidth={this.props.tabWidth || tabWidth} />
			</View>
		);
	}
}
