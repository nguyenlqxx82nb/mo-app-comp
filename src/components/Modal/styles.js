import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import { Constants} from 'mo-app-common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  modalContainer:{
    margin:0,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal: Constants.Width * 0.1,
    opacity:0
  },
  contentContainer:{
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:15,
    paddingTop:30,
    borderRadius:10,
    backgroundColor:'#fff',
    marginHorizontal: Constants.Width * 0.1,
  },
  modalNotification:{
    alignItems:'center',
    justifyContent:'center',
    height:height,
    paddingHorizontal: Constants.Width * 0.1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 20,
    backgroundColor: '#000',
    opacity:0.5
  },
  modalIconContainer:{
    position:'absolute',
    top:-22,
    left: (Constants.Width * 0.8 / 2) - 30,
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor:'#fff',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingTop:8
  },
  modalBoxWrap: {
    position: 'absolute',
    borderRadius: 6,
    top: (height * 35) / 100,
    width: (width * 96) / 100,
    height: (height * 70) / 100,
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 10,
    right: I18nManager.isRTL ? 0 : null,
  },
});
