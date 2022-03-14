import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  ViewStyle
} from 'react-native';
//import Ripple from 'react-native-material-ripple';
// import DropdownItem from '../item';
import { WrapText } from '../Text';
import { CustomIcon, Color, Constants, Styles } from 'mo-app-common';
import ButtonRipple from '../Button/ButtonRipple';
import styles from './styles';


export interface IDropdownProps {
  align?: 'right' | 'left';
  width?: number;
  height?: number;
  renderBase?: any;
  renderItem?: any;
  selectedKey?: any;
  pickerStyleOverrides?: any;
  data?: Array<any>;
  value?: any;
  enable?: boolean;
  dropdownOffset?: IDropdownOffset;
  keyField?: string;
  onItemSelected?: any;
  itemVisibleNumber?: number;
  containerStyle?: ViewStyle | ViewStyle[];
  autoSelect?: boolean;
  default?: string;
  emptyErrorMessage?: string;
}

interface IDropdownOffset {
  top: number;
  left?: number;
  right?: number;
}

interface IDropdownState {
  modal: boolean;
  value: any;
  enable: boolean;
  selectedKey: any;
  data: Array<any>;
  width?: number;
  top?: number;
  left?: any;
  right?: any;
  error?: boolean;
  errorMessage?: string;
}

export default class Dropdown extends PureComponent<IDropdownProps, IDropdownState> {
  currentTop = 0;
  static defaultProps = {
    height: 28,
    disabled: false,
    data: [],
    default: '',
    // valueExtractor: any,
    // propsExtractor: () => null,

    dropdownOffset: {
      top: 0,
      left: 0,
      right: 0
    },

    dropdownMargins: {
      min: 15,
      max: 16,
    },

    itemCount: 8,
    itemPadding: 8,

    supportedOrientations: [
      'portrait',
      'portrait-upside-down',
      'landscape',
      'landscape-left',
      'landscape-right',
    ],

    useNativeDriver: false,
    enable: true,
    width: 0,
    emptyErrorMessage: '',
  };

  mounted: boolean;
  blur: any;
  focus: any;
  focused: any;

  updateScrollRef: any;
  updateContainerRef: any;
  container: any;

  width: number;
  height: number;

  constructor(props: IDropdownProps) {
    super(props);

    this.renderItem = this.renderItem.bind(this);

    this.updateContainerRef = this.updateRef.bind(this, 'container');

    this.keyExtractor = this.keyExtractor.bind(this);

    this.blur = () => this.onClose();
    // this.focus = this.onPress;

    let { value, enable, selectedKey } = this.props;

    this.mounted = false;
    this.focused = false;

    this.state = {
      modal: false,
      value,
      enable: enable,
      selectedKey: selectedKey,
      data: this.props.data,
      error: false,
      errorMessage: '',
    };
  }

  UNSAFE_componentWillReceiveProps({ value, selectedKey, enable }) {
    if (value !== this.props.value) {
      this.setState({ value });
    }

    if (selectedKey !== this.props.selectedKey) {
      this.setState({ selectedKey: selectedKey });
    }

    if (enable !== this.props.enable) {
      this.setState({ enable: enable });
    }
  }

  componentDidMount() {
    const { autoSelect, onItemSelected } = this.props;
    const { data } = this.state;
    this.mounted = true;
    Keyboard.addListener('keyboardDidHide', this.onKeyboardHideHandler);
    if (autoSelect && data && data.length) {
      this.setState({ selectedKey: data[0].id });
      onItemSelected(data[0]);
    }
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidHide', this.onKeyboardHideHandler);
    this.mounted = false;
  }

  onKeyboardHideHandler = () => {
    setTimeout(() => {
      this.reUpdatePos();
    }, 100);
  }

  onPress = () => {
    Keyboard.dismiss();
    let {
      // rippleDuration,
      dropdownOffset,
      // dropdownMargins: { min: minMargin, max: maxMargin },
      align,
      enable,
      width
    } = this.props;

    if (!enable) {
      return;
    }

    const { data } = this.state;
    let itemCount = data.length;

    // if (!itemCount) {
    //   return;
    // }

    let dimensions = Dimensions.get('window');
    this.container.measureInWindow((x, y, containerWidth, containerHeight) => {

      // let delay = Math.max(0, rippleDuration - animationDuration - (Date.now() - timestamp));
      let left = align === 'left' ? (dimensions.width - containerWidth) / 2 : 'auto';
      let right = align === 'right' ? Constants.Width - (x + containerWidth) + (dropdownOffset.right || 0) : 'auto';

      let top = y + dropdownOffset.top;
      this.setState({
        modal: true,
        width: width || containerWidth,
        top,
        left,
        right
      });
    });
  }

