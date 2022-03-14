import { PureComponent } from 'react';
export default class ContactsEdit extends PureComponent<any, any> {
    static defaultProps: {
        label: string;
        autoValidate: boolean;
        placeholder: string;
        emptyErrorMessage: string;
        phoneInvalidMessage: string;
    };
    inputEditRef: any;
    formEditRef: any;
    constructor(props: any);
    componentDidMount(): void;
    requestPermission: () => Promise<void>;
    loadContacts: () => void;
    onContactsPressHandler: () => void;
    onItemSelectedHandler: (value: string, item: any) => void;
    onSubmitHandler: (value: string) => void;
    validatePhone: (phone: string) => boolean;
    validate: () => any;
    getValue: () => any;
    onClearInputTextHandler: () => void;
    render(): JSX.Element;
}
