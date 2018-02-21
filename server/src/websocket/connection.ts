import { WebsocketConnection } from 'server-modules';
import { Database }            from '../index';

export class WebsocketSubscriptionConnection extends WebsocketConnection {

    private _subscriptionActive = false;

    public init(): this {

        this._socketListener = this._socketListener.bind(this);

        this._socket.on('db.subscribe', () => {
            this.dbSubscribe();
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

    private _socketListener(update: {
        collection: string;
        document: any
    }) {
        console.debug(update);
        this._socket.emit('db.next', update);
    }

    private dbSubscribe() {
        if (!this._subscriptionActive) {
            Database.emitter.on('change', this._socketListener);
        }
        this._subscriptionActive = true;
    }

    private dbUnsubscribe() {
        if (this._subscriptionActive) {
            Database.emitter.removeListener('change', this._socketListener);
        }
        this._subscriptionActive = false;
    }
}