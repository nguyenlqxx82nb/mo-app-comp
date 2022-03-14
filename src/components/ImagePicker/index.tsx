import React, { PureComponent } from 'react';
import { View, Platform, PermissionsAndroid } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import ListView from '../ListView';
import { WrapButton } from '../Button/WrapButton';
import { Router } from '../Router/index';
import { Color, Constants, Styles, toast } from 'mo-app-common';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
import ImageItem from './Item';
import { ButtonRipple } from '../Button';
import { WrapText } from '../Text';

export interface ImageData {
	name?: string;
	type?: string;
	uri?: string;
	duration?: number;
	fileSize?: number;
}

export interface IImagePickerProps {
	cropping?: boolean;
	selectSingleItem?: boolean;
	ignoreMultiSelect?: boolean;
	onSelectImages?: (images: ImageData[]) => void;
}

export interface IImagePickerState {
	images?: ImageData[];
	noMore?: boolean;
}

export class ImagePickerScreen extends PureComponent<IImagePickerProps, IImagePickerState> {

	static defaultProps = {
		cropping: false,
		selectSingleItem: false,
		ignoreMultiSelect: false,
	};

	header: any;
	pageSize = 1000;
	listViewRef: ListView;

	constructor(props: IImagePickerProps) {
		super(props);
		this.state = {
			images: [],
			noMore: false
		};
	}

	componentDidMount() {
		this.requestPermissions();
	}

