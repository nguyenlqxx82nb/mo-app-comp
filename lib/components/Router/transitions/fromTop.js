"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromTop = void 0;
const react_native_1 = require("react-native");
function fromTop(duration = 500) {
    return {
        transitionSpec: {
            duration,
            easing: react_native_1.Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
            timing: react_native_1.Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: ({ layout, position, scene }) => {
            const { index } = scene;
            const { initHeight } = layout;
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
                transform: [{ translateY }],
            };
        },
    };
}
exports.fromTop = fromTop;
//# sourceMappingURL=fromTop.js.map