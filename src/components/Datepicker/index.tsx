import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Color, Device, Styles, toast } from 'mo-app-common';
import { WrapText } from '../Text';
import WrapModal from '../Modal/WrapModal';
import { View, Platform, ViewStyle} from 'react-native';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';
import ButtonRipple from '../Button/ButtonRipple';
import styles from './styles';
import moment from 'moment';

interface IDatePickerModalProps {
  date: any;
  minDate?: any;
  maxDate?: any;
  onClose?: () => void;
  onCancel?: () => void;
  onDatePicked?: (date: any) => void;
  containerStyle?: ViewStyle | ViewStyle[];
}

interface IDatePickerModalSate {
  date: any;
  minDate?: any;
  maxDate?: any;
  datePickerVisible: boolean;
}
export default class DatePickerModal extends PureComponent<IDatePickerModalProps, IDatePickerModalSate> {

  modalRef: WrapModal;
  constructor(props: IDatePickerModalProps) {
    super(props);
    const { date, minDate, maxDate } = this.props;
    this.state = {
      date: date,
      minDate: minDate,
      maxDate: maxDate,
      datePickerVisible: false
    };
  }

  static propTypes = {
    /**
     * Date picked handler.
     *
     * This is called when the user selected the date from picker
     * The first and only argument is a Date object representing the picked
     * date and time.
     */
    onDatePicked: PropTypes.func,

    /**
     * Date Cancelled handler.
     *
     * This is called when the user dismissed the picker.
     */
    onCancel: PropTypes.func,

    /**
    * Ok button label
    */
    okLabel: PropTypes.string,

    /**
    * Cancel button label
    */
    cancelLabel: PropTypes.string,

    locale: PropTypes.string,
  }

  static defaultProps = {
    okLabel: 'Ok',
    cancelLabel: 'Cancel',
    locale: 'vi_VI',
  }

  UNSAFE_componentWillReceiveProps(props: IDatePickerModalProps) {
		if (props.date !== this.state.date) {
			this.setState({
				date: props.date
			});
		}
	}

  getSelectedDate() {
    const { date } = this.state;
    return date || null;
  }

  cancel = () => {
    this.hideDatePickerModal();
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  showDatePickerModal() {
    this.setState({
      datePickerVisible: true
    });
  }

  hideDatePickerModal(){
    this.setState({
      datePickerVisible: false
    });
  }

  onDateChangeHandler = async (selectedDate) => {
    this.setState({
      date: selectedDate
    });
  }

  onDateSelectedHandler = () => {
    this.modalRef.close();
    if (this.validateDate() && this.props.onDatePicked) {
      this.props.onDatePicked(this.state.date);
    }
  }

  close = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }

  validateDate = () => {
    const { date, minDate, maxDate } = this.state;
    //console.log('validateDate date=',date, ' minDate=', minDate, ' maxDate=',maxDate, 'diff=', moment(minDate).diff(moment(date), 'day'));
    if (minDate && moment(minDate).diff(moment(date), 'day') > 0 ) {
      toast(`Ngày chọn không được trước ngày ${moment(minDate).format('DD/MM/YYYY')}`);
      // console.log('validateDate mindate ');
      return false;
    }
    if (maxDate && moment(maxDate).diff(moment(date), 'day') < 0 ) {
      toast(`Ngày chọn không được sau ngày ${moment(maxDate).format('DD/MM/YYYY')}`);
      // console.log('validateDate maxdate ');
      return false;
    }

    return true;
  }

  render() {
    const { containerStyle } = this.props;
    let datePickerProps:any = {};
    datePickerProps.date = this.state.date ? this.state.date : new Date(1980, 1, 1);
    if (this.state.minDate) {
      datePickerProps.minimumDate = this.state.minDate;
    }
    if (this.state.maxDate) {
      datePickerProps.maximumDate = this.state.maxDate;
    }

    let dpOptionsProps: DatePickerProps = {
      date: datePickerProps.date,
      textColor: Color.textSecondary,
      mode: 'date',
      style: {width: Device.ModalWidth, paddingBottom: 0},
        //locale={'VI'}
      onDateChange: this.onDateChangeHandler
    };

    if (Platform.OS === 'ios') {
      dpOptionsProps = {...dpOptionsProps, ...{locale:'vi'}};
    }

    return (
      <WrapModal
        ref={ (comp) => {this.modalRef = comp;}}
        autoOpen={true}
        onClose={this.close}
        backDropClose={true}
        position={'bottom'}
        showPos={'center'}
        containerStyle={containerStyle}>
            <View style={styles.contentContainer}>
              <DatePicker {...dpOptionsProps} />
              <View style={styles.footer}>
                <ButtonRipple 
                  radius={1}
                  color={Color.primary}
                  onPress={this.onDateSelectedHandler.bind(this)}>
                  <View style={styles.buttonStyle}>
                    <WrapText st={[Styles.Text_XXL_M, {color: Color.primary}]}>{'Chọn ngày'}</WrapText>
                  </View>
                </ButtonRipple>
              </View>
          </View>
      </WrapModal>
    );
  }

}
