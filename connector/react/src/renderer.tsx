import { CollElementModel }                     from 'props-cms.connector-common';
import * as React                               from 'react';
import AsyncComponent, { AsyncComponentImport } from './asyncComponent';
import {
    CmsConnectorChannel,
    CmsConnectorContextType,
    CollectionImports
}                                               from './connector';

export interface CmsImportProps {
    data: CollElementModel | CollElementModel[];
    enclose?: React.ComponentType<{ children: React.ReactNode }>;
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

    static contextTypes = CmsConnectorContextType;

    render() {

        const { data, enclose: EncloseComponent } = this.props;
        const collections: CollectionImports = this.context[CmsConnectorChannel].collections;

        const modelArr = Array.isArray(data) ? data : [data];

        return modelArr.map(model => {
            const rendered = (
                <RenderImport
                    key={model._id}
                    importFn={collections[model.collection]}
                    inject={model.data}
                />
            );
            return EncloseComponent
                ? <EncloseComponent>{rendered}</EncloseComponent>
                : rendered;
        });
    }
}