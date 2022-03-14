import { Animated } from 'react-native';
export declare function fromRight(duration?: number): {
    transitionSpec: {
        duration: number;
        easing: import("react-native").EasingFunction;
        timing: (value: Animated.Value | Animated.ValueXY, config: Animated.TimingAnimationConfig) => Animated.CompositeAnimation;
        useNativeDriver: boolean;
    };
    screenInterpolator: (data: any) => {
        transform: {
            translateX: any;
        }[];
        opacity: any;
    };
};
