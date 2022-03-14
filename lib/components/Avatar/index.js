"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
// import DefaultAvatar from '../../images/svg/default_avatar.svg';
class AvatarImage extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.fixAvatar = (avatar = '') => {
            if (avatar) {
                return avatar.replace('http://', 'https://');
            }
            return avatar;
        };
        this.state = { loaded: false };
    }
    render() {
        const { avatar, width, style, border, containerStyle } = this.props;
        const borderStyle = border > 0 ? { borderWidth: border, borderColor: mo_app_common_1.Color.primary, borderRadius: width / 2 + border, width: width + border * 2, height: width + border * 2 } : {};
        const hasBorder = border > 0 ? true : false;
        if (avatar) {
            const fix_avatar = this.fixAvatar(avatar);
            if (hasBorder) {
                return (<react_native_1.View style={[borderStyle, containerStyle]}>
                        <react_native_1.Image style={[{ width: width, height: width, borderRadius: width / 2 }, style]} source={{ uri: fix_avatar }}/>
                    </react_native_1.View>);
            }
            return (<react_native_1.Image style={[{ width: width, height: width, borderRadius: width / 2 }, style, containerStyle]} source={{ uri: fix_avatar }}/>);
        }
        return <react_native_1.View />;
        // if (hasBorder) {
        //     return (
        //         <View style={[borderStyle, containerStyle]}>
        //             <DefaultAvatar width={width} height={width}  />
        //         </View>
        //     );
        // }
        // return (<DefaultAvatar width={width} height={width} />);
    }
}
exports.default = AvatarImage;
AvatarImage.defaultProps = {
    width: 32,
    border: 0,
};
//# sourceMappingURL=index.js.map