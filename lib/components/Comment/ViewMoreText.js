"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const prop_types_1 = __importDefault(require("prop-types"));
const styles = react_native_1.StyleSheet.create({
    fullTextWrapper: {
        opacity: 0,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    viewMoreText: {
        color: 'blue',
    },
    transparent: {
        opacity: 0,
    },
});
class ViewMoreText extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.trimmedTextHeight = null;
        this.fullTextHeight = null;
        this.shouldShowMore = false;
        this.hideFullText = () => {
            if (this.state.isFulltextShown &&
                this.trimmedTextHeight &&
                this.fullTextHeight) {
                this.shouldShowMore = this.trimmedTextHeight < this.fullTextHeight;
                this.setState({
                    isFulltextShown: false,
                });
            }
        };
        this.onLayoutTrimmedText = (event) => {
            const { height, } = event.nativeEvent.layout;
            console.log("onLayoutTrimmedText: ok");
            this.trimmedTextHeight = height;
            this.hideFullText();
        };
        this.onLayoutFullText = (event) => {
            const { height, } = event.nativeEvent.layout;
            this.fullTextHeight = height;
            this.hideFullText();
        };
        this.onPressMore = () => {
            this.setState({
                numberOfLines: null,
            }, () => {
                this.props.afterExpand();
            });
        };
        this.onPressLess = () => {
            this.setState({
                numberOfLines: this.props.numberOfLines,
            }, () => {
                this.props.afterCollapse();
            });
        };
        this.getWrapperStyle = () => {
            if (this.state.isFulltextShown) {
                return styles.transparent;
            }
            return {};
        };
        this.renderViewMore = () => (<react_native_1.Text style={styles.viewMoreText} onPress={this.onPressMore}>
      View More
    </react_native_1.Text>);
        this.renderViewLess = () => (<react_native_1.Text style={styles.viewMoreText} onPress={this.onPressLess}>
      View Less
    </react_native_1.Text>);
        this.renderFooter = () => {
            const { numberOfLines, } = this.state;
            if (this.shouldShowMore === true) {
                if (numberOfLines > 0) {
                    return (this.props.renderViewMore || this.renderViewMore)(this.onPressMore);
                }
                return (this.props.renderViewLess || this.renderViewLess)(this.onPressLess);
            }
            return null;
        };
        this.renderFullText = () => {
            if (this.state.isFulltextShown) {
                return (<react_native_1.View onLayout={this.onLayoutFullText} style={styles.fullTextWrapper}>
          <react_native_1.Text style={this.props.textStyle}>{this.props.children}</react_native_1.Text>
        </react_native_1.View>);
            }
            return null;
        };
        this.state = {
            isFulltextShown: true,
            numberOfLines: this.props.numberOfLines,
            text: this.props.children
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const newText = nextProps.children;
        const text = this.state.text;
        if (text != null && newText != text) {
            this.setState({
                isFulltextShown: true,
                text: newText
            }, () => {
                this.trimmedTextHeight = null;
                this.fullTextHeight = null;
                this.hideFullText();
            });
        }
    }
    componentWillUpdate() {
    }
    render() {
        return (<react_native_1.View style={this.getWrapperStyle()}>
        <react_native_1.View onLayout={this.onLayoutTrimmedText}>
          <react_native_1.Text style={this.props.textStyle} numberOfLines={this.state.numberOfLines}>
            {this.props.children}
          </react_native_1.Text>
          {this.renderFooter()}
        </react_native_1.View>

        {this.renderFullText()}
      </react_native_1.View>);
    }
}
ViewMoreText.propTypes = {
    renderViewMore: prop_types_1.default.func,
    renderViewLess: prop_types_1.default.func,
    afterCollapse: prop_types_1.default.func,
    afterExpand: prop_types_1.default.func,
    numberOfLines: prop_types_1.default.number.isRequired,
    textStyle: prop_types_1.default.oneOfType([prop_types_1.default.object, prop_types_1.default.array]),
};
ViewMoreText.defaultProps = {
    afterCollapse: () => { },
    afterExpand: () => { },
    textStyle: {},
};
exports.default = ViewMoreText;
//# sourceMappingURL=ViewMoreText.js.map