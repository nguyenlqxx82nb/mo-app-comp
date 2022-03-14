import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Device } from 'mo-app-common';


export default class SafeView extends React.PureComponent<any,any>{
  
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Device.isIphoneX ? 35 : 0
  }
});


