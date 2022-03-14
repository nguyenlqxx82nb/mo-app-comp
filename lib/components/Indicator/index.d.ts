import React from 'react';
export default class Indicator extends React.Component<any, any> {
    static defaultProps: {
        isShow: boolean;
    };
    constructor(props: any);
    show: () => void;
    hide: () => void;
    render: () => JSX.Element;
}
