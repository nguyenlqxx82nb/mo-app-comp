"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fadeIn = void 0;
// @flow
const react_native_1 = require("react-native");
function fadeIn(duration = 400, spring = false) {
    const transitionSpec = spring
        ? {
            timing: react_native_1.Animated.spring,
            tension: 10,
            useNativeDriver: true,
        }
        : {
            duration,
            easing: react_native_1.Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
            timing: react_native_1.Animated.timing,
            useNativeDriver: true,
        };
    return {
        transitionSpec,
        screenInterpolator: ({ position, scene }) => {
            const { index } = scene;
            const opacity = position.interpolate({
                inputRange: [index - 1, index],
                outputRange: [0, 1],
            });
            return { opacity };
        },
    };
}
exports.fadeIn = fadeIn;
//# sourceMappingURL=fadeIn.js.map