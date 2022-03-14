import React from 'react';
export default class MyPushNotification extends React.PureComponent<any, any> {
    isFirstToken: boolean;
    onmessage: any;
    onmessageBackground: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    registerPushNotification: () => void;
    registerIOS: () => Promise<void>;
    onIOSRemoteNotification: (_notification: any) => void;
    onIOSRegistered: (deviceToken: string) => void;
    onRegistrationError: (error: any) => void;
    onDisplayNotification: (notification: any) => void;
    render(): JSX.Element;
}
