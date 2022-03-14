import { StyleSheet } from 'react-native';
import { Constants } from 'mo-app-common';

export default StyleSheet.create({
  descText: {
    textAlign: 'justify',
    fontSize: 14,
    lineHeight: 28,
    fontFamily: Constants.fontRegular,
    marginBottom: 5
  },
  buttonContainer: {
    paddingTop: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
});

