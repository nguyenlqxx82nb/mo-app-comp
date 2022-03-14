import { PureComponent } from 'react';
declare class Tab extends PureComponent<any, any> {
    tabHeader: any;
    static defaultProps: {
        tabs: any[];
        tabHeader: any[];
        currentIndex: number;
    };
    constructor(props: any);
    componentDidMount(): void;
    onChangeIndexHandle: (index: number) => void;
    scrollChange: (scrollY: any) => void;
    getCurrentIndex: () => any;
    updateBadge: (index: number, badgeNumber: number) => void;
    onTabPressHandler: (index: number) => void;
    render(): JSX.Element;
}
export default Tab;