  reUpdatePos = () => {
    if (!this.container) {
      return;
    }
    this.container.measureInWindow((x, y, containerWidth, containerHeight) => {
      const { dropdownOffset } = this.props;
      let top = y + dropdownOffset.top + 0;
      this.setState({ top: top });
    });
  }

  onClose(value = this.state.value) {
    this.setState({ value, modal: false, error: false });
  }

  onSelect = (index: number) => {
    let {
      onItemSelected,
      keyField
    } = this.props;
    const { data } = this.state;
    let value = this.valueExtractor(data[index], index);
    const key = keyField || 'id';
    const selectedKey = data[index][key];
    this.setState({
      selectedKey: selectedKey
    });

    if (onItemSelected && typeof onItemSelected === 'function') {
      onItemSelected(data[index]);
    }

    setTimeout(() => this.onClose(value), 0);
  }

  onLayout(event) {
  }

  value() {
    let { value } = this.state;

    return value;
  }

  setValue = (value) => {
    this.setState({ value: value ? value : this.props.value });
  }

  selectedIndex() {
    let { selectedKey, data } = this.state;
    let { keyField } = this.props;
    const idx = data.findIndex((item, index) => {
      const key = keyField ? item[keyField] : item.id;
      return selectedKey === key;
    });
    return idx;
  }

  selectedItem() {
    let { data } = this.state;
    const selectedIndex = this.selectedIndex();
    if (!data || !data.length || selectedIndex < 0) {
      return undefined;
    }
    return data[selectedIndex];
  }

  isFocused() {
    return this.focused;
  }

  itemSize() {
    return Math.ceil(16 + 8 * 2);
  }

  visibleItemCount() {
    let { itemVisibleNumber } = this.props;
    const { data } = this.state;
    return itemVisibleNumber ? Math.min(data.length, itemVisibleNumber) : data.length;
  }

