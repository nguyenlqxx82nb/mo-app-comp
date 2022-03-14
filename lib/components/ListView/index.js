"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mo_app_common_1 = require("mo-app-common");
const react_native_1 = require("react-native");
const recyclerlistview_1 = require("recyclerlistview");
const index_1 = require("../index");
const BaseService_1 = require("../../services/BaseService");
const prop_types_1 = __importDefault(require("prop-types"));
const styles_1 = __importDefault(require("./styles"));
class ListView extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.currPage = 0;
        this.currSearch = '';
        this._page = 0;
        this._lastCursor = null;
        this.loadData = () => {
            this.fetchData();
        };
        this.fetchData = async () => {
            const { startPage, onLoad, pageSize, onLoadCompleted } = this.props;
            const { loading, loaded, serviceParams } = this.state;
            // console.log('fetchData 0 ', loading);
            if (loading || loaded) {
                return;
            }
            if (onLoad) {
                this.setState({ loading: true });
                onLoad(this.currPage, pageSize, this.onLoadCompletedHandler, this._lastCursor);
                return;
            }
            if (!serviceParams) {
                return;
            }
            // this.endReached = false;
            this.afterToken = '';
            const params = { ...serviceParams };
            this.currPage = startPage;
            this.setState({ loading: true, allLoaded: true, loaded: false, endReached: false });
            const paging = this.buildPaging(params);
            params.query = { ...params.query, ...paging };
            const response = await this.service.fetch(params);
            // console.log('fetchData ', response, params);
            if (response && response.code === 200) {
                const data = response.result || [];
                this.setState({ dataProvider: this.state.dataProvider.cloneWithRows(data) });
                this.afterToken = (response.paging && response.paging.cursors && response.paging.cursors.after) || '';
                if (!response.paging || !response.paging.total_count || pageSize <= response.paging.total_count) {
                    this.setState({ allLoaded: false, firstLoad: false });
                }
                // console.log('load data ', data, response.paging);
                if (onLoadCompleted) {
                    onLoadCompleted(response.paging.total_count);
                }
                this.setState({ loading: false, refreshing: false, loaded: true });
                return;
            }
            this.setState({ loading: false, refreshing: false });
            mo_app_common_1.toast(mo_app_common_1.CommonLanguage.ProcessError);
        };
        this.onLoadCompletedHandler = (items, lastCursor = null) => {
            const { pageSize, } = this.props;
            this.setState({
                loading: false,
                loaded: true,
                allLoaded: items.length < pageSize ? false : true,
                refreshing: false,
                dataProvider: this.state.dataProvider.cloneWithRows(items)
            });
            if (lastCursor) {
                this._lastCursor = lastCursor;
            }
        };
        this.fetchMoreData = async () => {
            const { loading, allLoaded, loaded, serviceParams, onLoadMore, pageSize } = this.state;
            // console.log('fetchMoreData 0 ', loading, allLoaded, loaded);
            if (loading || allLoaded || !loaded) {
                return;
            }
            if (onLoadMore) {
                this.currPage += 1;
                onLoadMore(this.currPage, pageSize, this.onLoadMoreCompleted, this._lastCursor);
                return;
            }
            if (!serviceParams) {
                return;
            }
            const params = { ...serviceParams };
            this.currPage += 1;
            this.setState({ loading: true });
            const paging = this.buildPaging(params);
            params.query = { ...params.query, ...paging };
            const response = await this.service.fetch(params);
            // console.log('fetchMoreData ', params, response);
            this.setState({ loading: false });
            if (response && response.code === 200) {
                const data = [...this.state.dataProvider.getAllData(), ...(response.result || [])];
                this.setState({ dataProvider: this.state.dataProvider.cloneWithRows(data) });
                this.afterToken = (response.paging && response.paging.cursors && response.paging.cursors.after) || '';
                // console.log('after token ', this.afterToken);
                if (!response.paging || !response.result || !response.result.length
                    || (response.paging.total_count && data.length >= response.paging.total_count)) {
                    this.setState({ allLoaded: true });
                }
                return;
            }
            mo_app_common_1.toast(mo_app_common_1.CommonLanguage.ProcessError);
        };
        this.onLoadMoreCompleted = (moreItems, lastCursor = null) => {
            const { pageSize } = this.props;
            const data = [...this.state.dataProvider.getAllData(), ...moreItems];
            this.setState({
                allLoaded: (this._lastCursor && !lastCursor) ? false : moreItems.length === pageSize ? true : false,
                loading: false,
                dataProvider: this.state.dataProvider.cloneWithRows(data),
            });
            if (lastCursor) {
                this._lastCursor = lastCursor;
            }
        };
        this.buildPaging = (params) => {
            const { pageSize, startPage } = this.props;
            let paging = {};
            if (!params || !params.paging) {
                return paging;
            }
            paging.per_page = pageSize;
            paging.page = this.currPage || startPage;
            if (params.paging.afterToken) {
                paging[params.paging.afterToken] = this.afterToken;
            }
            if (params.paging.search) {
                paging[params.paging.search] = this.currSearch || '';
                if (params.body && params.paging.search in params.body) {
                    params.body[params.paging.search] = this.currSearch || '';
                }
            }
            return paging;
        };
        this.setData = (items) => {
            this.setState({ dataProvider: this.state.dataProvider.cloneWithRows(items) });
        };
        this.refreshData = () => {
            const { serviceParams } = this.state;
            if (!serviceParams) {
                this.setState({ refreshing: false });
            }
            this.setState({ loaded: false }, () => {
                this.fetchData();
            });
        };
        this.performSearch = (searchValue) => {
            const { loaded } = this.state;
            if (this.currSearch === searchValue && loaded) {
                return;
            }
            this.currSearch = searchValue;
            this.setState({
                loaded: false,
                allLoaded: false
            }, () => {
                this.fetchData();
            });
        };
        this.updateServiceParam = (service = {}, isReset) => {
            const { serviceParams } = this.state;
            const body = service.body ? isReset ? { ...this.props.serviceParams.body, ...service.body } : { ...serviceParams.body, ...service.body } : {};
            const query = service.query ? isReset ? { ...this.props.serviceParams.query, ...service.query } : { ...serviceParams.query, ...service.query } : {};
            const newService = isReset ? { ...this.props.serviceParams, ...service } : { ...serviceParams, ...service };
            if (service.body) {
                newService.body = { ...body };
            }
            if (service.query) {
                newService.query = { ...query };
            }
            this.setState({
                serviceParams: newService,
                loaded: false,
                allLoaded: false
            }, () => {
                this.fetchData();
            });
            // setTimeout(() => {
            //   this.fetchData();
            // }, 10);
        };
        this.updateItem = (item, index) => {
            let newItems = this.state.dataProvider.getAllData();
            if (item && index >= 0 && newItems.length > index) {
                newItems[index] = item;
                this.setState({
                    dataProvider: this.state.dataProvider.cloneWithRows(newItems),
                });
            }
        };
        this.addItem = (item) => {
            let newItems = this.state.dataProvider.getAllData();
            newItems.splice(0, 0, item);
            this.setState({
                noneItems: (newItems.length === 0 ? true : false),
                dataProvider: this.state.dataProvider.cloneWithRows(newItems),
            });
        };
        this.removeItems = (ids) => {
            let newItems = this.state.dataProvider.getAllData();
            ids.forEach(id => {
                newItems = newItems.filter((removeItem) => { return removeItem.id !== id; });
            });
            this.setState({
                dataProvider: this.state.dataProvider.cloneWithRows(newItems),
            });
        };
        this.getItem = (index) => {
            let items = this.state.dataProvider.getAllData();
            if (items.length > index && index >= 0) {
                return items[index];
            }
            return null;
        };
        this.toggleActive = (index) => {
            let items = this.state.dataProvider.getAllData();
            if (items.length > index && index >= 0) {
                const currentActive = items[index].active;
                if (!currentActive) {
                    items = this.checkOutOfLimitActive(items);
                }
                items[index].active = !currentActive;
                items = this.updateActiveIndex(items);
                this.setState({
                    dataProvider: this.state.dataProvider.cloneWithRows(items),
                });
            }
        };
        this.checkOutOfLimitActive = (items) => {
            const { maxActive } = this.props;
            let activeCount = 0;
            let lastIndex = -1;
            items.forEach((item, index) => {
                if (item.active) {
                    activeCount += 1;
                    lastIndex = index;
                }
            });
            if (activeCount === maxActive && lastIndex >= 0) {
                items[lastIndex].active = false;
            }
            return items;
        };
        this.updateActiveIndex = (items) => {
            let activeCount = 0;
            items.forEach((item) => {
                if (item.active) {
                    item.activeIndex = activeCount + 1;
                    activeCount += 1;
                }
            });
            return items;
        };
        this.getActiveItems = () => {
            let items = this.state.dataProvider.getAllData();
            let retItems = [];
            items.forEach((item) => {
                if (item.active) {
                    retItems.push(item);
                }
            });
            return retItems;
        };
        this.deactivateAllItems = () => {
            let items = this.state.dataProvider.getAllData();
            items.forEach((item) => {
                item.active = false;
            });
            this.setState({
                dataProvider: this.state.dataProvider.cloneWithRows(items),
            });
        };
        this.checkDataEmpty = () => {
            let items = this.state.dataProvider.getAllData();
            return items.length ? false : true;
        };
        this.checkAllItems = () => {
            let items = this.state.dataProvider.getAllData();
            items.forEach((item) => {
                item.active = true;
            });
            this.setState({
                dataProvider: this.state.dataProvider.cloneWithRows(items),
            });
        };
        this.updateAllItems = (key, value) => {
            let items = this.state.dataProvider.getAllData();
            items.forEach((item) => {
                item[key] = value;
            });
            this.setState({
                dataProvider: this.state.dataProvider.cloneWithRows(items),
            });
        };
        this.getItemCount = () => {
            return this.state.dataProvider.getAllData().length;
        };
        this.scrollToIndex = (index, animated) => {
            this._listView.scrollToIndex(index, animated);
        };
        this.scrollTop = () => {
            if (this.scrollView) {
                setTimeout(() => {
                    this.scrollView.scrollTo({ y: 0 });
                }, 50);
                return;
            }
            setTimeout(() => {
                this._listView.scrollToOffset(0, 0);
            }, 50);
        };
        this.setSearchValue = (_searchValue) => { };
        this.hasDiffSearch = (searchValue) => {
            if (this.currSearch !== searchValue) {
                return true;
            }
            return false;
        };
        this._rowRenderer = (type, item, index) => {
            const { onRenderRow } = this.props;
            // const items = this.state.dataProvider.getAllData();
            // const last = index === items.length - 1;
            return onRenderRow(type, item, index);
        };
        this._renderFooter = () => {
            const { allLoaded, loading, loaded, endReached, dataProvider } = this.state;
            const { showLoading, loadAllMessage, hr } = this.props;
            const length = dataProvider.getAllData().length;
            const outScreen = hr * length > mo_app_common_1.Constants.Height - mo_app_common_1.Constants.HeaderHeight ? true : false;
            // console.log('_renderFooter ',length, hr, (Constants.Height - Constants.HeaderHeight));
            if (loading && loaded && showLoading) {
                return (<react_native_1.View style={styles_1.default.loadingRow}>
            <index_1.Indicator isShow={true}/>
          </react_native_1.View>);
            }
            if (loadAllMessage && !loading && loaded && !this.checkDataEmpty() && allLoaded && endReached && outScreen) {
                return (<react_native_1.View style={[styles_1.default.allItemRow]}>
        <index_1.WrapText f={'r'} st={{ color: mo_app_common_1.Color.textSecondary }}>{loadAllMessage}</index_1.WrapText>
      </react_native_1.View>);
            }
            return <react_native_1.View />;
        };
        this._onEndReachedHandler = () => {
            // console.log('_onEndReachedHandler ');
            this.setState({ endReached: true });
            this.fetchMoreData();
        };
        this._onScrollHandler = (_rawEvent, offsetX, offsetY) => {
            const { onScroll } = this.props;
            if (onScroll) {
                onScroll(offsetX, offsetY);
            }
        };
        this._renderScroll = (props) => {
            const { top, bottom } = this.props;
            const paddingTop = top;
            return (<react_native_1.ScrollView {...props} ref={ref => this.scrollView = ref} scrollEventThrottle={16} contentContainerStyle={{
                paddingTop: (react_native_1.Platform.OS === 'ios') ? 0 : paddingTop,
                paddingBottom: bottom,
            }} contentInset={{
                top: paddingTop,
            }} contentOffset={{ y: -paddingTop, }}/>);
        };
        this.afterToken = '';
        this.state = {
            isNoneDataStatus: false,
            externalScroll: true,
            noneItems: false,
            loading: false,
            loaded: false,
            refreshing: false,
            allLoaded: false,
            firstLoad: true,
            endReached: false,
            serviceParams: props.serviceParams,
            dataProvider: new recyclerlistview_1.DataProvider((r1, r2) => { return r1 !== r2; }).cloneWithRows(this.props.items ? this.props.items : []),
        };
        this.service = new BaseService_1.BaseService();
        this._layoutProvider = new recyclerlistview_1.LayoutProvider(() => { return 'FULL'; }, (_type, dim) => {
            dim.width = this.props.wr;
            dim.height = this.props.hr;
        });
    }
    componentDidMount() {
        if (this.props.autoLoad) {
            this.fetchData();
        }
    }
    render() {
        const { loaded, refreshing, loading, externalScroll, isNoneDataStatus } = this.state;
        const { autoH, containerStyle, noneItemsMsg, hasRefreshControl, 
        //externalScroll,
        headerPaddingTop, top, extendedState, hasExtendedState, onRefreshControl, style, searchItemEmptyMessage, icon } = this.props;
        const paddingTop = headerPaddingTop ? mo_app_common_1.Constants.HeaderHeight + top : top;
        // console.log('top ', paddingTop, top);
        let props = {
            showsHorizontalScrollIndicator: false,
            showsVerticalScrollIndicator: false,
            forceNonDeterministicRendering: autoH,
            onEndReached: this._onEndReachedHandler,
            dataProvider: this.state.dataProvider,
            layoutProvider: this._layoutProvider,
            rowRenderer: this._rowRenderer,
            renderFooter: this._renderFooter,
            onScroll: this._onScrollHandler,
            itemAnimator: new recyclerlistview_1.BaseItemAnimator(),
        };
        if (externalScroll) {
            props = { ...props, ...{ externalScrollView: this._renderScroll } };
        }
        if (extendedState) {
            props = { ...props, ...{ extendedState: extendedState } };
        }
        else if (hasExtendedState) {
            props = { ...props, ...{ extendedState: this.state } };
        }
        //props.extendedState = this.state.dataProvider;
        if (hasRefreshControl) {
            props = { ...props, ...{ scrollViewProps: {
                        refreshControl: (<react_native_1.RefreshControl refreshing={refreshing} colors={[mo_app_common_1.Color.primary]} tintColor={mo_app_common_1.Color.primary} onRefresh={async () => {
                            this.setState({ refreshing: true });
                            this.refreshData();
                            if (onRefreshControl) {
                                onRefreshControl();
                            }
                        }} 
                        // Android offset for RefreshControl
                        progressViewOffset={paddingTop}/>)
                    },
                } };
        }
        const hasData = !this.checkDataEmpty();
        const showNoneMessage = noneItemsMsg !== '' ? true : false;
        const noneDataStatus = !loading && loaded && showNoneMessage;
        if (!isNoneDataStatus && noneDataStatus) {
            setTimeout(() => {
                this.setState({ isNoneDataStatus: true });
            }, 0);
        }
        return (<react_native_1.View style={[styles_1.default.container, style, { paddingTop: headerPaddingTop ? mo_app_common_1.Constants.HeaderHeight : 0 }, containerStyle]}>
      {hasData &&
            <recyclerlistview_1.RecyclerListView ref={(comp) => { this._listView = comp; }} style={{ flex: 1 }} {...props}/>}
      {!hasData && isNoneDataStatus &&
            <react_native_1.View style={styles_1.default.noneItem}>
          <mo_app_common_1.CustomIcon name={icon} size={40} style={{ color: mo_app_common_1.Color.textSecondary }}/>

          <index_1.WrapText f={'r'} nl={2} st={styles_1.default.noneText}>
            {this.currSearch && this.currSearch !== '' ? searchItemEmptyMessage : noneItemsMsg}
          </index_1.WrapText>
        </react_native_1.View>}

      {!hasData && isNoneDataStatus &&
            <react_native_1.ScrollView style={{ flex: 1 }} scrollEventThrottle={16} showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', paddingTop: (react_native_1.Platform.OS === 'ios') ? 0 : top, flexGrow: 1 }} contentInset={{
                top: top,
            }} contentOffset={{ x: 0, y: 0, }} refreshControl={<react_native_1.RefreshControl refreshing={refreshing} colors={[mo_app_common_1.Color.primary]} tintColor={mo_app_common_1.Color.primary} onRefresh={async () => {
                this.setState({ refreshing: true });
                this.refreshData();
            }} 
            // Android offset for RefreshControl
            progressViewOffset={top}/>}/>}

      {!loaded && loading && !refreshing && (<index_1.Indicator isShow={true} ref={ref => (this._indicator = ref)}/>)}
    </react_native_1.View>);
    }
}
ListView.propTypes = {
    wr: prop_types_1.default.number,
    hr: prop_types_1.default.number,
    pageSize: prop_types_1.default.number,
    autoH: prop_types_1.default.bool,
    onRenderRow: prop_types_1.default.func,
    onLoadMore: prop_types_1.default.func,
    onLoad: prop_types_1.default.func,
    onScroll: prop_types_1.default.func,
    top: prop_types_1.default.number,
    bottom: prop_types_1.default.number,
    containerStyle: prop_types_1.default.object,
    headerPaddingTop: prop_types_1.default.bool,
    showLoading: prop_types_1.default.bool,
    startPage: prop_types_1.default.number,
    noneItemsMsg: prop_types_1.default.string,
    hasRefreshControl: prop_types_1.default.bool,
    externalScroll: prop_types_1.default.bool,
    hasExtendedState: prop_types_1.default.bool,
    onRefreshControl: prop_types_1.default.func,
    maxActive: prop_types_1.default.number,
    autoLoad: prop_types_1.default.bool,
    items: prop_types_1.default.array,
    searchItemEmptyMessage: prop_types_1.default.string,
    icon: prop_types_1.default.string,
    loadAllMessage: prop_types_1.default.string
};
ListView.defaultProps = {
    wr: 0,
    hr: 0,
    pageSize: 10,
    autoH: false,
    top: 16,
    containerStyle: {},
    headerPaddingTop: true,
    showLoading: true,
    startPage: 1,
    noneItemsMsg: 'Không có dữ liệu',
    searchItemEmptyMessage: 'Không có kết quả phù hợp',
    hasRefreshControl: true,
    externalScroll: true,
    hasExtendedState: false,
    bottom: 10,
    maxActive: 100,
    autoLoad: true,
    items: [],
    icon: 'no_result'
};
exports.default = ListView;
//# sourceMappingURL=index.js.map