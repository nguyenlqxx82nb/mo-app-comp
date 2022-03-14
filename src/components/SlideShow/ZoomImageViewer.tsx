
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Keyboard, StatusBar } from 'react-native';
import ImageViewer from './ImageZoomViewer/src';
import { ButtonRipple } from '../Button';
import { WrapModal } from '../Modal';
import styles from './styles';
import { Color } from 'mo-app-common';

export default class ZoomImageViewer extends PureComponent<any, any> {

	static propTypes = {
		images: PropTypes.array,
		index: PropTypes.number,
		autoOpen: PropTypes.bool
	};

	static defaultProps = {
		images: [],
		index: 0,
		autoOpen: false
	}

	_images = [];
	modalRef: any;

	constructor(props: any) {
		super(props);
		const { index } = this.props;
		this.state = {
			index: index,
		};
	}

	componentDidMount() {
		const { images } = this.props;
		this.setImages(images, 0);
		setTimeout(() => {
			Keyboard.dismiss();
		}, 10);
	}

	setImages = (images, index) => {
		let convertImages = [];
		if (images) {
			for (let i = 0; i < images.length; i++) {
				let item = {
					url: images[i],
					props: {
					},
					freeHeight: true
				};
				convertImages.push(item);
			}

			this.setState({ images: convertImages, index: index });
		}
	}

	open = (images = null, index) => {
		if (images) {
			this.setImages(images, index);
		}
		this.modalRef.open();
	}

	hide = () => {
		if (this.modalRef) {
			this.modalRef.close();
		}
	}

	_renderFooter = (currentIndex) => {
		const { images } = this.state;
		if (images) {
			return (
				<View style={styles.viewFooter}>
					{images.map((_image, index) => {
						return (
							<View style={[
								{ backgroundColor: (index === currentIndex) || (currentIndex === -1 && index === 0) ? Color.primary : '#fff' },
								styles.viewFooternumbel
							]} />
						);
					})}
				</View>
			);
		}
	}

	render() {
		const { autoOpen, index } = this.props;
		const { images } = this.state;
		return (
			<WrapModal
				ref={comp => { this.modalRef = comp; }}
				overlayOpacity={0.95}
				autoOpen={autoOpen}>
				<View style={styles.contentContainer}>
					<ImageViewer
						imageUrls={images}
						index={index}
						backgroundColor={'transparent'}
						renderFooter={this._renderFooter}
						saveToLocalByLongPress={false}
						enableSwipeDown={true} />

					<View style={styles.buttonBack}>
						<ButtonRipple
							name={'close'}
							size={20}
							color={'#fff'}
							onPress={() => {
								this.hide();
							}}
						/>
					</View>
					<StatusBar
						backgroundColor="transparent" 
						barStyle={'light-content'}
          />
				</View>

			</WrapModal>
		);
	}
}

