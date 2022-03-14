import React from 'react';
export declare enum InputType {
    text = "text",
    radio = "radio",
    phone = "phone",
    email = "email",
    cmt = "cmt",
    date = "date",
    list = "list",
    name = "name"
}
export declare enum KeyboardType {
    default = "default",
    numeric = "numeric",
    email = "email-address",
    phone = "phone-pad",
    ascii = "ascii-capable",
    punctuation = "numbers-and-punctuation",
    url = "url",
    pad = "number-pad",
    phonePad = "name-phone-pad",
    decimalPad = "decimal-pad",
    twitter = "twitter",
    webSearch = "web-search",
    visiblePass = "visible-password"
}
export declare enum KeyType {
    done = "done",
    go = "go",
    next = "next",
    search = "search",
    send = "send"
}
interface Props {
    placeHolder?: string;
    label?: string;
    text?: string;
    validType?: number;
    validRequire?: boolean;
    onSubmit?: any;
    onValueChanged?: any;
    emptyErrorMessage?: string;
    emailInvalidMessage?: string;
    minLengthMessage?: string;
    maxLengthMessage?: string;
    phoneInvalidMessage?: string;
    cmtInvalidMessage?: string;
    keyType?: KeyType;
    keyboardType: KeyboardType;
    icon?: string;
    password?: boolean;
    containerStyle?: any;
    isTogglePassword?: boolean;
    minLength?: number;
    maxLength?: number;
    textStyle?: any;
    theme?: string;
    type?: InputType;
    items?: Array<any>;
    onModalWillShow?: any;
    onModalClose?: any;
    selectedKey?: any;
    multiple?: boolean;
    cmtType?: string;
    value?: string;
    idKey?: string;
}
export declare class LoginInput extends React.PureComponent<Props, any> {
    input: any;
    textAreaRef: any;
    datePickerRef: any;
    selectedDate: any;
    static defaultProps: {
        placeHolder: string;
        label: string;
        text: string;
        validType: number;
        validRequire: boolean;
        emptyErrorMessage: string;
        emailInvalidMessage: string;
        phoneInvalidMessage: string;
        keyType: KeyType;
        keyboardType: KeyboardType;
        icon: string;
        password: boolean;
        containerStyle: {};
        isTogglePassword: boolean;
        minLengthMessage: string;
        maxLengthMessage: string;
        textStyle: {};
        multiple: boolean;
        cmtType: string;
        maxLength: number;
    };
    constructor(props: Props);
    onClearInputTextHandle: () => void;
    onSubmitHandler: () => void;
    onValueEditHandler: (value: string) => void;
    focus: () => void;
    validate: () => {
        error: boolean;
        message: string;
    };
    getEmptyMessageError: () => string;
    checkValidate: (value: string) => boolean;
    validateEmail: (email: string) => boolean;
    validatePhone: (phone: string) => boolean;
    /**
     * validate id number
     * @param id
     */
    validateIdNumber: (id: string) => boolean;
    getValue: () => any;
    setValue: (value: string) => void;
    getStyleTheme: () => {
        backgroundColor: {
            backgroundColor: string;
        };
        placeholderColor: string;
        iconColor: string;
        color: string;
    };
    getCmtPlaceholder: (type?: string) => "Nhập CCCD" | "Nhập hộ chiếu" | "Nhập CMND" | "Nhập CMNDQD" | "Nhập GPLX" | "Nhập số";
    onTogglePasswordHandle: (val: any) => void;
    onBlur: () => void;
    onFocus: () => void;
    onPressHandler: () => void;
    onSelectItemHandler: (selectedKey: any) => void;
    onSelectCmtItemHandler: (type: string, value: string) => void;
    onDatePickedHandler: (date: any) => void;
    onDatePickerCancelHandler: () => void;
    getItemByKey: (key: string) => any;
    getCmtType: () => any;
    render(): JSX.Element;
}
export {};
