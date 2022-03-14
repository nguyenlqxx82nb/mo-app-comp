import { PureComponent } from 'react';
export interface FormInputProps {
    placeholder?: string;
    label?: string;
    text?: string;
    validType?: 'text' | 'email' | 'phone' | 'number';
    validRequire?: boolean;
    emptyErrorMessage?: string;
    emailInvalidMessage?: string;
    phoneInvalidMessage?: string;
    numberInvalidMessage?: string;
    multiLine?: boolean;
    updateType?: boolean;
    containerStyle?: object;
    autoValidate?: boolean;
    icon?: string;
    enable?: boolean;
    onSubmit?: any;
    onUpdate?: any;
    isPassword?: boolean;
}
export declare class FormInput extends PureComponent<FormInputProps, any> {
    static defaultProps: {
        placeholder: string;
        label: string;
        text: string;
        validType: string;
        validRequire: boolean;
        emptyErrorMessage: string;
        emailInvalidMessage: string;
        phoneInvalidMessage: string;
        numberInvalidMessage: string;
        multiLine: boolean;
        updateType: boolean;
        containerStyle: {};
        autoValidate: boolean;
        enable: boolean;
    };
    textRef: Text;
    constructor(props: FormInputProps);
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    onClearInputTextHandle: () => void;
    getValue(): any;
    setValue: (value: any) => void;
    onSubmitHandle: () => void;
    onValueEditHandle: (value: any) => void;
    validate: () => boolean;
    checkValidate: (value: string) => boolean;
    validateEmail: (email: string) => boolean;
    validatePhone: (phone: string) => boolean;
    validateNumber: (value: string) => boolean;
    onUpdateHandler: () => void;
    onTogglePasswordHandler: (val: any) => void;
    render(): JSX.Element;
}
