import { PureComponent } from 'react';
export default class RadioModal extends PureComponent<any, any> {
    modalRef: any;
    constructor(props: any);
    getCurrIndex: () => number;
    close: () => void;
    onSelectItemHandler: (selectedIndex: number) => void;
    onSelectCompleteHandler: () => void;
    render(): JSX.Element;
}
