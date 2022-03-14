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
const index_1 = require("../../index");
const mo_app_common_1 = require("mo-app-common");
const styles_1 = __importDefault(require("../Item/styles"));
const styles_2 = __importDefault(require("./styles"));
const lodash_1 = __importDefault(require("lodash"));
class CategoryFilter extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.itemRefs = [];
        this.init = () => {
            const { data, value } = this.props;
            this.state = {
                value: lodash_1.default.cloneDeep(value || {}),
                data: data
            };
        };
        this.findCheckedItems = () => {
            const { value } = this.state;
            let checkedIds = [];
            Object.keys(value).forEach((id) => {
                if (value[id].checked) {
                    checkedIds.push(id);
                }
            });
            return checkedIds;
        };
        this.onSelectedItemChangeHandler = (_active, value) => {
            this.setState({ value: value });
        };
        this.getValue = () => {
            const { value } = this.state;
            return value;
        };
        this.onItemPressHandler = (item) => {
            const { value } = this.state;
            const { id } = item;
            const open = value[id] && value[id].open;
            if (!value[id]) {
                value[id] = {};
            }
            value[id].open = !open;
            this.setState({ value: value });
            this.forceUpdate();
        };
        this.onCheckItemPressHandler = (item) => {
            const { data, value } = this.state;
            const { id } = item;
            const checked = value[id] && value[id].checked;
            this.checkItem(item, !checked);
            if (item.sub && item.sub.length > 0) {
                const childItems = this.findAllChild(item.id, item.sub);
                childItems.forEach((childItem) => {
                    this.checkItem(childItem, !checked);
                });
            }
            // this.unCheckParent(data, item);
            this.setState({ data: data });
            this.forceUpdate();
        };
        this.checkItem = (item, checked) => {
            const { value } = this.state;
            const { id } = item;
            // const checked = value[id] && value[id].checked;
            if (!value[id]) {
                value[id] = {};
            }
            if (!item.sub || !item.sub.length) {
                value[id].child = true;
            }
            value[id].checked = checked;
        };
        this.unCheckParent = (data, item) => {
            if (item && !item.checked && item.parent_id && item.id !== item.parent_id) {
                const _item = this.findItemById(item.parent_id, data);
                if (_item) {
                    this.checkItem(_item, false);
                }
                this.unCheckParent(data, _item);
            }
        };
        this.findAllChild = (parentId, items) => {
            let childItems = [];
            items.forEach((item) => {
                const _parentId = item.parent_id;
                if (_parentId === parentId) {
                    childItems.push(item);
                }
                if (item.sub && item.sub.length > 0) {
                    const _childItems = this.findAllChild(item.id, item.sub);
                    childItems = [...childItems, ..._childItems];
                }
            });
            return childItems;
        };
        this.findItemById = (id, items) => {
            let findItem = items.find((item, _index) => {
                if (item.id === id) {
                    return true;
                }
                return false;
            });
            if (findItem) {
                return findItem;
            }
            items.forEach((item) => {
                if (item.sub && item.sub.length) {
                    const _findItem = this.findItemById(id, item.sub);
                    if (_findItem) {
                        findItem = _findItem;
                    }
                }
            });
            return findItem;
        };
        this.renderChild = (level, items) => {
            const { value } = this.state;
            return (items.map((item, index) => {
                const id = item.id;
                const checked = value[id] && value[id].checked;
                const open = value[id] && value[id].open;
                return (<react_native_1.View key={`${level}-${index}`}>
                        <react_native_1.View style={[styles_2.default.rowItem, { paddingLeft: 8 + 28 * (level - 1) }]}>
                            <react_native_1.View style={styles_2.default.leftRow}>
                                <react_native_1.View style={styles_2.default.collapseButton}>
                                    {item.sub && item.sub.length > 0 &&
                    <index_1.ButtonRipple name={open ? 'collapse_cat' : 'expand_cat'} size={14} color={mo_app_common_1.Color.primary} onPress={this.onItemPressHandler.bind(this, item)}/>}
                                </react_native_1.View>
                                <index_1.WrapText st={styles_2.default.name}>{item.name && item.name[mo_app_common_1.Constants.Lang]}</index_1.WrapText>
                            </react_native_1.View>
                            <react_native_1.View style={styles_2.default.checkboxButton}>
                                <index_1.ButtonRipple name={checked ? 'checked_checkbox' : 'empty_checkbox'} size={14} color={checked ? mo_app_common_1.Color.primary : mo_app_common_1.Color.text} onPress={this.onCheckItemPressHandler.bind(this, item)}/>
                            </react_native_1.View>
                        </react_native_1.View>
                        {item.sub && item.sub.length > 0 && open &&
                    this.renderChild(level + 1, item.sub)}
                    </react_native_1.View>);
            }));
        };
        this.init();
    }
    componentDidMount() { }
    buildFilter() {
        const { buildFilter } = this.props;
        const { data } = this.state;
        const checkedIds = this.findCheckedItems();
        let filter = {};
        filter = buildFilter(checkedIds, data);
        return filter;
    }
    render() {
        const { value, data } = this.state;
        const { title } = this.props;
        // console.log('render data ', data);
        return (<react_native_1.View>
                <react_native_1.View style={styles_1.default.filterHeader}>
                    <index_1.WrapText>{title}</index_1.WrapText>
                </react_native_1.View>
                <react_native_1.View style={[styles_1.default.containerFilterItem, { paddingVertical: 4, paddingHorizontal: 0 }]}>
                    {data.map((item, index) => {
            const border = index < data.length - 1 ? { borderBottomColor: mo_app_common_1.Color.border, borderBottomWidth: 0.5 } : {};
            const id = item.id;
            const checked = value[id] && value[id].checked;
            const open = value[id] && value[id].open;
            return (<react_native_1.View key={`0-${index}`} style={border}>
                                    <react_native_1.View style={[styles_2.default.rowItem]}>
                                        <react_native_1.View style={styles_2.default.leftRow}>
                                            <react_native_1.View style={styles_2.default.collapseButton}>
                                                {item.sub && item.sub.length > 0 &&
                <index_1.ButtonRipple name={open ? 'collapse_cat' : 'expand_cat'} size={14} color={mo_app_common_1.Color.primary} onPress={this.onItemPressHandler.bind(this, item)}/>}
                                            </react_native_1.View>
                                            <index_1.WrapText st={styles_2.default.name}>{item.name && item.name[mo_app_common_1.Constants.Lang]}</index_1.WrapText>
                                        </react_native_1.View>
                                        <react_native_1.View style={styles_2.default.checkboxButton}>
                                            <index_1.ButtonRipple name={checked ? 'checked_checkbox' : 'empty_checkbox'} size={14} color={checked ? mo_app_common_1.Color.primary : mo_app_common_1.Color.text} onPress={this.onCheckItemPressHandler.bind(this, item)}/>
                                        </react_native_1.View>
                                    </react_native_1.View>
                                    {item.sub && item.sub.length > 0 && open &&
                this.renderChild(2, item.sub)}
                                </react_native_1.View>);
        })}
                </react_native_1.View>
            </react_native_1.View>);
    }
}
exports.default = CategoryFilter;
CategoryFilter.defaultProps = {
    data: [],
    title: 'Danh mục'
};
//# sourceMappingURL=index.js.map