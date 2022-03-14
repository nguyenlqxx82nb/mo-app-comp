import React from 'react';
import { Dimensions, } from 'react-native';
import HTMLRender from 'react-native-render-html';
import AutoHeightImage from 'react-native-auto-height-image';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import styles from './styles';
import _ from 'lodash';
import { Constants } from 'mo-app-common';


const { width } = Dimensions.get('window');
const tags = _.without(IGNORED_TAGS,
	'table', 'caption', 'col', 'colgroup', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'
);

const renderers = {
	img: (htmlAttribs: any) => {
		const { src } = htmlAttribs;
		if (!src) {
			return false;
		}
		const newWidth = width - 28;
		return (
			<AutoHeightImage source={{ uri: src }} width={newWidth} />
		);
	},
};

export default class WrapHTMLRender extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const { html } = this.props;
		let textSize = {};
		if (Constants.TextSize === 2) {
			textSize = { fontSize: 15, lineHeight: 19 };
		}
		return (
			<HTMLRender
				html={html}
				ignoredTags={tags}
				ignoredStyles={['font-family', 'display', 'block', 'font-size']}
				renderers={renderers}
				imagesMaxWidth={Dimensions.get('window').width - 28}
				tagsStyles={{
					p: { ...styles.descText, ...textSize }
				}}
			/>
		);
	}
}