import {
    Icon,
    IconButton,
    Typography,
    WithStyles,
    withStyles
}                                 from 'material-ui';
import {
    CollDefinitionModel,
    CollElementModel
}                                 from 'props-cms.connector-common';
import * as React                 from 'react';
import { InitialFieldTypeData }   from '../../../../initializers/collectionElementDataRecordInitial';
import { CollElementEditorField } from './editorField';
import InsertButton               from './insertButton';

const styles = {
    root: {
        '& > *:not(:last-child)': {
            marginBottom: '1rem'
        }
    },
    fieldArrayItem: {
        display: 'flex',
        alignItems: 'center'
    } as React.CSSProperties
};

const decorateStyles = withStyles(styles);

type CollElementModelEditorProps = {
    onDataChange: (data: Partial<CollElementModel>) => void;
    collElement: CollElementModel;
    collDefinition: CollDefinitionModel;
} & WithStyles<keyof typeof styles>;

const CollElementModelEditor = (props: CollElementModelEditorProps) => {

    const { collElement, collDefinition, onDataChange, classes } = props;

    return (
        <div className={classes.root}>
            {collDefinition.fields.map((field, index) => {

                const update = (newFieldData: any) => {
                    onDataChange(
                        {
                            data: Object.assign({},
                                                collElement.data,
                                                { [field.key]: newFieldData })
                        });
                };

                let fieldData: any | undefined = collElement.data[field.key];

                if (field.isArray) {
                    fieldData = fieldData || [];
                    return (
                        <div key={index}>
                            <Typography variant={'caption'}>
                                {field.label}
                            </Typography>
                            {fieldData.map((fieldDataEl, fieldIndex) => (
                                <div key={fieldIndex}>
                                    <InsertButton
                                        onClick={() => {
                                            const shallow = fieldData.slice();
                                            shallow.splice(fieldIndex,
                                                           0,
                                                           InitialFieldTypeData(field));
                                            update(shallow);
                                        }}
                                    />
                                    <div className={classes.fieldArrayItem}>
                                        <CollElementEditorField
                                            field={Object.assign({}, field, { label: '' })}
                                            record={fieldDataEl}
                                            onDataChange={(newFieldData) => {
                                                const shallow = fieldData.slice();
                                                shallow[fieldIndex] = newFieldData;
                                                update(shallow);
                                            }}
                                        />
                                        <IconButton
                                            onClick={() => {
                                                const shallow = fieldData.slice();
                                                shallow.splice(fieldIndex, 1);
                                                update(shallow);
                                            }}
                                        >
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                            <InsertButton
                                onClick={() => {
                                    const shallow = fieldData.slice();
                                    shallow.splice(fieldData.length,
                                                   0,
                                                   InitialFieldTypeData(field));
                                    update(shallow);
                                }}
                            />
                        </div>
                    );
                }

                return (
                    <CollElementEditorField
                        key={index}
                        field={field}
                        record={fieldData}
                        onDataChange={(newFieldData) => {
                            update(newFieldData);
                        }}
                    />
                );
            })}
        </div>
    );
};

export default decorateStyles(CollElementModelEditor);