import { PureComponent } from 'react';
export default class CategoryFilter extends PureComponent<any, any> {
    static defaultProps: {
        data: any[];
        title: string;
    };
    itemRefs: Array<any>;
    constructor(props: any);
    init: () => void;
    componentDidMount(): void;
    buildFilter(): {};
    findCheckedItems: () => string[];
    onSelectedItemChangeHandler: (_active: boolean, value: any) => void;
    getValue: () => any;
    onItemPressHandler: (item: any) => void;
    onCheckItemPressHandler: (item: any) => void;
    checkItem: (item: any, checked: boolean) => void;
    unCheckParent: (data: Array<any>, item: any) => void;
    findAllChild: (parentId: any, items: Array<any>) => any[];
    findItemById: (id: any, items: Array<any>) => any;
    renderChild: (level: number, items: Array<any>) => JSX.Element[];
    render(): JSX.Element;
}
