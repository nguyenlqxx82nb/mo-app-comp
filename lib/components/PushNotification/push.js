"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_push_notification_1 = __importDefault(require("react-native-push-notification"));
const push_notification_ios_1 = __importDefault(require("@react-native-community/push-notification-ios"));
const react_native_2 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
class MyPushNotification extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.registerPushNotification = () => {
            this.registerIOS();
        };
        this.registerIOS = async () => {
            console.log('registerIOS ');
            push_notification_ios_1.default.requestPermissions().then((data) => {
                console.log('requestPermissions IOS ', data);
            }, (error) => {
                console.log('requestPermissions IOS error ', error);
            });
            push_notification_ios_1.default.addEventListener('registrationError', this.onRegistrationError);
            push_notification_ios_1.default.addEventListener('register', this.onIOSRegistered);
            push_notification_ios_1.default.addEventListener('notification', this.onIOSRemoteNotification);
            push_notification_ios_1.default.getInitialNotification().then(notification => {
                if (!notification) {
                    return;
                }
            });
            react_native_push_notification_1.default.configure({
                onNotification: function (notification) {
                    let message = (notification.data && notification.data.alert) || notification.alert;
                    message = (message && typeof message === 'string') ? JSON.parse(message) : message;
                    if (message) {
                        react_native_2.DeviceEventEmitter.emit(mo_app_common_1.Constants.EmitCode.NotificationOpen, message);
                    }
                    notification.finish(push_notification_ios_1.default.FetchResult.NoData);
                },
            });
        };
        this.onIOSRemoteNotification = (_notification) => {
            // Alert.alert('onIOSRemoteNotification ', JSON.stringify(notification));
            push_notification_ios_1.default.setApplicationIconBadgeNumber(0);
        };
        this.onIOSRegistered = (deviceToken) => {
            const { onGetTokenSuccess } = this.props;
            // Alert.alert('onIOSRegistered ', deviceToken);
            // console.log('onIOSRegistered ', deviceToken);
            if (this.isFirstToken && onGetTokenSuccess) {
                onGetTokenSuccess(deviceToken);
            }
            if (deviceToken) {
                this.isFirstToken = false;
            }
        };
        this.onRegistrationError = (error) => {
            console.log('onIOSRegistrationError ', error);
            const { onGetTokenFailed } = this.props;
            if (this.isFirstToken && onGetTokenFailed) {
                onGetTokenFailed();
            }
        };
        this.onDisplayNotification = (notification) => {
            // const { notification , data } = message;
            // console.log('onDisplayNotification ', notification);
            react_native_push_notification_1.default.localNotification({
                title: notification.title,
                message: notification.body || notification.message,
                userInfo: notification.data
            });
        };
        this.isFirstToken = true;
    }
    componentDidMount() { }
    componentWillUnmount() {
        push_notification_ios_1.default.removeAllDeliveredNotifications();
    }
    render() {
        return <react_native_1.View />;
    }
}
exports.default = MyPushNotification;
//# sourceMappingURL=push.js.map