import {Easing, Animated} from 'react-native';

export function none(duration: number = 0) {
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
        outputRange: [initHeight, 0, initHeight],
      });

      return {
        transform: [{translateY}],
        // ...shadow,
      };
    },
  };
}
