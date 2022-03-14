import React from 'react';
declare class Toast extends React.Component<any, any> {
    nextToastId: number;
    toastListener: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(): boolean;
    render(): JSX.Element;
    renderToast(msg: any, index: number): JSX.Element;
    doToast(msg: string, type?: string, duration?: number): void;
}
declare const _default: import("react-redux").ConnectedComponent<typeof Toast, Pick<any, string | number | symbol>>;
export default _default;