	requestPermissions = async () => {
		if (Platform.OS === 'ios' || (Platform.OS === 'android' && Platform.Version < 23)) {
			this.listViewRef.loadData();
			return;
		}
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				this.listViewRef.loadData();
			}
		} catch (err) { }
	};

	convertLocalIdentifierToAssetLibrary = (selected: any) => {
		const appleId = selected.node.image.uri.substring(5, 41);
		const fileNameLength = selected.node.image.filename.length;
		const ext = selected.node.image.filename.substring(fileNameLength - 3);
		return `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
	};

	onDoneHandler() {
		const { onSelectImages } = this.props;
		const { images } = this.state;
		if (onSelectImages) {
			onSelectImages(images);
		}
		this.back();
	}

	onOpenCameraHandler() {
		const { cropping } = this.props;
		ImagePicker.openCamera({
			width: 300,
			height: 300,
			cropping: cropping != null ? cropping : false
		}).then((image: any) => {
			const images = [image.path];
			this.setState({ images: images }, () => {
				this.onDoneHandler();
			});
		});
	}

	onLoadHandler = (page: number, pageSize: number, onLoadCompleted: any, lastCursor: any) => {
		let fetchParams: any = {
			first: this.pageSize,
			groupTypes: 'All',
			assetType: 'All',
			include: ['playableDuration', 'filename', 'fileSize']
		};

		if (Platform.OS === 'android') {
			// not supported in android
			delete fetchParams.groupTypes;
		}

		if (lastCursor) {
			fetchParams = { ...fetchParams, ...{ after: lastCursor } };
		}

		CameraRoll.getPhotos(fetchParams).then(data => {
			if (!data || !data.edges) {
				return;
			}
			if (Platform.OS === 'ios') {
				data.edges.forEach(edge => {
					if (!edge || !edge.node || !edge.node.image) {
						return;
					}
					edge.node.image.uri = this.convertLocalIdentifierToAssetLibrary(edge)
				});
			}
			onLoadCompleted(data.edges, data.page_info.end_cursor);
		},
			e => {
				toast('error ' + e);
			}
		);

		this.setState({ images: [] });
	};

	onLoadMoreHandler = (page: number, pageSize: number, onLoadMoreCompleted: any, lastCursor: any) => {
		let fetchParams: any = {
			first: this.pageSize,
			assetType: 'All',
			include: ['playableDuration', 'filename', 'fileSize']
		};

		if (Platform.OS === 'android') {
			// not supported in android
			delete fetchParams.groupTypes;
		}

		if (lastCursor) {
			fetchParams = { ...fetchParams, ...{ after: lastCursor } };
		}

		CameraRoll.getPhotos(fetchParams).then(
			data => {
				onLoadMoreCompleted(data.edges, data.page_info.end_cursor);
			},
			e => { toast('load more error = ' + e); }
		);
	};

	rowItemRenderer = (type: any, item: any, index: number) => {
		return (
			<ImageItem
				key={`${index}`}
				type={type}
				item={item}
				index={index}
				onPress={this.onImageItemPressHandler} />
		);
	};

	async singleSelectedHandler(item: any) {
		const { cropping } = this.props;
		const uri = item.node && item.node.image ? item.node.image.uri : '';
		const image: ImageData = {
			name: this.getImageName(item),
			type: item.node && item.node.type || 'image',
			uri: item.node && item.node.image ? item.node.image.uri : '',
			fileSize: item.node && item.node.image ? item.node.image.fileSize : 0,
		}

		// TODO
		if (cropping) {
			if (Platform.OS === 'ios') {
				// this.setState({uri: uri});
				ImagePicker.openCropper({
					path: uri,
					width: 300,
					height: 300,
					mediaType: 'photo',
					cropperChooseText: 'Chọn',
					cropperCancelText: 'Huỷ'
				}).then((image: any) => {
					const images = [image.path];
					this.setState({ images: images }, () => {
						this.onDoneHandler();
					});
				}).catch(() => { });
				return;
			}

			try {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					ImagePicker.openCropper({
						path: uri,
						width: 300,
						height: 300,
						mediaType: 'photo',
						cropperToolbarTitle: 'Sửa ảnh',
						cropperStatusBarColor: '#00B3C8',
						cropperActiveWidgetColor: '#00B3C8',
						cropperToolbarWidgetColor: '#454C4D'
					}).then((image: any) => {
						const images = [image.path];
						this.setState({ images: images }, () => {
							this.onDoneHandler();
						});
					}).catch(() => { });
				}
			} catch (err) { }
			return;
		}

		this.setState({ images: [image] }, () => {
			this.onDoneHandler();
		});
		return;
	}

	getImageName = (item: any) => {
		if (Platform.OS === 'ios') {
			return item.node && item.node.image ? item.node.image.filename : ''
		}
		const uri = item.node && item.node.image ? item.node.image.uri : '';
		const splits = uri.split('/');
		if (!splits || !splits.length) {
			return ''
		}
		return splits[splits.length - 1];
	}

	onImageItemPressHandler = (index: number, item: any) => {
		const { selectSingleItem } = this.props;
		if (selectSingleItem) {
			const { images } = this.state;
			if (images && images.length) {
				return;
			}
			return this.singleSelectedHandler(item);
		}
		if (!this.listViewRef) {
			return;
		}
		this.listViewRef.toggleActive(index);
		const activeItems = this.listViewRef.getActiveItems();
		const images: ImageData[] = [];
		activeItems.forEach((activeItem: any) => {
			const image: ImageData = {
				name: this.getImageName(activeItem),
				type: activeItem.node && activeItem.node.type || 'image',
				uri: activeItem.node && activeItem.node.image ? activeItem.node.image.uri : '',
				duration: activeItem.node && activeItem.node.image ? activeItem.node.image.playableDuration : '',
				fileSize: activeItem.node && activeItem.node.image ? activeItem.node.image.fileSize : 0,
			}
			images.push(image);
		});

		this.setState({ images: images });
	};

	onSelectImagesHandler = () => {
		const { onSelectImages } = this.props;
		const { images } = this.state;
		if (onSelectImages) {
			onSelectImages(images);
		}
		this.back();
	};

	onBackHandler = () => {
		this.back();
	};

	back = () => {
		Router.pop();
	};

	getSendButtonText = () => {
		const { images } = this.state;
		if (!images || !images.length) {
			return '';
		}
		if (images.length === 1) {
			if (images[0].type.includes('video')) {
				return `Gửi ${images.length} video`;
			}
			return `Gửi ${images.length} ảnh`;
		}

		const isContainVideo = images.find(image => image.type.includes('video'));
		const isContainImage = images.find(image => image.type.includes('image'));
		if (!isContainVideo) {
			return `Gửi ${images.length} ảnh`;
		}
		if (!isContainImage) {
			return `Gửi ${images.length} video`;
		}
		if (isContainVideo && isContainImage) {
			return `Gửi ${images.length} ảnh và video`;
		}

	}

	render() {
		const { images } = this.state;
		const rightHeaderButtons = [{ name: 'media_photo', action: this.onOpenCameraHandler }];
		const width = Constants.Width / 3 - 0.1;

		return (
			<View style={styles.container}>
				<View style={[Styles.Header, { paddingLeft: 5 }]}>
					<View style={[Styles.Row]}>
						<ButtonRipple name={'nav_back'} size={16} color={Color.text} onPress={this.onBackHandler} />
						<WrapText st={[Styles.Text_L_B, { marginLeft: 5 }]} onPress={this.onBackHandler}>{'Quay lại'}</WrapText>
					</View>
				</View>
				<ListView
					containerStyle={{ marginHorizontal: 0, paddingHorizontal: 0 }}
					ref={ref => (this.listViewRef = ref)}
					onLoadMore={this.onLoadMoreHandler}
					onLoad={this.onLoadHandler}
					onRenderRow={this.rowItemRenderer}
					hasExtendedState={true}
					// headerPaddingTop={Constants.HeaderHeight}
					wr={width}
					hr={width + 1}
					autoH={false}
					top={0}
					maxActive={10}
					autoLoad={false}
					hasRefreshControl={false} />

				{/* <Header
                    ref={comp => { this.header = comp;}}
                    rightButtons={rightHeaderButtons}
                    title={CommonLanguage.ImagePicker}
                    onBack={this.onBackHandler}/> */}
				{
					images.length > 0 &&
					<View style={[styles.sendButton, images.length > 0 ? { opacity: 1 } : {}]}>
						<WrapButton
							text={this.getSendButtonText()}
							textStyle={{ fontSize: 16 }}
							containerStyle={{ marginTop: 10 }}
							onPress={this.onSelectImagesHandler} />
					</View>
				}
			</View>
		);
	}
}
