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
const Header_1 = __importDefault(require("../Header"));
const styles_1 = __importDefault(require("./styles"));
let { width } = react_native_1.Dimensions.get('window');
class Tab extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.onChangeIndexHandle = (index) => {
            const { onSelectTabChange } = this.props;
            this.setState({
                currentIndex: index,
            });
            if (onSelectTabChange) {
                onSelectTabChange(index);
            }
        };
        this.scrollChange = (scrollY) => {
            this.tabHeader.scrollChange(scrollY);
        };
        this.getCurrentIndex = () => {
            const { currentIndex } = this.state;
            return currentIndex;
        };
        this.updateBadge = (index, badgeNumber) => {
            this.tabHeader.updateBadge(index, badgeNumber);
        };
        this.onTabPressHandler = (index) => {
            const { onTabPress } = this.props;
            if (onTabPress) {
                onTabPress(index);
            }
        };
        this.state = {
            currentIndex: this.props.currentIndex,
        };
    }
    componentDidMount() { }
    render() {
        const { tabs, tabHeader } = this.props;
        const { currentIndex } = this.state;
        return (<react_native_1.View style={{ flex: 1 }}>
                {tabs.map((tab, index) => {
            let left = (currentIndex === index) ? 0 : width * 2;
            return (<react_native_1.View key={`${index}`} style={[styles_1.default.contentContainer, { left: left }]}>
                                {tab.renderContent()}
                            </react_native_1.View>);
        })}
                <Header_1.default ref={(comp) => { this.tabHeader = comp; }} tabs={tabHeader} currentIndex={currentIndex} onChangeIndex={this.onChangeIndexHandle} onTabPress={this.onTabPressHandler}/>
            </react_native_1.View>);
    }
}
Tab.defaultProps = {
    tabs: [],
    tabHeader: [],
    currentIndex: 0,
};
exports.default = Tab;
//# sourceMappingURL=index.js.map