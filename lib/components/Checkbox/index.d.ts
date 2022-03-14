import React from 'react';
export default class Checkbox extends React.PureComponent<any, any> {
    static defaultProps: {
        active: boolean;
        value: string;
        textStyle: {};
        containerStyle: {};
    };
    constructor(props: any);
    toggleActive: () => void;
    setActive: (active: boolean) => void;
    getActive: () => any;
    getValue: () => any;
    render(): JSX.Element;
}
