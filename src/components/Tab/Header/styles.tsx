import { StyleSheet } from 'react-native';
import { Constants, Color } from 'mo-app-common';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		flexDirection: 'row',
		opacity: 1,
		borderBottomColor: Color.border,
		borderBottomWidth: 0.5,
	},

	tabContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},

	underline: {
		position: 'absolute',
		height: 3,
		width: 40,
		//borderBottomWidth: 6,
		borderBottomRightRadius: 4,
		borderBottomLeftRadius: 4,
		backgroundColor: Color.primary,
		bottom: 0,
	},
	badge: {
		backgroundColor: Color.red,
		paddingHorizontal: 2,
		height: 10,
		minWidth: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		right: -5,
		top: 5
	}
});

export default styles;
