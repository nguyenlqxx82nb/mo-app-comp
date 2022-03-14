import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Color, CustomIcon, Constants, CommonLanguage, pushModal } from 'mo-app-common';
import PasswordToggle from './PasswordToggle';
import { WrapText } from '../Text';
// import { RadioModal, DatePicker, ListModal, CccdModal } from '../index';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import moment from 'moment';

export enum InputType {
	text = 'text',
	radio = 'radio',
	phone = 'phone',
	email = 'email',
	cmt = 'cmt',
	date = 'date',
	list = 'list',
	name = 'name'
}

export enum KeyboardType {
	default = 'default',
	numeric = 'numeric',
	email = 'email-address',
	phone = 'phone-pad',
	ascii = 'ascii-capable',
	punctuation = 'numbers-and-punctuation',
	url = 'url',
	pad = 'number-pad',
	phonePad = 'name-phone-pad',
	decimalPad = 'decimal-pad',
	twitter = 'twitter',
	webSearch = 'web-search',
	visiblePass = 'visible-password',
}

export enum KeyType {
	done = 'done',
	go = 'go',
	next = 'next',
	search = 'search',
	send = 'send'
}

interface Props {
	placeHolder?: string;
	label?: string;
	text?: string;
	validType?: number;
	validRequire?: boolean;
	onSubmit?: any;
	onValueChanged?: any;
	emptyErrorMessage?: string;
	emailInvalidMessage?: string;
	minLengthMessage?: string;
	maxLengthMessage?: string;
	phoneInvalidMessage?: string;
	cmtInvalidMessage?: string;
	keyType?: KeyType;
	keyboardType: KeyboardType;
	icon?: string;
	password?: boolean;
	containerStyle?: any;
	isTogglePassword?: boolean;
	minLength?: number;
	maxLength?: number;
	textStyle?: any;
	theme?: string;
	type?: InputType;
	items?: Array<any>;
	onModalWillShow?: any;
	onModalClose?: any;
	selectedKey?: any;
	multiple?: boolean;
	cmtType?: string;
	value?: string;
	idKey?: string;
}

export class LoginInput extends React.PureComponent<Props, any> {

	input: any;
	textAreaRef: any;
	datePickerRef: any;
	selectedDate: any;

	static defaultProps = {
		placeHolder: '',
		label: '',
		text: '',
		validType: 1, // 1: text, 2: email, 3: phone
		validRequire: true,
		emptyErrorMessage: '',
		emailInvalidMessage: '',
		phoneInvalidMessage: '',
		keyType: KeyType.next,
		keyboardType: KeyboardType.default,
		icon: '',
		password: false,
		containerStyle: {},
		isTogglePassword: false,
		minLengthMessage: '',
		maxLengthMessage: '',
		textStyle: {},
		multiple: false,
		cmtType: 'CCCD',
		maxLength: 10000

	};
	constructor(props: Props) {
		super(props);

		this.state = {
			value: this.props.text,
			error: false,
			password: this.props.password,
			focus: false,
			radioModalVisible: false,
			selectedKey: this.props.selectedKey,
			datePickerVisible: false,
			cmtType: this.props.cmtType,
			cmtPlaceholder: this.getCmtPlaceholder(this.props.cmtType)
		};
	}

	onClearInputTextHandle = () => {
		this.setState({ value: '' });
	}

	onSubmitHandler = () => {
		const { value } = this.state;
		const { onSubmit } = this.props;

		if (onSubmit) {
			onSubmit(value);
		}
	}

	onValueEditHandler = (value: string) => {
		const { validType, type, onValueChanged } = this.props;
		if (validType === 3 || type === InputType.phone) {
			const regex = /^[0-9\b]+$/;
			if (!regex.test(value)) {
				this.setState({ value: value.slice(0, -1) });
			}
			this.setState({ value });
			return;
		}
		this.setState({ value });
		if (onValueChanged) {
			onValueChanged(value);
		}
	}

	focus = () => {
		this.input.focus();
	}

