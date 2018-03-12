type TChHttpMethod = 'GET' | 'POST' | 'DELETE' | 'HEAD' | 'PATCH' | 'PUT';

const defaultHeaders = new Headers();
defaultHeaders.append('content-type', 'application/json');
defaultHeaders.append('accept', 'application/json');

export class HttpApi {

    constructor(private _url: string) {
        if (this._url[this._url.length - 1] !== '/') {
            this._url += '/';
        }
    }

    public get<TResponseData>(url: string): Promise<TResponseData> {
        return this._fetch(url, 'GET');
    }

    public post<TResponseData, TRequestData>(url: string, data: TRequestData): Promise<TResponseData> {
        return this._fetch(url, 'POST', data);
    }

    public put<TResponseData, TRequestData>(url: string, data: TRequestData): Promise<TResponseData> {
        return this._fetch(url, 'PUT', data);
    }

    public patch<TResponseData, TRequestData>(url: string, data: TRequestData): Promise<TResponseData> {
        return this._fetch(url, 'PATCH', data);
    }

    public delete<TResponseData>(url: string): Promise<TResponseData> {
        return this._fetch(url, 'DELETE');
    }

    private _fetch<TResponseData>(path: string,
                                  method: TChHttpMethod,
                                  body: {} | null = null): Promise<TResponseData> {

        const init: RequestInit = {
            method: method,
            headers: defaultHeaders
        };

        if (body) {
            init.body = JSON.stringify(body);
        }

        return fetch(this._url + path, init)
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
}