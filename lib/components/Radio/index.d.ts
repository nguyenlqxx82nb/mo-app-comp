import React from 'react';
export default class RadioButton extends React.PureComponent<any, any> {
    static defaultProps: {
        active: boolean;
        value: string;
        textStyle: {};
        containerStyle: {};
        radioItems: any[];
    };
    constructor(props: any);
    toggleActive: () => void;
    setActive: (active: boolean) => void;
    getActive: () => any;
    getValue: () => any;
    render(): JSX.Element;
}
