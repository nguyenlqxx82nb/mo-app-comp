import * as React from 'react';
import { ScreenTransitionContext } from './RouterScreenTransitionContext';
export interface ScreenTransitionProps {
    sharedId?: string;
    children?: React.ReactNode;
    screenTransitionContext: ScreenTransitionContext;
}
export declare const RouterScreenTransition: {
    (props: any): JSX.Element;
    propTypes: any;
    defaultProps: any;
};
export declare const ScreenTransition: {
    (props: any): JSX.Element;
    propTypes: any;
    defaultProps: any;
};
