
import React from 'react';
import { View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { DeviceEventEmitter } from 'react-native';
import { Constants, Storage, StorageKeys, EmitKeys } from 'mo-app-common';

export default class MyPushNotification extends React.PureComponent<any, any> {
  isFirstToken: boolean;
  onmessage: any;
  onmessageBackground: any;

  constructor(props: any) {
    super(props);
    this.isFirstToken = true;
  }

  componentDidMount() { }

  componentWillUnmount() {
    if (this.onmessage) {
      this.onmessage();
    }
  }

  registerPushNotification = () => {
    this.registerAndroid();
  }

  registerAndroid = async () => {
    // check permission
    await this.checkPermission();
    this.onmessage = messaging().onMessage(async message => {
      DeviceEventEmitter.emit(Constants.EmitCode.PushNotification, message && message.data ? message.data.alert : undefined);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('setBackgroundMessageHandler ', remoteMessage);
      DeviceEventEmitter.emit(Constants.EmitCode.PushNotification, remoteMessage && remoteMessage.data ? remoteMessage.data.alert : undefined);
    });

    messaging().onTokenRefresh((token: string) => {
      this.updateToken(token);
    });

    // PushNotification.configure({
    //     onNotification: (notification: any) => {
    //         // console.log('PushNotification onNotification ', notification);
    //         if (notification.userInteraction || !notification.foreground) {
    //             const message = (notification.userInfo && notification.userInfo.alert) || notification.alert;
    //             if (message) {
    //                 DeviceEventEmitter.emit(Constants.EmitCode.NotificationOpen, message && (typeof message === 'string' ? JSON.parse(message) : message));
    //             }
    //             return;
    //         }
    //         this.onDisplayNotification(notification);
    //     },
    //     requestPermissions: true,
    // });
  }

  checkPermission = async () => {
    const isAutoInitEnabled = await messaging().hasPermission();
    // console.log('checkPermission ', isAutoInitEnabled);
    if (isAutoInitEnabled) {
      this.getToken();
      return;
    }
    await this.requestPermission();
  }

  getToken = async () => {
    const { onGetTokenSuccess } = this.props;
    let token = await Storage.getItem(StorageKeys.FIRE_BASE_TOKEN);
    if (!token) {
      token = await messaging().getToken();
      await Storage.setItem(StorageKeys.FIRE_BASE_TOKEN, token);
    }
    console.log('getToken ', token);
    if (onGetTokenSuccess) {
      onGetTokenSuccess(token);
    }
    return token;
  }

  updateToken = async (token: string) => {
    await Storage.setItem(StorageKeys.FIRE_BASE_TOKEN, token);
    DeviceEventEmitter.emit(EmitKeys.PUSH_TOKEN_UPDATED, token);
  }

  requestPermission = async () => {
    const { onGetTokenFailed } = this.props;
    const authStatus = await messaging().requestPermission();
    if (authStatus) {
      this.getToken();
      return;
    }
    if (onGetTokenFailed) {
      onGetTokenFailed();
    }
  }

  onDisplayNotification = (notification: any) => {
    // const { notification , data } = message;
    // console.log('onDisplayNotification ', notification);
    PushNotification.localNotification({
      title: notification.title,
      message: notification.body || notification.message,
      userInfo: notification.data
    });
  }

  render() {
    return <View />;
  }
}
