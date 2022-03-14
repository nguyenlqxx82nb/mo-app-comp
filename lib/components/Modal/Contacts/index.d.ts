import { PureComponent } from 'react';
export default class ContactsModal extends PureComponent<any, any> {
    static defaultProps: {
        placeholder: string;
        autoFocus: boolean;
    };
    modalRef: any;
    searchRef: any;
    input: any;
    constructor(props: any);
    componentDidMount(): void;
    close: () => void;
    itemRowRender: ({ item }: {
        item: any;
    }) => JSX.Element;
    onItemPress: (item: any) => void;
    keyExtractor: (_item: any, index: number) => string;
    searchItems: (searchValue: string) => void;
    onSubmitHandler: () => void;
    onValueEditHandler: (value: string) => void;
    onClearInputTextHandler: () => void;
    onModalShowCompletedHandler: () => void;
    render(): JSX.Element;
}
