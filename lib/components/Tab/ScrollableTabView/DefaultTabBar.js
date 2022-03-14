"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require('react');
// const { ViewPropTypes } = ReactNative = require('react-native');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const react_native_1 = require("react-native");
const Button = require('./Button');
const DefaultTabBar = createReactClass({
    propTypes: {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
        textStyle: PropTypes.object,
        tabStyle: react_native_1.ViewPropTypes.style,
        renderTab: PropTypes.func,
        underlineStyle: react_native_1.ViewPropTypes.style,
    },
    getDefaultProps() {
        return {
            activeTextColor: 'navy',
            inactiveTextColor: 'black',
            backgroundColor: null,
        };
    },
    renderTabOption(_name, _page) {
    },
    renderTab(name, page, isTabActive, onPressHandler) {
        const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';
        return <Button style={{ flex: 1, }} key={name} accessible={true} accessibilityLabel={name} accessibilityTraits='button' onPress={() => onPressHandler(page)}>
      <react_native_1.View style={[styles.tab, this.props.tabStyle,]}>
        <react_native_1.Text style={[{ color: textColor, fontWeight, }, textStyle,]}>
          {name}
        </react_native_1.Text>
      </react_native_1.View>
    </Button>;
    },
    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: containerWidth / numberOfTabs,
            height: 4,
            backgroundColor: 'navy',
            bottom: 0,
        };
        const translateX = this.props.scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, containerWidth / numberOfTabs],
        });
        return (<react_native_1.View style={[styles.tabs, { backgroundColor: this.props.backgroundColor, }, this.props.style,]}>
        {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <react_native_1.Animated.View style={[
            tabUnderlineStyle,
            {
                transform: [
                    { translateX },
                ]
            },
            this.props.underlineStyle,
        ]}/>
      </react_native_1.View>);
    },
});
const styles = react_native_1.StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
});
module.exports = DefaultTabBar;
//# sourceMappingURL=DefaultTabBar.js.map