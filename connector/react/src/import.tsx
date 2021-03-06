import { ElementModel } from 'props-cms.connector-common';
import * as React       from 'react';
import {
    CmsConnectorChannel,
    CmsConnectorContextType,
    CmsContext,
    CmsSubscription
}                       from './connector';
import CmsRender        from './renderer';

export interface CmsImportProps {
    ident: string;
    query?: Object;
    enclose?: React.ComponentType<{ children: React.ReactNode }>;
}

export default class extends React.Component<CmsImportProps, {
    models: ElementModel[],
    err?: Error
}> {

    static contextTypes = CmsConnectorContextType;

    private _subscription: CmsSubscription;

    constructor(props: CmsImportProps) {
        super(props);
        this.state = {
            models: []
        };
    }

    componentWillMount() {
        const context: CmsContext = this.context[CmsConnectorChannel];
        if (!context) {
            return;
        }
        this._subscription = context.subscribe(
            this.props.ident,
            this.props.query || {},
            (models, err) => {
                this.setState({
                                  models,
                                  err
                              });
            });
    }

    componentWillUnmount() {
        this._subscription.unsubscribe();
    }

    render() {
        if (this.state.err) {
            return this.state.err.message || 'Fehler';
        }
        if (this.state.models.length === 0) {
            return null;
        }
        return (
            <CmsRender
                data={this.state.models}
                enclose={this.props.enclose}
            />
        );
    }
}