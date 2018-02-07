import {
    Request,
    Response
} from 'express';

type ApiCallback<TBodyParams, TRouteParams, TSearchParams>
    = (req: Request,
       res: Response,
       data: {
           body: TBodyParams,
           params: TRouteParams,
           query: TSearchParams
       }) => void;

type ApiMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export class ApiRoute<TRouteParams> {

    private _requestHandler: Partial<Record<ApiMethod, ApiCallback<any, any, any>>> = {};

    get methods() {
        return this._requestHandler;
    }

    get<TSearchParams = {}>
    (fn: ApiCallback<{}, TRouteParams, TSearchParams>): this {
        this._setMethod('get', fn);
        return this;
    }

    post<TBodyParams = {}, TSearchParams = {}>
    (fn: ApiCallback<TBodyParams, TRouteParams, TSearchParams>): this {
        this._setMethod('post', fn);
        return this;
    }

    del<TBodyParams = {}, TSearchParams = {}>
    (fn: ApiCallback<TBodyParams, TRouteParams, TSearchParams>): this {
        this._setMethod('delete', fn);
        return this;
    }

    patch<TBodyParams = {}, TSearchParams = {}>
    (fn: ApiCallback<TBodyParams, TRouteParams, TSearchParams>): this {
        this._setMethod('patch', fn);
        return this;
    }

    private _setMethod(method: ApiMethod, fn: ApiCallback<any, any, any>) {
        this._requestHandler[method] = fn;
    }
}