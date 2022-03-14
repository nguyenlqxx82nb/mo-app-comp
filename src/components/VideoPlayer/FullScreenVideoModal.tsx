
import { Constants } from 'mo-app-common';
import { WrapModal } from '../Modal';
import { ButtonRipple } from '../Button';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import VideoPlayer from '../VideoPlayer'
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface IVideo {
  source?: string;
  href?: string;
}

interface IVideoModalProps {
  video: IVideo;
  onClose?: () => void;
}

interface IVideoModalState {

}

class FullScreenVideoModal extends React.PureComponent<IVideoModalProps, IVideoModalState> {

  modalRef: WrapModal;

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onClosePressHandler = () => {
    const { onClose } = this.props;
    this.modalRef && this.modalRef.close();
    onClose && onClose();
  }

  render() {
    const { video } = this.props;

    return (
      <WrapModal
        ref={(comp: any) => { this.modalRef = comp; }}
        autoOpen={true}
        overlayOpacity={0.95}>
        <View style={[styles.container]}>
          <VideoPlayer
            video={video}
            disableControlsAutoHide
            disableFullscreen
            autoplay
          />
          <View style={styles.buttonBack}>
            <ButtonRipple
              name={'close'}
              size={20}
              color={'#fff'}
              onPress={() => {
                this.onClosePressHandler();
              }}
            />
          </View>
          <StatusBar
						backgroundColor="transparent" 
						barStyle={'light-content'}/>
        </View>
      </WrapModal>
    );
  }
}

export default FullScreenVideoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Constants.Height,
    width: Constants.Width,
    justifyContent: 'center',
  },

  buttonBack: {
    position: 'absolute',
    top: getStatusBarHeight() + 15,
    left: 10,
    width: 40,
    height: 40
  },
});
