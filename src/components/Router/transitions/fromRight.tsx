import {Easing, Animated} from 'react-native';
import { Constants } from 'mo-app-common';

export function fromRight(duration: number = 500) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (data: any) => {
      const {index} = data.scene;
      const initWidth = Constants.Width;

      const translateX = data.position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initWidth, 0, initWidth * -0.2],
      });

      const opacity = data.position.interpolate({
        inputRange: [index, index + 1],
        outputRange: [1, 0.5],
      });

      return {
        transform: [{translateX}],
        opacity: opacity
        // ...shadow,
      };
    },
  };
}
