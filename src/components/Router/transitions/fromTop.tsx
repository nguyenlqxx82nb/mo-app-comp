import {Easing, Animated} from 'react-native';

export function fromTop(duration: number = 500) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({layout, position, scene}: any) => {
      const {index} = scene;
      const {initHeight} = layout;

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initHeight, 0, initHeight * -0.05],
      });

      // const shadow = {
      //   shadowColor: '#000000',
      //   shadowOffset: {
      //     width: -2,
      //     height: 0,
      //   },
      //   elevation: 20,
      //   shadowOpacity: position.interpolate({
      //     inputRange: [index - 1, index, index + 1],
      //     outputRange: [0.02, 0.25, 0.25],
      //   }),
      //   shadowRadius: 5,
      // };
      return {
        transform: [{translateY}],
        // ...shadow,
      };
    },
  };
}
