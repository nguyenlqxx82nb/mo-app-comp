
import React from 'react';
import { View, StyleSheet, LayoutAnimation, DeviceEventEmitter, Animated, LayoutChangeEvent, AppState, Vibration, } from 'react-native';
import { Constants, Color, Styles, SocialService } from 'mo-app-common';
import { WrapText } from '../Text';
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerStateChangeEvent, State, TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AsyncImage from '../AsyncImage';
import { Router } from '../Router';

const _ = require('lodash');

interface IToastItem {
  message: string;
  type?: 'error' | 'warning' | 'success' | 'notification';
  title?: string;
  subTitle?: string;
  icon?: string;
  id?: string;
  data?: any;
}

interface IToastProps {
  duration?: number; // Thời gian hiển thị toast
  minDuration?: number; // Thời gian tối thiểu hiển thị toast
  zIndex?: number;
  paddingHorizontal?: number;
  hiddenTime?: number; // Thơi gian biến mất khi vuốt
  onPress?: (data: any) => void;
}

interface IToastState {
  toast: IToastItem,
  avatarDefault: string,
}

class Notification extends React.Component<IToastProps, IToastState> {
  private toastLiveTime: number = 0;
  private toastListener: any;
  private toasts: IToastItem[] = [];
  private timerIntervalRemove: any;
  private translateX: Animated.Value;
  private translateY: Animated.Value;
  private dragX: Animated.Value;
  private width: number;
  private onGestureEvent: (event: PanGestureHandlerGestureEvent) => void;
  private headerHeightListener: any;
  private toastHeight: number;
  private appState: any;
  private isHidingToast: boolean = false;

  static defaultProps: IToastProps = {
    duration: 5000,
    minDuration: 1000,
    zIndex: 9999,
    paddingHorizontal: 0,
    hiddenTime: 300
  }

