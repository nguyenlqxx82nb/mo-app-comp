import { PureComponent } from 'react';
export interface IFilterConfig {
    key?: string;
    value?: any;
    type: 'radio' | 'checkbox' | 'slider' | 'dropdown' | 'category';
    data?: any;
    buildFilter: any;
    isRequired?: boolean;
    keyField?: string;
    keyName?: string;
    defaultLabel?: string;
    title?: string;
    point?: number;
}
interface Props {
    filterConfigs: Array<IFilterConfig>;
    onApply: any;
    onRestore: any;
    height: any;
}
export declare class FilterModal extends PureComponent<Props, any> {
    static defaultProps: {
        myPoint: number;
        provinces: any[];
    };
    modalRef: any;
    itemRefs: Array<any>;
    constructor(props: Props);
    componentDidMount(): void;
    show: () => void;
    close: () => void;
    onApplyHandler: () => void;
    onRestoreHandler: () => void;
    pushItemRef: (ref: any, index: number) => void;
    buildFilter: () => {};
    getValues: () => any[];
    render(): JSX.Element;
}
export {};
