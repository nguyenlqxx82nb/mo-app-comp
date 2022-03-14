/** @format */
import React from 'react';
import 'moment/locale/vi';
export default class CommentItem extends React.PureComponent<any, any> {
    static defaultProps: {
        item: {};
        hasDivider: boolean;
        fullWidthDivider: boolean;
        containerStyle: {};
        isReply: boolean;
        isAnswer: boolean;
    };
    constructor(props: any);
    getTimeAgo: (startTime: any) => string;
    renderImage(item: any, isReply?: boolean): JSX.Element;
    onOpenZoomImageViewer(images: Array<any>, isReply: boolean, index: number): void;
    showZoomSlideImages: (images: any, index: any) => void;
    renderViewMore(onPress: any): JSX.Element;
    renderViewLess(onPress: any): JSX.Element;
    layoutFullText: (event: any) => void;
    layoutTrimmedText: () => void;
    onPressMore: () => void;
    renderFullText: () => JSX.Element;
    replyHandler(): void;
    viewMoreAnswerHandler(): void;
    render(): JSX.Element;
}
