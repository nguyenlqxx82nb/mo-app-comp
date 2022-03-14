import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { CustomIcon, Color, CommonLanguage, Constants } from 'mo-app-common';
import { WrapText } from '../Text';
import { FormInput } from './FormInput';
// import PropTypes from 'prop-types';

export interface FormEditProps {
	label?: string;
	value?: string,
	validRequire?: boolean;
	emptyErrorMessage?: string;
	placeholder?: string;
	editStatus?: string;
	readOnly?: boolean;
	inputStyle?: any;
	formatType?: 'column' | 'row'; // Kieu hien thi hang hay cot
	editType: 'Input' | 'Dropdown' | 'Datepicker' | 'CCD'; // Kieu edit
	isUpdateType?: boolean;
	data?: Array<any>;
	item?: any;
	selectLabel?: string;
	validType?: 'text' | 'email' | 'phone' | 'number';
	onUpdate?: any;
	containerStyle: any;
	width?: number;
	dropdownLabel?: string;
	numberOfLines?: number;
	multiLine?: boolean;
	fieldType?: string;
	selectedKey?: string;
	items?: Array<any>;
	autoValidate?: boolean;
	enable?: boolean;
	onOpenDatepicker?: any;
	icon?: string;
	isPassword?: boolean;
	autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
}

export class FormEdit extends PureComponent<FormEditProps, any> {

	static defaultProps = {
		label: '',
		value: '',
		validRequire: true,
		emptyErrorMessage: '',
		placeholder: '',
		editStatus: false,
		readOnly: false,
		inputStyle: {},
		formatType: 'column', // 1: column, 2 : row
		editType: 'Input', // 1 Input, 2 Dropdown, 3 Datepicker, 4 CCD
		isUpdateType: false,
		data: [],
		item: null,
		selectLabel: '',
		validType: 'text', // 1: text, 2: email, 3: phone, 4: number
		onUpdate: () => null,
		containerStyle: {},
		width: Constants.Width,
		marginLeft: 0,
		dropdownLabel: '',
		numberOfLines: 1,
		multiLine: false,
		fieldType: '',
		selectedKey: '',
		items: [],
		autoValidate: true,
		autoCapitalize: 'sentences'
	};
	_item = null;
	inputEditRef: any;
	formEditRef: any;
	constructor(props: FormEditProps) {
		super(props);

		this.state = {
			value: this.props.value,
			editStatus: this.props.editStatus,
			error: false,
			data: this.props.data,
			enable: props.enable,
			selectedKey: props.selectedKey
		};

		this._item = this.props.item;
	}

	UNSAFE_componentWillReceiveProps(nextProps: any) {
		const { value } = this.props;
		if (nextProps.value && nextProps.value !== value) {
			// console.log('value ', value, ', nextProps ', nextProps.value);
			this.setValue(nextProps.value);
		}
	}

	changeEditStatus = (editStatus: boolean) => {
		this.setState({
			editStatus: editStatus
		});
	}

	getValue = () => {
		const { editType } = this.props;
		const { selectedKey } = this.state;
		if (editType === 'Input') // input edit
		{
			return this.inputEditRef.getValue();
		}
		if (editType === 'Dropdown') // dropdown edit
		{
			return this.formEditRef.getValue();
		}
		if (editType === 'Datepicker') // picker date
		{
			return this.state.value;
		}
		if (editType === 'CCD') {
			return selectedKey;
		}
		return this.state.value;
	}

	getValueByKey = () => {
		const { selectedKey } = this.state;
		const { items } = this.props;

		const resultItem = items && items.find((item: any) => {
			if (item.id === selectedKey) {
				return item;
			}
		});

		if (resultItem) {
			return resultItem.name || resultItem.value;
		}
		return '';
	}

	getSelectedItem = () => {
		const { selectedKey } = this.state;
		const { items } = this.props;

		const findItem = items && items.find((item: any) => {
			if (item.id === selectedKey) {
				return item;
			}
		});

		return findItem;
	}

	setValue = (value: any) => {
		// const { editType } = this.props;
		this.setState({ value: value });
		if (value && value.trim !== '') {
			this.setState({ error: false });
		}
	}

