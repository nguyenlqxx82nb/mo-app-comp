import { PureComponent } from 'react';
export default class SliderFilter extends PureComponent<any, any> {
    static defaultProps: {
        myPoint: number;
        data: {
            max: number;
            min: number;
        };
    };
    enoughPointRef: any;
    constructor(props: any);
    init: () => void;
    componentDidMount(): void;
    multiSliderValuesChangeHandler: (values: Array<number>) => void;
    onSelectEnoughPointHandler: (active: boolean, _value: any) => void;
    buildFilter: () => any;
    getValue: () => {
        min: any;
        max: any;
        enoughPoint: any;
    };
    render(): JSX.Element;
}
