"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../../index");
// import { WebViewScreen } from '@screen/app/WebView';
class ModalContainer extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.doShowNotAccountModal = () => {
            const modal = {
                content: <index_1.NotificationModal content={'Bạn cần đăng nhập hoặc đăng ký tài khoản để sử dụng chức năng này'} iconName={'no_result'} iconColor={mo_app_common_1.Color.textSecondary} autoOpen={true} overlayClose={false} onOk={this.onOkButtonPressHandler} buttons={[{ name: 'Đăng nhập' }, { name: 'Huỷ bỏ' }]}/>
            };
            mo_app_common_1.pushModal(modal);
        };
        this.showPushNotificationModal = (title, content, textAlign, link) => {
            const modal = {
                content: <index_1.NotificationModal content={content} title={title} iconName={'warning_popup'} iconColor={mo_app_common_1.Color.primary} autoOpen={true} overlayClose={false} link={link} textAlign={textAlign} buttons={[{ name: 'Đóng' }]}/>
            };
            mo_app_common_1.pushModal(modal);
        };
        this.showNotificationModal = (items, title, link) => {
            const modal = {
                content: <index_1.NotificationModal items={items} title={title} link={link} iconName={'warning_popup'} iconColor={mo_app_common_1.Color.primary} autoOpen={true} overlayClose={false} buttons={[{ name: 'Đóng' }]} onGotoLink={this.onGotoLinkHandler}/>
            };
            mo_app_common_1.pushModal(modal);
        };
        this.showUpdateAppModal = () => {
            const modal = {
                content: <index_1.NotificationModal content={'Ứng dụng đã có phiên bản mới. Bạn có muốn cập nhật ngay không ?'} iconName={'warning_popup'} iconColor={mo_app_common_1.Color.red} autoOpen={true} overlayClose={false} onOk={this.onOkUpdateVersionHandler} buttons={[{ name: 'Cập nhật' }, { name: 'Nhắc tôi sau' }]}/>
            };
            mo_app_common_1.pushModal(modal);
        };
        this.onOkButtonPressHandler = () => {
            setTimeout(() => {
                mo_app_common_1.logout(null);
            }, 250);
        };
        this.onGotoLinkHandler = (_link) => {
            // Router.push(<WebViewScreen title={'Liên kết trang ngoài'} uri={link} />);
        };
        const modalList = [];
        this.state = {
            modalList: modalList,
        };
        this.renderModal = this.renderModal.bind(this);
    }
    componentDidMount() {
        this.modalListener = react_native_1.DeviceEventEmitter.addListener(mo_app_common_1.Constants.EmitCode.PushModal, this.doPushModal.bind(this));
        this.popModalListener = react_native_1.DeviceEventEmitter.addListener(mo_app_common_1.Constants.EmitCode.PopModal, this.doPopModal.bind(this));
        this.notAccountListener = react_native_1.DeviceEventEmitter.addListener(mo_app_common_1.Constants.EmitCode.ShowNotAccount, this.doShowNotAccountModal.bind(this));
        this.updateAppListener = react_native_1.DeviceEventEmitter.addListener(mo_app_common_1.Constants.EmitCode.UpdateVersion, this.showUpdateAppModal.bind(this));
        // this.showNotificationListener = DeviceEventEmitter.addListener(Constants.EmitCode.ShowNotificationModal, this.showNotificationModal);
    }
    componentWillUnmount() {
        this.modalListener && this.modalListener.remove();
        this.popModalListener && this.popModalListener.remove();
        this.notAccountListener && this.notAccountListener.remove();
        this.updateAppListener && this.updateAppListener.remove();
        this.showNotificationListener && this.showNotificationListener.remove();
    }
    doPushModal(modal) {
        const { modalList } = this.state;
        let newList = (modalList || []);
        newList = [...newList, modal];
        this.setState({
            modalList: newList
        });
    }
    doPopModal() {
        const { modalList } = this.state;
        this.setState({
            modalList: modalList ? [] : modalList.pop()
        });
    }
    onOkUpdateVersionHandler() {
        if (react_native_1.Platform.OS === 'android') {
            // Linking.openURL('market://details?id=com.mobio.sakuko.loyalty');
            return;
        }
        // Linking.openURL('itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8');
    }
    render() {
        const { modalList } = this.state;
        if (modalList && modalList.length) {
            return (modalList.map((modal, _index) => {
                return modal.content;
            }));
        }
        return (<react_native_1.View />);
    }
    renderModal(modal, _index) {
        const content = modal ? modal.content : <react_native_1.View />;
        return content;
    }
}
exports.default = ModalContainer;
//# sourceMappingURL=index.js.map