import {
    FormControlLabel,
    Switch,
    Typography,
    withStyles,
    WithStyles
}                                 from 'material-ui';
import {
    ComponentModel,
    ElementModelDataRecord
}                                 from 'props-cms.connector-common';
import * as React                 from 'react';
import { InitialFieldData }       from '../../../../../initializers/collectionElementDataRecordInitial';
import { withDatabaseConnect }    from '../../../../../redux/database/database.decorate';
import { CollectionSelect }       from '../../../../../util';
import ElementEditorField         from '../editorFieldTypeEditor';
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
    component: ComponentModel;
    onMount: () => void;
} & WithStyles<keyof typeof styles>> {

    onMount() {
        this.props.onMount();
    }

    render() {
        const { prop, record, onDataChange, component, classes } = this.props;

        const data: ElementModelDataRecord['import'] = record || {
            collection: '%NONE%',
            filter: {}
        };

        const update = (partial: Partial<ElementModelDataRecord['import']>) => {
            onDataChange(Object.assign(
                {},
                data,
                partial));
        };

        return (
            <div>
                <Typography variant={'caption'}>
                    {prop.label}
                </Typography>
                <CollectionSelect
                    label={'Collection'}
                    value={data.collection}
                    onChange={collection => update({ collection })}
                />
                {component && (
                    <div>
                        {component
                            .props
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
                                            <ElementEditorField
                                                prop={defField}
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
        component: {
            collection: 'component' as 'component',
            id: record ? record.collection : ''
        }
    }));

export default decorateDatabase(decorateStyles(Editor));