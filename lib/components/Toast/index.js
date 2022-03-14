"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const mo_app_common_1 = require("mo-app-common");
const mo_app_redux_1 = require("mo-app-redux");
const _ = require('lodash');
class Toast extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.nextToastId = 0;
        this.renderToast = this.renderToast.bind(this);
    }
    componentDidMount() {
        this.toastListener = react_native_1.DeviceEventEmitter.addListener(mo_app_common_1.Constants.EmitCode.Toast, this.doToast.bind(this));
    }
    componentWillUnmount() {
        this.toastListener.remove();
    }
    shouldComponentUpdate() {
        react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
        return true;
    }
    render() {
        const { toast } = this.props;
        return (<react_native_1.View style={styles.container}>
            {toast.list.map(this.renderToast)}
        </react_native_1.View>);
    }
    renderToast(msg, index) {
        if ((msg && !msg.msg) || (msg && _.isObject(msg.msg))) {
            return null;
        }
        const { removeToast } = this.props;
        const onPress = () => removeToast(msg.key);
        return (<react_native_1.TouchableOpacity key={index} style={[styles.textWrap, msg.type === 'error' ? { backgroundColor: mo_app_common_1.Color.red } : {}]} onPress={onPress}>
                <react_native_1.Text numberOfLines={4} style={styles.text}>{msg.msg}</react_native_1.Text>
            </react_native_1.TouchableOpacity>);
    }
    doToast(msg, type = 'error', duration = 4000) {
        const { addToast, removeToast } = this.props;
        const key = this.nextToastId++; // unique message key
        addToast(msg, type, key);
        // console.log('doToast ', msg, ';', Languages.ProcessError);
        if (msg && msg.trim() === mo_app_common_1.CommonLanguage.ProcessError.trim()) {
            duration = 60000;
        }
        // console.log('doToast ', msg,';',Languages.ProcessError, duration);
        mo_app_common_1.Timer.setTimeout(() => removeToast(key), duration);
    }
}
const styles = react_native_1.StyleSheet.create({
    bottom: {
        height: mo_app_common_1.Device.isIphoneX ? 34 : 0,
        width: '100%',
        backgroundColor: mo_app_common_1.Color.secondary,
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 9999,
        // backgroundColor: Color.secondary,
        padding: 0,
        flexDirection: 'column',
    },
    textWrap: {
        paddingTop: 10,
        paddingHorizontal: 25,
        borderRadius: 0,
        margin: 0,
        flexGrow: 1,
        flex: 1,
        backgroundColor: mo_app_common_1.Color.secondary,
        width: '100%',
        paddingBottom: mo_app_common_1.Device.isIphoneX ? 44 : 10,
    },
    text: {
        color: '#FFFFFF',
        fontFamily: mo_app_common_1.Constants.fontMedium,
        fontSize: 14,
        lineHeight: 18,
    },
});
const mapStateToProps = (state) => {
    return {
        toast: state.toast,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToast: (msg, type, key) => dispatch(mo_app_redux_1.ToastActions.addToast(msg, type, key)),
        removeToast: (msg) => dispatch(mo_app_redux_1.ToastActions.removeToast(msg)),
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Toast);
//# sourceMappingURL=index.js.map