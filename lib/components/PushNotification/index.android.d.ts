import React from 'react';
export default class MyPushNotification extends React.PureComponent<any, any> {
    isFirstToken: boolean;
    onmessage: any;
    onmessageBackground: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    registerPushNotification: () => void;
    registerAndroid: () => Promise<void>;
    checkPermission: () => Promise<void>;
    getToken: () => Promise<string>;
    requestPermission: () => Promise<void>;
    onDisplayNotification: (notification: any) => void;
    render(): JSX.Element;
}
