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
const mo_app_common_1 = require("mo-app-common");
const styles_1 = __importDefault(require("./styles"));
class Rating extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.onRatingHandler = (index) => {
            const { onRating } = this.props;
            this.setState({ rating: index });
            if (onRating) {
                onRating(index);
            }
        };
        this.setRate = (rate) => {
            this.setState({ rating: rate });
        };
        this.getRateValue = () => {
            return this.state.rating;
        };
        this.state = {
            rating: this.props.rating
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { rating } = this.props;
        if (nextProps.rating !== rating) {
            this.setState({ rating: nextProps.rating });
        }
    }
    render() {
        const { size, enable, style, } = this.props;
        const { rating } = this.state;
        // if (rating <= 3 && !enable) {
        //     this.setState({
        //         rating: 3,
        //     });
        // }
        // console.log('rating ', rating);
        const formatRating = Number(rating);
        const stars = [];
        let iconSize = 14;
        let right = 6;
        if (size === 'l') {
            iconSize = 26;
            right = 9;
        }
        else if (size === 'xl') {
            iconSize = 29;
            right = 13;
        }
        else if (size === 'm') {
            iconSize = 20;
            right = 6;
        }
        for (let i = 1; i < 6; i++) {
            let icName = 'full_star';
            if (i > formatRating) {
                icName = 'star1';
            }
            if (formatRating < i && formatRating > i - 1) {
                icName = 'half_star';
            }
            // const solid = (formatRating >= i) ? true : false;
            if (enable) {
                stars[i - 1] = (<react_native_1.TouchableOpacity key={i} onPress={this.onRatingHandler.bind(this, i)}>
                        <mo_app_common_1.CustomIcon key={i} name={icName} size={iconSize} style={[styles_1.default.icon, { marginRight: right }]}/>
                    </react_native_1.TouchableOpacity>);
            }
            else {
                stars[i - 1] = (<mo_app_common_1.CustomIcon key={i} name={icName} size={iconSize} style={[styles_1.default.icon, { marginRight: right }]}/>);
            }
        }
        return (<react_native_1.View style={[styles_1.default.container, style]}>{stars}</react_native_1.View>);
    }
}
Rating.defaultProps = {
    size: 's',
    color: mo_app_common_1.Color.secondary,
    rating: 5,
    enable: false
};
// Rating.propTypes = {
//   size: PropTypes.string,
//   color: PropTypes.string,
//   rating: PropTypes.any,
//   enable: PropTypes.bool,
//   onRating: PropTypes.func,
// };
// Rating.defaultProps = {
//   size: 's', //s:small,m:medium,l:large
//   color: Color.accent,
//   rating: 5,
//   enable: false
// };
exports.default = Rating;
//# sourceMappingURL=index.js.map