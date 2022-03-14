import React, { PureComponent } from 'react';
import {
  View, Animated, TouchableWithoutFeedback, StyleSheet, DeviceEventEmitter,
  Platform, BackHandler, Keyboard, KeyboardEvent, ViewStyle, StatusBar
} from 'react-native';
import { Constants, Device } from 'mo-app-common';
import { ButtonRipple } from '../Button';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export interface IWrapModalProps {
  containerStyle?: ViewStyle | ViewStyle[];
  isOpen?: boolean;
  backDropClose?: boolean;
  overlayOpacity?: number;
  autoOpen?: boolean;
  contentHeight?: number;
  showPos?: 'center' | 'bottom';
  position?: 'center' | 'bottom' | 'top';
  hasCloseButton?: boolean;
  overlayClose?: boolean;
  fullscreen?: boolean;
  preventBack?: boolean;
  zIndexContent?: number;
  ignoreKeyboardScroll?: boolean;
  onClose?: () => void;
  onShowCompleted?: () => void;
}

export interface IWrapModalState {
  contentHeight: number;
  backdropOpacity: number;
  isOpen: boolean;
  overlayOpacityAnim: Animated.Value;
  contentOpacityAnim: Animated.Value;
  topAnim: Animated.Value;
  scaleAnim: Animated.Value;
}

export default class WrapModal extends PureComponent<IWrapModalProps, IWrapModalState> {

  static defaultProps = {
    containerStyle: {},
    isOpen: false,
    backDropClose: true,
    autoOpen: false,
    contentHeight: 0,
    overlayOpacity: 0.75,
    position: 'center',
    showPos: 'bottom',
    hasCloseButton: false,
    overlayClose: true,
    zIndexContent: 1
  };

  contentHeight: number;
  currentTop: number;
  isOpen: boolean;
  modalRef: any;

