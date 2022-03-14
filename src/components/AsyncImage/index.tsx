import React from 'react';
import { View, Image, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Color, Styles } from 'mo-app-common';

interface IAsyncImageProps {
	source: {
		uri: string
	};
	placeholderColor?: string;
	style?: ViewStyle;
	width: number;
	height: number;
	radius?: number;
	borderWidth?: number;
	borderColor?: string;
	defaultAvatar?: boolean;
	iconDefault?: string;
	onError?: () => void;
}

interface IAsyncImageState {
	source?: {
		uri: string
	};
	loaded: boolean;
}

export default class AsyncImage extends React.PureComponent<IAsyncImageProps, IAsyncImageState> {

	static defaultProps = {
		placeholderColor: Color.border,
		borderWidth: 0,
		borderColor: Color.primary
	};

	constructor(props: IAsyncImageProps) {
		super(props);
		this.state = {
			loaded: false,
			source: props.source
		};
	}

	UNSAFE_componentWillReceiveProps(prevProps) {
		const { source } = this.state
		if (prevProps.source && source && source.uri !== prevProps.source.uri) {
			this.setState({ source: prevProps.source });
		}
	}

	handleErrorImage = () => {
		const { iconDefault, onError } = this.props;
		if (!iconDefault) {
			return;
		}
		onError && onError()
		this.setState({ source: { uri: iconDefault }, loaded: true });
	}

	handleLoadImage = () => {
		this.setState({ loaded: true });
	}

	render() {
		const { placeholderColor, style, width, height, radius, borderWidth, borderColor, defaultAvatar, iconDefault } = this.props;
		const { source, loaded } = this.state;
		let hasImage = (source && source.uri) ? true : false;
		if (source && source.uri && (!source.uri.startsWith('https://') && !source.uri.startsWith('http://'))) {
			if (iconDefault && (iconDefault.startsWith('https://') || iconDefault.startsWith('http://'))) {
				source.uri = iconDefault;
			} else {
				hasImage = false;
			}
		};
		return (
			<View style={[{ width: width + borderWidth * 2, height: height + borderWidth * 2, backgroundColor: placeholderColor, position: 'relative', borderColor: borderColor, borderWidth: borderWidth },
			radius ? { borderRadius: radius + borderWidth } : {}, Styles.CenterItem, style]}>
				{  hasImage &&
					<FastImage
						style={[ {width: width, height: height}, radius ? { borderRadius: radius } : {}]}
						// width={width}
						// height={height}
						source={source}
						onError={this.handleErrorImage}
						onLoad={this.handleLoadImage} />
				}
				{
					!hasImage && defaultAvatar &&
					<FastImage
						style={[{width: width, height: height}, radius ? { borderRadius: radius } : {}]}
						// width={width}
						// height={height}
						source={require('../../images/default_avatar.png')}
						onLoad={this.handleLoadImage} />
				}
				{!loaded &&
					<View style={[{ width: width, height: height }, radius ? { borderRadius: radius } : {}, style, { position: 'absolute', backgroundColor: placeholderColor }]} />
				}
			</View>
		);
	}
};
