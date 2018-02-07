export type TChHttpMethod = 'GET' | 'POST' | 'DELETE' | 'HEAD' | 'PATCH' | 'PUT';

const HttpApi = new class {

    private _headers = new Headers();

    constructor() {
        // this._headers.append(kChAuthHeaderName, ChCookieService.getCookie(kChAuthCookieName));
        this._headers.append('content-type', 'application/json');
        this._headers.append('accept', 'application/json');
    }

    public fetch<TResponseData>(url: string,
                                method: TChHttpMethod,
                                body: {} | null = null): Promise<TResponseData> {

        const init: RequestInit = {
            method: method,
            headers: this._headers
        };

        if (body) {
            init.body = JSON.stringify(body);
        }

        return fetch(url, init)
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP ERROR');
                }
                return response.json()
                               .catch(() => {
                                   return { status: response.statusText };
                               });
            });
    }

    public get<TResponseData>(url: string): Promise<TResponseData> {
        return this.fetch(url, 'GET');
    }

    public post<TResponseData, TRequestData>(url: string, data: TRequestData): Promise<TResponseData> {
        return this.fetch(url, 'POST', data);
    }

    public put<TResponseData, TRequestData>(url: string, data: TRequestData): Promise<TResponseData> {
        return this.fetch(url, 'PUT', data);
    }

    public patch<TResponseData, TRequestData>(url: string, data: TRequestData): Promise<TResponseData> {
        return this.fetch(url, 'PATCH', data);
    }

    public delete<TResponseData>(url: string): Promise<TResponseData> {
        return this.fetch(url, 'DELETE');
    }

}();

export abstract class AbstractApiService {

    constructor(private _baseUrl: string,
                private _port: number) {
    }

    protected _get<TResponseData>(path: string): Promise<TResponseData> {
        return HttpApi.get<TResponseData>(this._url(path));
    }

    protected _post<TResponseData, TRequestData>(path: string, body: TRequestData): Promise<TResponseData> {
        return HttpApi.post<TResponseData, TRequestData>(this._url(path), body);
    }

    protected _patch<TResponseData, TRequestData>(path: string, body: TRequestData): Promise<TResponseData> {
        return HttpApi.patch<TResponseData, TRequestData>(this._url(path), body);
    }

    protected _delete<TResponseData>(path: string): Promise<TResponseData> {
        return HttpApi.delete<TResponseData>(this._url(path));
    }

    private _url(path: string) {
        return `http://${window.location.hostname}:${this._port}${this._baseUrl}${path}`;
    }
}