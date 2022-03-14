import { PureComponent } from 'react';
export default class CardItem2 extends PureComponent<any, any> {
    static defaultProps: {
        width: number;
        height: number;
        contentHeight: number;
        imageRatio: number;
        contentStyle: {};
    };
    constructor(props: any);
    onPressItemHandler: () => void;
    render(): JSX.Element;
}
