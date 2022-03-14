import React from 'react';
import { View, DeviceEventEmitter } from 'react-native';
import { Constants } from 'mo-app-common';

interface IModalContainerState {
	modalList: IModal[]
}

export interface IModal {
	content: any;
	isNotification?: boolean;
}

export const pushModal = (modal: IModal) => {
	Constants.ModalShowing = true;
	DeviceEventEmitter.emit(Constants.EmitCode.PushModal, modal);
};

export default class ModalContainer extends React.PureComponent<any, IModalContainerState> {

	modalListener: any;
	popModalListener: any;
	closeModalListener: any;
	// notAccountListener: any;
	// updateAppListener: any;
	// showNotificationListener: any;

	constructor(props: any) {
		super(props);
		this.state = {
			modalList: [],
		};
		this.renderModal = this.renderModal.bind(this);
	}

	componentDidMount() {
		this.modalListener = DeviceEventEmitter.addListener(Constants.EmitCode.PushModal, this.doPushModal.bind(this));
		this.popModalListener = DeviceEventEmitter.addListener(Constants.EmitCode.PopModal, this.doPopModal.bind(this));
		this.closeModalListener = DeviceEventEmitter.addListener(Constants.EmitCode.CLOSE_MODAL, this.popOnlyModalHandler.bind(this));
		// this.notAccountListener = DeviceEventEmitter.addListener(Constants.EmitCode.ShowNotAccount, this.doShowNotAccountModal.bind(this));
		// this.updateAppListener = DeviceEventEmitter.addListener(Constants.EmitCode.UpdateVersion, this.showUpdateAppModal.bind(this));
		// this.showNotificationListener = DeviceEventEmitter.addListener(Constants.EmitCode.ShowNotificationModal, this.showNotificationModal);
	}

	componentWillUnmount() {
		this.modalListener && this.modalListener.remove();
		this.popModalListener && this.popModalListener.remove();
		this.closeModalListener && this.closeModalListener.remove(); 
		// this.notAccountListener && this.notAccountListener.remove();
		// this.updateAppListener && this.updateAppListener.remove();
		// this.showNotificationListener && this.showNotificationListener.remove();
	}

	doPushModal(modal: IModal) {
		const { modalList } = this.state;
		modalList.push(modal);
		this.setState({
			modalList: modalList
		}, () => {
			this.forceUpdate();
		});
	}

	doPopModal() {
		const { modalList } = this.state;
		if (!modalList.length) {
			return;
		}
		Constants.ModalShowing = false;
		modalList.pop();
		this.setState({modalList: modalList}, 
		() => {
			this.forceUpdate();
		});
	}

	popOnlyModalHandler = () => {
		const { modalList } = this.state;
		if (!modalList.length) {
			return;
		}

		if (modalList[modalList.length - 1].isNotification) {
			return;
		}
		this.doPopModal();
	}

	// showNotificationModal = (items: Array<any>, title: string, link: Array<string>) => {
	// 	const modal = {
	// 		content: <NotificationModal
	// 			items={items}
	// 			title={title}
	// 			link={link}
	// 			iconName={'warning_popup'}
	// 			iconColor={Color.primary}
	// 			autoOpen={true}
	// 			overlayClose={false}
	// 			buttons={[{ name: 'Đóng' }]}
	// 			onGotoLink={this.onGotoLinkHandler}
	// 		/>
	// 	};
	// 	pushModal(modal);
	// }


	// onOkButtonPressHandler = () => {
	// 	setTimeout(() => {
	// 		logout(null);
	// 	}, 250);
	// }

	// onGotoLinkHandler = (_link: string) => {
	// 	// Router.push(<WebViewScreen title={'Liên kết trang ngoài'} uri={link} />);
	// }

	render() {
		const { modalList } = this.state;
		if (modalList && modalList.length) {
			return (
				modalList.map((modal: any, _index: number) => {
					return modal.content;
				})
			);
		}
		return (<View />);
	}

	renderModal(modal: any, _index: number) {
		const content = modal ? modal.content : <View />;
		return content;
	}
}


