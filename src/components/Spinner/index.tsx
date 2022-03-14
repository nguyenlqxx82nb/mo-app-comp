
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { Color } from 'mo-app-common';

const SIZES = {
	SMALL: 'small',
	LARGE: 'large',
};
export const Mode = {
	normal: 'normal',
	full: 'full',
	overlay: 'overlay',
};

class Spinner extends React.PureComponent<any, any> {
	static defaultProps = {
		color: Color.primary,
		size: 'large',
		mode: Mode.overlay,
		timeout: 25000,
	};

	_timeoutProcessing = false;
	_timeoutId = null;

	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: true,
		};
	}

	componentDidMount() {
		// this.toastListener = EventEmitter.addListener(
		//   Constants.EmitCode.Spinner,
		//   this.doSpinner.bind(this)
		// );
	}

	componentWillUnmount() {
		// this.toastListener.remove();
	}

	render() {
		const {
			size,
			color,
			mode,
			transparent,
		} = this.props;
		const { isLoading } = this.state;

		let containerStyle: any = styles.container;
		switch (mode) {
			case Mode.full:
				containerStyle = styles.container_full_stretch;
				break;
			case Mode.overlay:
				containerStyle = styles.container_overlay;
				break;
		}

		if (transparent) {
			containerStyle = {
				...containerStyle, ...{ backgroundColor: 'transparent' },
			};
		}
		if (isLoading) {
			return (
				<View style={{ flex: 1, position: 'absolute' }}>
					<Modal
						animationType="none"
						transparent
						visible={this.state.isLoading}
						onRequestClose={() => {
							this.setState({ isLoading: false });
						}}>
						<View style={containerStyle}>
							<ActivityIndicator
								size={size}
								color={color}
								style={[
									styles.wrapper,
									{ borderRadius: size === SIZES.SMALL ? 10 : 20 },
								]} />
						</View>
					</Modal>
				</View>
			);
		}
		else {
			return (<View />);
		}

	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		height: undefined,
		width: undefined,
	},
	container_full_stretch: {
		flexGrow: 1,
		height: undefined,
		width: undefined,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container_overlay: {
		flex: 1,
		// backgroundColor: '#',
		alignItems: 'center',
		justifyContent: 'center',
		// zIndex: 1000
	},
	wrapper: {
		backgroundColor: 'transparent',
		zIndex: 100,
	},
});

Spinner.defaultProps = {
	color: Color.primary,
	size: 'large',
	mode: Mode.overlay,
	timeout: 25000,
};

export default Spinner;
