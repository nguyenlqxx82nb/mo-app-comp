import React from 'react';
export default class ImageItem extends React.PureComponent<any, any> {
    static defaultProps: {
        images: any[];
        index: number;
        isReply: boolean;
        zoomImageViewer: {};
    };
    constructor(props: any);
    render(): JSX.Element;
}
