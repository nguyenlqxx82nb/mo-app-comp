import React from 'react';
import { Constants, Color, CustomIcon, toast, CommonLanguage, BaseServiceParam, BaseService, Styles } from 'mo-app-common';
import { View, ScrollView, RefreshControl, Platform, ViewStyle, TouchableOpacity } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider, BaseItemAnimator } from 'recyclerlistview';
import { WrapText } from '../Text';
import { DotIndicator, Indicator } from '../Indicator/index';
import Checkbox from '../Checkbox';
import { Utils } from 'mo-app-common';
import {DismissKeyboard} from '../Keyboard/Dismiss';
import styles from './styles';
const cloneDeep = require('clone-deep');

export interface IListViewProps {
  wr: number; // chieu rong item
  hr: number; // chieu cao item
  pageSize: number;
  autoH: boolean; // chieu cao dong tu dong
  onRenderRow: (type: any, item: any, index: number, lastIndex: boolean) => any;
  onLoad?: (currPage: number, pageSize: number, onLoadCompleted: (items: any[], cursor: any) => void, lastCursor: any) => void;
  onLoadMore?: (currPage: number, pageSize: number, onLoadMoreCompleted: (items: any[], cursor: any) => void, lastCursor: any) => void;
  onScroll?: (offsetX: number, offsetY: number) => void,
  top?: number,
  bottom?: number,
  containerStyle?: ViewStyle | ViewStyle[],
  headerPaddingTop?: number,
  showLoading?: boolean,
  startPage?: number,
  noneItemsMsg?: string,
  hasRefreshControl?: boolean,
  externalScroll?: boolean,
  hasExtendedState?: boolean,
  onRefreshControl?: () => void,
  maxActive?: number,
  autoLoad?: boolean,
  items?: any[],
  searchItemEmptyMessage?: string,
  icon?: string,
  loadErrorIcon?: string,
  loadErrorText?: string,
  loadAllMessage?: string,
  serviceParams?: BaseServiceParam,
  onLoadCompleted?: (total_count: number) => void;
  extendedState?: any;
  itemVisibleNumber?: number;
  inverted?: boolean;
  loadingIcon?: boolean;
  keyField?: string;
  noneItem?: React.ReactNode;
  hasBadge?: boolean;
  hasCheckAll?: boolean;
  ignoreItemKeys: string[],
  ignoreShowScroll?: boolean,
  checkAllTitle: string,
  loadingIconImage?: string,
  loadingIconText?: string,
  currSearch?: string,
  onBottomEndReached?: () => void;
  onScrollToBottom?: () => void;
  onItemSelect?: (item: any, status: boolean) => void;
}

interface IListViewState {
  loading: boolean;
  allLoaded: boolean;
  loaded: boolean;
  serviceParams: BaseServiceParam;
  isNoneDataStatus: boolean;
  externalScroll: boolean;
  noneItems: boolean;
  refreshing: boolean;
  firstLoad: boolean;
  endReached: boolean;
  dataProvider: DataProvider;
  ignoreShowScroll?: boolean;
  showScrollBottom: boolean;
  hasBadge: boolean;
  reload?: boolean;
  isCheckAll?: boolean;
  isLoadError?: boolean;
  isBackgroundLoading?: boolean;
}

class ListView extends React.PureComponent<IListViewProps, IListViewState> {
  static defaultProps = {
    wr: 0,
    hr: 0,
    pageSize: 10,
    autoH: false,
    top: 0,
    containerStyle: {},
    headerPaddingTop: false,
    showLoading: true,
    startPage: 1,
    noneItemsMsg: 'Không có dữ liệu',
    searchItemEmptyMessage: 'Không có kết quả phù hợp',
    hasRefreshControl: true,
    externalScroll: true,
    hasExtendedState: false,
    bottom: 0,
    maxActive: 100,
    autoLoad: true,
    items: [],
    loadingIcon: false,
    keyField: 'id',
    hasBadge: false,
    ignoreItemKeys: [],
    checkAllTitle: 'Chọn tất cả kết quả',
    loadErrorIcon: 'load_data_error',
    loadErrorText: 'Quá trình tải dữ liệu gặp sự cố.',
    currSearch: ''
  };

  currPage = 0;
  currSearch: string;
  service: BaseService;

