import React from 'react';
export declare const Mode: {
    normal: string;
    full: string;
    overlay: string;
};
declare class Spinner extends React.PureComponent<any, any> {
    static defaultProps: {
        color: string;
        size: string;
        mode: string;
        timeout: number;
    };
    _timeoutProcessing: boolean;
    _timeoutId: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default Spinner;
