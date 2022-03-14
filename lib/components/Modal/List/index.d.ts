import { PureComponent } from 'react';
export default class ListModal extends PureComponent<any, any> {
    modalRef: any;
    searchRef: any;
    constructor(props: any);
    close: () => void;
    itemRowRender: ({ item, index }: {
        item: any;
        index: any;
    }) => JSX.Element;
    shortItemRowRender: ({ item, index }: {
        item: any;
        index: any;
    }) => JSX.Element;
    onItemPress: (item: any) => void;
    keyExtractor: (_item: any, index: number) => string;
    onSearchValueChangedHandler: (searchValue: string) => void;
    onSelectItemHandler: () => void;
    render(): JSX.Element;
}
