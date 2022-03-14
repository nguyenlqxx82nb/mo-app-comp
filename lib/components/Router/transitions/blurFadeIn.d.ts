import { Animated } from 'react-native';
export declare function blurFadeIn(duration?: number): {
    transitionSpec: {
        duration: number;
        easing: import("react-native").EasingFunction;
        timing: (value: Animated.Value | Animated.ValueXY, config: Animated.TimingAnimationConfig) => Animated.CompositeAnimation;
        useNativeDriver: boolean;
    };
    screenInterpolator: ({ position, scene }: {
        position: any;
        scene: any;
    }) => {
        opacity: any;
    };
};
