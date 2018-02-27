import {
    Collection,
    Db
}                 from 'mongodb';
import { ENV }    from '../env';
import { Server } from '../environment';

const { name, auth } = ENV.db;
const Client = Server.connectMongoDb({ auth });

let Database: Db;

export const getCollection = (collectionName: string) => {
    return Database.collection(collectionName);
};

export default (): Promise<void> => {
    return Client.connect()
                 .then(() => {
                     Database = Client.db(name);
                 });
};