	validate = () => {
		const {
			type,
			cmtInvalidMessage,
			emailInvalidMessage,
			phoneInvalidMessage,
			minLength,
			maxLength,
			minLengthMessage,
			maxLengthMessage,
		} = this.props;

		Keyboard.dismiss();
		let value = this.getValue();
		value = value ? `${this.getValue()}` : undefined;
		if (this.checkValidate(value)) {
			return { error: false, message: '' };
		}

		if (!value || value.trim() === '') {
			return { message: this.getEmptyMessageError(), error: true };
		}
		if (minLength && value.trim().length < minLength) {
			return { message: minLengthMessage, error: true };
		}
		if (maxLength && value.trim().length > maxLength) {
			return { message: maxLengthMessage, error: true };
		}
		switch (type) {
			case InputType.email: // email
				return { message: emailInvalidMessage, error: true };
			case InputType.phone: // phone
				return { message: phoneInvalidMessage || CommonLanguage.PhoneNumberValid, error: true };
			case InputType.cmt: // cmt
				return { message: cmtInvalidMessage || 'Số CMT/CCCD không hợp lệ', error: true };
			default:
				return { message: '', error: true };
		}
	}

	getEmptyMessageError = () => {
		const { emptyErrorMessage, type } = this.props;
		if (emptyErrorMessage) {
			return emptyErrorMessage;
		}
		if (type === InputType.phone) {
			return CommonLanguage.PhoneEmpty;
		}
		if (type === InputType.email) {
			return CommonLanguage.EmailEmpty;
		}
		if (type === InputType.name) {
			return 'Vui lòng nhập họ và tên';
		}
		if (type === InputType.cmt) {
			return 'Vui lòng chọn giấy tờ định danh';
		}
		if (type === InputType.date) {
			return 'Vui lòng nhập ngày sinh';
		}
	}

	checkValidate = (value: string) => {
		const { minLength, maxLength, type, validRequire } = this.props;
		if (validRequire) {
			if (!value || value.trim() === '') {
				return false;
			}

			if (minLength && value.trim().length < minLength) {
				return false;
			}

			if (maxLength && value.trim().length > maxLength) {
				return false;
			}

			switch (type) {
				case InputType.email: // email
					return this.validateEmail(value);
				case InputType.phone: // phone
					return this.validatePhone(value);
				// case InputType.cmt: // id number
				//     return this.validateIdNumber(value);
				default:
					return true;
			}
		}
		return true;
	}

