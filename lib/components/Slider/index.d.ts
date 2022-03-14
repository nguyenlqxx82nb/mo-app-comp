import React from 'react';
import PropTypes from 'prop-types';
import DefaultMarker from './DefaultMarker';
export default class MultiSlider extends React.PureComponent<any, any> {
    static propTypes: {
        values: PropTypes.Requireable<number[]>;
        onValuesChangeStart: PropTypes.Requireable<(...args: any[]) => any>;
        onValuesChange: PropTypes.Requireable<(...args: any[]) => any>;
        onValuesChangeFinish: PropTypes.Requireable<(...args: any[]) => any>;
        sliderLength: PropTypes.Requireable<number>;
        touchDimensions: PropTypes.Requireable<object>;
        customMarker: PropTypes.Requireable<(...args: any[]) => any>;
        customMarkerLeft: PropTypes.Requireable<(...args: any[]) => any>;
        customMarkerRight: PropTypes.Requireable<(...args: any[]) => any>;
        isMarkersSeparated: PropTypes.Requireable<boolean>;
        min: PropTypes.Requireable<number>;
        max: PropTypes.Requireable<number>;
        step: PropTypes.Requireable<number>;
        optionsArray: PropTypes.Requireable<any[]>;
        containerStyle: any;
        trackStyle: any;
        selectedStyle: any;
        unselectedStyle: any;
        markerContainerStyle: any;
        markerStyle: any;
        pressedMarkerStyle: any;
        valuePrefix: PropTypes.Requireable<string>;
        valueSuffix: PropTypes.Requireable<string>;
        enabledOne: PropTypes.Requireable<boolean>;
        enabledTwo: PropTypes.Requireable<boolean>;
        onToggleOne: PropTypes.Requireable<(...args: any[]) => any>;
        onToggleTwo: PropTypes.Requireable<(...args: any[]) => any>;
        allowOverlap: PropTypes.Requireable<boolean>;
        snapped: PropTypes.Requireable<boolean>;
        markerOffsetX: PropTypes.Requireable<number>;
        markerOffsetY: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        values: number[];
        onValuesChangeStart: () => void;
        onValuesChange: (_values: any) => void;
        onValuesChangeFinish: (_values: any) => void;
        step: number;
        min: number;
        max: number;
        touchDimensions: {
            height: number;
            width: number;
            borderRadius: number;
            slipDisplacement: number;
        };
        customMarker: typeof DefaultMarker;
        customMarkerLeft: typeof DefaultMarker;
        customMarkerRight: typeof DefaultMarker;
        markerOffsetX: number;
        markerOffsetY: number;
        sliderLength: number;
        onToggleOne: any;
        onToggleTwo: any;
        enabledOne: boolean;
        enabledTwo: boolean;
        allowOverlap: boolean;
        snapped: boolean;
    };
    optionsArray: any;
    stepLength: any;
    _panResponderOne: any;
    _panResponderTwo: any;
    _markerOne: any;
    _markerTwo: any;
    constructor(props: any);
    UNSAFE_componentWillMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    startOne: () => void;
    startTwo: () => void;
    moveOne: (gestureState: any) => void;
    moveTwo: (gestureState: any) => void;
    endOne: (gestureState: any) => void;
    endTwo: (gestureState: any) => void;
    render(): JSX.Element;
}