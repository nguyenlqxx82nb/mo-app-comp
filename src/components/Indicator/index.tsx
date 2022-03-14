import React from 'react';
import { StyleSheet,ActivityIndicator, View } from 'react-native';
import { Color } from 'mo-app-common';

export interface IIndicatorProps {
    isShow: boolean;
    size?: number | 'small' | 'large';
    color?: string;
}
export class Indicator extends React.Component<IIndicatorProps, any> {
    
    static defaultProps: IIndicatorProps = {
        isShow : false,
        size: 'large',
        color: Color.primary
    };

    constructor(props: IIndicatorProps) {
        super(props);
        this.state = {
            isShow : this.props.isShow,
        };
    }

    show = () =>{
        this.setState({isShow : true});
    }

    hide = ()=>{
        if (this.state.isShow){
            this.setState({isShow : false});
        }
    }

    render = () => {
        const { color, size } = this.props;
        const {isShow} = this.state;
        return (isShow) ?
            <ActivityIndicator
                style={styles.indicator}
                color={color}
                size={size} /> : <View />;
    }
}

const styles = StyleSheet.create({
    indicator :{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

import BallIndicator from './ball-indicator';
import BarIndicator from './bar-indicator';
import DotIndicator from './dot-indicator';
import MaterialIndicator from './material-indicator';
import PulseIndicator from './pulse-indicator';
import SkypeIndicator from './skype-indicator';
import UIActivityIndicator from './ui-activity-indicator';
import WaveIndicator from './wave-indicator';

export { BallIndicator, BarIndicator, DotIndicator, MaterialIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator}

