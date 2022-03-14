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
exports.SharedElement = exports.CompatSharedElement = void 0;
const React = __importStar(require("react"));
const RouterScreenTransition_1 = require("./RouterScreenTransition");
class CompatSharedElement extends React.Component {
    render() {
        const { navigation, id, ...otherProps } = this.props;
        // return navigation ? (
        //   <ReactNavigationCoreSharedElement id={id} {...otherProps} />
        // ) : (
        //   <RouterScreenTransition sharedId={id} {...otherProps} />
        // );
        return <RouterScreenTransition_1.RouterScreenTransition sharedId={id} {...otherProps}/>;
    }
}
exports.CompatSharedElement = CompatSharedElement;
exports.SharedElement = CompatSharedElement;
//# sourceMappingURL=CompatSharedElement.js.map