	getDisplayValue = () => {
		const { editType } = this.props;
		const { value } = this.state;
		// const value = (editStatus) ? this.state.value : this.props.value;
		const display = value ? value : CommonLanguage.Undefined;

		if (editType === 'CCD') {
			return this.getValueByKey();
		}

		return display;
	}

	validate = () => {
		const { validRequire, editType } = this.props;
		const { selectedKey, value } = this.state;
		if (editType === 'Input') // input edit
		{
			return this.inputEditRef.validate();
		}
		if (editType === 'Dropdown') // dropdown edit
		{
			return true;
		}
		if (editType === 'Datepicker') // picker date
		{
			if ((!value || value.trim() === '') && validRequire) {
				this.setState({ error: true });
			}
			else {
				this.setState({ error: false });
			}
			return true;
		}
		if (editType === 'CCD' && !selectedKey) {
			this.setState({ error: true });
			return;
		}
		this.setState({ error: false });
		return true;
	}

	setData = (data: any) => {
		this.setState({ data: data });
	}

	getLabel = () => {
		const { label, editType, fieldType } = this.props;
		if (editType !== 'CCD') {
			return label;
		}

		switch (fieldType) {
			case 'GPLX':
				return 'Giấy phép lại xe';
			case 'PASSPORT':
				return 'Hộ chiếu';
			case 'CMND':
				return 'Chứng minh nhân dân';
			case 'CCCD':
				return 'Căn cước công dân';
			case 'CMNDQD':
				return 'Chứng minh thư quân đội';
			default:
				return 'Số CMT/CCCN';
		}

	}

	onCityPressHandler = () => {
		// const { enable, selectedKey } = this.state;
		// const { items } = this.props;
		// if (!enable) {
		// 	return;
		// }
		// this.hideKeyboard();
		// const modal = {
		// 	content:
		// 		<ListModal
		// 			items={items}
		// 			selectedKey={selectedKey}
		// 			emptyMsg={'Vui lòng chọn tỉnh thành'}
		// 			onSelectItem={this.onSelectItemHandler} />
		// };
		// pushModal(modal);
		// return;
	}

	onSelectItemHandler = (selectedKey: any) => {
		this.setState({ selectedKey: selectedKey }, () => {
			this.validate();
		});
	}

	hideKeyboard = () => {
		Keyboard.dismiss();
	}

