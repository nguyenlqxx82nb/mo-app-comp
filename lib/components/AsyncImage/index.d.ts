import React from 'react';
export default class AsyncImage extends React.PureComponent<any, any> {
    static defaultProps: {
        placeholderColor: string;
    };
    constructor(props: any);
    render(): JSX.Element;
    _onLoad: () => void;
}
