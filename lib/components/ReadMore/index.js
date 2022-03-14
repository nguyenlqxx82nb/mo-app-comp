"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
class ReadMore extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            measured: false,
            shouldShowReadMore: false,
            showAllText: false
        };
        this._handlePressReadMore = () => {
            this.setState({ showAllText: true });
        };
        this._handlePressReadLess = () => {
            this.setState({ showAllText: false });
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.handleComponentMount();
        }, 0);
    }
    async handleComponentMount() {
        this._isMounted = true;
        await nextFrameAsync();
        if (!this._isMounted) {
            return;
        }
        // Get the height of the text with no restriction on number of lines
        const fullHeight = await measureHeightAsync(this._text);
        this.setState({ measured: true });
        await nextFrameAsync();
        if (!this._isMounted) {
            return;
        }
        // Get the height of the text now that number of lines has been set
        const limitedHeight = await measureHeightAsync(this._text);
        if (fullHeight > limitedHeight) {
            this.setState({ shouldShowReadMore: true }, () => {
                this.props.onReady && this.props.onReady();
            });
        }
        else {
            this.props.onReady && this.props.onReady();
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        let { measured, showAllText } = this.state;
        let { numberOfLines } = this.props;
        return (<react_native_1.View>
        <react_native_1.Text numberOfLines={measured && !showAllText ? numberOfLines : 0} ref={text => {
            this._text = text;
        }}>
          {this.props.children}
        </react_native_1.Text>

        {this._maybeRenderReadMore()}
      </react_native_1.View>);
    }
    _maybeRenderReadMore() {
        let { shouldShowReadMore, showAllText } = this.state;
        if (shouldShowReadMore && !showAllText) {
            if (this.props.renderTruncatedFooter) {
                return this.props.renderTruncatedFooter(this._handlePressReadMore);
            }
            return (<react_native_1.Text style={styles.button} onPress={this._handlePressReadMore}>
          {mo_app_common_1.CommonLanguage.ViewMore}
        </react_native_1.Text>);
        }
        else if (shouldShowReadMore && showAllText) {
            if (this.props.renderRevealedFooter) {
                return this.props.renderRevealedFooter(this._handlePressReadLess);
            }
            return (<react_native_1.Text style={styles.button} onPress={this._handlePressReadLess}>
          {mo_app_common_1.CommonLanguage.Compact}
        </react_native_1.Text>);
        }
    }
}
exports.default = ReadMore;
function measureHeightAsync(component) {
    return new Promise(resolve => {
        component.measure((_x, _y, _w, h) => {
            resolve(h);
        });
    });
}
function nextFrameAsync() {
    return new Promise(resolve => requestAnimationFrame(() => resolve(100)));
}
const styles = react_native_1.StyleSheet.create({
    button: {
        color: mo_app_common_1.Color.primary,
        marginTop: 5
    }
});
//# sourceMappingURL=index.js.map