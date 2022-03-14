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
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const styles_1 = __importDefault(require("./styles"));
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../../index");
//import PropTypes from 'prop-types';
class TabHeader extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this._isShow = true;
        this._currentScroll = 0;
        this._height = 50;
        this.show = () => {
            if (this._isShow) {
                return;
            }
            const { scrollYAnimated } = this.state;
            react_native_1.Animated.timing(scrollYAnimated, { toValue: 0, duration: 150, useNativeDriver: false }).start();
            this._isShow = true;
        };
        this.hide = () => {
            if (!this._isShow) {
                return;
            }
            const { scrollYAnimated } = this.state;
            react_native_1.Animated.timing(scrollYAnimated, { toValue: -this._height, duration: 150, useNativeDriver: false }).start();
            this._isShow = false;
        };
        this.onSwitchTabHandle = (index) => {
            const { onChangeIndex, onTabPress, tabs } = this.props;
            if (tabs.length > index && !tabs[index].disable) {
                this.setState({ currentIndex: index });
                if (onChangeIndex) {
                    onChangeIndex(index);
                }
            }
            if (onTabPress) {
                onTabPress(index);
            }
        };
        this.scrollChange = (scrollY) => {
            // scroll len
            if (this._currentScroll <= scrollY) {
                if (scrollY <= this._height) {
                    this.show();
                    return;
                }
                else {
                    this.hide();
                }
            }
            else {
                this.show();
            }
            this._currentScroll = scrollY;
        };
        this.updateBadge = (index, badgeNumber) => {
            const { badges } = this.state;
            badges[index] = badgeNumber;
            this.setState({ badges: badges });
            setTimeout(() => {
                this.forceUpdate();
            }, 0);
        };
        const { tabs } = this.props;
        const badges = [];
        for (let i = 0; i < tabs.length; i++) {
            badges.push(0);
        }
        this.state = {
            currentIndex: this.props.currentIndex,
            scrollYAnimated: new react_native_1.Animated.Value(0),
            badges: badges
        };
    }
    render() {
        const { tabs } = this.props;
        const { currentIndex, scrollYAnimated } = this.state;
        const width = mo_app_common_1.Constants.Width / tabs.length;
        return (<react_native_1.Animated.View style={[styles_1.default.container,
            { transform: [{ translateY: scrollYAnimated }] }]}>
                {tabs.map((tab, index) => {
            const tabActive = (index === currentIndex);
            const hasBadge = tab.badge && tab.badge > 0 ? true : false;
            return (<index_1.ButtonRipple key={`${index}`} onPress={this.onSwitchTabHandle.bind(this, index, tab)} containerStyle={[styles_1.default.tabContainer, { width: width }]} width={width} height={42} color={mo_app_common_1.Color.primary} content={<react_native_1.View style={[styles_1.default.tabContainer, { width: width }]}>
                                        <react_native_1.View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <index_1.WrapText st={[styles_1.default.tabText, tabActive ? styles_1.default.textActive : {}]}>
                                                {tab.name}
                                            </index_1.WrapText>
                                            {hasBadge && <react_native_1.View style={styles_1.default.badge}>
                                                <index_1.WrapText f={'r'} s={10} c={'#fff'}>{tab.badge}</index_1.WrapText></react_native_1.View>}
                                        </react_native_1.View>
                                        {tabActive && <react_native_1.View style={[styles_1.default.underline, { left: (width / 2 - 20) }]}/>}
                                    </react_native_1.View>}/>);
        })}
            </react_native_1.Animated.View>);
    }
}
TabHeader.defaultProps = {
    tabs: [],
    currentIndex: 0,
};
exports.default = TabHeader;
//# sourceMappingURL=index.js.map