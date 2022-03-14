"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromRight = void 0;
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
function fromRight(duration = 500) {
    return {
        transitionSpec: {
            duration,
            easing: react_native_1.Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
            timing: react_native_1.Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: (data) => {
            const { index } = data.scene;
            const initWidth = mo_app_common_1.Constants.Width;
            const translateX = data.position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [initWidth, 0, initWidth * -0.2],
            });
            const opacity = data.position.interpolate({
                inputRange: [index, index + 1],
                outputRange: [1, 0.5],
            });
            return {
                transform: [{ translateX }],
                opacity: opacity
                // ...shadow,
            };
        },
    };
}
exports.fromRight = fromRight;
//# sourceMappingURL=fromRight.js.map