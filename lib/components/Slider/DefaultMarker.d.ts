import React from 'react';
import PropTypes from 'prop-types';
export default class DefaultMarker extends React.PureComponent<any, any> {
    static propTypes: {
        pressed: PropTypes.Requireable<boolean>;
        pressedMarkerStyle: PropTypes.Requireable<object>;
        markerStyle: PropTypes.Requireable<object>;
        enabled: PropTypes.Requireable<boolean>;
        currentValue: PropTypes.Requireable<number>;
        valuePrefix: PropTypes.Requireable<string>;
        valueSuffix: PropTypes.Requireable<string>;
    };
    render(): JSX.Element;
}
