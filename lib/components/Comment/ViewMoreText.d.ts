import React from 'react';
import PropTypes from 'prop-types';
declare class ViewMoreText extends React.Component<any, any> {
    static propTypes: {
        renderViewMore: PropTypes.Requireable<(...args: any[]) => any>;
        renderViewLess: PropTypes.Requireable<(...args: any[]) => any>;
        afterCollapse: PropTypes.Requireable<(...args: any[]) => any>;
        afterExpand: PropTypes.Requireable<(...args: any[]) => any>;
        numberOfLines: PropTypes.Validator<number>;
        textStyle: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        afterCollapse: () => void;
        afterExpand: () => void;
        textStyle: {};
    };
    trimmedTextHeight: any;
    fullTextHeight: any;
    shouldShowMore: boolean;
    constructor(props: any);
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    componentWillUpdate(): void;
    hideFullText: () => void;
    onLayoutTrimmedText: (event: any) => void;
    onLayoutFullText: (event: any) => void;
    onPressMore: () => void;
    onPressLess: () => void;
    getWrapperStyle: () => {};
    renderViewMore: () => JSX.Element;
    renderViewLess: () => JSX.Element;
    renderFooter: () => any;
    renderFullText: () => JSX.Element;
    render(): JSX.Element;
}
export default ViewMoreText;
