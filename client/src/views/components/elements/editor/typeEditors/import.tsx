import {
    FormControlLabel,
    Switch,
    Typography,
    withStyles,
    WithStyles
}                                 from 'material-ui';
import {
    CollDefinitionModel,
    CollElementModelDataRecord
}                                 from 'props-cms.connector-common';
import * as React                 from 'react';
import { InitialFieldData }       from '../../../../initializers/collectionElementDataRecordInitial';
import { withDatabaseConnect }    from '../../../../redux/database/database.decorate';
import { CollectionSelect }       from '../../../../util';
import CollElementEditorField     from '../editorFieldTypeEditor';
import { TypeElementEditorProps } from './typeEditorProps';

const styles = {
    filterRow: {
        display: 'flex',
        '& > *:first-child': {
            flexBasis: '150px',
            flexGrow: 0,
            overflow: 'hidden'
        }
    }
};

const decorateStyles = withStyles(styles);

class Editor extends React.PureComponent<TypeElementEditorProps<'import'> & {
    collDefinition: CollDefinitionModel;
    onMount: () => void;
} & WithStyles<keyof typeof styles>> {

    onMount() {
        this.props.onMount();
    }

    render() {
        const { field, record, onDataChange, collDefinition, classes } = this.props;

        const data: CollElementModelDataRecord['import'] = record || {
            collection: '%NONE%',
            filter: {}
        };

        const update = (partial: Partial<CollElementModelDataRecord['import']>) => {
            onDataChange(Object.assign(
                {},
                data,
                partial));
        };

        return (
            <div>
                <Typography variant={'caption'}>
                    {field.label}
                </Typography>
                <CollectionSelect
                    label={'Collection'}
                    value={data.collection}
                    onChange={collection => update({ collection })}
                />
                {collDefinition && (
                    <div>
                        {collDefinition
                            .fields
                            .filter(defField => !defField.isArray
                                && ['import', 'file', 'image', 'tags', 'selectMultiple']
                                    .indexOf(defField.type) === -1)
                            .map(defField => {
                                const fieldCompareData = data.filter[defField.key];
                                const active = fieldCompareData !== undefined;
                                return (
                                    <div
                                        key={defField.key}
                                        className={classes.filterRow}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={active}
                                                    onChange={(event, checked) => {
                                                        update({
                                                                   filter: Object.assign(
                                                                       {},
                                                                       data.filter,
                                                                       {
                                                                           [defField.key]: checked
                                                                               ? {
                                                                                   compare: '$eq',
                                                                                   value: InitialFieldData(defField)
                                                                               }
                                                                               : undefined
                                                                       })
                                                               });
                                                    }}
                                                />
                                            }
                                            label={defField.label}
                                        />
                                        {active && (
                                            <CollElementEditorField
                                                field={defField}
                                                record={fieldCompareData.value}
                                                onDataChange={value => {
                                                    update({
                                                               filter: Object.assign(
                                                                   {},
                                                                   data.filter,
                                                                   {
                                                                       [defField.key]: {
                                                                           compare: fieldCompareData.compare,
                                                                           value
                                                                       }
                                                                   })
                                                           });
                                                }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>
        );
    }
}

const decorateDatabase = withDatabaseConnect(
    {},
    ({ record }: TypeElementEditorProps<'import'>) => ({
        collDefinition: {
            collection: 'coll_definition' as 'coll_definition',
            id: record ? record.collection : ''
        }
    }));

export default decorateDatabase(decorateStyles(Editor));