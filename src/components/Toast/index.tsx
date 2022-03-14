
import React from 'react';
import { View, StyleSheet, LayoutAnimation, DeviceEventEmitter, Animated, LayoutChangeEvent, EventSubscription } from 'react-native';
import { Constants, Device, Color, Styles } from 'mo-app-common';
import { WrapText } from '../Text';
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerStateChangeEvent, State, TouchableOpacity } from 'react-native-gesture-handler';


const _ = require('lodash');

interface IToastItem {
  message: string;
  type?: 'error' | 'warning' | 'success' | 'notification';
  title?: string; // Use with notification
  subTitle?: string; // Use with notification
  icon?: string; // Use with notification
  iconColor?: string; // Use with notification
}

interface IToastProps {
  duration?: number; // Thời gian hiển thị toast
  minDuration?: number; // Thời gian tối thiểu hiển thị toast
  zIndex?: number;
  paddingHorizontal?: number;
  // paddingBottom?: number;
  hiddenTime?: number; // Thơi gian biến mất khi vuốt
}

interface IToastState {
  toast: IToastItem,
}

class Toast extends React.Component<IToastProps, IToastState> {
  toastLiveTime: number = 0;
  toastListener: any;
  toasts: IToastItem[] = [];
  private timerIntervalRemove: any;
  private translateX: Animated.Value;
  private translateY: Animated.Value;
  private fadeAnim: Animated.Value;
  private dragX: Animated.Value;
  private width: number;
  private subBottomHeightChange: EventSubscription;
  private toastMarginBottom: number;

  private onGestureEvent: (event: PanGestureHandlerGestureEvent) => void;

  static defaultProps: IToastProps = {
    duration: 3000,
    minDuration: 1000,
    zIndex: 50000,
    paddingHorizontal: 0,
    // paddingBottom: 100,
    hiddenTime: 300
  }

