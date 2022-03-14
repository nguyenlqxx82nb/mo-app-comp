import { PureComponent } from 'react';
export default class RadioGroup extends PureComponent<any, any> {
    static defaultProps: {
        data: any[];
    };
    itemRefs: Array<any>;
    constructor(props: any);
    init: () => void;
    componentDidMount(): void;
    buildFilter(): {};
    onSelectedItemChangeHandler: (_active: boolean, value: any) => void;
    getValue: () => any;
    render(): JSX.Element;
}
