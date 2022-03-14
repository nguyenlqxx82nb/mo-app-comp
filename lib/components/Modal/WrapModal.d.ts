import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { KeyboardEvent } from 'react-native';
export default class WrapModal extends PureComponent<any, any> {
    static propTypes: {
        containerStyle: PropTypes.Requireable<object>;
        isOpen: PropTypes.Requireable<boolean>;
        backDropClose: PropTypes.Requireable<boolean>;
        overlayOpacity: PropTypes.Requireable<number>;
        autoOpen: PropTypes.Requireable<boolean>;
        contentHeight: PropTypes.Requireable<number>;
        showPos: PropTypes.Requireable<string>;
        position: PropTypes.Requireable<string>;
        hasCloseButton: PropTypes.Requireable<boolean>;
        overlayClose: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        containerStyle: {};
        isOpen: boolean;
        backDropClose: boolean;
        autoOpen: boolean;
        contentHeight: number;
        overlayOpacity: number;
        position: string;
        showPos: string;
        hasCloseButton: boolean;
        overlayClose: boolean;
    };
    contentHeight: number;
    currentTop: number;
    isOpen: boolean;
    modalRef: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onKeyboardShowHandler: (e: KeyboardEvent) => boolean;
    onKeyboardHideHandler: () => void;
    onBackAndroidHandler: () => boolean;
    init: () => void;
    close: () => void;
    show(): void;
    showContent(): void;
    scrollTop: (offsetTop: any) => void;
    scrollToOrigin: () => void;
    hideContent(): void;
    onContentLayoutHandler: (e: any) => void;
    onOverlayPressHandler: () => void;
    render(): JSX.Element;
}
