import React from 'react';
declare class ButtonRipple extends React.PureComponent<any, any> {
    static defaultProps: {
        badge: number;
        badgeType: string;
        name1: string;
        iconType: number;
        children: any;
        onPress: any;
        color: string;
        underlayColor: any;
        square: boolean;
        size: number;
        disabled: boolean;
        percent: number;
        maxOpacity: number;
        style: {};
        vector: boolean;
        textColor: string;
        fit: boolean;
        status: boolean;
        text: {
            content: string;
            layout: number;
        };
    };
    _badge: number;
    _iconType: any;
    _rippleView: any;
    _icon: any;
    contentRef: any;
    constructor(props: any);
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    onPressedIn(): void;
    onPressedOut(): void;
    renderRippleView(): JSX.Element;
    renderBadge: () => JSX.Element;
    renderImageView(): JSX.Element;
    setIconType: (type: any) => void;
    setIcon: (name: any, color: any) => void;
    updateBagde: (number: any) => void;
    onPressHandler: () => void;
    onViewContainerLayout: (e: any) => void;
    render(): JSX.Element;
    find_dimesions(layout: any): void;
}
export default ButtonRipple;
