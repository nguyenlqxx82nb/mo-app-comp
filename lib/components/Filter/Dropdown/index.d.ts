import { PureComponent } from 'react';
export default class DropdownFilter extends PureComponent<any, any> {
    static defaultProps: {
        data: any[];
    };
    ref: any;
    constructor(props: any);
    componentDidMount(): void;
    buildFilter: () => any;
    getValue: () => any;
    render(): JSX.Element;
}
