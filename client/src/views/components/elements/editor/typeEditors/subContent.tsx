import {
    Typography,
    withStyles,
    WithStyles
}                                 from 'material-ui';
import { ComponentModel }         from 'props-cms.connector-common';
import * as React                 from 'react';
import { withDatabaseConnect }    from '../../../../../redux/database/database.decorate';
import { CollectionSelect }       from '../../../../../util/index';
import ElementModelEditor         from '../editorContent';
import { TypeElementEditorProps } from './typeEditorProps';

const styles = {
    area: {
        backgroundColor: 'rgba(0,0,0,0.07)',
        borderRadius: '2px',
        flexGrow: 1,
        padding: '1rem',
        display: 'flex',
        '& > *': {
            flexGrow: 1
        }
    },
    typeSelect: {
        flexBasis: '80px',
        flexGrow: 0
    }
};

type SubContentProps = {
    component: ComponentModel;
    onMount: () => void;
} & TypeElementEditorProps<'subContent'> & WithStyles<keyof typeof styles>;

const decorateStyle = withStyles(styles);

class SubContentEdit
    extends React.PureComponent<SubContentProps> {

    onMount() {
        this.props.onMount();
    }

    render() {

        const { onDataChange, prop, classes, component } = this.props;
        const { typeOptions } = prop;

        const record = this.props.record || {
            collection: '',
            data: {},
            dataOverwrites: []
        };

        return (
            <div>
                <Typography variant={'caption'}>
                    {prop.label}
                </Typography>
                <div className={classes.area}>
                    {/* Select subContentType */}
                    {typeOptions.options.length !== 1 && (
                        <CollectionSelect
                            className={classes.typeSelect}
                            value={record && record.collection || '%NONE%'}
                            label={'Collection'}
                            filter={definition =>
                                typeOptions.options.length === 0
                                || typeOptions.options.indexOf(definition._id!) !== -1}
                            onChange={collection => {
                                onDataChange(Object.assign({},
                                                           record,
                                                           {
                                                               collection,
                                                               data: {},
                                                               dataOverwrites: []
                                                           }));
                            }}
                        />
                    )}
                    {record.collection && (
                        component
                            ? (
                            <ElementModelEditor
                                data={record.data}
                                properties={component.props}
                                onDataChange={newData => onDataChange(
                                    Object.assign({},
                                                  record,
                                                  {
                                                      data: Object.assign({},
                                                                          record.data,
                                                                          newData)
                                                  })
                                )}
                            />
                        )
                            : <span>Loading data for '{record.collection}'</span>
                    )}
                </div>
            </div>
        );
    }
}

const decorateDatabase = withDatabaseConnect(
    {},
    ({ record }: TypeElementEditorProps<'subContent'>) => ({
        component: {
            collection: 'component' as 'component',
            id: record
                ? record.collection
                : ''
        }
    }));

export default decorateDatabase(decorateStyle(SubContentEdit) as any); // TODO: remove as any