"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const index_1 = require("../index");
const mo_app_common_1 = require("mo-app-common");
const react_native_status_bar_height_1 = require("react-native-status-bar-height");
const react_native_skeleton_placeholder_1 = __importDefault(require("react-native-skeleton-placeholder"));
// import Languages from '@common/Languages';
const HEADER_CONTENT_HEIGHT = 45;
const BUTTON_HEIGHT = 40;
const HEADER_HEIGHT = react_native_status_bar_height_1.getStatusBarHeight() + HEADER_CONTENT_HEIGHT;
class Header extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.onSearchTextChangeHandler = (searchValue) => {
            const { onSearchTextChange } = this.props;
            this.setState({ searchValue });
            if (onSearchTextChange) {
                onSearchTextChange(searchValue);
            }
        };
        this.onBackHandle = () => {
            const { onBack } = this.props;
            if (onBack) {
                onBack();
                return;
            }
            index_1.Router.pop();
        };
        this.showSearchPanel = () => {
            const { searchY } = this.state;
            searchY.setValue(0);
            setTimeout(() => {
                this.searchInput.focus();
            }, 50);
        };
        this.cancelSearchPanel = () => {
            const { cancelSearch, onCancelSearch } = this.props;
            this.setState({ searchValue: '' }, () => {
                if (cancelSearch) {
                    this.hideSearchPanel();
                }
                if (onCancelSearch) {
                    onCancelSearch('');
                }
                // Hide that keyboard!
                react_native_1.Keyboard.dismiss();
            });
        };
        this.clearAllText = () => {
            const { onSearch, cancelSearch, onClearSearch, onSearchTextChange } = this.props;
            this.setState({
                searchValue: '',
            });
            if (onSearch && cancelSearch) {
                onSearch('');
                return;
            }
            this.searchInput.focus();
            if (onSearchTextChange) {
                onSearchTextChange('');
            }
            if (onClearSearch) {
                onClearSearch();
            }
        };
        this.hideSearchPanel = () => {
            const { onSearch } = this.props;
            const { searchY } = this.state;
            searchY.setValue(mo_app_common_1.Constants.Width);
            if (onSearch) {
                onSearch('');
            }
        };
        this.onSearchSubmit = () => {
            const { onSearch } = this.props;
            if (onSearch) {
                onSearch(this.getSearchValue());
            }
        };
        this.onFilterHandler = () => {
            const { onFilter } = this.props;
            if (onFilter) {
                onFilter();
            }
            setTimeout(() => {
                react_native_1.Keyboard.dismiss();
            }, 250);
        };
        this.getSearchValue = () => {
            const { searchValue } = this.state;
            return searchValue.trim();
        };
        this.setSearchInputHolder = (holder) => {
            this.setState({ placeholder: holder });
        };
        this.setBarColor = (barColor, opacity = 1) => {
            this.setState({ barColor: barColor, barOpacity: opacity });
        };
        this.onSearchInputFocusHandler = () => {
            const { onSearchInputFocus } = this.props;
            if (onSearchInputFocus) {
                onSearchInputFocus();
            }
        };
        this.setSearchValue = (value) => {
            this.setState({ searchValue: value });
        };
        this.isFirst = true;
        const { showSearch } = this.props;
        this.state = {
            searchValue: '',
            searchY: new react_native_1.Animated.Value(showSearch ? 0 : mo_app_common_1.Constants.Width),
            placeholder: this.props.placeholder ? this.props.placeholder : '',
            barColor: this.props.barColor,
            barOpacity: 1
        };
    }
    componentDidMount() {
        const { showSearch } = this.props;
        if (showSearch) {
            setTimeout(() => {
                this.searchInput.focus();
            }, 500);
        }
    }
    componentWillUnmount() { }
    render() {
        const { searchValue, searchY, placeholder, } = this.state;
        const { offsetTop, backIcon, title, back, style, rightButtons, leftButtons, hasSearch, hasFilter, opacityScroll, scrollY, backShow, minStatusOpacity, isStatusBarLight, badge } = this.props;
        // console.log(' header backicon ', backIcon );
        // let opacityAni = new Animated.Value(1);
        let statusOpacity = new react_native_1.Animated.Value(1);
        let opacityTitleAni = new react_native_1.Animated.Value(1);
        if (opacityScroll && scrollY) {
            statusOpacity = scrollY.interpolate({
                inputRange: [offsetTop, HEADER_CONTENT_HEIGHT + offsetTop],
                outputRange: [minStatusOpacity, 1],
                extrapolate: 'clamp',
            });
            opacityTitleAni = scrollY.interpolate({
                inputRange: [offsetTop, HEADER_CONTENT_HEIGHT + offsetTop],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            });
        }
        const hasTitle = title ? true : false;
        return (<react_native_1.Animated.View style={[styles.container, { height: HEADER_HEIGHT }, style]}>
                <react_native_1.View style={[styles.bgContainer, { opacity: 1 }]}>
                    <react_native_1.Animated.View style={[styles.bgContainerTop, { opacity: statusOpacity }]}/>
                </react_native_1.View>
                <react_native_1.View style={[styles.bottomContainer, { height: HEADER_CONTENT_HEIGHT }]}>
                    <react_native_1.Animated.View ref={ref => { this.centerView = ref; }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: opacityTitleAni }}>
                        {hasTitle &&
            <react_native_1.View style={styles.wrapTitle}>
                                <index_1.WrapText f={'b'} s={18} nl={1} c={mo_app_common_1.Color.primary}>{title}</index_1.WrapText>
                                {badge > 0 && (<react_native_1.View style={styles.badge}>
                                            <index_1.WrapText f={'r'} s={10} c={'#fff'}>{badge >= 1000 ? '999+' : badge}</index_1.WrapText>
                                        </react_native_1.View>)}
                            </react_native_1.View>}
                        {!hasTitle &&
            <react_native_skeleton_placeholder_1.default backgroundColor={mo_app_common_1.Color.border}>
                                <react_native_1.View style={{ width: mo_app_common_1.Constants.Width - 90, height: 18 }}/>
                            </react_native_skeleton_placeholder_1.default>}
                    </react_native_1.Animated.View>

                    <react_native_1.View style={styles.leftButtonPanel}>
                        {back && <react_native_1.View style={[styles.leftButton, backShow ? {} : { transform: [{ translateX: -100 }] }]}>
                                    <index_1.ButtonRipple vector={true} name={backIcon || 'back1'} size={20} color={mo_app_common_1.Color.primary} onPress={this.onBackHandle}/>
                                </react_native_1.View>}
                        {leftButtons.map((button, index) => {
            return (<react_native_1.View key={index} style={styles.leftButton}>
                                        <index_1.ButtonRipple vector={true} name={button.name} size={15} color={button.color ? button.color : mo_app_common_1.Color.primary} onPress={button.action} badge={button.badge ? button.badge : 0}/>
                                    </react_native_1.View>);
        })}
                    </react_native_1.View>

                    {rightButtons &&
            <react_native_1.Animated.View style={styles.rightButtonPanel}>
                            {rightButtons.map((button, index) => {
                return (<react_native_1.View key={index} style={styles.rightButton}>
                                            <index_1.ButtonRipple vector={true} name={button.name} size={20} color={button.color ? button.color : mo_app_common_1.Color.primary} badge={button.badge ? button.badge : 0} onPress={button.action}/>
                                        </react_native_1.View>);
            })}
                        </react_native_1.Animated.View>}
                    {hasSearch &&
            <react_native_1.Animated.View style={[styles.searchContainer, { transform: [{ translateX: searchY }] }]}>
                            {hasFilter &&
                <react_native_1.TouchableOpacity onPress={this.onFilterHandler.bind(this)}>
                                    <react_native_1.View style={styles.filterButton}>
                                        <mo_app_common_1.CustomIcon name={'filter'} size={16} style={{ color: mo_app_common_1.Color.text, marginRight: 8 }}/>
                                        <index_1.WrapText>{mo_app_common_1.CommonLanguage.Filter}</index_1.WrapText>
                                    </react_native_1.View>
                                </react_native_1.TouchableOpacity>}
                            <react_native_1.View style={[styles.searchInputWrapp, hasFilter ? { marginLeft: 0 } : {}]}>
                                <mo_app_common_1.CustomIcon name={'search1'} size={16} style={{ color: mo_app_common_1.Color.textSecondary, marginRight: 8 }}/>
                                <react_native_1.TextInput style={styles.searchInput} numberOfLines={1} underlineColorAndroid="transparent" placeholderTextColor={mo_app_common_1.Color.textSecondary} ref={(comp) => (this.searchInput = comp)} placeholder={placeholder} onChangeText={this.onSearchTextChangeHandler} onSubmitEditing={this.onSearchSubmit.bind(this)} returnKeyType="go" onFocus={this.onSearchInputFocusHandler} value={searchValue} maxLength={100}/>
                                {searchValue !== '' &&
                <react_native_1.View style={styles.clearButton}>
                                            <index_1.ButtonRipple vector={true} name={'clear_text'} size={10} color={mo_app_common_1.Color.textSecondary} onPress={this.clearAllText}/>
                                        </react_native_1.View>}

                            </react_native_1.View>
                            <react_native_1.TouchableOpacity onPress={this.cancelSearchPanel}>
                                <react_native_1.View style={styles.filterCancelButton}>
                                    <index_1.WrapText st={styles.filterText}>{mo_app_common_1.CommonLanguage.Cancel}</index_1.WrapText>
                                </react_native_1.View>
                            </react_native_1.TouchableOpacity>
                        </react_native_1.Animated.View>}
                </react_native_1.View>
                <react_native_1.StatusBar barStyle={isStatusBarLight ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent={true} hidden={false}/>
            </react_native_1.Animated.View>);
    }
}
exports.Header = Header;
Header.defaultProps = {
    style: {},
    back: true,
    hasSearch: false,
    hasFilter: false,
    opacityScroll: false,
    leftButtons: [],
    rightButtons: [],
    backShow: true,
    minStatusOpacity: 0,
    barColor: '#fff',
    cancelSearch: true,
    placeholder: 'Tìm kiếm',
    badge: 0,
    limitChars: 100,
    backIcon: 'back1',
    offsetTop: 0
};
const styles = react_native_1.StyleSheet.create({
    container: { width: '100%', justifyContent: 'flex-end', position: 'absolute', top: 0, left: 0 },
    bgContainer: {
        width: '100%',
        zIndex: 0,
        justifyContent: 'flex-start',
    },
    bgContainerTop: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 2,
        backgroundColor: '#fff',
        height: HEADER_HEIGHT,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // height: HEADER_CONTENT_HEIGHT,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 2,
    },
    title: {
        fontSize: 18,
        color: mo_app_common_1.Color.primary,
        fontFamily: mo_app_common_1.Constants.fontMedium,
    },
    leftButtonPanel: {
        width: BUTTON_HEIGHT,
        height: BUTTON_HEIGHT,
        left: 5,
        top: (HEADER_CONTENT_HEIGHT - BUTTON_HEIGHT) / 2,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    leftButton: {
        width: BUTTON_HEIGHT,
        height: BUTTON_HEIGHT,
        marginRight: 20,
        borderRadius: BUTTON_HEIGHT / 2,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    rightButtonPanel: {
        width: BUTTON_HEIGHT,
        height: BUTTON_HEIGHT,
        right: 5,
        top: (HEADER_CONTENT_HEIGHT - BUTTON_HEIGHT) / 2,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    rightButton: {
        width: BUTTON_HEIGHT,
        height: BUTTON_HEIGHT,
        marginLeft: 0,
    },
    searchContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    filterButton: {
        borderRadius: 15,
        paddingVertical: 7,
        paddingHorizontal: 10,
        marginLeft: 10,
        marginRight: 8,
        borderWidth: 1,
        borderColor: mo_app_common_1.Color.border,
        flexDirection: 'row',
    },
    filterText: {
        fontSize: 14,
        lineHeight: 16,
        color: mo_app_common_1.Color.text,
        fontFamily: mo_app_common_1.Constants.fontMedium,
    },
    searchInputWrapp: {
        flex: 1,
        height: 32,
        borderRadius: 16,
        backgroundColor: mo_app_common_1.Color.light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingRight: 5,
        marginLeft: 15,
    },
    searchInput: {
        height: 30,
        marginTop: 0,
        marginLeft: 0,
        paddingHorizontal: 0,
        paddingTop: 0,
        paddingBottom: 0,
        flex: 1,
        textAlign: 'left',
        fontFamily: mo_app_common_1.Constants.fontRegular,
        paddingRight: 10,
        color: mo_app_common_1.Color.text,
    },
    filterCancelButton: {
        marginLeft: 8,
        marginRight: 10,
        height: 30,
        justifyContent: 'center',
    },
    wrapTitle: {
        width: mo_app_common_1.Constants.Width - 90,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    clearButton: {
        width: 30,
        height: 30,
    },
    badge: {
        backgroundColor: mo_app_common_1.Color.red,
        paddingHorizontal: 5,
        paddingVertical: 0,
        borderRadius: 12,
        // marginBottom: 5,
        // position: 'absolute',
        // top: 0,
        // right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 2
    }
});
//# sourceMappingURL=Header.js.map