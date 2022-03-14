import { StyleSheet } from 'react-native';
import { Color } from 'mo-app-common';

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderColor: Color.border,
    borderWidth: 1,
    height: 32,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8
  }
});

export default styles;