  constructor(props: any) {
    super(props);
    this.state = {
      toast: undefined,
      avatarDefault: ''
    }
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.dragX = new Animated.Value(0);
    this.width = 0;
    this.appState = AppState.currentState;
    this.toastHeight = Constants.HeaderHeight + 10 + getStatusBarHeight();
    this.onGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: this.dragX } }],
      { useNativeDriver: true }
    );
  }

  componentDidMount() {
    this.initAvatarDefault();
    AppState.addEventListener('change', this.handleAppStateChange);
    this.toastListener = DeviceEventEmitter.addListener(Constants.EmitCode.Toast, this.doToast);
    this.headerHeightListener = DeviceEventEmitter.addListener(Constants.EmitCode.HEADER_HEIGHT_CHANGE, this.handlerHeaderHeight);
    this.timerIntervalRemove = setInterval(this.removeToast, 1000);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.toastListener.remove();
    this.headerHeightListener.remove();
    this.timerIntervalRemove && (clearInterval(this.timerIntervalRemove));
  }

  handleAppStateChange = (nextAppState) => {
    this.appState = nextAppState;
  }

  shouldComponentUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  initAvatarDefault = async () => {
    this.setState({ avatarDefault: await SocialService.getDefaultAvatar() });
  }

  private handlerHeaderHeight = (height) => {
    const { hiddenTime } = this.props;
    const { toast } = this.state;

    if (!getStatusBarHeight()) {
      return this.handlerHeaderHeight(height);
    }
    const currentHeight = height + getStatusBarHeight() + 10;

    this.toastHeight = currentHeight;
    if (!toast) {
      return;
    }
    Animated.timing(this.translateY, {
      toValue: currentHeight,
      duration: hiddenTime,
      useNativeDriver: true,
    }).start(() => {
      console.log('translateY', currentHeight);
      // this.toastLiveTime = 0;
    });
  }

  private onToastLayout = (event: LayoutChangeEvent) => {
    this.width = event.nativeEvent.layout.width;
  };

  private onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState !== State.ACTIVE) {
      return;
    }
    const dragToss = 0.05;
    const endOffsetX = event.nativeEvent.translationX + dragToss * event.nativeEvent.velocityX;
    if (endOffsetX > this.width / 2) {
      this.hiddenToast(true);
    }
  };

  checkConversationIsOpen = (toast: IToastItem) => {
    if (!toast || !toast.id || !Router.getCurrentScreen() || !Router.getCurrentScreen().id || Router.getCurrentScreen().id !== toast.id) {
      return false;
    }
    return true;
  }

  doToast = (msg: string, type: string = 'error', title: string = '', subTitle: string = '', icon: string = '', data: any = undefined) => {
    if (!type || type !== 'notification' || this.appState !== 'active') {
      return;
    }
    const newToast: IToastItem = {
      message: msg,
      type: type,
      title: title,
      subTitle: subTitle,
      icon: icon,
      data: data,
      id: data && data.id
    };
    this.toasts.push(newToast);
  }

  removeToast = () => {
    const { minDuration, duration, hiddenTime } = this.props;
    const { toast } = this.state;
    this.toastLiveTime += 1000;
    if (!toast && !this.toasts.length) {
      this.toastLiveTime = 0;
      return;
    }
    if (this.isHidingToast) {
      return;
    }
    if (toast && !this.toasts.length) {
      if (this.toastLiveTime < duration) {
        return;
      }
      if (this.toastLiveTime >= minDuration) {
        this.toastLiveTime = 0;
        this.hiddenToast();
        return;
      }
    }
    if ((!toast && this.toasts.length) || (this.toastLiveTime >= minDuration)) {
      this.toastLiveTime = 0;
      for (const item of this.toasts) {
        this.toasts.splice(0, 1);
        if (this.checkConversationIsOpen(item) || Constants.ModalShowing) {
          continue;
        }

        Vibration.vibrate();
        this.setState({ toast: item }, () => {
          Animated.timing(this.translateY, {
            toValue: this.toastHeight,
            duration: hiddenTime,
            useNativeDriver: true,
          }).start();
        });
        return;
      }
    }
    if (this.toastLiveTime < duration) {
      return;
    }
    this.hiddenToast();
  }

  hiddenToast = (isSwipe: boolean = false) => {
    const { toast } = this.state;
    const { hiddenTime } = this.props;
    this.toastLiveTime = 0;
    if (!toast) {
      return;
    }
    this.isHidingToast = true;

    if (isSwipe) {
      Animated.timing(this.translateX, {
        toValue: Constants.Width,
        duration: hiddenTime,
        useNativeDriver: true,
      }).start(() => {
        this.setState({ toast: undefined });
        this.translateY.setValue(0);
        this.translateX.setValue(0);
        this.isHidingToast = false;
      });
      return;
    }

    Animated.timing(this.translateY, {
      toValue: -200,
      duration: hiddenTime,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ toast: undefined });
      this.translateY.setValue(0);
      this.translateX.setValue(0);
      this.isHidingToast = false;
    });
  }

  render() {
    const { toast, avatarDefault } = this.state;
    const { zIndex, paddingHorizontal, onPress } = this.props;
    const transformContentStyle = {
      transform: [
        { translateX: this.translateX },
        { translateY: this.translateY },
      ]
    };
    if (!toast || (toast && !toast.message) || (toast && _.isObject(toast.message))) {
      return null;
    }
    return (
      <PanGestureHandler
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}>
        <Animated.View
          style={[Styles.RowOnly, styles.container,
          { zIndex: zIndex, width: Constants.Width - paddingHorizontal * 2, marginLeft: paddingHorizontal }, transformContentStyle]}
          onLayout={this.onToastLayout}>
          <TouchableOpacity activeOpacity={1} onPress={() => { onPress && onPress(toast.data) }}
            style={{ width: Constants.Width - paddingHorizontal * 2 }}>
            <View style={{ paddingVertical: 12, paddingHorizontal: 20, flex: 1 }}>
              <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <WrapText nl={1} styles={[Styles.Text_M_M, { flex: 1, marginRight: 8 }]}>{toast.title}
                  <WrapText styles={[Styles.Text_M_R, { color: 'rgba(78, 78, 78, 0.5)' }]}>{`  •  ${toast.subTitle}`}</WrapText>
                </WrapText>
              </View>
              <View style={[Styles.RowOnly, Styles.AlignCenter]}>
                <AsyncImage source={{ uri: toast.icon }} iconDefault={avatarDefault} width={22} height={22} radius={11} style={{ marginRight: 6 }} />
                <WrapText nl={1} styles={[Styles.Text_M_R, { flex: 1, marginLeft: 6 }]}>{toast.message}</WrapText>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: Color.background,
    borderRadius: 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

});

export default Notification;
