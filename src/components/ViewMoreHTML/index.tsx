import React from 'react';
import { View, Dimensions, TouchableOpacity, TextStyle } from 'react-native';
import { CommonLanguage, Color, Styles } from 'mo-app-common';
import WrapHTMLRender from '../Html';
import { WrapTextLink, WrapText, WrapMultiLineText } from '../Text';
import styles from './styles';

const { width } = Dimensions.get('window');

interface IViewMoreHtmlProps {
	textHTML?: string;
	text?: string;
	minHeight: number;
	minNumberLines: number;
	textStyle?: any,
	textMoreStyle?: any;
	searchWords?: string[];
	highlightStyle?: TextStyle; // use highlight word
	ignoreShowMore?: boolean; // use highlight word
	onCopy?: (link?: string) => void; // press text
	onPress?: () => void; // press text
	onLongPress?: () => void; // press text
}

interface IViewMoreHtmlState {
	shouldShowMore: boolean;
	textMore: boolean; // true: Rút gọn -- false: Xem thêm 
	textHTML?: string;
	text?: string;
	maxHeight: number;

}

class ViewMoreHTML extends React.PureComponent<IViewMoreHtmlProps, IViewMoreHtmlState> {
	static defaultProps = {
		minHeight: 49,
		minNumberLines: 3,

	}
	constructor(props: IViewMoreHtmlProps) {
		super(props);
		this.state = {
			shouldShowMore: false,
			textMore: true,
			text: props.text,
			textHTML: props.textHTML,
			maxHeight: props.minHeight 
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps: IViewMoreHtmlProps) {
		const { text, textHTML } = this.state;
		if (nextProps && (nextProps.text !== text || nextProps.textHTML !== textHTML)) {
			this.setState({
				text: nextProps.text,
				textHTML: nextProps.textHTML,
				shouldShowMore: false,
				textMore: true,
			})
		}
	}

	onLayout = (event: any) => {
		const { minHeight } = this.props;
		const { shouldShowMore } = this.state;
		const { height } = event.nativeEvent.layout;
		if (shouldShowMore) {
			return;
		}
		if (height >= minHeight - 1) {
			this.setState({
				textMore: false,
				shouldShowMore: true
			});
			return;
		}
	}

	onPressSeeMore = () => {
		const { textMore } = this.state;
		this.setState({
			textMore: !textMore,
			maxHeight: 10000
		});
	}

	render() {
		const { minHeight, textStyle, textMoreStyle, searchWords, highlightStyle, ignoreShowMore, onCopy, onPress, onLongPress } = this.props;
		const { shouldShowMore, textMore, text, textHTML, maxHeight } = this.state;
		const isTextHtml = textHTML ? true : false;
		const _textStyle = textStyle || [Styles.Text_S_R, { flex: 1, textAlign: 'justify', marginBottom: 10 }];
		const _textMoreStyle = textMoreStyle || [Styles.Text_M_R, { color: Color.primary, marginBottom: 10, marginTop: 10 }];
		if (!text || !text.trim() || !text.trim().length) {
			return null;
		}
		return (
			<View>
				{
					!isTextHtml && text && text.length && (
						<View style={{ maxHeight: textMore ? maxHeight : minHeight, overflow: 'hidden'}} onLayout={this.onLayout}>
							<WrapMultiLineText 
								st={_textStyle} 
								nl={100}
								searchWords={searchWords}
								highlightStyle={highlightStyle}
								onCopy={onCopy && onCopy}
								onPress={onPress && onPress}
								onLongPress={onLongPress && onLongPress}
								onLayout={this.onLayout}>{text}</WrapMultiLineText>
						</View>
					)
				}
				{
					isTextHtml &&
					<View style={{ maxHeight: textMore ? maxHeight : minHeight, overflow: 'hidden', width: width - 28, marginBottom: 5 }} onLayout={this.onLayout}>
						<WrapHTMLRender html={textHTML} />
					</View>
				}

				{
					shouldShowMore && !ignoreShowMore ?
						<TouchableOpacity style={styles.buttonContainer}
							onPress={this.onPressSeeMore}>
							<WrapText st={_textMoreStyle} >{textMore ? CommonLanguage.Compact : CommonLanguage.ViewMore}</WrapText>
						</TouchableOpacity> : <View />
				}
			</View>
		);
	}
}

export default ViewMoreHTML;

