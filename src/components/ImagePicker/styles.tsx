import { StyleSheet } from 'react-native';
import { Color, Constants, Device } from 'mo-app-common';

const width = (Constants.Width) / 3 - 2;

export default StyleSheet.create({
	container: {
		flex: 1,
	},

	image: {
		width: width,
		height: width,
		backgroundColor: Color.light
	},

	activeContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		color: Color.primary,
		width: width + 2,
		height: width + 2,
		backgroundColor: 'rgba(255,255,255,0.5)',
		alignItems: 'center',
		justifyContent: 'center'
	},

	activeBg: {
		backgroundColor: Color.primary,
		width: 30,
		height: 30,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},

	sendButton: {
		position: 'absolute',
		bottom: Device.isIphoneX ? 34 + 50 : 50,
		width: Constants.Width * 3 / 4,
		left: Constants.Width * 1 / 8,
		opacity: 0
	},

});


