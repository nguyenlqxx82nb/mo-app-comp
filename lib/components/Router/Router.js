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
exports.Router = void 0;
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_shared_element_1 = require("react-native-shared-element");
const RouterScreenTransitionContext_1 = require("./RouterScreenTransitionContext");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const mo_app_common_1 = require("mo-app-common");
const transitions_1 = require("./transitions");
const Screens = __importStar(require("react-native-screens"));
const SharedElement_1 = require("./types/SharedElement");
Screens.enableScreens(true);
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
    node: {
        ...react_native_1.StyleSheet.absoluteFillObject,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 7,
        elevation: 9,
        backgroundColor: '#fff'
    },
    swipeBackOverlay: {
        position: 'absolute',
        left: 0,
        top: 80,
        bottom: 0,
        width: 15,
    },
    sharedElements: {
        ...react_native_1.StyleSheet.absoluteFillObject,
        zIndex: 1000,
    },
});
let router;
let AnimatedScreen;
const MaybeScreenContainer = (props) => {
    if (Screens.screensEnabled()) {
        return <Screens.ScreenContainer {...props}/>;
    }
    return <react_native_1.View {...props}/>;
};
const AnimatedRouterScreen = (props) => {
    const { active, ...otherProps } = props;
    // console.log('AnimatedRouterScreen ', Screens.screensEnabled());
    if (Screens.screensEnabled()) {
        AnimatedScreen =
            AnimatedScreen || react_native_1.Animated.createAnimatedComponent(Screens.NativeScreen);
        return <AnimatedScreen active={active} {...otherProps}/>;
    }
    return <react_native_1.Animated.View {...otherProps}/>;
};
class Router extends React.PureComponent {
    constructor(props) {
        super(props);
        this._animValue = new react_native_1.Animated.Value(0);
        this._swipeBackAnimValue = new react_native_1.Animated.Value(0);
        this._onSwipeBackGestureEvent = react_native_1.Animated.event([{ nativeEvent: { translationX: this._swipeBackAnimValue } }], { useNativeDriver: true });
        this._onSwipeBackStateChange = (event) => {
            const { width } = this.state;
            const { nativeEvent } = event;
            switch (nativeEvent.state) {
                case react_native_gesture_handler_1.State.ACTIVE:
                    // console.log("SWIPE ACTIVE: ", nativeEvent);
                    this.setState({
                        nextIndex: Math.max(this.state.nextIndex - 1, 0),
                    });
                    break;
                case react_native_gesture_handler_1.State.CANCELLED:
                    // console.log("SWIPE CANCEL: ", nativeEvent);
                    this.setState({
                        nextIndex: this.state.prevIndex,
                    });
                    break;
                case react_native_gesture_handler_1.State.END:
                    // console.log("SWIPE END: ", nativeEvent);
                    if (nativeEvent.velocityX >= 1000 ||
                        (nativeEvent.velocityX > -1000 &&
                            nativeEvent.translationX >= width / 2)) {
                        react_native_1.Animated.timing(this._swipeBackAnimValue, {
                            toValue: width,
                            duration: 100,
                            useNativeDriver: true,
                        }).start(({ finished }) => {
                            if (finished) {
                                this.pruneStack(this.state.nextIndex + 1);
                                this._swipeBackAnimValue.setValue(0);
                                this._animValue.setValue(this.state.nextIndex);
                            }
                        });
                    }
                    else {
                        react_native_1.Animated.timing(this._swipeBackAnimValue, {
                            toValue: 0,
                            duration: 100,
                            useNativeDriver: true,
                        }).start(({ finished }) => {
                            if (finished) {
                                this.setState({
                                    nextIndex: this.state.prevIndex,
                                });
                            }
                        });
                    }
                    break;
                case react_native_gesture_handler_1.State.BEGAN:
                    // console.log("SWIPE BEGAN: ", nativeEvent);
                    break;
                default:
                    // console.log("SWIPE UNKNOWN STATE: ", nativeEvent);
                    break;
            }
        };
        this.onLayout = (event) => {
            const { width, height } = event.nativeEvent.layout;
            if (this.state.width !== width || this.state.height !== height) {
                this.setState({
                    width,
                    height,
                    animValue: react_native_1.Animated.subtract(this._animValue, this._swipeBackAnimValue.interpolate({
                        inputRange: [0, width],
                        outputRange: [0, 1],
                        extrapolate: 'clamp',
                    })),
                });
            }
        };
        this.onSharedElementsUpdated = (event) => {
            const { stack, sharedElementScreens } = this.state;
            const index = stack.indexOf(event.children);
            if (index < 0) {
                return;
            }
            const newSharedElementScreens = [...sharedElementScreens];
            newSharedElementScreens[index] = event;
            this.setState({
                sharedElementScreens: newSharedElementScreens,
            });
        };
        this.onHardwareBackPress = () => {
            if (mo_app_common_1.Constants.ModalShowing) {
                return true;
            }
            if (this.state.stack.length > 1) {
                this.backCount = 0;
                this.pop();
                return true;
            }
            if (this.backCount === 1) {
                return false;
            }
            this.backCount += 1;
            setTimeout(() => {
                this.backCount = 0;
            }, 5000);
            if (this.backCount === 1) {
                mo_app_common_1.toast('Bấm back lần nữa để thoát ứng dụng', 'normal');
                return true;
            }
            return true;
        };
        router = this; //eslint-disable-line consistent-this
        this.backCount = 0;
        this.state = {
            stack: [props.initialNode],
            actionsQueue: [],
            prevIndex: 0,
            nextIndex: 0,
            animValue: react_native_1.Animated.subtract(this._animValue, this._swipeBackAnimValue.interpolate({
                inputRange: [0, react_native_1.Dimensions.get('window').width],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            })),
            sharedElementScreens: [],
            sharedElementsConfig: undefined,
            transitionConfig: undefined,
            width: react_native_1.Dimensions.get('window').width,
            height: react_native_1.Dimensions.get('window').height,
        };
    }
    componentDidMount() {
        this._backHandler = react_native_1.BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress);
    }
    componentWillUnmount() {
        this._backHandler.remove();
    }
    renderSharedElementTransitions() {
        const { prevIndex, nextIndex, stack, sharedElementScreens, sharedElementsConfig, transitionConfig, animValue, } = this.state;
        //if (!sharedElementConfig) return;
        if (prevIndex === nextIndex && nextIndex === stack.length - 1) {
            // console.log('renderSharedElementTransitions: null');
            return null;
        }
        const startIndex = Math.min(prevIndex, nextIndex);
        const endIndex = startIndex + 1;
        if (!sharedElementsConfig || !transitionConfig) {
            return;
        }
        const { debug } = transitionConfig;
        const startScreen = sharedElementScreens[startIndex];
        const endScreen = sharedElementScreens[endIndex];
        const nodes = sharedElementsConfig.map(sharedElementConfig => {
            const { id, otherId, ...other } = sharedElementConfig;
            const node = {
                id,
                start: {
                    node: startScreen ? startScreen.nodes[id] : undefined,
                    ancestor: startScreen ? startScreen.ancestor : undefined,
                },
                end: {
                    node: endScreen ? endScreen.nodes[id] : undefined,
                    ancestor: endScreen ? endScreen.ancestor : undefined,
                },
                ...other,
                debug: sharedElementConfig.debug || debug,
            };
            return node;
        });
        // console.log('renderSharedElementTransitions: ', nodes);
        const position = react_native_1.Animated.subtract(animValue, startIndex);
        return (<react_native_1.View style={styles.sharedElements} pointerEvents="none">
        {nodes.map(({ id, ...other }) => (<react_native_shared_element_1.SharedElementTransition key={`SharedElementTransition.${id}`} {...other} position={position}/>))}
      </react_native_1.View>);
    }
    renderBackSwiper() {
        const { nextIndex, prevIndex, stack } = this.state;
        if (!nextIndex && !prevIndex && stack.length <= 1) {
            return;
        }
        return (<react_native_gesture_handler_1.PanGestureHandler minDist={5} onGestureEvent={this._onSwipeBackGestureEvent} onHandlerStateChange={this._onSwipeBackStateChange}>
        <react_native_1.Animated.View style={styles.swipeBackOverlay} collapsable={false}/>
      </react_native_gesture_handler_1.PanGestureHandler>);
    }
    render() {
        const { stack, animValue, nextIndex, prevIndex, width, height } = this.state;
        const transitionConfig = this.state.transitionConfig || this.props.transitionConfig;
        // const nodeLength = stack.length;
        return (<react_native_1.View style={styles.container} onLayout={this.onLayout}>
        <MaybeScreenContainer style={react_native_1.StyleSheet.absoluteFill}>
          {stack.map((node, index) => {
            const isScreenActive = index === nextIndex || index === prevIndex ? 1 : 0;
            return (<AnimatedRouterScreen key={`screen${index}`} active={isScreenActive} pointerEvents={index === nextIndex ? 'auto' : 'none'} style={[
                styles.node,
                styles.shadow,
                this._action === 'replace' ? {} :
                    transitionConfig.screenInterpolator({
                        layout: {
                            initHeight: height,
                            initWidth: width,
                        },
                        position: animValue,
                        // progress,
                        index,
                        scene: {
                            index,
                        },
                    }),
            ]}>
                <RouterScreenTransitionContext_1.ScreenTransitionContext style={react_native_1.StyleSheet.absoluteFill} onSharedElementsUpdated={this.onSharedElementsUpdated}>
                  {node}
                </RouterScreenTransitionContext_1.ScreenTransitionContext>
              </AnimatedRouterScreen>);
        })}
        </MaybeScreenContainer>
        {this.renderSharedElementTransitions()}
        {this.renderBackSwiper()}
      </react_native_1.View>);
    }
    replace(node, config) {
        const action = {
            action: 'replace',
            node,
            config,
        };
        this._action = 'replace';
        this.handleAction(action);
    }
    push(node, config) {
        const { nextIndex, prevIndex } = this.state;
        const action = {
            action: 'push',
            node,
            config,
        };
        this._action = 'push';
        if (nextIndex !== prevIndex) {
            this.setState({
                actionsQueue: [...this.state.actionsQueue, action],
            });
        }
        else {
            this.handleAction(action);
        }
    }
    pop(config) {
        const { nextIndex, prevIndex } = this.state;
        const action = {
            action: 'pop',
            config,
        };
        this._action = 'pop';
        if (nextIndex !== prevIndex) {
            this.setState({
                actionsQueue: [...this.state.actionsQueue, action],
            });
        }
        else {
            this.handleAction(action);
        }
    }
    handleAction({ action, config, node }) {
        const { stack, nextIndex, sharedElementScreens } = this.state;
        const transitionConfig = config && config.transitionConfig
            ? config.transitionConfig
            : this.props.transitionConfig;
        const sharedElementsConfig = SharedElement_1.normalizeSharedElementsConfig(config ? config.sharedElements : undefined);
        // console.log('handleAction ', action, transitionConfig);
        if (action === 'replace') {
            this.setState({
                // $FlowFixMe
                stack: [node],
                nextIndex: 0,
                prevIndex: 0,
                actionsQueue: [],
                sharedElementScreens: [],
                sharedElementsConfig,
                transitionConfig: undefined,
            });
            return;
        }
        if (action === 'push') {
            this.setState({
                // $FlowFixMe
                stack: [...stack, node],
                nextIndex: nextIndex + 1,
                sharedElementScreens: [...sharedElementScreens, undefined],
                sharedElementsConfig,
                transitionConfig,
            });
            const { transitionSpec } = transitionConfig;
            const { timing, ...spec } = transitionSpec;
            const anim = timing.call(react_native_1.Animated, this._animValue, {
                ...spec,
                toValue: stack.length,
            });
            anim.start(({ finished }) => {
                if (finished) {
                    this.pruneStack(stack.length + 1);
                }
            });
        }
        else {
            if (stack.length <= 1) {
                return;
            }
            this.setState({
                nextIndex: nextIndex - 1,
                transitionConfig,
                sharedElementsConfig,
            });
            const { transitionSpec } = transitionConfig;
            const { timing, ...spec } = transitionSpec;
            const anim = timing.call(react_native_1.Animated, this._animValue, {
                ...spec,
                toValue: stack.length - 2,
            });
            anim.start(({ finished }) => {
                if (finished) {
                    this.pruneStack(stack.length - 1);
                }
            });
        }
    }
    pruneStack(count) {
        const { stack, nextIndex, prevIndex, sharedElementScreens } = this.state;
        let { actionsQueue } = this.state;
        let onComplete;
        // console.log('pruneStack ', count);
        if (actionsQueue.length) {
            //const action = actionsQueue[0];
            actionsQueue = actionsQueue.slice(0);
            actionsQueue.splice(0, 1);
            onComplete = () => { };
        }
        if (stack.length > count) {
            this.setState({
                stack: stack.slice(0, count),
                sharedElementScreens: sharedElementScreens.slice(0, count),
                prevIndex: nextIndex,
                actionsQueue,
            }, onComplete);
        }
        else if (nextIndex !== prevIndex) {
            this.setState({
                prevIndex: nextIndex,
                actionsQueue,
            }, onComplete);
        }
    }
    static push(node, config) {
        return router.push(node, config);
    }
    static replace(node, config) {
        return router.replace(node, config);
    }
    static pop(config) {
        return router.pop(config);
    }
}
exports.Router = Router;
Router.defaultProps = {
    transitionConfig: transitions_1.fromRight(),
};
//# sourceMappingURL=Router.js.map