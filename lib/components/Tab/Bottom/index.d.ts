import React from 'react';
export default class BottomTab extends React.PureComponent<any, any> {
    idxDisableArr: Array<number>;
    constructor(props: any);
    setCurrentIndex(index: number): void;
    setDisableIndex: (idxArr: Array<number>) => void;
    onPress: (route: any, index: number) => void;
    handleOnBarcodePress: (code: string, index: number) => void;
    render(): JSX.Element;
}
