"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
//import FastImage from 'react-native-fast-image';
class AsyncImage extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this._onLoad = () => {
            this.setState({ loaded: true });
        };
        this.state = { loaded: false };
    }
    render() {
        const { source, placeholderColor, style } = this.props;
        return (<react_native_1.View style={style}>
                <react_native_1.Image style={[style, { position: 'absolute' }]} source={source && source.uri ? source : require('../../images/photo_default.png')} onLoad={this._onLoad}/>
                {!this.state.loaded &&
            <react_native_1.View style={[style, { position: 'absolute', backgroundColor: placeholderColor }]}/>}
            </react_native_1.View>);
    }
}
exports.default = AsyncImage;
AsyncImage.defaultProps = {
    placeholderColor: mo_app_common_1.Color.border,
};
//# sourceMappingURL=index.js.map