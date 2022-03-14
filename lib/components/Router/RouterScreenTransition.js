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
exports.ScreenTransition = exports.RouterScreenTransition = void 0;
// @flow
const React = __importStar(require("react"));
const react_native_shared_element_1 = require("react-native-shared-element");
const RouterScreenTransitionContext_1 = require("./RouterScreenTransitionContext");
exports.RouterScreenTransition = RouterScreenTransitionContext_1.withScreenTransitionContext(class RouterScreenTransition extends React.Component {
    constructor(props) {
        super(props);
        this._sharedId = '';
        this.onSetNode = (node) => {
            if (this._node === node) {
                return;
            }
            if (this._node && this._sharedId) {
                this.props.screenTransitionContext.removeSharedElement(this._sharedId, this._node);
            }
            this._node = node;
            if (this._node && this._sharedId) {
                this.props.screenTransitionContext.addSharedElement(this._sharedId, this._node);
            }
            this._node = node;
        };
        this._sharedId = props.sharedId;
    }
    componentDidUpdate() {
        const { sharedId, screenTransitionContext } = this.props;
        if (this._sharedId !== sharedId) {
            if (this._sharedId && this._node) {
                screenTransitionContext.removeSharedElement(this._sharedId, this._node);
            }
            this._sharedId = sharedId;
            if (this._sharedId && this._node) {
                screenTransitionContext.addSharedElement(this._sharedId, this._node);
            }
        }
    }
    render() {
        const { sharedId, screenTransitionContext, ...otherProps } = this.props;
        let _props = { ...otherProps };
        return <react_native_shared_element_1.SharedElement {..._props} onNode={this.onSetNode}/>;
    }
});
exports.ScreenTransition = exports.RouterScreenTransition;
//# sourceMappingURL=RouterScreenTransition.js.map