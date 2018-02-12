import * as PropTypes           from 'prop-types';
import { CollElementModel }     from 'props-cms.connector-common';
import * as React               from 'react';
import { AsyncComponentImport } from './asyncComponent';

export const CmsConnectorChannel = '__CMS_CONNECTOR__';

export const CmsConnectorContextType: {
    __CMS_CONNECTOR__: any;
} = {
    __CMS_CONNECTOR__: PropTypes.object
};

export type CollectionImports = Record<string, () => AsyncComponentImport | React.ComponentType>;

export type CmsContextRequest =
    (collIdent: string,
     query: Object,
     callback: (nodes: CollElementModel[],
                err?: Error) => void) => void;

export interface CmsContext {
    request: CmsContextRequest;
    collections: CollectionImports;
}

export interface CmsConnectorProps {
    children: any;
    url: string;
    collections: CollectionImports;
}

class CmsConnector extends React.Component<CmsConnectorProps> {

    static childContextTypes = CmsConnectorContextType;

    static fetch<TReturn extends Object>(url: string): Promise<TReturn> {

        const headers = new Headers();
        headers.append('accept', 'application/json');

        return fetch(url,
                     {
                         method: 'GET',
                         headers
                     })
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP ERROR');
                }
                return response.json()
                               .catch(() => {
                                   return { status: response.statusText };
                               });
            });
    }

    getChildContext() {

        const { url, collections } = this.props;

        const request: CmsContextRequest = (collIdent: string,
                                            query: Object,
                                            callback: (models: CollElementModel[],
                                                       err?: Error) => void) => {
            CmsConnector
                .fetch<CollElementModel[]>(url + `/${collIdent}?query=${JSON.stringify(query)}`)
                .then(models => {
                    callback(models);
                });
        };

        return {
            [CmsConnectorChannel]: {
                request,
                collections
            }
        };
    }

    render() {
        return this.props.children;
    }
}

export default CmsConnector;