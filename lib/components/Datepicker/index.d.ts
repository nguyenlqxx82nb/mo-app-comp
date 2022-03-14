import { PureComponent } from 'react';
import PropTypes from 'prop-types';
export default class DatePickerModal extends PureComponent<any, any> {
    modalRef: any;
    constructor(props: any);
    static propTypes: {
        /**
         * Date picked handler.
         *
         * This is called when the user selected the date from picker
         * The first and only argument is a Date object representing the picked
         * date and time.
         */
        onDatePicked: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Date Cancelled handler.
         *
         * This is called when the user dismissed the picker.
         */
        onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        /**
        * Ok button label
        */
        okLabel: PropTypes.Requireable<string>;
        /**
        * Cancel button label
        */
        cancelLabel: PropTypes.Requireable<string>;
        locale: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        okLabel: string;
        cancelLabel: string;
        locale: string;
    };
    getSelectedDate(): any;
    cancel: () => void;
    showDatePickerModal(): void;
    hideDatePickerModal(): void;
    onDateChangeHandler: (selectedDate: any) => Promise<void>;
    onDateSelectedHandler: () => void;
    close: () => void;
    render(): JSX.Element;
}
