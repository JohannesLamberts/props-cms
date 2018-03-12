import { DatabaseModel } from './_base';

export interface MediaProviderModel extends DatabaseModel {
    url: string;
    label: string;
    description: string;
}