	validateEmail = (email: string) => {
		if (!email) {
			return false;
		}
		const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email.toLowerCase());
	}

	validatePhone = (phone: string) => {
		if (!phone) {
			return;
		}
		const re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
		return re.test(phone.toLowerCase());
	}

	/**
	 * validate id number
	 * @param id
	 */
	validateIdNumber = (id: string) => {
		// if (!/^[0-9]+$/.test(id)){
		//     return false;
		// }
		const length = id.length;
		if (length !== 9 && length !== 12) {
			return false;
		}
		return true;
	}

	getValue = () => {
		const { type, idKey } = this.props;
		const { selectedKey, value } = this.state;
		if (type === InputType.radio || type === InputType.list) {
			if (!selectedKey) {
				return undefined;
			}
			const item: any = this.getItemByKey(selectedKey);
			return item ? (idKey ? item[idKey] : (item.key || item.id)) : undefined;
		}
		if (type === InputType.date) {
			if (this.selectedDate) {
				const newVal = moment(this.selectedDate).local().format('DD-MM-YYYY'); // moment(value, 'YYYY-MM-DD');
				// console.log('getValue1 ', value, newVal);
				return newVal;
			}
			return undefined;
		}
		return value;
	}

	setValue = (value: string) => {
		this.setState({ value: value });
	}

	getStyleTheme = () => {
		const { focus, value } = this.state;
		const { theme } = this.props;

		let styleTheme = {
			backgroundColor: { backgroundColor: Color.border },
			placeholderColor: Color.textSecondary,
			iconColor: focus || value ? Color.text : Color.textSecondary,
			color: focus || value ? Color.text : Color.textSecondary
		};
		if (theme === 'blue') {
			styleTheme = {
				backgroundColor: { backgroundColor: focus || value ? '#fff' : '#94D8BC' },
				placeholderColor: focus ? Color.textSecondary : '#fff',
				iconColor: focus || value ? Color.text : '#fff',
				color: focus || value ? Color.text : '#fff'
			};
		}
		return styleTheme;
	}

	getCmtPlaceholder = (type: string = 'CCCD') => {
		switch (type) {
			case 'CCCD':
				return 'Nhập CCCD';
			case 'PASSPORT':
				return 'Nhập hộ chiếu';
			case 'CMND':
				return 'Nhập CMND';
			case 'CMNDQD':
				return 'Nhập CMNDQD';
			case 'GPLX':
				return 'Nhập GPLX';
			default:
				return 'Nhập số';
		}
	}

	onTogglePasswordHandle = (val: any) => {
		// console.log('onTogglePasswordHandle ', val);
		this.setState({ password: val });
	}

	onBlur = () => {
		this.setState({ focus: false });
	}

	onFocus = () => {
		this.setState({ focus: true });
	}

	onPressHandler = () => {
		const { type, items, emptyErrorMessage } = this.props;
		const { value, selectedKey, cmtType } = this.state;
		Keyboard.dismiss();
		// Radio
		// if (type === InputType.radio) {
		// 	const modal = {
		// 		content:
		// 			<RadioModal
		// 				items={items}
		// 				selectedKey={selectedKey}
		// 				onSelectItem={this.onSelectItemHandler} />
		// 	};
		// 	pushModal(modal);
		// 	return;
		// }
		// list
		// if (type === InputType.list) {
		// 	const modal = {
		// 		content:
		// 			<ListModal
		// 				items={items}
		// 				selectedKey={selectedKey}
		// 				emptyMsg={emptyErrorMessage}
		// 				onSelectItem={this.onSelectItemHandler} />
		// 	};
		// 	pushModal(modal);
		// 	return;
		// }
		// cmt
		// if (type === InputType.cmt) {
		// 	const modal = {
		// 		content:
		// 			<CccdModal
		// 				type={cmtType}
		// 				value={value}
		// 				emptyMsg={emptyErrorMessage}
		// 				onSelectItem={this.onSelectCmtItemHandler} />
		// 	};
		// 	pushModal(modal);
		// 	return;
		// }
		// Open DatePicker
		if (type === InputType.date) {
			const date = value && value !== '' ? moment(value, 'DD/MM/YYYY').toDate() : new Date(1980, 0, 1);
			const options = {
				date: date,
				minDate: new Date('01/01/1900'), //To restirct past date
				maxDate: new Date()
			};
			// const modal = {
			// 	content:
			// 		<DatePicker
			// 			ref={(comp: any) => { this.datePickerRef = comp; }}
			// 			options={options}
			// 			onDatePicked={this.onDatePickedHandler}
			// 			onCancel={this.onDatePickerCancelHandler}
			// 		/>
			// };
			// pushModal(modal);
			return;
		}
	}

	onSelectItemHandler = (selectedKey: any) => {
		this.setState({ selectedKey: selectedKey });
	}

	onSelectCmtItemHandler = (type: string, value: string) => {
		// console.log('onSelectCmtItemHandler ', type, value);
		this.setState({ value: value, cmtType: type });
	}

	onDatePickedHandler = (date: any) => {
		const _date = moment.utc(date).local().format('DD/MM/YYYY');
		this.selectedDate = date;
		this.setState({ value: _date, datePickerVisible: false });
	}

	onDatePickerCancelHandler = () => {
		this.setState({ datePickerVisible: false });
	}

	getItemByKey = (key: string) => {
		const { items, idKey } = this.props;
		if (!key || !items) {
			return undefined;
		}

		let currItem;
		items.forEach(item => {
			if (idKey ? item[idKey] : (item.key || item.id) === key) {
				currItem = item;
			}
		});

		return currItem;
	}

	getCmtType = () => {
		const { cmtType } = this.state;
		return cmtType;
	}

	render() {
		const {
			placeHolder,
			keyType,
			keyboardType,
			icon,
			containerStyle,
			isTogglePassword,
			textStyle,
			type,
			multiple,
			maxLength
		} = this.props;

		const { value, password, selectedKey } = this.state;
		const styleTheme = this.getStyleTheme();
		const currItem: any = this.getItemByKey(selectedKey);

		const fontSize = Constants.TextSize === 1 ? 12 : 14;

		if (multiple) {
			return (
				<View style={[styles.textAreaContainer, containerStyle]}>
					<AutoGrowingTextInput
						style={[styles.textArea, { fontSize: fontSize, lineHeight: fontSize + 4 }]}
						underlineColorAndroid="transparent"
						placeholderTextColor={Color.textSecondary}
						ref={(comp: any) => { this.textAreaRef = comp; }}
						placeholder={placeHolder}
						onChangeText={this.onValueEditHandler}
						onSubmitEditing={this.onSubmitHandler}
						returnKeyType="next"
						maxLength={maxLength}
						value={value} />
				</View>
			);
		}

		return (
			<View style={[styles.inputWrap, { borderRadius: 5, paddingHorizontal: 12 }, styleTheme.backgroundColor, containerStyle]}>
				{icon !== '' &&
					<CustomIcon style={{ marginRight: 10 }}
						name={icon}
						size={20}
						color={currItem ? Color.text : styleTheme.iconColor}
					/>
				}
				{
					(type !== InputType.radio && type !== InputType.date && type !== InputType.list && type !== InputType.cmt) &&
					<TextInput
						style={[styles.input, textStyle, { color: styleTheme.color }]}
						underlineColorAndroid="transparent"
						placeholderTextColor={styleTheme.placeholderColor}
						ref={(comp) => (this.input = comp)}
						onBlur={() => this.onBlur()}
						onFocus={() => this.onFocus()}
						placeholder={placeHolder}
						onChangeText={this.onValueEditHandler}
						onSubmitEditing={this.onSubmitHandler}
						keyboardType={keyboardType}
						returnKeyType={keyType}
						value={value}
						maxLength={maxLength}
						secureTextEntry={password} />
				}
				{
					(type === InputType.radio || type === InputType.list) &&
					<TouchableOpacity
						style={styles.input}
						onPress={this.onPressHandler}>
						<WrapText st={{ color: currItem ? Color.text : styleTheme.color }}>{currItem ? currItem.name : placeHolder}</WrapText>
					</TouchableOpacity>
				}
				{
					(type === InputType.cmt) &&
					<TouchableOpacity
						style={styles.input}
						onPress={this.onPressHandler}>
						<WrapText st={{ color: value ? Color.text : styleTheme.color }}>{value ? value : 'Chọn giấy tờ định danh'}</WrapText>
					</TouchableOpacity>
				}
				{
					type === InputType.date &&
					<TouchableOpacity
						style={styles.input}
						onPress={this.onPressHandler}>
						<WrapText st={{ color: value ? Color.text : styleTheme.color }}>{value || placeHolder}</WrapText>
					</TouchableOpacity>
				}
				{
					isTogglePassword && <PasswordToggle color={styleTheme.iconColor} onActive={this.onTogglePasswordHandle} />
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		// borderBottomWidth: 1,
		marginTop: 20,
	},

	input: {
		color: Color.text,
		height: 40,
		marginLeft: 0,
		paddingHorizontal: 0,
		paddingTop: 0,
		paddingBottom: 0,
		flex: 1,
		textAlign: 'left',
		fontFamily: Constants.fontMedium,
		fontSize: 14,
		justifyContent: 'center'
	},

	textAreaContainer: {
		paddingTop: 12,
		padding: 12,
		borderWidth: 1,
		borderColor: Color.border,
		borderRadius: 6,
		minHeight: 120,
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexWrap: 'wrap'
	},
	textArea: {
		padding: 0,
		paddingTop: 0,
		margin: 0,
		width: '100%',
		fontFamily: Constants.fontRegular,
		color: Color.text
	}

});

