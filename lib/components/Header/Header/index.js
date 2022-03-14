"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const index_1 = require("../../index");
const mo_app_common_1 = require("mo-app-common");
const react_native_skeleton_placeholder_1 = __importDefault(require("react-native-skeleton-placeholder"));
// import Languages from '@common/Languages';
const styles_1 = __importStar(require("./styles"));
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
        const { offsetTop, backIcon, title, back, style, rightButtons, leftButtons, hasSearch, hasFilter, opacityScroll, scrollY, backShow, minStatusOpacity, isStatusBarLight, badge, limitChars } = this.props;
        // console.log(' header backicon ', backIcon );
        // let opacityAni = new Animated.Value(1);
        let statusOpacity = new react_native_1.Animated.Value(1);
        let opacityTitleAni = new react_native_1.Animated.Value(1);
        if (opacityScroll && scrollY) {
            statusOpacity = scrollY.interpolate({
                inputRange: [offsetTop, styles_1.HEADER_CONTENT_HEIGHT + offsetTop],
                outputRange: [minStatusOpacity, 1],
                extrapolate: 'clamp',
            });
            opacityTitleAni = scrollY.interpolate({
                inputRange: [offsetTop, styles_1.HEADER_CONTENT_HEIGHT + offsetTop],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            });
        }
        const hasTitle = title ? true : false;
        return (<react_native_1.Animated.View style={[styles_1.default.container, { height: styles_1.HEADER_HEIGHT }, style]}>
                <react_native_1.View style={[styles_1.default.bgContainer, { opacity: 1 }]}>
                    <react_native_1.Animated.View style={[styles_1.default.bgContainerTop, { opacity: statusOpacity }]}/>
                </react_native_1.View>
                <react_native_1.View style={[styles_1.default.bottomContainer, { height: styles_1.HEADER_CONTENT_HEIGHT }]}>
                    <react_native_1.Animated.View ref={ref => { this.centerView = ref; }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: opacityTitleAni }}>
                        {hasTitle &&
            <react_native_1.View style={styles_1.default.wrapTitle}>
                                <index_1.WrapText f={'b'} s={18} nl={1} c={mo_app_common_1.Color.primary}>{title}</index_1.WrapText>
                                {badge > 0 && (<react_native_1.View style={styles_1.default.badge}>
                                            <index_1.WrapText f={'r'} s={10} c={'#fff'}>{badge >= 1000 ? '999+' : badge}</index_1.WrapText>
                                        </react_native_1.View>)}
                            </react_native_1.View>}
                        {!hasTitle &&
            <react_native_skeleton_placeholder_1.default backgroundColor={mo_app_common_1.Color.border}>
                                <react_native_1.View style={{ width: mo_app_common_1.Constants.Width - 90, height: 18 }}/>
                            </react_native_skeleton_placeholder_1.default>}
                    </react_native_1.Animated.View>

                    <react_native_1.View style={styles_1.default.leftButtonPanel}>
                        {back && <react_native_1.View style={[styles_1.default.leftButton, backShow ? {} : { transform: [{ translateX: -100 }] }]}>
                                    <index_1.ButtonRipple vector={true} name={backIcon || 'back1'} size={20} color={mo_app_common_1.Color.primary} onPress={this.onBackHandle}/>
                                </react_native_1.View>}
                        {leftButtons.map((button, index) => {
            return (<react_native_1.View key={index} style={styles_1.default.leftButton}>
                                        <index_1.ButtonRipple vector={true} name={button.name} size={15} color={button.color ? button.color : mo_app_common_1.Color.primary} onPress={button.action} badge={button.badge ? button.badge : 0}/>
                                    </react_native_1.View>);
        })}
                    </react_native_1.View>

                    {rightButtons &&
            <react_native_1.Animated.View style={styles_1.default.rightButtonPanel}>
                            {rightButtons.map((button, index) => {
                return (<react_native_1.View key={index} style={styles_1.default.rightButton}>
                                            <index_1.ButtonRipple vector={true} name={button.name} size={20} color={button.color ? button.color : mo_app_common_1.Color.primary} badge={button.badge ? button.badge : 0} onPress={button.action}/>
                                        </react_native_1.View>);
            })}
                        </react_native_1.Animated.View>}
                    {hasSearch &&
            <react_native_1.Animated.View style={[styles_1.default.searchContainer, { transform: [{ translateX: searchY }] }]}>
                            {hasFilter &&
                <react_native_1.TouchableOpacity onPress={this.onFilterHandler.bind(this)}>
                                    <react_native_1.View style={styles_1.default.filterButton}>
                                        <mo_app_common_1.CustomIcon name={'filter'} size={16} style={{ color: mo_app_common_1.Color.text, marginRight: 8 }}/>
                                        <index_1.WrapText>{mo_app_common_1.CommonLanguage.Filter}</index_1.WrapText>
                                    </react_native_1.View>
                                </react_native_1.TouchableOpacity>}
                            <react_native_1.View style={[styles_1.default.searchInputWrapp, hasFilter ? { marginLeft: 0 } : {}]}>
                                <mo_app_common_1.CustomIcon name={'search1'} size={16} style={{ color: mo_app_common_1.Color.textSecondary, marginRight: 8 }}/>
                                <react_native_1.TextInput style={styles_1.default.searchInput} numberOfLines={1} underlineColorAndroid="transparent" placeholderTextColor={mo_app_common_1.Color.textSecondary} ref={(comp) => (this.searchInput = comp)} placeholder={placeholder} onChangeText={this.onSearchTextChangeHandler} onSubmitEditing={this.onSearchSubmit.bind(this)} returnKeyType="go" onFocus={this.onSearchInputFocusHandler} value={searchValue} maxLength={limitChars}/>
                                {searchValue !== '' &&
                <react_native_1.View style={styles_1.default.clearButton}>
                                            <index_1.ButtonRipple vector={true} name={'clear_text'} size={10} color={mo_app_common_1.Color.textSecondary} onPress={this.clearAllText}/>
                                        </react_native_1.View>}

                            </react_native_1.View>
                            <react_native_1.TouchableOpacity onPress={this.cancelSearchPanel}>
                                <react_native_1.View style={styles_1.default.filterCancelButton}>
                                    <index_1.WrapText st={styles_1.default.filterText}>{mo_app_common_1.CommonLanguage.Cancel}</index_1.WrapText>
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
    limitChars: 120,
    backIcon: 'back1',
    offsetTop: 0
};
//# sourceMappingURL=index.js.map