  _page = 1;
  _lastCursor = null;
  _layoutProvider: any;
  _listView: any;
  _indicator: any;
  scrollView: any;
  afterToken: string;
  needScrollToBottom: boolean;
  _scrollY = 0;
  _items: any[] = [];

  constructor(props: IListViewProps) {
    super(props);
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
      dataProvider: new DataProvider((r1, r2) => { return r1 !== r2; }).cloneWithRows(this.props.items ? this.props.items : []),
      showScrollBottom: false,
      hasBadge: this.props.hasBadge,
      isCheckAll: false,
      isLoadError: false,
      ignoreShowScroll: props.ignoreShowScroll,
      isBackgroundLoading: false,
    };
    this.currSearch = props.currSearch;
    this.service = new BaseService();
    this._layoutProvider = new LayoutProvider(() => { return 'FULL'; },
      (_type: any, dim: any) => {
        dim.width = this.props.wr;
        dim.height = this.props.hr;
      }
    );
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    const { items } = this.props;
    if (!items || !items.length) {
      if (this.props.autoLoad) {
        this.fetchData();
      }
      return;
    }
    this.setState({
      dataProvider: this.state.dataProvider.cloneWithRows(items),
      firstLoad: false,
      loaded: true
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps: IListViewProps) {
    const { hasBadge } = this.props;
    const { ignoreShowScroll } = this.state;
    if (hasBadge !== nextProps.hasBadge) {
      this.setBadge(hasBadge);
    }
    if (nextProps.ignoreShowScroll !== ignoreShowScroll) {
      this.setState({ ignoreShowScroll: nextProps.ignoreShowScroll });
    }
  }

  setBadge = (hasBadge: boolean) => {
    const { showScrollBottom } = this.state;
    if (showScrollBottom) {
      this.setState({ hasBadge: hasBadge });
    }
  }

  setShowScrollBottom = (value: boolean) => {
    this.setState({ showScrollBottom: value });
  }

  loadData = () => {
    this.fetchData();
  }

  backgroundFetchData = () => {
    this.setState({ isBackgroundLoading: true });
    this.setState({ loaded: false, reload: true, refreshing: false, showScrollBottom: false }, () => {
      this.fetchData();
    });
  }

  fetchData = async (forceSearch?: boolean) => {
    const { startPage, onLoad, pageSize, onLoadCompleted } = this.props;
    const { loading, loaded, serviceParams } = this.state;
    // console.log('fetchData 0 ', loading, loaded);
    if ((loading || loaded) && !forceSearch){
      return;
    }
    if (onLoad) {
      this.setState({ loading: true, isLoadError: false });
      this.currPage = startPage;
      onLoad(this.currPage, pageSize, this.onLoadCompletedHandler, this._lastCursor);
      return;
    }
    if (!serviceParams) {
      return;
    }
    // this.endReached = false;
    this.afterToken = '';
    const params: BaseServiceParam = { ...serviceParams };
    this.currPage = startPage;
    this.setState({ loading: true, allLoaded: true, loaded: false, endReached: false, isLoadError: false });
    const paging = this.buildPaging(params);
    params.query = { ...params.query, ...paging };
    let localBodySearch = ''
    if (params.body && params.paging && params.paging.search in params.body) {
      localBodySearch = params.body[params.paging.search];
    }
    const response = await this.service.fetch(params);
    if (params.body && params.paging && params.paging.search in params.body && this.currSearch !== localBodySearch) {
      this.setState({ loading: false, refreshing: false, reload: false, isLoadError: false });
      return;
    }
    if (response && (response.code === 200 || (serviceParams.successCode && response.code === serviceParams.successCode))) {
      const data = response.result.data || [];

      this.setState({ dataProvider: this.state.dataProvider.cloneWithRows(this.filterItems(data)) });
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
    this.setState({ loading: false, refreshing: false, reload: false, isLoadError: true });
    toast(CommonLanguage.ProcessError);
  };

  filterItems = (data: any[]) => {
    const { ignoreItemKeys } = this.props;
    if (!ignoreItemKeys.length) {
      return data;
    }
    return data.filter((item: any) => {
      return ignoreItemKeys.indexOf(item.id) < 0
    });
  }

  onLoadCompletedHandler = (items: Array<any>, lastCursor = null, allLoaded = undefined, loadError: boolean = false) => {
    const { pageSize, } = this.props;
    const allLoadedConvert = allLoaded === undefined ? (items.length <= pageSize ? false : true) : allLoaded;

    this.setState({
      loading: false,
      loaded: true,
      allLoaded: allLoadedConvert,
      refreshing: false,
      reload: false,
      dataProvider: this.state.dataProvider.cloneWithRows(items),
      isLoadError: loadError,
      isBackgroundLoading: false
    });
    if (lastCursor) {
      this._lastCursor = lastCursor;
    }
  };

  loadMoreDataNotEndReach = () => {
    this.currPage = 0;
    this.fetchMoreData();
  }

  fetchMoreData = async () => {
    const { loading, allLoaded, loaded, serviceParams } = this.state;
    const { onLoadMore, pageSize } = this.props;
    if (loading || allLoaded || !loaded) {
      return;
    }
    if (onLoadMore) {
      this.setState({ loading: true });
      this.currPage += 1;
      onLoadMore(this.currPage, pageSize, this.onLoadMoreCompleted, this._lastCursor);
      return;
    }
    if (!serviceParams) {
      return;
    }
    const params: BaseServiceParam = { ...serviceParams };
    this.currPage += 1;
    this.setState({ loading: true });
    const paging = this.buildPaging(params);
    params.query = { ...params.query, ...paging };
    // console.log('query', params.query);
    const response = await this.service.fetch(params);
    // console.log('fetchMoreData ', response);
    this.setState({ loading: false });
    if (response && (response.code === 200 || (serviceParams.successCode && response.code === serviceParams.successCode))) {
      this.afterToken = (response.paging && response.paging.cursors && response.paging.cursors.after) || '';
      const data = [...this.Items, ...(this.filterItems(response.result.data) || [])];
      if (data.length !== this.Items.length) {
        this.setState({ isCheckAll: false });
      }
      this.setState({ dataProvider: this.state.dataProvider.cloneWithRows(data) });
      // console.log('after token ', this.afterToken);
      if (!response.paging || !response.result || !response.result.data || !response.result.data.length
        || (response.paging.total_count && data.length >= response.paging.total_count)) {
        this.setState({ allLoaded: true });
      }
      return;
    }
    toast(CommonLanguage.ProcessError);
  }

  onLoadMoreCompleted = (moreItems: Array<any>, lastCursor = null, allLoaded = undefined) => {
    const { pageSize } = this.props;
    const data = [...this.Items, ...moreItems];
    if (data.length !== this.Items.length) {
      this.setState({
        isCheckAll: false,
      });
    }
    this.setState({
      allLoaded: allLoaded === undefined ? ((this._lastCursor && !lastCursor) ? false : moreItems.length < pageSize ? true : false) : allLoaded,
      loading: false,
      dataProvider: this.state.dataProvider.cloneWithRows(data),
    });

    if (lastCursor) {
      this._lastCursor = lastCursor;
    }
  };

  buildPaging = (params: BaseServiceParam) => {
    const { pageSize, startPage } = this.props;
    let paging: any = {};
    if (!params || !params.paging) {
      return paging;
    }
    paging.per_page = pageSize;
    paging.page = this.currPage || startPage;
    if (params.paging.afterToken) {
      paging[params.paging.afterToken] = this.afterToken;
      params.body && (params.body[params.paging.afterToken] = this.afterToken);
    }
    if (params.paging.search) {
      paging[params.paging.search] = this.currSearch || '';
      if (params.body && params.paging.search in params.body) {
        params.body[params.paging.search] = this.currSearch || '';
      }
    }
    return paging;
  }

  refreshData = () => {
    // this.Items = [];
    this.setState({ loaded: false, reload: true, refreshing: false, showScrollBottom: false }, () => {
      this.fetchData(); 
    });
  };

  changeCurrentSearch = (searchValue: string) => {
    this.currSearch = searchValue;
  }

  performSearch = (searchValue: string, localSearch: boolean = false) => {
    this.currSearch = searchValue;
    if (localSearch) {
      const { items } = this.props;
      const newItems = items.filter(({ name }) => {
        if (!searchValue) {
          return true;
        }
        if (!name) {
          return false;
        }
        return Utils.removeSign(name).toLowerCase().includes(Utils.removeSign(searchValue).toLowerCase());
      });
      this.Items = newItems;
      return;
    }
    this.setState({
      loaded: false,
      allLoaded: false
    }, () => {
      this.fetchData(true);
    });
  }

  updateServiceParam = (service: any = {}, isReset: boolean) => {
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
  }
  /**
   * khi truyền vào giá trị undefined thì danh sách listview sẽ reset về rỗng;
   */
  set Items(items: Array<any>) {
    if (!items) {
      this.setState({
        dataProvider: this.state.dataProvider.cloneWithRows([]),
        loaded: true
      });
      return;
    }
    this.setState({
      dataProvider: this.state.dataProvider.cloneWithRows(items),
      loaded: true
    }, () => { });
  }

  setItems = (items: any[], needScrollToBottom: boolean = false) => {
    const { showScrollBottom } = this.state;
    if (needScrollToBottom) {
      this._items = [];
      this.setState({
        dataProvider: this.state.dataProvider.cloneWithRows(items)
      }, () => {
        setTimeout(() => {
          this.scrollTop(0);
        }, 150);
      });
      return;
    }

    if (showScrollBottom) {
      this._items = cloneDeep(items);
      return;
    }

    this._items = [];
    this.setState({
      dataProvider: this.state.dataProvider.cloneWithRows(items)
    }, () => {
      this.scrollTop(0);
    });
  }

  get Items(): Array<any> {
    return this.state.dataProvider.getAllData();
  }

  getItem = (index: number) => {
    const items = this.Items;
    if (items.length > index && index >= 0) {
      return items[index];
    }
    return null;
  }

  getItemIndex = (item: any, field?: string, scrollItems: any[] = []): number => {
    const items = scrollItems.length ? scrollItems : this.Items;
    if (field) {
      for (const index in items) {
        if (item[field] === items[index][field]) {
          return +index;
        }
      }
      return undefined;
    }
    const { keyField } = this.props;
    for (const index in items) {
      if (item[keyField] === items[index][keyField]) {
        return +index;
      }
    }
    return undefined;
  }

  getItemById = (id) => {
    const items = this.Items;
    const { keyField } = this.props;
    for (const item of items) {
      if (item[keyField] === id) {
        return item;
      }
    }
  }

  getItemSibling(item: any): any[] {
    const items = this.Items;
    const itemIndex = this.getItemIndex(item);
    if (!itemIndex && itemIndex !== 0) {
      return [undefined, undefined];
    }
    const prevIndex = itemIndex - 1;
    const nextIndex = itemIndex + 1;
    const prevItem = prevIndex >= 0 ? items[prevIndex] : undefined;
    const nextItem = nextIndex <= items.length - 1 ? items[nextIndex] : undefined;
    return [prevItem, nextItem];
  }

  addItem = (item: any) => {
    const newItems = this.Items;
    newItems.splice(0, 0, item);
    this.setState({
      noneItems: (newItems.length === 0 ? true : false),
      dataProvider: this.state.dataProvider.cloneWithRows(newItems)
    });
  };

  updateItem = (item: any, fieldKey?: string) => {
    if (!item) {
      return;
    }
    const findIndex = this.getItemIndex(item, fieldKey);
    if (!findIndex && findIndex !== 0) {
      return;
    }
    this.Items[findIndex] = cloneDeep(item);
    this.Items = this.Items;

    if (this._items && this._items.length) {
      const _findIndex = this.getItemIndex(item, fieldKey, this._items);
      if (!_findIndex && _findIndex !== 0) {
        return;
      }
      this._items[_findIndex] = cloneDeep(item);
    }
  };

  removeItemsByIds = (ids: Array<string>): boolean => {
    let removeItemSuccess = false;
    const items = this.Items;
    const { keyField } = this.props;
    ids.forEach(id => {
      const indexRemove = items.findIndex(item => item[keyField] === id);
      if (indexRemove >= 0) {
        items.splice(indexRemove, 1);
        removeItemSuccess = true;
      }
    });
    this.Items = items;
    return removeItemSuccess;
  }

  moveItemToIndex = (item: any, toIndex: number): boolean => {
    const itemIndex = this.getItemIndex(item);
    if (!itemIndex) {
      return false;
    }
    const items: any[] = this.Items;
    items.splice(itemIndex, 1);
    items.splice(toIndex, 0, item);

    this.setState({
      dataProvider: this.state.dataProvider.cloneWithRows(items),
    });
  }

  checkDataEmpty = () => {
    let items = this.Items;
    return items.length ? false : true;
  }

  checkAllItems = () => {
    const { onItemSelect } = this.props;
    let items = this.Items;
    items.forEach((item: any) => {
      item.active = true;
      onItemSelect && onItemSelect(item, true);
    });
    this.setState({
      dataProvider: this.state.dataProvider.cloneWithRows(items),
    });
  }

  toggleActive = (index: number) => {
    let items = this.Items;
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
  }

  checkOutOfLimitActive = (items: Array<any>) => {
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
  }

  updateActiveIndex = (items: Array<any>) => {
    let activeCount = 0;
    items.forEach((item: any) => {
      if (item.active) {
        item.activeIndex = activeCount + 1;
        activeCount += 1;
      }
    });
    return items;
  }


  getActiveItems = () => {
    const items = this.Items;
    const retItems: Array<any> = [];
    items.forEach((item: any) => {
      if (item.active) {
        retItems.push(item);
      }
    });
    return retItems;
  }

  deactivateAllItems = () => {
    const { onItemSelect } = this.props;
    const items = this.Items;
    items.forEach((item: any) => {
      item.active = false;
      onItemSelect && onItemSelect(item, false);
    });
    this.setState({
      dataProvider: this.state.dataProvider.cloneWithRows(items),
    });
  }


  updatePropertyOfItems = (key: string, value: any) => {
    const items = this.Items;
    for (const item of items) {
      item[key] = value;
    }
    this.Items = this.Items;
  }

  scrollToItemOrIndex = (item?: any, indexScroll: number = undefined) => {
    if (!this._listView) {
      return;
    }
    if (indexScroll === undefined) {
      indexScroll = !item ? -1 : this.getItemIndex(item);
    }
    if (indexScroll < 0) {
      return;
    }
    if (!this._listView.getVirtualRenderer() || !this._listView.getVirtualRenderer().getLayoutManager()) {
      return;
    }
    const offset = this._listView.getVirtualRenderer().getLayoutManager().getOffsetForIndex(indexScroll);
    this.scrollTop(offset.y);
  };

  getOffsetItemByIndex = (index: number): { x: number, y: number } => {
    if (index >= this.Items.length || !this._listView || !this._listView.getVirtualRenderer() || !this._listView.getVirtualRenderer().getLayoutManager()) {
      return { x: 0, y: 0 }
    }
    const offset = this._listView.getVirtualRenderer().getLayoutManager().getOffsetForIndex(index);
    // console.log('getOffsetItemByIndex ', offset);
    return offset;
  }

  scrollTop = (top: number = 0) => {
    if (this.scrollView) {
      setTimeout(() => {
        this.scrollView && this.scrollView.scrollTo({ y: top });
      }, 0);
      return;
    }

    setTimeout(() => {
      this._listView && this._listView.scrollToOffset(0, top);
    }, 50);
  };

  setSearchValue = (_searchValue: string) => { };

  hasDiffSearch = (searchValue: string) => {
    if (this.currSearch !== searchValue) {
      return true;
    }
    return false;
  };


  rowRenderer = (type: any, item: any, index: number) => {
    const { onRenderRow } = this.props;
    const totalCount = this.Items.length;
    const lastIndex = index === totalCount - 1;
    return onRenderRow(type, item, index, lastIndex);
  };

  renderFooter = () => {
    const { allLoaded, loading, loaded, endReached, dataProvider } = this.state;
    const { showLoading, loadAllMessage, hr, inverted } = this.props;
    const length = dataProvider.getAllData().length;
    const outScreen = hr * length > Constants.Height - Constants.HeaderHeight ? true : false;
    // console.log('_renderFooter ',length, hr, (Constants.Height - Constants.HeaderHeight));
    if (loading && loaded && showLoading) {
      return (
        <View style={styles.loadingRow}>
          <Indicator isShow={true} color={Color.textSecondary} />
        </View>
      );
    }
    // if (!inverted && loadAllMessage && !loading && loaded
    //   && !this.checkDataEmpty() && allLoaded && endReached && outScreen && length) {
    //   return (
    //     <View style={[styles.allItemRow]}>
    //       <WrapText st={[Styles.Text_S_R, { color: Color.textSecondary }]}>{loadAllMessage}</WrapText>
    //     </View>
    //   );
    // }
    return <View />;
  };

  onEndReachedHandler = () => {
    this.setState({ endReached: true });
    this.fetchMoreData();
  };

  onScrollHandler = (_rawEvent: any, offsetX: number, offsetY: number) => {
    const { onScroll, onBottomEndReached } = this.props;
    const { showScrollBottom } = this.state;
    this._scrollY = offsetY;
    if (onScroll) {
      onScroll(offsetX, offsetY);
    }
    const offset = this.getOffsetItemByIndex(1);
    if (offsetY > offset.y) {
      this.needScrollToBottom = true;
      !showScrollBottom && this.setState({ showScrollBottom: true });
    } else {
      showScrollBottom && this.setState({ showScrollBottom: false });
    }
    if (this.needScrollToBottom && offsetY < 30) {
      this.needScrollToBottom = false
      if (onBottomEndReached) {
        onBottomEndReached();
      }
      if (this._items && this._items.length) {
        this.setState({
          hasBadge: false,
          dataProvider: this.state.dataProvider.cloneWithRows(this._items)
        });
        this._items = [];
      } else {
        this.setState({ hasBadge: false });
      }

    }
  };

  onScrollToBottomPress = () => {
    const { onScrollToBottom } = this.props;
    onScrollToBottom && onScrollToBottom();
  };

  onCheckAllSelect = (active: boolean, _value: any) => {
    this.setState({ isCheckAll: active });
    if (active) {
      this.checkAllItems();
    } else {
      this.deactivateAllItems();
    }
  }

  getHeightContainer = () => {
    const { itemVisibleNumber, hr } = this.props;
    if (!itemVisibleNumber) {
      return { flex: 1 }
    }
    const itemVisibleCount = Math.min(itemVisibleNumber, this.Items.length);
    return { height: hr * itemVisibleCount };
  };

  renderLoading = () => {
    const { loadingIcon, loadingIconText, loadingIconImage, inverted } = this.props;
    const { loaded, refreshing, loading, isBackgroundLoading } = this.state;
    if (!loaded && loading && !refreshing && !isBackgroundLoading) {
      if (!loadingIcon) {
        return (
          <Indicator isShow={true} ref={ref => (this._indicator = ref)} color={Color.textSecondary} />
        )
      }
      if (!inverted) {
        return (
          <View style={styles.loadingIconContainer}>
            { !loadingIconImage && <DotIndicator color={Color.textSecondary} count={3} size={10} />}
            { loadingIconImage && <CustomIcon name={loadingIconImage} size={90} style={{ color: Color.textSecondary }} />}
            { !this.Items.length &&
              <WrapText nl={2} st={[Styles.Text_S_R, styles.noneText, { color: Color.textSecondary }]}>
                {loadingIconText ? loadingIconText : 'Đang tải nội dung, bạn vui lòng đợi chút nhé'}
              </WrapText>
            }
          </View>
        )
      }
      return (
        <View style={styles.loadingIconContainer}>
          { !loadingIconImage && <DotIndicator color={Color.textSecondary} count={3} size={10} />}
          { !this.Items.length &&
            <WrapText nl={2} st={[Styles.Text_S_R, styles.noneText, { marginTop: 0, color: Color.textSecondary, transform: [{ scaleY: -1 }] }]}>
              {loadingIconText ? loadingIconText : 'Đang tải nội dung, bạn vui lòng đợi chút nhé'}
            </WrapText>
          }
          { loadingIconImage && <CustomIcon name={loadingIconImage} size={90} style={{ marginTop: 20, color: Color.textSecondary, transform: [{ rotate: '-180deg' }] }} />}
        </View>
      )
    }
    return null;
  }

  handleRetry = () => {
    this.setState({ refreshing: true });
    this.refreshData();
  }

  render() {
    const {
      loaded,
      refreshing,
      loading,
      externalScroll,
      isNoneDataStatus,
      showScrollBottom,
      hasBadge,
      isCheckAll,
      isLoadError,
      ignoreShowScroll,
      isBackgroundLoading,
    } = this.state;

    const {
      autoH,
      containerStyle,
      noneItemsMsg,
      hasRefreshControl,
      headerPaddingTop,
      top,
      extendedState,
      hasExtendedState,
      onRefreshControl,
      searchItemEmptyMessage,
      icon,
      inverted,
      noneItem,
      hasCheckAll,
      checkAllTitle,
      loadErrorIcon,
      loadErrorText
    } = this.props;

    const paddingTop = headerPaddingTop ? Constants.HeaderHeight + top : top;
    let props = {
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      forceNonDeterministicRendering: autoH,
      onEndReachedThreshold: 1,
      dataProvider: this.state.dataProvider,
      layoutProvider: this._layoutProvider,
      keyboardShouldPersistTaps: 'always',
      onEndReached: this.onEndReachedHandler,
      rowRenderer: this.rowRenderer,
      renderFooter: this.renderFooter,
      onScroll: this.onScrollHandler
    };

    if (externalScroll) {
      props = { ...props, ...{ externalScrollView: this.renderScroll } };
    }

    if (extendedState) {
      props = { ...props, ...{ extendedState: extendedState } };
    }
    else if (hasExtendedState) {
      props = { ...props, ...{ extendedState: this.state } };
    }
    //props.extendedState = this.state.dataProvider;

    if (hasRefreshControl) {
      props = {
        ...props, ...{
          scrollViewProps: inverted ? {} : {
            refreshControl: (
              <RefreshControl
                refreshing={refreshing}
                colors={[Color.primary]}
                tintColor={Color.primary}
                onRefresh={async () => {
                  this.setState({ refreshing: true });
                  this.refreshData();
                  if (onRefreshControl) {
                    onRefreshControl();
                  }
                }}
                // Android offset for RefreshControl
                progressViewOffset={paddingTop}
              />
            )
          },
        }
      };
    }

    const hasData = !this.checkDataEmpty();
    const showNoneMessage = noneItemsMsg !== '' ? true : false;
    const noneDataStatus = !loading && loaded && showNoneMessage;
    if (!isNoneDataStatus && noneDataStatus) {
      setTimeout(() => {
        this.setState({ isNoneDataStatus: true });
      }, 0);
    }

    const containerBoundStyle = this.getHeightContainer();
    const invertedStyle = inverted ? { transform: [{ scaleY: -1 }] } : {};
    const hasNoneItem = noneItem ? true : false;
    const contentStyle = (!loaded && loading) ? {flex: 1, opacity: 0.15} : {flex : 1};
    return (
      <View style={[{ backgroundColor: Color.background, paddingTop: headerPaddingTop ? Constants.HeaderHeight : 0 }, containerStyle, containerBoundStyle, invertedStyle, { minHeight: 5 }]}>
        {
          hasData && hasCheckAll && (
            <View style={{ marginTop: 10 }}>
              <View style={[Styles.RowCenter, Styles.JustifyBetween, { paddingLeft: 20, paddingRight: 4 }]}>
                <WrapText st={[Styles.Text_S_R]}>{checkAllTitle}</WrapText>
                <Checkbox
                  active={isCheckAll}
                  value={'1'}
                  onActiveChange={this.onCheckAllSelect} />
              </View>
              <View style={styles.divider} />
            </View>
          )
        }
        { hasData &&
          <RecyclerListView
            ref={(comp: any) => { this._listView = comp; }}
            style={contentStyle}
            {...props}
            itemAnimator={new BaseItemAnimator()}
            canChangeSize={true}
          />
        }
        {
          showScrollBottom && inverted && !ignoreShowScroll &&
          <View style={[styles.scrollBottomButton]}>
            <TouchableOpacity style={[Styles.CenterItem, { flex: 1 }]} onPress={this.onScrollToBottomPress}>
              <CustomIcon name={'nav_back'} size={14} color={Color.text} style={{ transform: [{ rotate: '90deg' }] }} />
            </TouchableOpacity>
            {hasBadge && <View style={styles.badgeNumber} />}
          </View>
        }

        {!hasData && isNoneDataStatus && inverted && !loading &&
          <DismissKeyboard>
            <View style={[styles.noneItem, invertedStyle]}>
              {noneItem}
              {
                !hasNoneItem && !isLoadError &&
                <View style={[Styles.CenterItem]}>
                  {icon && <CustomIcon name={icon} size={90} style={{ color: Color.textSecondary }} /> }
                  <WrapText nl={2} st={[Styles.Text_S_R, styles.noneText]}>
                    {this.currSearch && this.currSearch !== '' ? searchItemEmptyMessage : noneItemsMsg}
                  </WrapText>
                </View>
              }
              {
                // TODO
                !hasNoneItem && isLoadError &&
                <View style={[Styles.CenterItem]}>
                  <CustomIcon name={loadErrorIcon} size={90} style={{ color: Color.textSecondary }} />
                  <WrapText nl={2} st={[Styles.Text_S_R, styles.noneText]}>{loadErrorText}</WrapText>
                  <WrapText styles={[Styles.Text_S_R, styles.noneText, { color: Color.primary, marginTop: 6 }]}
                    onPress={this.handleRetry}>{'Thử lại'}</WrapText>
                </View>
              }
            </View>
          </DismissKeyboard>
        }

        {!hasData && isNoneDataStatus && !inverted && !loading &&
          <DismissKeyboard>
            <View style={[styles.noneItem, invertedStyle]}>
              {noneItem}
              {
                !hasNoneItem && !isLoadError &&
                <View style={[Styles.CenterItem]}>
                  {icon && <CustomIcon name={icon} size={90} style={{ color: Color.textSecondary }} /> }
                  <WrapText nl={2} st={[Styles.Text_S_R, styles.noneText]}>
                    {this.currSearch && this.currSearch !== '' ? searchItemEmptyMessage : noneItemsMsg}
                  </WrapText>
                </View>
              }
              {
                // TODO
                !hasNoneItem && isLoadError &&
                <View style={[Styles.CenterItem]}>
                  <CustomIcon name={loadErrorIcon} size={90} style={{ color: Color.textSecondary }} />
                  <WrapText nl={2} st={[Styles.Text_S_R, styles.noneText]}>{loadErrorText}</WrapText>
                  <WrapText styles={[Styles.Text_S_R, styles.noneText, { color: Color.primary, marginTop: 6 }]}
                    onPress={this.handleRetry}>{'Thử lại'}</WrapText>
                </View>
              }
            </View>
          </DismissKeyboard>
        }

        {!hasData && isNoneDataStatus && !inverted && !hasNoneItem && !isLoadError &&
          <ScrollView style={{ flex: 1 }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', paddingTop: (Platform.OS === 'ios') ? 0 : top, flexGrow: 1 }}
            contentInset={{
              top: top,
            }}
            contentOffset={{ x: 0, y: 0, }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[Color.primary]}
                tintColor={Color.primary}
                onRefresh={async () => {
                  this.setState({ refreshing: true });
                  this.refreshData();
                }}
                // Android offset for RefreshControl
                progressViewOffset={top}
              />
            } />
        }
        {this.renderLoading()}
        { isBackgroundLoading && this.renderBackgroundFetchDataNotification()}
      </View>
    );
  }

  renderBackgroundFetchDataNotification = () => {
    const { inverted } = this.props;
    const invertedStyle = inverted ? { transform: [{ scaleY: -1 }], bottom: 20 } : { top: 20 };
    return (
      <View style={[Styles.Row, Styles.JustifyCenter, styles.renderBackgroundWrap, invertedStyle]}>
        <WrapText c={'#fff'} styles={[Styles.Text_S_R, styles.renderBackgroundText]}>{'Đang cập nhật...'}</WrapText>
      </View>
    )
  }

  renderScroll = (props: any) => {
    const { top, bottom } = this.props;
    const paddingTop = top;
    return (
      <ScrollView
        {...props}
        ref={ref => this.scrollView = ref}
        keyboardShouldPersistTaps='handled'
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: (Platform.OS === 'ios') ? 0 : paddingTop,
          paddingBottom: bottom,
        }}
        contentInset={{
          top: paddingTop,
        }}
        contentOffset={{ y: -paddingTop, }}
      />
    );
  };
}

export default ListView;
