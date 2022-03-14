import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated, Easing, Platform, Text, TextStyle } from 'react-native';
import { CustomIcon, Color } from 'mo-app-common';

interface IButtonRipple {
	onPress: () => void;
	color: string;
	name?: string
	badge?: number;
	width?: number;
	height?: number;
	radius?: number;
	opacity?: number;
	badgeType?: 'number' | 'solid',
	size?: number;
	disabled?: boolean;
	isIcon?: boolean;
	textColor?: string;
	fit?: boolean;
	status?: boolean;
	imgSource?: any;
	content?: React.ReactNode;
	containerStyle?: TextStyle | TextStyle[];
	enable?: boolean;
	isPreventDoubleClick?: boolean;
}

class ButtonRipple extends React.PureComponent<IButtonRipple, any> {
	static defaultProps = {
		badge: 0,
		badgeType: 'number',
		color: Color.primary,
		size: 24,
		disabled: false,
		opacity: 0.1,
		isIcon: true,
		textColor: '#fff',
		fit: false,
		status: true,
		enable: true,
		isPreventDoubleClick: false
	};

	_badge: number = 0;
	_rippleView: any;
	_icon: any;
	contentRef: any;
	isPreventClick: boolean;

	constructor(props: IButtonRipple) {
		super(props);

		const { opacity } = this.props;
		this._badge = this.props.badge;

		this.state = {
			containerSize: { width: 1, height: 1 },
			opacity: opacity,
			scaleValue: new Animated.Value(0.01),
			opacityValue: new Animated.Value(0),
			status: this.props.status,
			badgeNumber: this.props.badge,
			name: this.props.name,
			disabled: props.disabled
		};
		this.renderRippleView = this.renderRippleView.bind(this);
		this.onPressedIn = this.onPressedIn.bind(this);
		this.onPressedOut = this.onPressedOut.bind(this);
		// this.onViewContainerLayoutHandler = this.onViewContainerLayoutHandler.bind(this);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { name } = this.props;
		if (nextProps.name !== name) {
			this.setState({ name: nextProps.name });
		}
	}

	onPressedIn() {
		if (!this.props.enable) {
			return;
		}
		this.state.opacityValue.setValue(this.state.opacity);
		Animated.timing(this.state.scaleValue, {
			toValue: 1,
			duration: 150,
			easing: Easing.bezier(0.0, 0.0, 0.2, 1),
			useNativeDriver: Platform.OS === 'android',
		}).start(() => {
		});
	}
	onPressedOut() {
		if (!this.props.enable) {
			return;
		}
		Animated.timing(this.state.opacityValue, {
			toValue: 0,
			useNativeDriver: Platform.OS === 'android',
		}).start(() => {
			this.state.scaleValue.setValue(0.01);
			this.state.opacityValue.setValue(0);
		});
	}

	renderRippleView() {
		const { color } = this.props;
		const { scaleValue, opacityValue } = this.state;
		let style: any
			= {
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: 5,
			transform: [{ scale: scaleValue }],
			opacity: opacityValue,
			backgroundColor: color,
		};
		// if (width && height) {
		// 	style = {
		// 		...style, ...{
		// 			top: height / 2 - width / 2,
		// 			left: 0,
		// 			width: width,
		// 			height: width,
		// 			borderRadius: radius || width / 2,
		// 		}
		// 	};
		// }
		return (
			<Animated.View
				ref={component => { this._rippleView = component; }}
				style={style}
			/>
		);
	}

	renderBadge = () => {
		const { badgeType, badge } = this.props;

		if (badgeType === 'number') {
			return (badge > 0) ?
				<View style={[styles.badgeContainer]}><Text style={styles.badgeNumber}>{badge}</Text></View> : null;
		}
		else if (badgeType === 'solid') {
			return (badge > 0) ?
				<View style={[styles.badgeSolidContainer]} /> : <View />;
		}

	}

	/**
	 * render content view
	 * @returns
	 */
	renderContentView() {
		const { size, name, color } = this.props;
		return (
			<CustomIcon ref={ref => (this._icon = ref)} name={name} size={size} style={{ color: color }} />
		);
	}


	setIcon = (name, color) => {
		this.setState({ name: name, color: color });
	}

	updateBagde = (number) => {
		this.setState({ badgeNumber: number });
	}

	onPressHandler = () => {
		const { isPreventDoubleClick } = this.props;
		if (!this.props.enable) {
			return;
		}
		if (this.isPreventClick && isPreventDoubleClick) {
			return;
		}
		this.isPreventClick = true;
		setTimeout(() => {
			this.isPreventClick = false;
		}, 500);
		const { onPress } = this.props;
		setTimeout(() => {
			if (onPress) {
				onPress();
			}
		}, 0);
	}

	onViewContainerLayout = (e: any) => {
		const { radius } = this.props;
		const widthLayout = e.nativeEvent.layout.width;
		const heightLayout = e.nativeEvent.layout.height;
		const width = this.props.width || widthLayout;
		const height = this.props.height || heightLayout;
		if (this._rippleView) {
			this._rippleView.setNativeProps({
				style: {
					top: (heightLayout - height) / 2,
					left: (widthLayout - width) / 2,
					width: width,
					height: height,
					borderRadius: radius || width / 2,
				},
			});
		}
	}

	render() {
		const { content, width, height, containerStyle, disabled, children, enable } = this.props;
		let _containerStyle = enable ? {opacity: 1} : {opacity: 0.3};
		
		if (content || children) {
			return (
				<View style={[_containerStyle, containerStyle]}>
					<TouchableWithoutFeedback disabled={disabled} onPressIn={this.onPressedIn} onPressOut={this.onPressedOut}
						onPress={this.onPressHandler} onLayout={this.onViewContainerLayout}>
						<View ref={ref => { this.contentRef = ref; }}>
							{content || children}
							{this.renderRippleView()}
						</View>
					</TouchableWithoutFeedback>
				</View>
			);
		}

		if (width && height) {
			_containerStyle = {..._containerStyle, ...{width: width, height: height} };
		} else {
			_containerStyle = {..._containerStyle, ...{width: 40, height: 40} };
		}
		return (
			<View onLayout={this.onViewContainerLayout} style={[_containerStyle, containerStyle]}>
				<TouchableWithoutFeedback disabled={disabled} onPressIn={this.onPressedIn} onPressOut={this.onPressedOut} onPress={this.onPressHandler}>
					<View style={[styles.iconContainer]}>
						{this.renderRippleView()}
						<View>
							{this.renderContentView()}
							{this.renderBadge()}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconContainer: {
		flex: 1,
		// margin: 16,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	badgeContainer: {
		position: 'absolute',
		backgroundColor: Color.primary,
		top: -10,
		right: -10,
		width: 20,
		height: 20,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	badgeNumber: {
		color: '#fff',
		fontSize: 12,
	},
	badgeSolidContainer: {
		position: 'absolute',
		backgroundColor: Color.red,
		top: -2,
		right: 2,
		width: 6,
		height: 6,
		borderRadius: 3,
	},
});

export default ButtonRipple;
