import { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default class ZoomImageViewer extends PureComponent<any, any> {
    static propTypes: {
        images: PropTypes.Requireable<any[]>;
        index: PropTypes.Requireable<number>;
        autoOpen: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        images: any[];
        index: number;
        autoOpen: boolean;
    };
    _images: any[];
    modalRef: any;
    constructor(props: any);
    componentDidMount(): void;
    setImages: (images: any, index: any) => void;
    open: (images: any, index: any) => void;
    hide: () => void;
    _renderFooter: (currentIndex: any) => JSX.Element;
    render(): JSX.Element;
}
