import {
    Icon,
    IconButton,
    Typography,
    WithStyles,
    withStyles
}                               from 'material-ui';
import {
    ComponentProperty,
    ElementModel
}                               from 'props-cms.connector-common';
import * as React               from 'react';
import { InitialFieldTypeData } from '../../../../initializers/collectionElementDataRecordInitial';
import ElementEditorField       from './editorFieldTypeEditor';
import InsertButton             from './insertButton';

const styles = {
    root: {
        '& > *:not(:last-child)': {
            marginBottom: '1rem'
        }
    },
    fieldArrayItem: {
        display: 'flex',
        alignItems: 'center',
        '& > *:not(:last-child)': {
            flexGrow: 1
        }
    } as React.CSSProperties
};

const decorateStyles = withStyles(styles);

type ElementModelEditorProps = {
    onDataChange: (data: Partial<ElementModel['data']>) => void;
    data: ElementModel['data'];
    properties: ComponentProperty[];
} & WithStyles<keyof typeof styles>;

const ElementModelEditor = (props: ElementModelEditorProps) => {

    const { data, properties, onDataChange, classes } = props;

    return (
        <div className={classes.root}>
            {properties.map((field, index) => {

                const update = (newFieldData: any) => {
                    onDataChange({ [field.key]: newFieldData });
                };

                let fieldData: any | undefined = data[field.key];

                if (field.isArray) {
                    fieldData = fieldData || [];
                    return (
                        <div key={index}>
                            <Typography variant={'caption'}>
                                {field.label}
                            </Typography>
                            {fieldData.map((fieldDataEl, fieldIndex) => (
                                <div key={fieldIndex + '_' + fieldData.length}>
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
                                        <ElementEditorField
                                            prop={Object.assign({}, field, { label: '' })}
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
                            <div>
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
                        </div>
                    );
                }

                return (
                    <ElementEditorField
                        key={index}
                        prop={field}
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

export default decorateStyles(ElementModelEditor);