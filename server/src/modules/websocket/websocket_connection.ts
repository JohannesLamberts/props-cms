import { Subscription } from 'rxjs/Subscription';
import { MainDatabase } from '../../database.main';

export default class {

    private _dbSubscription: Subscription | null = null;

    constructor(private _socket: SocketIO.Socket) {
    }

    public init(): this {

        this._socket.on('db.subscribe', () => {
            if (!this._dbSubscription) {
                this._dbSubscription = MainDatabase.stream$
                                                   .subscribe(next => {
                                                       this._socket.emit('db.next', next);
                                                   });
            }
        });

        this._socket.on('db.unsubscribe', () => {
            this.dbUnsubscribe();
        });

        return this;
    }

    public destroy() {
        this.dbUnsubscribe();
        return;
    }

    private dbUnsubscribe() {
        if (this._dbSubscription) {
            this._dbSubscription.unsubscribe();
            this._dbSubscription = null;
        }
    }
}