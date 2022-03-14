import * as React from 'react';
declare type PropsType = {
    id?: string;
    style?: any;
    navigation?: any;
    children: any;
};
export declare class CompatSharedElement extends React.Component<PropsType> {
    render(): JSX.Element;
}
export declare const SharedElement: typeof CompatSharedElement;
export {};
