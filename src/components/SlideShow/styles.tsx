import { StyleSheet } from 'react-native';
import { Constants, Color } from 'mo-app-common';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default StyleSheet.create({
	dotStyle: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: '#fff',
		margin: 3
	},
	activeDotStyle: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: Color.primary,
		margin: 3
	},
	buttonBack: {
		position: 'absolute',
		top: getStatusBarHeight() + 15,
		left: 10,
		width: 40,
		height: 40
	},

	contentContainer: {
		flex: 1,
		width: Constants.Width,
		height: Constants.Height,
		backgroundColor: 'transparent'
	},

	modalContainer: {
		width: Constants.Width,
		backgroundColor: 'transparent',
		height: Constants.Height,
		opacity: 0,
		elevation: 11
	},

	viewFooter: {
		width: Constants.Width,
		height: 50,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0)',
		flexDirection: 'row'
	},

	viewFooternumbel: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 5
	}
});
