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
exports.withScreenTransitionContext = exports.ScreenTransitionContext = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_shared_element_1 = require("react-native-shared-element");
// $FlowFixMe
const Context = react_1.createContext(undefined);
class ScreenTransitionContext extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this._sharedElementNodes = {};
        this.state = {
            sharedElementNodes: this._sharedElementNodes,
        };
        this.onSetRef = (ref) => {
            this._sharedElementAncestor = react_native_shared_element_1.nodeFromRef(ref);
        };
    }
    render() {
        const { onSharedElementsUpdated, style, ...otherProps } = this.props;
        return (<react_native_1.View style={style} collapsable={false} ref={this.onSetRef}>
        <Context.Provider value={this} {...otherProps}/>
      </react_native_1.View>);
    }
    componentDidUpdate(_prevProps, prevState) {
        if (prevState === this.state) {
            return;
        }
        const { children, onSharedElementsUpdated } = this.props;
        const { sharedElementNodes } = this.state;
        if (onSharedElementsUpdated) {
            onSharedElementsUpdated({
                children,
                ancestor: this._sharedElementAncestor,
                nodes: sharedElementNodes,
            });
        }
    }
    addSharedElement(sharedId, node) {
        // console.log('ScreenTransitionContext.add: ', sharedId);
        const sharedElementNodes = { ...this._sharedElementNodes };
        sharedElementNodes[sharedId] = node;
        this._sharedElementNodes = sharedElementNodes;
        this.setState({
            sharedElementNodes,
        });
    }
    removeSharedElement(sharedId, _node) {
        // console.log('ScreenTransitionContext.remove: ', sharedId);
        const sharedElementNodes = { ...this._sharedElementNodes };
        delete sharedElementNodes[sharedId];
        this._sharedElementNodes = sharedElementNodes;
        this.setState({
            sharedElementNodes,
        });
    }
}
exports.ScreenTransitionContext = ScreenTransitionContext;
function withScreenTransitionContext(WrappedComponent) {
    const comp = (props) => {
        return (<Context.Consumer>
        {value => (<WrappedComponent {...props} screenTransitionContext={value}/>)}
      </Context.Consumer>);
    };
    if (WrappedComponent.propTypes) {
        const propTypes = {
            ...WrappedComponent.propTypes,
        };
        delete propTypes.screenTransitionContext;
        comp.propTypes = propTypes;
    }
    comp.defaultProps = WrappedComponent.defaultProps;
    return comp;
}
exports.withScreenTransitionContext = withScreenTransitionContext;
//# sourceMappingURL=RouterScreenTransitionContext.js.map