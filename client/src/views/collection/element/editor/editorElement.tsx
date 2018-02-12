import {
    Icon,
    IconButton
}                                 from 'material-ui';
import {
    CollDefinitionModel,
    CollElementModel
}                                 from 'props-cms.connector-common';
import * as React                 from 'react';
import { InitialFieldTypeData }   from '../../../../initializers/collectionElementDataRecordInitial';
import { CollElementEditorField } from './editorField';

type CollElementModelEditorProps = {
    onDataChange: (data: Partial<CollElementModel>) => void;
    collElement: CollElementModel;
    collDefinition: CollDefinitionModel;
};

export const CollElementModelEditor = (props: CollElementModelEditorProps) => {

    const { collElement, collDefinition, onDataChange } = props;

    return (
        <div>
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
                    const InsertButton = (insertButtonProps: { insertIndex: number }) => (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.1rem',
                                borderRadius: '2dp',
                                color: 'grey',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                const shallow = fieldData.slice();
                                shallow.splice(insertButtonProps.insertIndex,
                                               0,
                                               InitialFieldTypeData(field));
                                update(shallow);
                            }}
                        >
                            <Icon style={{ fontSize: '0.9rem' }}>add</Icon>
                        </div>
                    );
                    return (
                        <div key={index}>
                            {fieldData.map((fieldDataEl, fieldIndex) => (
                                <div key={fieldIndex}>
                                    <InsertButton
                                        insertIndex={fieldIndex}
                                    />
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <CollElementEditorField
                                            field={field}
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
                                insertIndex={fieldData.length}
                            />
                        </div>
                    );
                }

                return (
                    <div key={index}>
                        <CollElementEditorField
                            field={field}
                            record={fieldData}
                            onDataChange={(newFieldData) => {
                                update(newFieldData);
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};