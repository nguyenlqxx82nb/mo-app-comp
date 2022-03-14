"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const mo_app_common_1 = require("mo-app-common");
const index_1 = require("../index");
// import { WrapText } from '@components';
// import AutoHeightImage from 'react-native-auto-height-image';
// import LinearGradient from 'react-native-linear-gradient';
// import styles from './styles';
class CardItem2 extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.onPressItemHandler = () => {
            const { onPress } = this.props;
            if (onPress) {
                onPress();
            }
        };
    }
    render() {
        const { imageSource, content, width, contentHeight, style, imageRatio, contentStyle, statusItem } = this.props;
        return (<react_native_1.TouchableWithoutFeedback onPress={this.onPressItemHandler.bind(this)}>
                <react_native_1.View style={[styles.container, style, { width: width }]}>
                    <index_1.AsyncImage source={imageSource} style={[styles.image, { width: width, height: width * imageRatio }]}/>
                    <react_native_1.View style={[styles.content, contentStyle, { height: contentHeight, width: width }]}>
                        {content}
                    </react_native_1.View>
                    {statusItem && statusItem}
                </react_native_1.View>
            </react_native_1.TouchableWithoutFeedback>
        // <ButtonRipple
        //     width={width}
        //     height={height}
        //     color={Color.primary}
        //     maxOpacity={0.2}
        //     containerStyle={[styles.container, containerStyle, {width: width, height: height}]}
        //     onPress={this.onPressItemHandler.bind(this)}
        //     content={<View style={{width: width, height: height}}>
        //                 <Image source={imageUrl} style={[styles.image, {width: width}]}  />
        //                 <View style={[styles.content, {height: contentHeight, width: width}]}>
        //                     { content }
        //                 </View>
        //             </View>}
        // />
        );
    }
}
exports.default = CardItem2;
CardItem2.defaultProps = {
    width: mo_app_common_1.Constants.Width - 28,
    height: (mo_app_common_1.Constants.Width - 28) / 2 - 10 + 70,
    contentHeight: 70,
    imageRatio: 9 / 16,
    contentStyle: {}
};
const styles = react_native_1.StyleSheet.create({
    container: {
        margin: 3,
        borderRadius: 8,
        backgroundColor: mo_app_common_1.Color.border,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 14,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    image: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    content: {
        borderRadius: 8,
        marginTop: -10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        zIndex: 0,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    }
});
//# sourceMappingURL=item2.js.map