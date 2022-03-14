import React from 'react';
export default class ReadMore extends React.PureComponent<any, any> {
    state: {
        measured: boolean;
        shouldShowReadMore: boolean;
        showAllText: boolean;
    };
    _isMounted: boolean;
    _text: any;
    componentDidMount(): void;
    handleComponentMount(): Promise<void>;
    componentWillUnmount(): void;
    render(): JSX.Element;
    _handlePressReadMore: () => void;
    _handlePressReadLess: () => void;
    _maybeRenderReadMore(): any;
}
