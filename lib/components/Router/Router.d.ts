import * as React from 'react';
import { Animated } from 'react-native';
import type { ScreenTransitionContextOnSharedElementsUpdatedEvent } from './RouterScreenTransitionContext';
import type { SharedElementsConfig, SharedElementsStrictConfig } from './types';
declare type RouterTransitionConfig = {
    screenInterpolator: any;
    transitionSpec: any;
    debug?: boolean;
};
interface RouterProps {
    initialNode: React.ReactNode;
    transitionConfig: any;
}
declare type RouterAction = {
    action: 'push' | 'pop' | 'replace';
    config?: RouterConfig;
    node?: React.ReactNode;
};
interface RouterState {
    stack: React.ReactNode[];
    prevIndex: number;
    nextIndex: number;
    animValue: any;
    transitionConfig?: RouterTransitionConfig;
    sharedElementsConfig?: SharedElementsStrictConfig;
    sharedElementScreens?: Array<ScreenTransitionContextOnSharedElementsUpdatedEvent>;
    actionsQueue: Array<RouterAction>;
    width: number;
    height: number;
}
declare type RouterConfig = {
    sharedElements?: SharedElementsConfig;
    transitionConfig?: RouterTransitionConfig;
};
export declare class Router extends React.PureComponent<RouterProps, RouterState> {
    _animValue: Animated.Value;
    _swipeBackAnimValue: Animated.Value;
    _onSwipeBackGestureEvent: (...args: any[]) => void;
    _backHandler: any;
    _action: any;
    static defaultProps: {
        transitionConfig: {
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
    };
    backCount: number;
    constructor(props: RouterProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderSharedElementTransitions(): JSX.Element;
    renderBackSwiper(): JSX.Element;
    _onSwipeBackStateChange: (event: any) => void;
    render(): JSX.Element;
    onLayout: (event: any) => void;
    onSharedElementsUpdated: (event: ScreenTransitionContextOnSharedElementsUpdatedEvent) => void;
    onHardwareBackPress: () => boolean;
    replace(node: React.ReactNode, config?: RouterConfig): void;
    push(node: React.ReactNode, config?: RouterConfig): void;
    pop(config?: RouterConfig): void;
    handleAction({ action, config, node }: RouterAction): void;
    pruneStack(count: number): void;
    static push(node: React.ReactNode, config?: RouterConfig): any;
    static replace(node: React.ReactNode, config?: RouterConfig): any;
    static pop(config?: RouterConfig): any;
}
export {};
