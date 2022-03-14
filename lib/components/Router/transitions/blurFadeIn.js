"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blurFadeIn = void 0;
// @flow
const react_native_1 = require("react-native");
function blurFadeIn(duration = 300) {
    return {
        transitionSpec: {
            duration,
            easing: react_native_1.Easing.out(react_native_1.Easing.poly(4)),
            timing: react_native_1.Animated.timing,
            useNativeDriver: true,
        },
        // $FlowFixMe
        screenInterpolator: ({ position, scene }) => {
            const { index } = scene;
            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.8, index],
                outputRange: [0, 0.95, 1],
            });
            return { opacity };
        },
    };
}
exports.blurFadeIn = blurFadeIn;
//# sourceMappingURL=blurFadeIn.js.map