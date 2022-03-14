import { PureComponent } from 'react';
declare class ResendButton extends PureComponent<any, any> {
    static defaultProps: {
        duration: number;
        onPress: any;
        buttonText: string;
        buttonRemainingText: string;
    };
    sendPassBtn: any;
    _timeRemaining: number;
    constructor(props: any);
    shouldComponentUpdate(): boolean;
    componentDidMount(): void;
    startTimeRemaining: () => void;
    calcTimeRemaining: () => void;
    onPressHandler: () => void;
    render(): JSX.Element;
}
export default ResendButton;
