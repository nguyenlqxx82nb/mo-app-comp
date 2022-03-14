import React from 'react';
export default class AvatarImage extends React.PureComponent<any, any> {
    static defaultProps: {
        width: number;
        border: number;
    };
    constructor(props: any);
    fixAvatar: (avatar?: string) => string;
    render(): JSX.Element;
}
