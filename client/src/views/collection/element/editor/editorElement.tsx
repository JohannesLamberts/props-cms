import {
    Icon,
    IconButton
}                                 from 'material-ui';
import * as React                 from 'react';
import { CollDefinitionModel }    from '../../../../models/collectionDefinition.model';
import {
    CollElementModel,
    CollElementModelDataInitials
}                                 from '../../../../models/collectionElement.model';
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

                const fieldData = collElement.data[field.key];

                if (field.isArray) {
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
                                const shallow = (fieldData || []).slice();
                                shallow.splice(insertButtonProps.insertIndex,
                                               0,
                                               CollElementModelDataInitials[field.type]);
                                update(shallow);
                            }}
                        >
                            <Icon style={{ fontSize: '0.9rem' }}>add</Icon>
                        </div>
                    );
                    return (
                        <div key={index}>
                            {(fieldData || []).map((fieldDataEl, fieldIndex) => (
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
                                            data={fieldDataEl}
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
                                insertIndex={(fieldData || []).length}
                            />
                        </div>
                    );
                }

                return (
                    <div key={index}>
                        <CollElementEditorField
                            field={field}
                            data={fieldData}
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