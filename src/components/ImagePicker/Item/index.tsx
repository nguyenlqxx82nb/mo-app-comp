import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import { WrapText } from '../../Text/index';
import { Color, CustomIcon, Styles } from 'mo-app-common';
import moment from 'moment';

export interface ImageItemProps {
  item?: any;
  type?: any;
  onPress?: (index, number) => void;
  index?: any;
}

export interface ImageItemState {
  active?: boolean;
  activeIndex?: number;
}

export default class ImageItem extends PureComponent<ImageItemProps, ImageItemState> {
  images = [];
  constructor(props: any) {
    super(props);
    const { item } = this.props
    this.state = {
      activeIndex: item.activeIndex,
      active: false,
    }
  }

  componentDidMount() { }

  UNSAFE_componentWillReceiveProps(nextProps: ImageItemProps) {
    if (nextProps.item.activeIndex !== this.state.activeIndex) {
      this.setState({ activeIndex: nextProps.item.activeIndex });
    }
    if (nextProps.item.active !== this.state.active) {
      this.setState({ active: nextProps.item.active });
    }
  }


  render() {
    const { item, index, onPress } = this.props;
    const { active, activeIndex } = this.state;
    let containerStyle = {
      paddingLeft: 0,
      paddingRight: 2
    };


    if (index % 3 === 1) {
      containerStyle = {
        paddingLeft: 1,
        paddingRight: 1,
      };
    }
    else if (index % 3 === 2) {
      containerStyle = {
        paddingLeft: 2,
        paddingRight: 0,
      };
    }
    const uri = item.node && item.node.image ? item.node.image.uri : '';
    const duration = item.node && item.node.image ? item.node.image.playableDuration : '';
    const durationTime = moment.utc(duration*1000).format('HH:mm:ss');
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={containerStyle}
        onPress={() => {
          if (onPress) {
            onPress(index, item);
          }
        }}>
        <Image
          source={{ uri: uri }}
          style={styles.image} />
        {
          item.node.type.includes('video') &&
          <View style={[ Styles.CenterItem, {position: 'absolute', width: '100%', height: '100%'}]} >
            <CustomIcon name={'video_preview'} size={50} color={Color.background} />
            <WrapText styles={{position: 'absolute', bottom: 5, textAlign: 'center'}} c={Color.background}>{durationTime}</WrapText>
          </View>
        }
        {
          active &&
          <View style={styles.activeContainer}>
            <View style={styles.activeBg}>
              <WrapText st={[Styles.Text_M_M, { color: '#fff' }]}>{activeIndex}</WrapText>
            </View>
          </View>
        }
      </TouchableOpacity>
    );
  }
}
