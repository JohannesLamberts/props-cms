import { HttpApi } from './api';

const DatabaseApiConnector = new HttpApi(`http://${window.location.hostname}:4001/db`);

export class DatabaseApiService {

    public static get(collection: string): Promise<{
        _id: string;
    }[]> {
        return DatabaseApiConnector.get(`/${collection}`);
    }

    public static getId(collection: string, id: string): Promise<{
        _id: string;
    }> {
        return DatabaseApiConnector.get(`/${collection}/${id}`);
    }

    public static push(collection: string, insertData: any = {}): Promise<{
        insertedId: string;
    }[]> {
        return DatabaseApiConnector.post(`/${collection}`, { data: insertData });
    }

    public static patch<TData>(collection: string, id: string, patchData: TData): Promise<void> {
        return DatabaseApiConnector.patch(`/${collection}/${id}`, { data: patchData });
    }

    public static delete(collection: string, id: string): Promise<void> {
        return DatabaseApiConnector.delete(`/${collection}/${id}`);
    }
}