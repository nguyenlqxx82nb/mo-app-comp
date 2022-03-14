import React from 'react';
interface Props {
    active?: boolean;
    onActive: any;
    color?: string;
}
export default class PasswordToggle extends React.PureComponent<Props, any> {
    constructor(props: Props);
    componentDidMount: () => void;
    onChangeShow: () => void;
    render(): JSX.Element;
}
export {};
