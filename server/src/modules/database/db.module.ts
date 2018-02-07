import * as Mongo       from 'mongodb';
import { Logger }       from '../logger/logger';
import { LoggerModule } from '../logger/logger.module';

export const MongoID = Mongo.ObjectID;

export class DatabaseConnection<TCollections> {

    private _logger: Logger;
    private _db: Mongo.Db;

    constructor(private _dbName: string,
                private _auth?: { user: string; pw: string; },
                private _port: string   = '27017',
                private _authDb: string = 'admin') {
        this._logger = LoggerModule.spawn(`DB-${this._dbName}`);
    }

    public connect(): Promise<void> {
        const auth = this._auth ? `${this._auth.user}:${this._auth.pw}` : '';
        const target = `localhost:${this._port}/${this._authDb}`;
        this._logger.info(`... Connecting to ${target}`);
        return Mongo.MongoClient
                    .connect(`mongodb://${auth}@${target}`)
                    .then(mongo => {
                        this._logger.info(`Connected to ${target}`);
                        this._db = mongo.db(this._dbName);
                    });
    }

    public collection<TName extends keyof TCollections>(name: TName) {
        return this._db.collection<TCollections[TName]>(name);
    }
}

export class DatabaseModule {
    public static connect<TCollections = {}>(dbName: string, auth: { user: string; pw: string; }) {
        const db = new DatabaseConnection<TCollections>(dbName, auth);
        db.connect();
        return db;
    }
}