import { Animated } from 'react-native';
export declare function fadeIn(duration?: number, spring?: boolean): {
    transitionSpec: {
        timing: typeof Animated.spring;
        tension: number;
        useNativeDriver: boolean;
        duration?: undefined;
        easing?: undefined;
    } | {
        duration: number;
        easing: import("react-native").EasingFunction;
        timing: (value: Animated.Value | Animated.ValueXY, config: Animated.TimingAnimationConfig) => Animated.CompositeAnimation;
        useNativeDriver: boolean;
        tension?: undefined;
    };
    screenInterpolator: ({ position, scene }: any) => {
        opacity: any;
    };
};
