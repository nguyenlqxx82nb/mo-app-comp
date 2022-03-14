"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_native_1 = require("react-native");
//const ViewPropTypes = require('react-native').ViewPropTypes || View.propTypes;
class DefaultMarker extends react_1.default.PureComponent {
    render() {
        return (<react_native_1.TouchableHighlight>
        <react_native_1.View style={this.props.enabled ? [
            this.props.markerStyle,
            this.props.pressed && styles.pressedMarkerStyle,
            this.props.pressed && this.props.pressedMarkerStyle,
        ] : [this.props.markerStyle, styles.disabled]}/>
      </react_native_1.TouchableHighlight>);
    }
}
exports.default = DefaultMarker;
DefaultMarker.propTypes = {
    pressed: prop_types_1.default.bool,
    pressedMarkerStyle: prop_types_1.default.object,
    markerStyle: prop_types_1.default.object,
    enabled: prop_types_1.default.bool,
    currentValue: prop_types_1.default.number,
    valuePrefix: prop_types_1.default.string,
    valueSuffix: prop_types_1.default.string,
};
const styles = react_native_1.StyleSheet.create({
    markerStyle: {
        ...react_native_1.Platform.select({
            ios: {
                height: 30,
                width: 30,
                borderRadius: 30,
            },
            android: {
                height: 12,
                width: 12,
                borderRadius: 12,
                backgroundColor: '#0D8675',
            },
        }),
    },
    pressedMarkerStyle: {
        ...react_native_1.Platform.select({
            ios: {},
            android: {
                height: 20,
                width: 20,
                borderRadius: 20,
            },
        }),
    },
    disabled: {
        backgroundColor: '#d3d3d3',
    },
});
//# sourceMappingURL=DefaultMarker.js.map