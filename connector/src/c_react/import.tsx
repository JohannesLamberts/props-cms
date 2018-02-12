import * as React           from 'react';
import { CollElementModel } from '../models';
import {
    CmsConnectorChannel,
    CmsConnectorContextType,
    CmsContext
}                           from './connector';
import CmsRender            from './renderer';

export interface CmsImportProps {
    ident: string;
    query?: Object;
}

export default class extends React.Component<CmsImportProps, {
    models: CollElementModel[],
    err?: Error
}> {

    static contextTypes = CmsConnectorContextType;

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
        context.request(
            this.props.ident,
            this.props.query || {},
            (models, err) => {
                this.setState({
                                  models,
                                  err
                              });
            });
    }

    render() {
        if (this.state.err) {
            return this.state.err.message || 'Fehler';
        }
        if (this.state.models.length === 0) {
            return null;
        }
        return (
            <CmsRender data={this.state.models}/>
        );
    }
}