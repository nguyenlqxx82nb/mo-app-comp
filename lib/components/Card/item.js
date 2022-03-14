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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const index_1 = require("../index");
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
class CardItem extends react_1.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { title, content, height, headerStyle, containerStyle } = this.props;
        return (<react_native_1.View style={[styles.container, containerStyle]}>
                <react_native_linear_gradient_1.default start={{ x: 1.0, y: 0.7 }} end={{ x: 0, y: 0.3 }} colors={['#9AD07C', '#73C689', '#52BC95', '#44B38A', '#24AAA9', '#19A7B6']} style={[styles.header, headerStyle]}>
                    <index_1.WrapText st={{ color: '#fff' }}> {title} </index_1.WrapText>
                </react_native_linear_gradient_1.default>
                <react_native_1.View style={[styles.content, height ? { height: height } : {}]}>
                    {content}
                </react_native_1.View>
            </react_native_1.View>);
    }
}
exports.default = CardItem;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        margin: 3,
        marginHorizontal: 14,
        marginTop: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    header: {
        height: 37,
        paddingHorizontal: 16,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flexDirection: 'column'
    },
    content: {
        flexDirection: 'column',
        paddingHorizontal: 14,
        paddingVertical: 12,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }
});
//# sourceMappingURL=item.js.map