  constructor(props: IWrapModalProps) {
    super(props);
    const { contentHeight, position } = this.props;
    this.contentHeight = 0;
    const top = position === 'bottom' ? Constants.Height : position === 'top' ? -1 * Constants.Height : (Constants.Height - contentHeight) / 2;
    this.state = {
      contentHeight: contentHeight,
      backdropOpacity: 0,
      isOpen: false,
      overlayOpacityAnim: new Animated.Value(0),
      contentOpacityAnim: new Animated.Value(0),
      topAnim: new Animated.Value(top),
      scaleAnim: new Animated.Value(position === 'center' ? 0.7 : 1)
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroidHandler);
    }
    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardDidShow', this.onKeyboardShowHandler);
      Keyboard.addListener('keyboardWillHide', this.onKeyboardHideHandler);
    } else {
      Keyboard.addListener('keyboardDidShow', this.onKeyboardShowHandler);
      Keyboard.addListener('keyboardDidHide', this.onKeyboardHideHandler);
    }

    this.init();
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroidHandler);
    }
    // Keyboard.removeListener('keyboardWillShow', this.onKeyboardShowHandler);
    Keyboard.removeListener('keyboardWillHide', this.onKeyboardHideHandler);
    Keyboard.removeListener('keyboardDidShow', this.onKeyboardShowHandler);
    Keyboard.removeListener('keyboardDidHide', this.onKeyboardHideHandler);
  }

  onKeyboardShowHandler = (e: KeyboardEvent) => {
    if (!this.isOpen) {
      return false;
    }
    const { ignoreKeyboardScroll } = this.props;
    if (ignoreKeyboardScroll) {
      return;
    }
    const { position, showPos } = this.props;
    const keyboardHeight = Constants.Height - e.endCoordinates.screenY;
    let offset = (position === 'bottom' && showPos !== 'center') ? keyboardHeight : 100;
    offset = Math.min(this.currentTop - Constants.BarHeight - 20, offset);
    this.scrollTop(-1 * offset);
  }

  onKeyboardHideHandler = () => {
    this.scrollToOrigin();
  }

  onBackAndroidHandler = () => {
    const { preventBack } = this.props;
    if (!preventBack) {
      this.close();
    }
    return false;
  }

  init = () => {
    setTimeout(() => {
      const { autoOpen } = this.props;
      if (autoOpen) {
        this.setState({ isOpen: true });
        this.show();
      }
    }, 0);
  }

  close = () => {
    const { overlayOpacityAnim, topAnim, scaleAnim, contentOpacityAnim } = this.state;
    const { onClose, position } = this.props;
    this.isOpen = false;
    const actions = [
      Animated.timing(overlayOpacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })

    ];

    if (position === 'bottom') {
      actions.push(
        Animated.timing(
          topAnim, {
          toValue: Constants.Height,
          duration: 200,
          useNativeDriver: true,
        })
      )
    }
    if (position === 'top') {
      actions.push(
        Animated.timing(topAnim, {
          toValue: -1 * Constants.Height / 2,
          duration: 200,
          useNativeDriver: true,
        })
      )
    }
    if (position === 'center') {
      actions.push(
        Animated.timing(scaleAnim, {
          toValue: 0.2,
          duration: 200,
          useNativeDriver: true,
          // Easing: Easing.inOut
        })
      )
    }

    Animated.parallel(actions).start(() => {
      Constants.ModalShowing = false;
      this.setState({ isOpen: false });
      onClose && onClose();
      DeviceEventEmitter.emit(Constants.EmitCode.PopModal);
    })
  };

  show() {
    const { overlayOpacity } = this.props;
    const { overlayOpacityAnim } = this.state;
    this.isOpen = true;
    // overlay animate
    Animated.timing(overlayOpacityAnim, {
      toValue: overlayOpacity,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }

  showContent() {
    const { position, showPos, onShowCompleted } = this.props;
    const { topAnim, contentOpacityAnim, scaleAnim } = this.state;
    if (position === 'center') {
      this.currentTop = (Constants.Height - this.contentHeight) / 2;
      topAnim.setValue(this.currentTop);
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        // easing: Easing.inOut
      }).start(() => {
        if (onShowCompleted) {
          onShowCompleted();
        }
      });
    }
    if (position === 'bottom') {
      this.currentTop = showPos === 'center' ? (Constants.Height - this.contentHeight) / 2 : Constants.Height - this.contentHeight;
      Animated.timing(topAnim, {
        toValue: this.currentTop,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if (onShowCompleted) {
          onShowCompleted();
        }
      });
    }

    if (position === 'top') {
      Animated.timing(topAnim, {
        toValue: (Constants.Height - this.contentHeight) / 2,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if (onShowCompleted) {
          onShowCompleted();
        }
      });
    }

    Animated.timing(contentOpacityAnim, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
  }

  scrollTop = (offsetTop) => {
    const { topAnim } = this.state;
    Animated.timing(topAnim, {
      toValue: this.currentTop + offsetTop,
      duration: 50,
      useNativeDriver: true,
    }).start();
  }

  scrollToOrigin = () => {
    const { topAnim } = this.state;
    Animated.timing(topAnim, {
      toValue: this.currentTop,
      duration: 50,
      useNativeDriver: true,
    }).start();
  }

  hideContent() {
    const { position } = this.props;
    const { topAnim, contentOpacityAnim, scaleAnim } = this.state;
    // Animated.timing(topAnim , {
    //   toValue: 3 * Constants.Height / 4,
    //   duration: 0,
    //   useNativeDriver: true,
    // }).start();
    if (position === 'bottom') {
      Animated.timing(topAnim, {
        toValue: Constants.Height,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    if (position === 'top') {
      Animated.timing(topAnim, {
        toValue: -1 * Constants.Height / 2,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    if (position === 'center') {
      Animated.timing(scaleAnim, {
        toValue: 0.2,
        duration: 200,
        useNativeDriver: true,
        // Easing: Easing.inOut
      }).start();
    }

    Animated.timing(contentOpacityAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  onContentLayoutHandler = (e) => {
    if (e && e.nativeEvent) {
      this.contentHeight = e.nativeEvent.layout.height;
      this.showContent();
    }
  }

  onOverlayPressHandler = () => {
    const { overlayClose } = this.props;
    if (overlayClose) {
      this.close();
    }
  }

  render() {
    const { children, hasCloseButton, fullscreen, position, zIndexContent } = this.props;
    const { isOpen, overlayOpacityAnim, topAnim, contentOpacityAnim, contentHeight } = this.state;

    const transformContentStyle = {
      transform: [{
        translateY: topAnim,
        // scale: scaleAnim
      }]
    };
    let contentStyle = contentHeight ? { height: contentHeight } : {};
    if (fullscreen) {
      contentStyle = { ...contentStyle, ...{ top: 0, bottom: 0 } };
    }
    if (!isOpen) {
      return <View />;
    }

    return (
      <View
        style={styles.container}
        ref={comp => (this.modalRef = comp)}>

        <TouchableWithoutFeedback
          onPress={this.onOverlayPressHandler}>
          <Animated.View style={[styles.overlayContainer, { opacity: overlayOpacityAnim }]} />
        </TouchableWithoutFeedback>

        <Animated.View onLayout={this.onContentLayoutHandler}
          style={[styles.contentContainer, contentStyle, transformContentStyle, { opacity: contentOpacityAnim, zIndex: zIndexContent }]}>
          {children}
        </Animated.View>
        {
          hasCloseButton &&
          <View style={styles.buttonBack}>
            <ButtonRipple
              name={'close'}
              size={20}
              color={'#fff'}
              onPress={() => {
                this.close();
              }}
            />
          </View>
        }
        <StatusBar
          backgroundColor="transparent"
          barStyle={'light-content'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: Device.ToolbarHeight,
    zIndex: 10000
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000'
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBack: {
    position: 'absolute',
    top: getStatusBarHeight() + 5,
    left: 5,
    width: 40,
    height: 40
  },
});
