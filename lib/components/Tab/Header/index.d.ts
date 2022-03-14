import { PureComponent } from 'react';
declare class TabHeader extends PureComponent<any, any> {
    static defaultProps: {
        tabs: any[];
        currentIndex: number;
    };
    _isShow: boolean;
    _currentScroll: number;
    _height: number;
    constructor(props: any);
    show: () => void;
    hide: () => void;
    onSwitchTabHandle: (index: number) => void;
    scrollChange: (scrollY: any) => void;
    updateBadge: (index: number, badgeNumber: number) => void;
    render(): JSX.Element;
}
export default TabHeader;
