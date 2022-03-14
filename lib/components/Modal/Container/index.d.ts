import React from 'react';
export default class ModalContainer extends React.PureComponent<any, any> {
    modalListener: any;
    popModalListener: any;
    notAccountListener: any;
    updateAppListener: any;
    showNotificationListener: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    doPushModal(modal: any): void;
    doPopModal(): void;
    doShowNotAccountModal: () => void;
    showPushNotificationModal: (title: string, content: string, textAlign: string, link: Array<string>) => void;
    showNotificationModal: (items: Array<any>, title: string, link: Array<string>) => void;
    showUpdateAppModal: () => void;
    onOkUpdateVersionHandler(): void;
    onOkButtonPressHandler: () => void;
    onGotoLinkHandler: (_link: string) => void;
    render(): any;
    renderModal(modal: any, _index: number): any;
}
