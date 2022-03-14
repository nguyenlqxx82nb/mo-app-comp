"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const messaging_1 = __importDefault(require("@react-native-firebase/messaging"));
const react_native_push_notification_1 = __importDefault(require("react-native-push-notification"));
const react_native_2 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
class MyPushNotification extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.registerPushNotification = () => {
            this.registerAndroid();
        };
        this.registerAndroid = async () => {
            // check permission
            await this.checkPermission();
            this.onmessage = messaging_1.default().onMessage(async (message) => {
                react_native_2.DeviceEventEmitter.emit(mo_app_common_1.Constants.EmitCode.PushNotification, message && message.data ? message.data.alert : undefined);
            });
            messaging_1.default().setBackgroundMessageHandler(async (remoteMessage) => {
                // console.log('setBackgroundMessageHandler ', remoteMessage);
                react_native_2.DeviceEventEmitter.emit(mo_app_common_1.Constants.EmitCode.PushNotification, remoteMessage && remoteMessage.data ? remoteMessage.data.alert : undefined);
            });
            react_native_push_notification_1.default.configure({
                onNotification: (notification) => {
                    // console.log('PushNotification onNotification ', notification);
                    if (notification.userInteraction || !notification.foreground) {
                        const message = (notification.userInfo && notification.userInfo.alert) || notification.alert;
                        if (message) {
                            react_native_2.DeviceEventEmitter.emit(mo_app_common_1.Constants.EmitCode.NotificationOpen, message && (typeof message === 'string' ? JSON.parse(message) : message));
                        }
                        return;
                    }
                    this.onDisplayNotification(notification);
                },
                requestPermissions: true,
            });
        };
        this.checkPermission = async () => {
            const isAutoInitEnabled = await messaging_1.default().hasPermission();
            // console.log('checkPermission ', isAutoInitEnabled);
            if (isAutoInitEnabled) {
                this.getToken();
                return;
            }
            await this.requestPermission();
        };
        this.getToken = async () => {
            const { onGetTokenSuccess } = this.props;
            const token = await messaging_1.default().getToken();
            console.log('getToken ', token);
            if (onGetTokenSuccess) {
                onGetTokenSuccess(token);
            }
            return token;
        };
        this.requestPermission = async () => {
            const { onGetTokenFailed } = this.props;
            const authStatus = await messaging_1.default().requestPermission();
            if (authStatus) {
                this.getToken();
                return;
            }
            if (onGetTokenFailed) {
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
        if (this.onmessage) {
            this.onmessage();
        }
    }
    render() {
        return <react_native_1.View />;
    }
}
exports.default = MyPushNotification;
//# sourceMappingURL=index.android.js.map