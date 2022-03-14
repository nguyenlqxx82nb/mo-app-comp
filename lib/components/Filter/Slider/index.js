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
// import PropTypes from 'prop-types';
const react_native_1 = require("react-native");
const index_1 = require("../../index");
const mo_app_common_1 = require("mo-app-common");
const styles_1 = __importDefault(require("./styles"));
const styles_2 = __importDefault(require("../Item/styles"));
const { width } = react_native_1.Dimensions.get('window');
class SliderFilter extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.init = () => {
            const { value, point } = this.props;
            const min = (value && value.min) || 0;
            const max = (value && value.max) || this.props.data.max;
            const enoughPoint = value && value.enoughPoint ? true : false;
            // console.log('init enoughPoint ', value, enoughPoint );
            this.state = {
                point: [min, !enoughPoint ? max : Math.min(point, max)],
                enoughPoint: enoughPoint
            };
        };
        this.multiSliderValuesChangeHandler = (values) => {
            if (this.enoughPointRef.getActive()) {
                this.enoughPointRef.setActive(false);
            }
            this.setState({
                point: values,
            });
        };
        this.onSelectEnoughPointHandler = (active, _value) => {
            const { point, data } = this.props;
            if (active) {
                const maxPoint = Math.min(point, data.max);
                this.setState({ point: [0, maxPoint], enoughPoint: true });
                return;
            }
            this.setState({ enoughPoint: false });
        };
        this.buildFilter = () => {
            const { buildFilter } = this.props;
            const { point } = this.state;
            if (buildFilter) {
                return buildFilter({ min: point[0], max: point[1] });
            }
        };
        this.getValue = () => {
            const { point } = this.state;
            return {
                min: point[0],
                max: point[1],
                enoughPoint: this.enoughPointRef.getActive()
            };
        };
        this.init();
    }
    componentDidMount() { }
    render() {
        const { data, title } = this.props;
        const { point, enoughPoint } = this.state;
        let pointNumberLeft1 = Math.round((width - 28 - 2 * 5) * point[0] / data.max) - 50 / 2 + 5;
        let pointNumberLeft2 = Math.round((width - 28 - 2 * 5) * point[1] / data.max) - 50 / 2 + 5;
        pointNumberLeft1 = Math.min(width - 70, Math.max(-20, pointNumberLeft1));
        pointNumberLeft2 = Math.min(width - 70, Math.max(-20, pointNumberLeft2));
        return (<react_native_1.View>
                <react_native_1.View style={styles_2.default.filterHeader}>
                    <index_1.WrapText>{title}</index_1.WrapText>
                </react_native_1.View>

                <react_native_1.View style={[styles_2.default.containerFilterItem]}>
                    <index_1.WrapText>{mo_app_common_1.CommonLanguage.DistancePoint}</index_1.WrapText>
                    <react_native_1.View style={styles_1.default.sliderPointContainer}>
                        <index_1.Slider values={[point[0], point[1]]} sliderLength={width - 28 - 2 * 5} onValuesChange={this.multiSliderValuesChangeHandler} min={data.min} max={data.max} step={1} allowOverlap snapped selectedStyle={{
            backgroundColor: mo_app_common_1.Color.primary,
        }} unselectedStyle={{
            backgroundColor: mo_app_common_1.Color.border,
            borderRadius: 5,
        }} containerStyle={{
            height: 40,
            marginLeft: 0,
        }} trackStyle={{
            height: 10,
            backgroundColor: mo_app_common_1.Color.border,
        }} markerStyle={{
            borderRadius: 12,
            width: 24,
            height: 24,
            backgroundColor: mo_app_common_1.Color.primary,
        }} pressedMarkerStyle={{
            borderRadius: 15,
            width: 30,
            height: 30,
            backgroundColor: mo_app_common_1.Color.primary,
        }} touchDimensions={{
            height: 30,
            width: 30,
            borderRadius: 18,
            slipDisplacement: 36,
        }}/>

                        <react_native_1.View style={[styles_1.default.sliderValueContainer, { left: pointNumberLeft1, top: 5 }]}>
                            <index_1.WrapText>{mo_app_common_1.Utils.formatThousand(point[0])}</index_1.WrapText>
                        </react_native_1.View>

                        <react_native_1.View style={[styles_1.default.sliderValueContainer, { left: pointNumberLeft2, top: 5 }]}>
                            <index_1.WrapText>{mo_app_common_1.Utils.formatThousand(point[1])}</index_1.WrapText>
                        </react_native_1.View>

                        <react_native_1.View style={[styles_1.default.sliderValueContainer, styles_1.default.pointLabelLimit]}>
                            <index_1.WrapText>{`${mo_app_common_1.Utils.formatThousand(data.max)} điểm`}</index_1.WrapText>
                        </react_native_1.View>

                    </react_native_1.View>
                    <index_1.Checkbox labelRight={mo_app_common_1.CommonLanguage.VoucherPointCond} value={''} active={enoughPoint} onActiveChange={this.onSelectEnoughPointHandler} containerStyle={{ marginBottom: 20, paddingHorizontal: 0 }} ref={(ref) => { this.enoughPointRef = ref; }}/>
                </react_native_1.View>

            </react_native_1.View>);
    }
}
exports.default = SliderFilter;
SliderFilter.defaultProps = {
    myPoint: 2000,
    data: { max: 3000, min: 0 }
};
//# sourceMappingURL=index.js.map