"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const index_1 = require("../../index");
const mo_app_common_1 = require("mo-app-common");
const style_1 = __importDefault(require("./style"));
class BottomTab extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.setDisableIndex = (idxArr) => {
            this.idxDisableArr = [...idxArr];
        };
        this.onPress = (route, index) => {
            const { onPress, onBottomTabPress } = this.props;
            const { curIndex } = this.state;
            if (curIndex === index) {
                return;
            }
            if (!this.idxDisableArr.includes(index)) {
                this.setState({
                    curIndex: index
                });
                onPress(route, index);
            }
            if (onBottomTabPress) {
                onBottomTabPress(index);
            }
        };
        this.handleOnBarcodePress = (code, index) => {
            const { onBarcodePress, onBottomTabPress } = this.props;
            const { curIndex } = this.state;
            if (curIndex === index) {
                return;
            }
            if (!this.idxDisableArr.includes(index)) {
                this.setState({
                    curIndex: index
                });
                if (onBarcodePress) {
                    onBarcodePress(code, index);
                }
            }
            if (onBottomTabPress) {
                onBottomTabPress(index);
            }
        };
        this.idxDisableArr = [];
        this.state = {
            curIndex: props.initialIndex,
            bottom: 0
        };
    }
    setCurrentIndex(index) {
        this.setState({ curIndex: index });
    }
    render() {
        const { activeTintColor, inactiveTintColor, code, routes } = this.props;
        const { curIndex, bottom } = this.state;
        return (
        // <Screens.ScreenContainer
        //     style={[ styles.tabbar ]}>
        <react_native_1.Animated.View style={[style_1.default.tabbar, { bottom: bottom }]}>
                {routes && routes.map((route, index) => {
            const focused = index === curIndex;
            const tintColor = focused ? activeTintColor : inactiveTintColor;
            const isFeatured = route.name === 'Barcode' ? true : false;
            if (!isFeatured) {
                return (<index_1.ButtonRipple width={mo_app_common_1.Constants.Width / 5} height={45} key={route.key} color={mo_app_common_1.Color.primary} onPress={() => this.onPress(route, index)} content={<react_native_1.View style={style_1.default.tabContainer}>
                                        <react_native_1.View style={[style_1.default.topDivider, { backgroundColor: (focused) ? tintColor : 'transparent' }]}/>
                                        <react_native_1.View style={style_1.default.tabBottom}>
                                            <react_native_1.View ref={`tabItem${index}`} style={style_1.default.tab}>
                                                {route.tabBarIcon({
                    route,
                    index,
                    focused,
                    color: tintColor,
                })}
                                                <react_native_1.Text style={[style_1.default.tabLabel, { color: tintColor }]}>
                                                    {route.label}
                                                </react_native_1.Text>
                                            </react_native_1.View>
                                        </react_native_1.View>
                                    </react_native_1.View>}/>);
            }
            return (<react_native_1.TouchableOpacity activeOpacity={0.75} key={route.key} style={style_1.default.qrButtonContainer} onPress={() => { this.handleOnBarcodePress.bind(this, code, index); }}>
                                <react_native_1.TouchableOpacity activeOpacity={0.75} style={style_1.default.qrButton} onPress={this.handleOnBarcodePress.bind(this, code, index)}>
                                    <mo_app_common_1.CustomIcon name={'use_qrcode'} size={35} style={{ color: '#fff' }}/>
                                </react_native_1.TouchableOpacity>

                                <react_native_1.Text style={[style_1.default.tabLabel, {
                    color: tintColor,
                    transform: [{ translateY: 0 }]
                },
            ]}>
                                    {route.label}
                                </react_native_1.Text>

                        </react_native_1.TouchableOpacity>);
        })}
            </react_native_1.Animated.View>);
    }
}
exports.default = BottomTab;
//# sourceMappingURL=index.js.map