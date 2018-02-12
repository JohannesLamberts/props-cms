import * as React                               from 'react';
import { CollElementModel }                     from '../models';
import AsyncComponent, { AsyncComponentImport } from './asyncComponent';
import {
    CmsConnectorChannel,
    CmsConnectorContextType,
    CollectionImports
}                                               from './connector';

export interface CmsImportProps {
    data: CollElementModel | CollElementModel[];
}

const RenderImport = ({ importFn, inject }: {
    importFn: () => AsyncComponentImport | React.ComponentType;
    inject: any
}) => {

    if (typeof importFn === 'function') {
        return (
            <AsyncComponent
                importFn={importFn as () => AsyncComponentImport}
                inject={inject}
            />
        );
    }

    const SyncComponent = importFn as React.ComponentType;

    return (
        <SyncComponent {...inject} />
    );
};

export default class extends React.Component<CmsImportProps> {

    static childContextTypes = CmsConnectorContextType;

    render() {

        const { data } = this.props;
        const collections: CollectionImports = this.context[CmsConnectorChannel].collections;

        if (Array.isArray(data)) {
            return data.map(model => (
                <RenderImport
                    key={model._id}
                    importFn={collections[model.collection]}
                    inject={model.data}
                />
            ));
        }

        return (
            <RenderImport
                importFn={collections[data.collection]}
                inject={data.data}
            />
        );
    }
}