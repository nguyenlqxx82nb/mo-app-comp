"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const ButtonRipple_1 = __importDefault(require("../ButtonRipple"));
const BackButton = (props) => {
    const { onBack } = props;
    return (<react_native_1.View style={styles.backButton}>
          <ButtonRipple_1.default name={'Back'} size={16} color={mo_app_common_1.Color.text} onPress={() => {
        onBack();
    }}/>
        </react_native_1.View>);
};
BackButton.propTypes = {
    onBack: prop_types_1.default.func,
};
BackButton.defaultProps = {
    onBack: {}
};
const styles = react_native_1.StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: mo_app_common_1.Constants.BarHeight + 2.5,
        left: 5,
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 20
    }
});
exports.default = BackButton;
//# sourceMappingURL=index.js.map