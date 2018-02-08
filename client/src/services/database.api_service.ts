import { AbstractApiService } from './api';

export const DbApiService = new class extends AbstractApiService {

    constructor() {
        super('/db', 4001);
    }

    public get(collection: string): Promise<{
        _id: string;
    }[]> {
        return this._get(`/${collection}`);
    }

    public getId(collection: string, id: string): Promise<{
        _id: string;
    }> {
        return this._get(`/${collection}/${id}`);
    }

    public push(collection: string, insertData: any = {}): Promise<{
        insertedId: string;
    }[]> {
        return this._post(`/${collection}`, { data: insertData });
    }

    public patch<TData>(collection: string, id: string, patchData: TData): Promise<void> {
        return this._patch(`/${collection}/${id}`, { data: patchData });
    }

    public delete(collection: string, id: string): Promise<void> {
        return this._delete(`/${collection}/${id}`);
    }
}();
