"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = exports.BaseServiceMethod = exports.BaseServiceType = void 0;
const mo_app_common_1 = require("mo-app-common");
const AppConfig_1 = __importDefault(require("../AppConfig"));
const axios_1 = __importDefault(require("axios"));
var BaseServiceType;
(function (BaseServiceType) {
    BaseServiceType[BaseServiceType["LOYALTY"] = 1] = "LOYALTY";
    BaseServiceType[BaseServiceType["MARKETING"] = 2] = "MARKETING";
    BaseServiceType[BaseServiceType["PROFILING"] = 3] = "PROFILING";
    BaseServiceType[BaseServiceType["PRODUCT"] = 4] = "PRODUCT";
    BaseServiceType[BaseServiceType["TEST"] = 5] = "TEST";
})(BaseServiceType = exports.BaseServiceType || (exports.BaseServiceType = {}));
// export interface IServiceParams {
//     path: string;
//     query: any;
//     body: any;
//     paging: IServiceParamsPaging;
// }
var BaseServiceMethod;
(function (BaseServiceMethod) {
    BaseServiceMethod["GET"] = "get";
    BaseServiceMethod["POST"] = "post";
    BaseServiceMethod["PUT"] = "put";
    BaseServiceMethod["PATCH"] = "patch";
    BaseServiceMethod["DELETE"] = "delete";
})(BaseServiceMethod = exports.BaseServiceMethod || (exports.BaseServiceMethod = {}));
const LoyaltyBaseApi = `${AppConfig_1.default.Domain}loyalty/mobile/api/v2.0/`;
const MktBaseApi = 'https://api-test1.mobio.vn/mkt/api/v2.0/';
const ProfilingBaseApi = `${AppConfig_1.default.Domain}profiling/v3.0/`;
const ProductBaseApi = `https://api-test1.mobio.vn/product/api/v1.0/`;
class BaseService {
    constructor() {
        this.getResponseData = (response, serviceResponse) => {
            if (!serviceResponse) {
                return response.data;
            }
            const dataKey = serviceResponse.dataKey || 'data';
            const dataKeys = dataKey.split(',');
            let data = response.data;
            dataKeys.forEach((key) => {
                data = data[key];
            });
            const items = serviceResponse.item ?
                data.map((item) => {
                    const newItem = {};
                    Object.keys(serviceResponse.item).forEach(key => {
                        newItem[key] = item[serviceResponse.item[key]];
                    });
                    return newItem;
                }) :
                [...data];
            return items;
        };
        this.getApiPath = (type) => {
            switch (type) {
                case BaseServiceType.LOYALTY:
                    return LoyaltyBaseApi;
                case BaseServiceType.MARKETING:
                    return MktBaseApi;
                case BaseServiceType.PROFILING:
                    return ProfilingBaseApi;
                case BaseServiceType.PRODUCT:
                    return ProductBaseApi;
                default:
                    return LoyaltyBaseApi;
            }
        };
        // youtubeApiFetch(method,url,callback, callbackError){
        //     let config = {
        //         method:method,
        //         url:url,
        //         headers: {
        //             Accept: 'application/json'
        //         },
        //     };
        //     const service = axios.create(config);
        //     service.request(config)
        //         .then((response) => {
        //             //Alert.alert('','response = '+JSON.stringify(response.data));
        //             callback(response.data);
        //         })
        //         .catch((error) => {
        //             //Alert.alert('','error = '+error);
        //             callbackError(error);
        //         })
        // }
    }
    /**
     * fetch service
     * @param params
     */
    fetch(params) {
        const config = this.buildParams(params);
        // console.log('fetch ', config);
        return new Promise((resolve) => {
            const service = axios_1.default.create(config);
            service.request(config)
                .then((response) => {
                // console.log('fetch response', response);
                if (response && response.data) {
                    const result = {
                        code: response.data.code,
                        result: this.getResponseData(response, params.response),
                        paging: response.data.paging || (response.data.data && response.data.data.paging),
                        message: response.data.message
                    };
                    resolve(result);
                }
            })
                .catch((error) => {
                console.log('fetch error ', error, config, 'data = ', error.response);
                if (error.response && error.response && error.response.status === 401) {
                    mo_app_common_1.toast('Mật khẩu của bạn đã được thay đổi ở thiết bị khác hoặc xác thực của bạn đã quá hạn. Vui lòng đăng nhập lại.');
                    mo_app_common_1.logout(null);
                    return;
                }
                const code = error.response && error.response && error.response.data ? parseInt(`${error.response.data.code}`) : 500;
                resolve({
                    code: code,
                    result: error.response && error.response.data
                });
            });
        });
    }
    buildParams(params) {
        // build query
        const baseQuery = `?lang=${mo_app_common_1.Constants.Lang}&app_code=${AppConfig_1.default.AppCode}&app_version=${AppConfig_1.default.Version}&pd_id=${mo_app_common_1.Constants.PdId}&merchant_id=${AppConfig_1.default.MerchantId}`;
        let query = baseQuery;
        if (params.query) {
            if (typeof params.query === 'string') {
                query = `${query}${params.query}`;
            }
            else {
                Object.keys(params.query).forEach(key => {
                    query = `${query}&${key}=${params.query[key]}`;
                });
            }
        }
        // build url
        const url = `${this.getApiPath(params.baseType)}${params.path}${query}`;
        let config = {
            method: params.method || BaseServiceMethod.GET,
            url: url,
            headers: params.headers || {
                Accept: 'application/json',
                'X-Merchant-ID': AppConfig_1.default.MerchantId,
                'Content-Type': 'application/json',
                'Authorization': mo_app_common_1.Constants.AuthDigest,
            },
        };
        // console.log('fetch ', config);
        if (params.body) {
            config = { ...config, data: params.body };
        }
        return config;
    }
    // /**
    //  * Google api fetch
    //  * @param {*} method
    //  * @param {*} url
    //  */
    googleApiFetch(method, url) {
        return new Promise((resolve) => {
            let config = {
                method: method,
                url: url,
            };
            const service = axios_1.default.create(config);
            service.request(config)
                .then((response) => {
                const result = {
                    code: 200,
                    result: response.data,
                };
                resolve(result);
            })
                .catch(() => {
            });
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=BaseService.js.map