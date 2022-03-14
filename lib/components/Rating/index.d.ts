import { PureComponent } from 'react';
declare class Rating extends PureComponent<any, any> {
    static defaultProps: {
        size: string;
        color: string;
        rating: number;
        enable: boolean;
    };
    constructor(props: any);
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    onRatingHandler: (index: number) => void;
    setRate: (rate: number) => void;
    getRateValue: () => any;
    render(): JSX.Element;
}
export default Rating;
