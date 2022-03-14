import { StyleSheet } from 'react-native';
import { Constants, Color, Device } from 'mo-app-common';

const styles = StyleSheet.create({
  tabbar: {
    height: Device.ToolbarHeight + 60,
    paddingBottom: Device.ToolbarHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: Color.primary,
    borderTopWidth: 0.5,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 7,
    // elevation: 5,
    zIndex: 20
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
    // ...Platform.select({
    //   ios: {
    //     justifyContent: Device.isIphoneX ? 'flex-start' : 'center',
    //     paddingTop: Device.isIphoneX ? 12 : 0,
    //   },
    //   android: {
    //     justifyContent: 'center',
    //   },
    // }),
  },
  tabLabel: {
    fontFamily: Constants.fontMedium,
    fontSize: 12,
    color: Color.textSecondary,
    marginTop: 4
  },
  topDivider: {
    height: 3,
    width: 40,
    borderBottomRightRadius: 4,
		borderBottomLeftRadius: 4,
		backgroundColor: Color.primary,
  },
  qrButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -35
  },
  qrButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Color.primary,
    zIndex: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.22,
    elevation: 3,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height:60
  },
  tabBottom: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  }
});

export default styles;