  tailItemCount() {
    return Math.max(this.visibleItemCount() - 2, 0);
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  keyExtractor(item, index) {
    return `${index}-${this.valueExtractor(item, index)}`;
  }

  valueExtractor = (item, _index) => {
    return `${item['id']}`;
  }

  getValue() {
    const { selectedKey } = this.state;
    return selectedKey;
  }

  renderBase = () => {
    const { renderBase } = this.props;
    const item = this.selectedItem();
    if (renderBase) {
      return renderBase(item);
    }
    return this.renderItemBase(item);
  }

  renderItemBase = (item: any) => {
    const { enable } = this.state;
    const backgroundBase = !enable ? { backgroundColor: 'rgba(78, 78, 78, 0.15)' } : {};
    return (
      <View style={[backgroundBase, Styles.Border, Styles.Row, Styles.JustifyBetween, Styles.AlignCenter, { height: 30, paddingHorizontal: 10 }]}>
        <WrapText st={[Styles.Text_S_R]}>{item ? item.name : this.props.default}</WrapText>
        <CustomIcon size={10} name={'drop_down'} color={Color.text} />
      </View>
    );
  }

  renderDefaultItem = (item: any, selectedKey: any) => {
    return (
      <View style={[Styles.Row, Styles.JustifyBetween, Styles.AlignCenter, { height: 30 }]}>
        <WrapText st={[Styles.Text_S_R, { marginLeft: 5, marginRight: 5 }]} c={Color.text}>{item.name}</WrapText>
        { selectedKey === item.id && <CustomIcon name={'mark_selected'} size={10} color={Color.text} />}
      </View>
    );
  }

  onBaseLayout = (event: any) => {
    // console.log('onBaseLayout ', event.nativeEvent.layout);
    this.width = event.nativeEvent.layout.width;
    this.height = event.nativeEvent.layout.height;
  }

  clearSelectedHandler = () => {
    this.reset();
  }

  reset = () => {
    this.setState({
      selectedKey: undefined
    });
  }

  setData = (_data: any[], _selectedKey: any = undefined) => {
    const { autoSelect, onItemSelected } = this.props;
    this.setState({ data: [..._data], selectedKey: _selectedKey, error: false }, () => {
      if (autoSelect && _data && _data.length) {
        const currIndex = this.selectedIndex();
        onItemSelected(_data[currIndex]);
        if (!_selectedKey) {
          this.setState({ selectedKey: _data[currIndex].id });
        }
      }
    });
  }

  renderItem = ({ item, index }) => {
    if (!item) {
      return null;
    }
    const { selectedKey } = this.state;
    const { renderItem } = this.props;
    if (renderItem) {
      if (item.isDisable) {
        return renderItem(item, selectedKey)
      }
      return (
        <ButtonRipple
          radius={2}
          color={Color.text}
          onPress={() => { this.onSelect(index) }}>
            <View style={{paddingHorizontal: 16}}>
              { renderItem(item, selectedKey)}
            </View>
        </ButtonRipple>
      )
    }
    return (
      <ButtonRipple
        radius={2}
        color={Color.text}
        onPress={() => { this.onSelect(index) }}>
        <View style={{paddingHorizontal: 16}}>
          { this.renderDefaultItem(item, selectedKey)}
        </View>
      </ButtonRipple>
    )

  }

  getErrorState = () => {
    return this.state.error;
  }

  checkValidate = () => {
    const { emptyErrorMessage } = this.props;
    const { value } = this.state;
    const _value = value && value.trim();
    if (!emptyErrorMessage) {
      return true;
    }
    if (!value || !_value) {
      return false;
    }
    return true;
  }

  validate = () => {
    const { emptyErrorMessage } = this.props;
    if (!this.checkValidate()) {
      this.setState({ error: true, errorMessage: emptyErrorMessage });
      return false;
    }
    return true;
  }

  render() {
    let {
      renderBase,
      containerStyle,
      pickerStyleOverrides,

      ...props
    } = this.props;

    let { height } = props;
    let { left, top, right, width, modal, enable, data, error, errorMessage } = this.state;

    let itemCount = data.length;
    let visibleItemCount = this.visibleItemCount();

    let containerHeight = visibleItemCount ? height * visibleItemCount + 8 : height * 1;
    let translateY = 0;

    let pickerStyle = {
      width,
      height: containerHeight,
      top,
      left: left,
      right: right,
      transform: [{ translateY }],
    };

    let touchableProps = {
      onPress: this.onPress,
    };

    if (!enable) {
      return (
        <View onLayout={this.onLayout} ref={this.updateContainerRef} style={[containerStyle, { opacity: 0.5 }]}>
          <View>
            {this.renderBase()}
          </View>
        </View>
      );
    }

    return (
      <View onLayout={this.onLayout} ref={this.updateContainerRef} style={[containerStyle, { borderColor: Color.red }]}>

        <ButtonRipple 
          radius={5}
          color={Color.text}
          onPress={this.onPress}>
          <View style={{paddingHorizontal: 0, paddingVertical:0}}>
            {this.renderBase()}
          </View>
        </ButtonRipple>

        <Modal
          visible={modal}
          transparent={true}
          onRequestClose={this.blur}>

          <TouchableOpacity style={styles.container}
            activeOpacity={0.95}
            onPress={() => { this.onClose(); }}>

            <View
              style={[styles.picker, pickerStyle, pickerStyleOverrides]}
              onStartShouldSetResponder={() => true}>
              {
                visibleItemCount !== 0 &&
                <FlatList
                  keyboardShouldPersistTaps={'handled'}
                  ref={this.updateScrollRef}
                  data={data}
                  style={styles.scroll}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={visibleItemCount < itemCount}
                  contentContainerStyle={styles.scrollContainer} />
              }
              {
                visibleItemCount === 0 &&
                <View style={[Styles.CenterItem, { flex: 1 }]}>
                  <WrapText st={[Styles.Text_S_R, Styles.CenterItem, { opacity: 0.5 }]} c={Color.text}>Không có dữ liệu</WrapText>
                </View>
              }
            </View>
          </TouchableOpacity>

        </Modal>
        {
          error &&
          <WrapText f={'r'} s={12}
            st={{ marginTop: 5, color: Color.red }}>{errorMessage}</WrapText>
        }
      </View>
    );
  }
}
