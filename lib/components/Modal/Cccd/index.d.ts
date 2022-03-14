import { PureComponent } from 'react';
export default class CccdModal extends PureComponent<any, any> {
    modalRef: any;
    valueRef: any;
    constructor(props: any);
    close: () => void;
    getPlaceholder: (type: string) => "Nhập CCCD" | "Nhập hộ chiếu" | "Nhập CMND" | "Nhập CMNDQD" | "Nhập GPLX" | "Nhập số";
    itemRowRender: ({ item }: {
        item: any;
    }) => JSX.Element;
    onItemPress: (item: any) => void;
    keyExtractor: (_item: any, index: number) => string;
    onSelectCompleteHandler: () => void;
    onSearchValueChangedHandler: (searchValue: string) => void;
    onSelectItemHandler: () => void;
    onSelectTypeHandler: (type: string) => void;
    render(): JSX.Element;
}
