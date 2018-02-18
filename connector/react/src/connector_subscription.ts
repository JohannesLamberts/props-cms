export class ConnectorSubscription {
    constructor(private _cb: (...args: any[]) => void) {

    }

    next(...args: any[]) {
        this._cb(...args);
    }

    unsubscribe() {

    }
}