import React from 'react';
export interface WrapButtonProps {
    button?: object;
    text?: string;
    onPress?: any;
    containerStyle?: object;
    textStyle?: object;
    containerColor?: string;
    textColor?: string;
    rippleColor?: string;
    rippleRound?: boolean;
    selected?: boolean;
    type?: string;
    iconLeft?: string;
    iconRight?: string;
    iconRightStyle?: string;
    iconLeftStyle?: string;
    iconSize?: number;
    bold?: boolean;
    size?: 's' | 'm' | 'l';
    enable?: boolean;
    whiteTheme?: boolean;
    width?: any;
    loading?: boolean;
    hasShadow?: boolean;
    textUpperCase?: boolean;
}
export declare class WrapButton extends React.PureComponent<WrapButtonProps, any> {
    static defaultProps: {
        text: string;
        rippleColor: string;
        rippleRound: boolean;
        selected: boolean;
        enable: boolean;
        type: string;
        containerStyle: {};
        textStyle: {};
        iconRightStyle: {};
        iconLeftStyle: {};
        iconSize: number;
        bold: boolean;
        size: number;
        whiteTheme: boolean;
        width: string;
        loading: boolean;
    };
    constructor(props: WrapButtonProps);
    componentDidMount(): void;
    setEnable: (enable: boolean) => void;
    setType: (type: string) => void;
    getTextSize: () => {
        fontSize: number;
        lineHeight: number;
    };
    setLoadingStatus: (loading: boolean) => void;
    onPressHandler: () => void;
    render(): JSX.Element;
}
