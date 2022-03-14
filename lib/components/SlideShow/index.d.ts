import { PureComponent } from 'react';
export default class SlideShow extends PureComponent<any, any> {
    slideshowModal: any;
    static defaultProps: {
        containerStyle: {};
        images: any[];
        width: number;
        height: number;
    };
    constructor(props: any);
    componentDidMount(): void;
    showZoomSlideImages: (items: Array<string>, index: number) => void;
    render(): JSX.Element;
}
