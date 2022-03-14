import { StyleSheet } from 'react-native';
import { Device, Color } from 'mo-app-common';

const styles = StyleSheet.create({
  contentContainer: {
    width: Device.ModalWidth,
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    paddingTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    paddingHorizontal: 30,
    paddingVertical:15
  },
  footer: {
    flexDirection: 'row', 
    paddingTop: 0, 
    paddingBottom: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    // backgroundColor: 'red'
  }
});

export default styles;