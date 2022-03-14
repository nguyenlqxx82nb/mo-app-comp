import { StyleSheet } from 'react-native';
import { Styles, Color, Constants } from 'mo-app-common';

export default StyleSheet.create({
	container: {
		...Styles.container
	},
	loadingRow: {
		height: 50,
		width: '100%',
		justifyContent: 'center',
		alignContent: 'center',
	},
	allItemRow: {
		paddingHorizontal: 20, height: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'
	},
	noneItem: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	noneText: {
		marginTop: 20,
		textAlign: 'center',
		fontSize: 13,
		lineHeight: 18,
		marginHorizontal: 15,
		color: Color.textSecondary
	},
	loadingIconContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},

	scrollBottomButton: {
		backgroundColor: '#fff',
		width: 36,
		height: 36,
		borderRadius: 18,
		position: 'absolute',
		left: Constants.Width / 2 - 18,
		top: 18,
		// transform: [{ scaleY: -1 }],


		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	badgeNumber: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Color.red,
		position: 'absolute',
		top: 0,
		right: 0
	},

	renderBackgroundWrap: {
		position: 'absolute', 
		flex: 1, 
		width: '100%'
	},

	renderBackgroundText: {
		textAlign: 'center', 
		opacity: 0.75, 
		paddingHorizontal: 20, 
		paddingVertical: 7, 
		backgroundColor: Color.secondary, 
		borderRadius: 20
	},

	divider: {
		marginHorizontal: 20,
		marginTop: 5,
		marginBottom: 10,
		borderBottomColor: Color.border,
		borderBottomWidth: 0.5 
	}
});
