import React from 'react';
import type { SharedElementNode } from 'react-native-shared-element';
export declare type ScreenTransitionContextOnSharedElementsUpdatedEvent = {
    children: any;
    nodes: any;
    ancestor?: SharedElementNode;
};
export declare type ScreenTransitionContextProps = {
    style: any;
    children?: any;
    onSharedElementsUpdated: (event: ScreenTransitionContextOnSharedElementsUpdatedEvent) => void;
};
declare type ScreenTransitionContextState = {
    sharedElementNodes: any;
};
export declare class ScreenTransitionContext extends React.Component<ScreenTransitionContextProps, ScreenTransitionContextState> {
    _sharedElementNodes: {};
    _sharedElementAncestor?: SharedElementNode;
    state: {
        sharedElementNodes: {};
    };
    render(): JSX.Element;
    onSetRef: (ref: any) => void;
    componentDidUpdate(_prevProps: ScreenTransitionContextProps, prevState: ScreenTransitionContextState): void;
    addSharedElement(sharedId: string, node: SharedElementNode): void;
    removeSharedElement(sharedId: string, _node: SharedElementNode): void;
}
export declare function withScreenTransitionContext(WrappedComponent: any): {
    (props: any): JSX.Element;
    propTypes: any;
    defaultProps: any;
};
export {};
