import { Color, Constants, CustomIcon, pushModal, Styles } from "mo-app-common";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { NotificationModal } from "../Modal";
import { WrapText } from "../Text";
import ButtonRipple from '../Button/ButtonRipple';

interface ITooltipProps {
	iconName?: string;
	iconColor?: string;
	text?: string;
	textColor?: string;
	tooltipContent: string,
	tooltipTitle: string,
	onTextTooltipPress?: () => void;
	onIconTooltipPress?: () => void;
}

interface ITooltipState {

}

export default class Tooltip extends React.PureComponent<ITooltipProps, ITooltipState> {
	static defaultProps: ITooltipProps = {
		iconName: 'tooltip',
		iconColor: Color.text,
		text: '',
		textColor: Color.textSecondary,
		tooltipContent: '',
		tooltipTitle: '',
	}

	constructor(props: any) {
		super(props);
	}

	handleToolTipPress = () => {
		const { tooltipContent, tooltipTitle, onIconTooltipPress } = this.props;
		const modal = {
			content: <NotificationModal
				content={tooltipContent}
				iconName={'error_connection'}
				iconColor={Color.red}
				autoOpen={true}
				overlayClose={false}
				texAlign={'left'}
				title={tooltipTitle}
				ignoreIcon={true}
				textAlign={'left'}
				titleTextAlign={'left'}
				contentColor={Color.textSecondary}
				wrapperPaddingTop={20}
				wrapperBorderRadius={20}
				contentFontFamily={Constants.fontRegular}
				buttons={[{ name: 'Đóng' }]} />
		};
		pushModal(modal);
		onIconTooltipPress && onIconTooltipPress();
	}

	render() {
		const { iconName, iconColor, text, textColor, onTextTooltipPress } = this.props;
		return (
			<View style={[Styles.Row]}>
				{
					!!text && <WrapText st={Styles.Text_M_R} c={textColor} styles={{}} onPress={onTextTooltipPress}>{text}</WrapText>
				}

				<ButtonRipple
					onPress={this.handleToolTipPress}
					name={iconName}
					color={iconColor}
					size={14}
					width={30}
					height={30}
				/>
				{/* <TouchableOpacity activeOpacity={1} onPress={this.handleToolTipPress}>
                    <CustomIcon name={iconName} size={14} color={iconColor} />
                </TouchableOpacity> */}
			</View>
		);
	}
}