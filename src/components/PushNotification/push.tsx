
import React from 'react';
import { View } from 'react-native';
import PushNotification from 'react-native-push-notification';
import  PushNotificationIOS from '@react-native-community/push-notification-ios';
import { DeviceEventEmitter } from 'react-native';
import { Constants } from 'mo-app-common';

export default class MyPushNotification extends React.PureComponent<any, any> {

    isFirstToken: boolean;
    onmessage: any;
    onmessageBackground: any;

    constructor(props: any) {
        super(props);
        this.isFirstToken = true;
    }

    componentDidMount() {}

    componentWillUnmount() {
        PushNotificationIOS.removeAllDeliveredNotifications();
    }

    registerPushNotification = () => {
        this.registerIOS();
    }

    registerIOS = async () => {
        console.log('registerIOS ');
        PushNotificationIOS.requestPermissions().then(
            (data) => {
                console.log('requestPermissions IOS ', data);
            },
            (error) => {
                console.log('requestPermissions IOS error ', error);
            },
        );
        PushNotificationIOS.addEventListener('registrationError', this.onRegistrationError);
        PushNotificationIOS.addEventListener('register', this.onIOSRegistered);
        PushNotificationIOS.addEventListener('notification', this.onIOSRemoteNotification);
        PushNotificationIOS.getInitialNotification().then(notification => {
            if (!notification) {
              return;
            }
        });

        PushNotification.configure({
            onNotification: function (notification: any) {
                let message = (notification.data && notification.data.alert) || notification.alert;
                message = (message && typeof message === 'string' ) ? JSON.parse(message) : message;
                if (message) {
                    DeviceEventEmitter.emit(Constants.EmitCode.NotificationOpen, message);
                }
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

        });
    }

    onIOSRemoteNotification = (_notification: any) => {
        // Alert.alert('onIOSRemoteNotification ', JSON.stringify(notification));
        PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }

    onIOSRegistered = (deviceToken: string) => {
        const { onGetTokenSuccess } = this.props;
        // Alert.alert('onIOSRegistered ', deviceToken);
        // console.log('onIOSRegistered ', deviceToken);
        if (this.isFirstToken && onGetTokenSuccess) {
            onGetTokenSuccess(deviceToken);
        }
        if (deviceToken) {
            this.isFirstToken = false;
        }
    }

    onRegistrationError = (error: any) => {
        console.log('onIOSRegistrationError ', error);
        const { onGetTokenFailed } = this.props;
        if (this.isFirstToken && onGetTokenFailed) {
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
