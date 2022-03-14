"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import PropTypes from 'prop-types';
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
class StatusBarHeader extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() { }
    render() {
        const { scrollAnimation, bgColor, hasAnimation, } = this.props;
        const opacity = hasAnimation ? scrollAnimation.interpolate({
            inputRange: [0, mo_app_common_1.Constants.BarHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }) : 1;
        return (<react_native_1.Animated.View style={[
            styles.container,
            {
                backgroundColor: bgColor,
                zIndex: 20,
                opacity: opacity,
            },
        ]}/>);
    }
}
exports.default = StatusBarHeader;
StatusBarHeader.defaultProps = {
    bgColor: mo_app_common_1.Color.primary,
    hasAnimation: true,
};
const styles = react_native_1.StyleSheet.create({
    container: {
        position: 'absolute',
        height: mo_app_common_1.Constants.BarHeight,
        width: mo_app_common_1.Constants.Width,
        left: 0,
        top: 0,
        justifyContent: 'flex-start',
        backgroundColor: mo_app_common_1.Color.primary,
    },
});
//# sourceMappingURL=StatusBarHeader.js.map