  constructor(props: IToastProps) {
    super(props);
    this.state = {
      toast: undefined,
    }
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.fadeAnim = new Animated.Value(0);
    this.dragX = new Animated.Value(0);
    this.width = 0;
    this.toastMarginBottom = Device.isIphoneX ? 35 : Constants.DEFAULT_TOAST_MARGIN_BOTTOM;

    this.onGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: this.dragX } }],
      { useNativeDriver: true }
    );
  }

  componentDidMount() {
    this.toastListener = DeviceEventEmitter.addListener(Constants.EmitCode.Toast, this.doToast);
    this.timerIntervalRemove = setInterval(this.removeToast, 1000);
    this.subBottomHeightChange = DeviceEventEmitter.addListener(Constants.EmitCode.TOAST_BOTTOM_HEIGHT_CHANGE, this.handleToastBottomHeightChange);
  }



  componentWillUnmount() {
    this.toastListener.remove();
    this.subBottomHeightChange.remove();
    clearInterval(this.timerIntervalRemove);
  }

  private handleToastBottomHeightChange = (height) => {
    const { hiddenTime } = this.props;
    this.toastMarginBottom = height;
    Animated.timing(this.translateY, {
      toValue: -(this.toastMarginBottom),
      duration: hiddenTime,
      useNativeDriver: true,
    }).start(() => {
      this.toastLiveTime = 0;
    });
  }

  shouldComponentUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  private onToastLayout = (event: LayoutChangeEvent) => {
    this.width = event.nativeEvent.layout.width;
  };

  private onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState !== State.ACTIVE) {
      return;
    }
    const dragToss = 0.05;
    const endOffsetX =
      event.nativeEvent.translationX + dragToss * event.nativeEvent.velocityX;
    if (endOffsetX > this.width / 2) {
      this.hiddenToast(true);
    }

  };

  doToast = (message: string, type: 'error' | 'warning' | 'success' | 'notification' = 'error', title: string = '', subTitle: string = '', icon: string = '') => {
    if (!type || type === 'notification') {
      return;
    }
    const { toast } = this.state;
    const { hiddenTime } = this.props;
    const newToast = {
      message: message,
      type: type,
      title: title,
      subTitle: subTitle,
      icon: icon,
    };
    if ((!this.toasts || !this.toasts.length) && !toast) {
      this.translateY.setValue(-(this.toastMarginBottom));
      return this.setState({ toast: newToast }, () => {
        Animated.timing(this.fadeAnim, {
          toValue: 1,
          duration: hiddenTime,
          useNativeDriver: true,
        }).start(() => {
          this.toastLiveTime = 0;
        });
      });
    }
    this.toasts.push(newToast);
  }

  removeToast = () => {
    const { minDuration, duration } = this.props;
    const { toast } = this.state;
    this.toastLiveTime += 1000;
    if (!toast) {
      this.toastLiveTime = 0;
      return;
    }
    if (this.toasts && this.toasts.length && this.toastLiveTime >= minDuration) {
      this.toastLiveTime = 0;
      this.setState({ toast: this.toasts[0] });
      return this.toasts.splice(0, 1);
    }
    if (this.toastLiveTime < duration) {
      return;
    }
    if (this.toasts && this.toasts.length) {
      this.setState({ toast: this.toasts[0] });
      return this.toasts.splice(0, 1);
    }
    this.hiddenToast();
  }

  renderColor = (type: string) => {
    return type === 'success' ? Color.green : (type === 'error' ? 'rgb(255,84,84)' : 'rgb(251,177,7)');
  }

  hiddenToast = (isSwipe: boolean = false) => {
    const { toast } = this.state;
    const { hiddenTime } = this.props;
    if (!toast) {
      return;
    }
    if (isSwipe) {
      Animated.timing(this.translateX, {
        toValue: Constants.Width,
        duration: hiddenTime,
        useNativeDriver: true,
      }).start(() => {
        this.setState({ toast: undefined });
        this.fadeAnim.setValue(0);
        this.translateX.setValue(0);
        this.toastLiveTime = 0;
      });
      return;
    }
    Animated.timing(this.fadeAnim, {
      toValue: 0,
      duration: hiddenTime,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ toast: undefined });
      this.fadeAnim.setValue(0);
      this.translateX.setValue(0);
      this.toastLiveTime = 0;
    });
  }

  render() {
    const { toast } = this.state;
    const { zIndex, paddingHorizontal } = this.props;
    const transformContentStyle = {
      transform: [
        { translateX: this.translateX },
        { translateY: this.translateY },
      ]
    };
    if (!toast || (toast && !toast.message) || (toast && _.isObject(toast.message))) {
      return null;
    }
    // console.log('zIndex=', zIndex);
    return (
      <PanGestureHandler
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}>
        <Animated.View
          style={[Styles.RowOnly, styles.container,
          { zIndex: 500000 , width: Constants.Width - paddingHorizontal * 2, marginLeft: paddingHorizontal }, transformContentStyle]}
          onLayout={this.onToastLayout}>
          <TouchableOpacity activeOpacity={1}
            style={{ width: Constants.Width - paddingHorizontal * 2 }}>
            <View style={[Styles.RowCenter, { flex: 1 }]}>
              <View style={[{ backgroundColor: this.renderColor(toast.type), width: 7, borderTopLeftRadius: 4, borderBottomLeftRadius: 4, height: '100%' }]}></View>
              <View style={{ paddingVertical: 12, marginLeft: 13, marginRight: 20, flex: 1 }}>
                <WrapText fixSize={true} nl={3} styles={[Styles.Text_M_R]}>{toast.message}</WrapText>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({

  toastWrapper: {
    width: Constants.Width - 140,
    backgroundColor: Color.background,
    borderRadius: 4,
    marginBottom: Device.isIphoneX ? 44 : 10,
    marginTop: 10,
    overflow: 'hidden',
  },

  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: Color.background,
    borderRadius: 4,
    bottom: Device.isIphoneX ? 35 : Constants.DEFAULT_TOAST_MARGIN_BOTTOM,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 500000
  },
});

export default Toast;
