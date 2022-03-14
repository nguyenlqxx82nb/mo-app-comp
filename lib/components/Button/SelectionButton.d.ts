import { PureComponent } from 'react';
export default class SelectionButton extends PureComponent<any, any> {
    static defaultProps: {
        text: string;
        enable: boolean;
        containerStyle: {};
        textStyle: {};
        value: string;
        rippleRound: boolean;
        rippleColor: string;
        active: boolean;
    };
    constructor(props: any);
    componentDidMount(): void;
    setEnable: (enable: boolean) => void;
    setActive: (active: boolean) => void;
    getActive: () => any;
    getValue: () => any;
    onPressHandle: () => void;
    render(): JSX.Element;
}
