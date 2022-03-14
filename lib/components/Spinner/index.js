"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mode = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const SIZES = {
    SMALL: 'small',
    LARGE: 'large',
};
exports.Mode = {
    normal: 'normal',
    full: 'full',
    overlay: 'overlay',
};
class Spinner extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this._timeoutProcessing = false;
        this._timeoutId = null;
        this.state = {
            isLoading: true,
        };
    }
    componentDidMount() {
        // this.toastListener = EventEmitter.addListener(
        //   Constants.EmitCode.Spinner,
        //   this.doSpinner.bind(this)
        // );
    }
    componentWillUnmount() {
        // this.toastListener.remove();
    }
    render() {
        const { size, color, mode, transparent, } = this.props;
        const { isLoading } = this.state;
        let containerStyle = styles.container;
        switch (mode) {
            case exports.Mode.full:
                containerStyle = styles.container_full_stretch;
                break;
            case exports.Mode.overlay:
                containerStyle = styles.container_overlay;
                break;
        }
        if (transparent) {
            containerStyle = {
                ...containerStyle, ...{ backgroundColor: 'transparent' },
            };
        }
        if (isLoading) {
            return (<react_native_1.View style={{ flex: 1, position: 'absolute' }}>
          <react_native_1.Modal animationType="none" transparent visible={this.state.isLoading} onRequestClose={() => {
                this.setState({ isLoading: false });
            }}>
            <react_native_1.View style={containerStyle}>
                <react_native_1.ActivityIndicator size={size} color={color} style={[
                styles.wrapper,
                { borderRadius: size === SIZES.SMALL ? 10 : 20 },
            ]}/>
            </react_native_1.View>
          </react_native_1.Modal>
        </react_native_1.View>);
        }
        else {
            return (<react_native_1.View />);
        }
    }
}
Spinner.defaultProps = {
    color: mo_app_common_1.Color.primary,
    size: 'large',
    mode: exports.Mode.overlay,
    timeout: 25000,
};
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        height: undefined,
        width: undefined,
    },
    container_full_stretch: {
        flexGrow: 1,
        height: undefined,
        width: undefined,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_overlay: {
        flex: 1,
        // backgroundColor: '#',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        backgroundColor: 'transparent',
        zIndex: 100,
    },
});
Spinner.defaultProps = {
    color: mo_app_common_1.Color.primary,
    size: 'large',
    mode: exports.Mode.overlay,
    timeout: 25000,
};
exports.default = Spinner;
//# sourceMappingURL=index.js.map