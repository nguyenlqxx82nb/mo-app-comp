
import React, { PureComponent } from 'react';
import { View, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { CommonLanguage, Color, CustomIcon } from 'mo-app-common';
import PasswordToggle from './PasswordToggle';
import ButtonRipple from '../Button/ButtonRipple';
import { WrapText } from '../Text';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import styles from './styles';

export interface IValidPattern {
  pattern: any;
  message: string;
  interpolateParams?: Object;
}

export interface FormInputProps {
  placeholder?: string;
  label?: string;
  text?: string;
  validType?: 'text' | 'email' | 'phone' | 'number';
  validPattern?: Array<IValidPattern>;
  validRequire?: boolean;
  emptyErrorMessage?: string;
  emailInvalidMessage?: string;
  phoneInvalidMessage?: string;
  numberInvalidMessage?: string;
  multiLine?: boolean;
  updateType?: boolean;
  containerStyle?: object;
  autoValidate?: boolean;
  icon?: string;
  enable?: boolean;
  onSubmit?: any;
  onUpdate?: any;
  isPassword?: boolean;
  hasClear?: boolean;
  highlight?: boolean;
  inputStyle?: ViewStyle;
  inputWrapStyle?: ViewStyle
  autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
  onClearValue?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
}

export class FormInput extends PureComponent<FormInputProps, any> {
  static defaultProps = {
    placeholder: '',
    label: '',
    text: '',
    validType: 'text', // 1: text, 2: email, 3: phone, 4: number
    validRequire: true,
    emptyErrorMessage: '',
    emailInvalidMessage: '',
    phoneInvalidMessage: 'Số điện thoại không hợp lệ',
    numberInvalidMessage: 'Vui lòng nhập số hợp lệ',
    multiLine: false,
    updateType: false,
    containerStyle: {},
    autoValidate: true,
    enable: true,
    hasClear: true,
    autoCapitalize: 'sentences',
  };
  textRef: AutoGrowingTextInput;
  constructor(props: FormInputProps) {
    super(props);

    this.state = {
      enable: this.props.enable,
      value: this.props.text,
      error: false,
      errorMessage: '',
      clearShow: this.props.text ? true : false,
      isSecureText: this.props.isPassword,
      isFocus: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    const { text } = this.props;
    if (nextProps.text && nextProps.text !== text) {
      this.setValue(nextProps.text);
    }
    if (nextProps.enable !== this.props.enable) {
      this.setState({ enable: nextProps.enable });
    }
  }

  componentDidMount() {
    if (this.props.autoValidate) {
      this.validate();
    }
  }

  onClearInputTextHandler = () => {
    const { onClearValue } = this.props;
    this.setState({ value: '', clearShow: false }, () => {
      this.validate();
    });

    if (onClearValue) {
      onClearValue();
    }
  }

  getValue() {
    const { validType } = this.props;
    if (validType === 'number') {
      return parseInt(this.state.value);
    }
    return this.state.value;
  }

  setValue = (value: any) => {
    this.setState({ value: value, clearShow: value ? true : false });
  }

  onSubmitHandle = () => {
    const { value } = this.state;
    const { onSubmit } = this.props;

    if (onSubmit) {
      onSubmit(value);
    }
  }

  onValueEditHandle = (value: any) => {
    const clear = value ? true : false;
    const { onChangeText } = this.props;
    onChangeText && onChangeText(value);
    this.setState({ value, clearShow: clear }, () => {
      this.validate();
    });
  }

  validate = () => {
    const {
      validType,
      emptyErrorMessage,
      emailInvalidMessage,
      phoneInvalidMessage,
      numberInvalidMessage,
      validPattern
    } = this.props;

    const { value } = this.state;
    if (this.checkValidate(value)) {
      this.setState({ error: false, errorMessage: '' });
      return true;
    }
    const _value = value && value.trim();
    let error = {};
    if (!_value) {
      error = { errorMessage: emptyErrorMessage, error: true };
      this.setState(error);
      return false;
    }
    if (validPattern && validPattern && validPattern.length && value.trim()) {
      for (const valid of validPattern) {
        if (valid.pattern && (valid.pattern.test(value) === true)) {
          this.setState({ errorMessage: valid.message, error: true });
          return;
        }
      }
    }
    switch (validType) {
      case 'email': // email
        error = { errorMessage: emailInvalidMessage, error: true };
        break;
      case 'phone': // phone
        error = { errorMessage: phoneInvalidMessage, error: true };
        break;
      case 'number': // number
        error = { errorMessage: numberInvalidMessage, error: true };
        break;
      default:
        break;
    }
    this.setState(error);
    return false;
  }

  checkValidate = (value: string) => {
    const { validType, validRequire, validPattern } = this.props;
    if (!validRequire) {
      return true;
    }
    if (!value) {
      return false;
    }
    const _value = value && value.trim();
    if (!_value) {
      return false;
    }
    if (validPattern && validPattern && validPattern.length) {
      for (const valid of validPattern) {
        if (valid.pattern && (valid.pattern.test(value) === true)) {
          return false;
        }
      }
    }
    if (validRequire) {
      switch (validType) {
        case 'text': // empty valid
          return true;
        case 'email': // email
          return this.validateEmail(_value);
        case 'phone': // phone
          return this.validatePhone(_value);
        case 'number': // number
          return this.validateNumber(_value);
        default:
          return true;
      }
    }

    return true;
  }

  validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  validatePhone = (phone: string) => {
    const re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return re.test(phone.toLowerCase());
  }

  validateNumber = (value: string) => {
    const number = parseInt(value);
    if (!number) {
      return false;
    }
    if (value.charAt(0) === '0') {
      return false;
    }
    return true;
  }

  onUpdateHandler = () => {
    const { onUpdate } = this.props;
    const { value } = this.state;
    if (onUpdate) {
      onUpdate(value);
    }
  }

  onClickWrapper = () => {
    this.textRef && this.textRef.focus();
  }

  onTogglePasswordHandler = (val: any) => {
    this.setState({ isSecureText: val });
  }

  onFocusHandler = () => {
    const { onFocus } = this.props;
    this.setState({ isFocus: true });
    onFocus && onFocus();
  }

  onBlurHandler = () => {
    const { onBlur } = this.props;
    this.setState({ isFocus: false });
    onBlur && onBlur();
  }

  render() {
    const {
      placeholder,
      label,
      multiLine,
      validType,
      updateType,
      containerStyle,
      icon,
      isPassword,
      hasClear,
      inputStyle,
      inputWrapStyle,
      autoCapitalize
    } = this.props;

    const {
      value,
      error,
      errorMessage,
      clearShow,
      enable,
      isSecureText,
      isFocus
    } = this.state;

    const keyboardType = validType === 'number' ? 'numeric' : validType === 'phone' ? 'phone-pad' : 'default';
    const hasLabel = label ? true : false;
    const hasIcon = icon ? true : false;
    const color = value ? Color.text : Color.textSecondary;
    const borderColor = error ? { borderColor: Color.red } : isFocus ? { borderColor: Color.secondary } : {};

    if (!enable) {
      return (
        <View style={[styles.formInputWrap, containerStyle]}>
          { hasLabel && <WrapText f={'r'} st={[{ marginBottom: 8 }]}>{label}</WrapText>}
          <View style={[styles.inputWrap, { height: 34, alignItems: 'center', justifyContent: 'flex-start', opacity: 0.5 }]} >
            <WrapText f={'m'} s={14}>{value}</WrapText>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.formInputWrap, containerStyle]}>
        {
          hasLabel &&
          <WrapText f={'m'} s={14} st={[{ marginBottom: 8, lineHeight: 16 }]}>{label}</WrapText>
        }
        <TouchableOpacity activeOpacity={1} onPress={this.onClickWrapper}>

          <View style={[styles.inputWrap, borderColor, multiLine ? { alignItems: 'flex-start', padding: 10, minHeight: 80 } : {}, inputWrapStyle]}>
            {
              hasIcon && <CustomIcon name={icon} size={15} style={{ color: color, marginRight: 6 }} />
            }
            {!updateType && !multiLine &&
              <TextInput
                style={[styles.formInput, multiLine ? styles.optionInput : {}, inputStyle]}
                underlineColorAndroid="transparent"
                placeholderTextColor={Color.textSecondary}
                ref={(comp) => { this.textRef = comp; }}
                placeholder={placeholder}
                keyboardType={keyboardType}
                onChangeText={this.onValueEditHandle}
                onSubmitEditing={this.onSubmitHandle}
                returnKeyType="next"
                value={value}
                numberOfLines={1}
                secureTextEntry={isSecureText}
                onFocus={this.onFocusHandler}
                onBlur={this.onBlurHandler}
                autoCapitalize={autoCapitalize}
                selectionColor={Color.secondary} />
            }
            {
              multiLine &&
              <AutoGrowingTextInput
                style={[styles.formInputAutoGrowText]}
                underlineColorAndroid="transparent"
                placeholderTextColor={Color.textSecondary}
                ref={(comp: any) => { this.textRef = comp; }}
                placeholder={placeholder}
                onChangeText={this.onValueEditHandle}
                onSubmitEditing={this.onSubmitHandle}
                returnKeyType="next"
                value={value}
                autoCapitalize={autoCapitalize}
                selectionColor={Color.secondary} />
            }

            {!multiLine && !updateType && !isPassword && clearShow && hasClear &&
              <ButtonRipple
                containerStyle={{marginRight: -2}}
                name={'clear'}
                size={12}
                color={Color.text}
                width={30}
                height={30}
                onPress={this.onClearInputTextHandler} />
            }

            {
              isPassword && <PasswordToggle onActive={this.onTogglePasswordHandler} />
            }

            {updateType &&
              <WrapText>{value || 'Chưa có thông tin'}</WrapText>
            }

            {updateType &&
              <TouchableOpacity
                onPress={this.onUpdateHandler}
                style={styles.updateButton}>
                <WrapText st={{ color: Color.primary }}>{CommonLanguage.Update}</WrapText>
              </TouchableOpacity>
            }

          </View>
        </TouchableOpacity>
        {
          error &&
          <WrapText f={'r'} s={12} fixSize={true}
            st={{ marginTop: 5, color: Color.red }}>{errorMessage}</WrapText>
        }
      </View>
    );
  }
}