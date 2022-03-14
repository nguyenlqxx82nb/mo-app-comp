import { Animated } from 'react-native';
export declare function fromTop(duration?: number): {
    transitionSpec: {
        duration: number;
        easing: import("react-native").EasingFunction;
        timing: (value: Animated.Value | Animated.ValueXY, config: Animated.TimingAnimationConfig) => Animated.CompositeAnimation;
        useNativeDriver: boolean;
    };
    screenInterpolator: ({ layout, position, scene }: any) => {
        transform: {
            translateY: any;
        }[];
    };
};
