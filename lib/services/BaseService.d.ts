export interface IApiResult {
    code: number;
    result?: any;
    paging?: any;
    message?: string;
}
export declare enum BaseServiceType {
    LOYALTY = 1,
    MARKETING = 2,
    PROFILING = 3,
    PRODUCT = 4,
    TEST = 5
}
export interface IServiceParamPaging {
    page?: string;
    per_page?: string;
    search?: string;
    afterToken?: string;
}
export declare enum BaseServiceMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    PATCH = "patch",
    DELETE = "delete"
}
export interface IServiceResponse {
    dataKey?: string;
    item?: any;
}
export interface BaseServiceParam {
    baseType?: BaseServiceType;
    path: string;
    method?: BaseServiceMethod;
    body?: any;
    query?: any;
    headers?: any;
    needCache?: boolean;
    paging?: IServiceParamPaging;
    response?: IServiceResponse;
}
export declare class BaseService {
    /**
     * fetch service
     * @param params
     */
    fetch(params: BaseServiceParam): Promise<IApiResult>;
    getResponseData: (response: any, serviceResponse?: IServiceResponse) => any;
    buildParams(params: BaseServiceParam): any;
    googleApiFetch(method: any, url: string): Promise<IApiResult>;
    getApiPath: (type?: BaseServiceType) => string;
}