	render() {
		const {
			placeholder,
			emptyErrorMessage,
			formatType,
			isUpdateType,
			onUpdate,
			containerStyle,
			editType,
			validRequire,
			onOpenDatepicker,
			validType,
			// width,
			// marginLeft,
			// dropdownLabel,
			// currentItem,
			numberOfLines,
			multiLine,
			// selectedKey,
			readOnly,
			autoValidate,
			icon,
			isPassword,
			autoCapitalize
		} = this.props;

		const {
			value,
			error,
			// data,
			enable
		} = this.state;

		const label = this.getLabel();
		// const hasLabel = label ? true : false;
		// const hasIcon = icon ? true : false;
		// const valueByKey = this.getValueByKey();
		// const color = !valueByKey && !value ? Color.textSecondary : Color.text;
		if (!readOnly) {
			if (editType === 'Input') {
				return (
					<FormInput
						ref={comp => { this.inputEditRef = comp; }}
						// style={this.props.inputStyle}
						containerStyle={containerStyle}
						validRequire={validRequire}
						validType={validType}
						placeholder={placeholder}
						autoValidate={autoValidate}
						emptyErrorMessage={emptyErrorMessage}
						text={value}
						label={label}
						updateType={isUpdateType}
						onUpdate={onUpdate}
						multiLine={multiLine}
						icon={icon}
						enable={enable}
						autoCapitalize={autoCapitalize}
						isPassword={isPassword} />);
			}

			// if (editType === 2) // Drop down edit
			// {
			//     if (!enable) {
			//         return (
			//             <View style={[styles.container, containerStyle]}>
			//                 <WrapText type={'t-s'} textStyle={{ marginBottom: 8, lineHeight: 16, fontSize: 14 }}>{label}</WrapText>
			//                 <View style={[styles.wrapForm, styles.disableForm]}>
			//                     <WrapText type={'t'} textStyle={{ lineHeight: 16, fontSize: 14 }}>{value}</WrapText>
			//                 </View>
			//             </View>
			//         );
			//     }
			//     return (
			//         <View style={[styles.dropContainer, containerStyle]}>
			//             <WrapText type={'t-s'} textStyle={{ marginBottom: 8, lineHeight: 16 }}>{label}</WrapText>
			//             <Dropdown
			//                 ref={comp => { this.formEditRef = comp;}}
			//                 selectedKey={selectedKey}
			//                 width={width}
			//                 marginLeft={marginLeft}
			//                 currentItem={currentItem}
			//                 label={dropdownLabel}
			//                 data={data}
			//                 enable={enable}
			//             />
			//         </View>
			//     );
			// }

			if (editType === 'Datepicker') // Datepicker edit
			{
				if (!enable) {
					return (
						<View style={[styles.container, containerStyle]}>
							<WrapText f={'r'} st={{ marginBottom: 8 }}>{label}</WrapText>
							<View style={[styles.wrapForm, styles.disableForm]}>
								<WrapText>{value}</WrapText>
							</View>
						</View>
					);
				}
				return (
					<TouchableOpacity
						style={[styles.container, containerStyle, error ? { borderColor: Color.red } : {},]}
						onPress={enable ? onOpenDatepicker : null}>
						<WrapText f={'r'} st={{ marginBottom: 8 }}>{label}</WrapText>
						<View style={styles.wrapForm}>
							<WrapText>{value}</WrapText>
							<CustomIcon name="transaction-history" size={16} color={enable ? Color.text : Color.disable} />
						</View>
						{
							error &&
							<WrapText f={'r'} st={[{ marginTop: 5, color: Color.red },]}>{emptyErrorMessage}</WrapText>
						}
					</TouchableOpacity>
				);
			}

			if (editType === 'CCD') {
				if (!enable) {
					return (
						<View style={[styles.container, containerStyle]}>
							<WrapText f={'r'} st={{ marginBottom: 8 }}>{label}</WrapText>
							<View style={[styles.wrapForm, styles.disableForm]}>
								<WrapText>{value}</WrapText>
							</View>
						</View>
					);
				}
			}

			// if (editType === 5)
			// {
			//     return (
			//         <View style={[styles.container, containerStyle]}>
			//             { hasLabel && <WrapText type={'t-s'} textStyle={{ marginBottom: 8, lineHeight: 16, fontSize: 14 }}>{label}</WrapText>}
			//             <TouchableOpacity style={[styles.wrapForm, !enable ? styles.disableForm : {}]}
			//                 activeOpacity={0.99}
			//                 onPress={this.onCityPressHandler}>
			//                 {
			//                     hasIcon && <CustomIcon name={icon} size={15} style={{ color: color, marginRight: 12}}/>
			//                 }
			//                 <WrapText type={'label'} textStyle={{ lineHeight: 16, fontSize: 14, color: color }}>{valueByKey || placeholder}</WrapText>
			//             </TouchableOpacity>
			//             {
			//                 error &&
			//                 <WrapText type={'n'} textStyle={[{ marginTop: 5, lineHeight: 16, color: Color.red }]}>{emptyErrorMessage}</WrapText>
			//             }
			//         </View>
			//     );
			// }
		}

		if (formatType === 'column') {
			return (
				<View style={[styles.container, containerStyle]}>
					<WrapText f={'r'} st={styles.label}>{label}</WrapText>
					<WrapText nl={numberOfLines} f={'r'} st={styles.label}>{this.getDisplayValue()}</WrapText>
				</View>
			);
		}
		if (formatType === 'row') {
			return (
				<View style={[styles.container, styles.containerRow, containerStyle]}>
					<WrapText f={'r'} st={[styles.label, { width: '35%' }]}>{label}</WrapText>
					<WrapText st={[styles.label, { width: '65%' }]}>{this.getDisplayValue()}</WrapText>
				</View>
			);
		}

	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginBottom: 15,
	},
	dropContainer: {
		width: '100%',
		marginBottom: 15,
		paddingHorizontal: 15
	},
	containerRow: {
		flexDirection: 'row'
	},
	label: {
		paddingVertical: 4,
		lineHeight: 16,
		fontSize: 13,
		textAlign: 'left'
	},
	wrapForm: {
		borderRadius: 5,
		borderColor: Color.border,
		borderWidth: 1,
		height: 32,
		flexDirection: 'row',
		// justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 12,
		paddingRight: 6
	},
	disableForm: {
		backgroundColor: Color.disable
	}
});
