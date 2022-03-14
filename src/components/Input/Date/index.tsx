import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { Color, CustomIcon, Styles } from 'mo-app-common';
import { pushModal, IModal } from 'mo-app-comp';
import DatePickerModal from '../../Datepicker/index';
import moment from 'moment';
import styles from './styles';
import { WrapText } from 'mo-app-comp/src/components/Text';

interface IFormDateProps {
  date?: any;
  minDate?: any;
  maxDate?: any;
  containerStyle?: ViewStyle | ViewStyle[]; 
  onDatePicked: (date: Date) => void;
}

interface IFormDateState {
  currDate: any;
}

export class FormDate extends React.PureComponent<IFormDateProps, IFormDateState> {

  static defaultProps = {
    date: moment().subtract(30, 'day')
  }

  constructor(props: IFormDateProps) {
    super(props);
    this.state = {
      currDate: props.date
    }
  }

  UNSAFE_componentWillReceiveProps(props: IFormDateProps) {
		if (props.date !== this.state.currDate) {
			this.setState({
				currDate: props.date
			});
		}
	}

  openDate = () => {
    const { minDate, maxDate } = this.props;
    const { currDate } = this.state;
    const  modal: IModal = {
      content: <DatePickerModal 
                  date={moment(currDate).toDate()}
                  minDate={minDate && moment(minDate).toDate()} 
                  maxDate={maxDate && moment(maxDate).toDate()}
                  onDatePicked={this.onDatePicked}/>
    }

    pushModal(modal);
  }

  onDatePicked = (date: any) => {
    this.setState({currDate: moment(date)});

    this.props.onDatePicked(date);
  }

  render() {
    const { containerStyle } = this.props;
    const { currDate } = this.state;
    return (
      <TouchableOpacity
        onPress={this.openDate}
        style={[styles.container, containerStyle]}>
        <CustomIcon name={'calendar'} size={16} color={Color.textSecondary} />
        <WrapText st={[Styles.Text_S_R, {marginLeft: 8}]}>{moment(currDate).format('DD/MM/YYYY')}</WrapText>
      </TouchableOpacity>
    )
  }

}