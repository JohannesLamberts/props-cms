import {
    Button,
    Icon
}                                            from 'material-ui';
import { CollDefinitionModelField }          from 'props-cms.connector-common';
import * as React                            from 'react';
import { InitialCollDefinitionFieldOptions } from '../../../initializers/collectionDefinitionFieldOptionInitial';
import CollDefinitionFieldEditor             from './editorField';

const randomId = (length: number = 16): string => {
    let str = '';
    for (let i = 0; i < length; i++) {
        str += Math.floor(Math.random() * 16).toString(16);
    }
    return str;
};

const CollDefinitionEditorFieldList = (props: {
    fields: CollDefinitionModelField[];
    onDataChange: (data: CollDefinitionModelField[]) => void;
}) => {
    const { fields, onDataChange } = props;
    return (
        <div>
            {fields.map((field, index) => {
                return (
                    <CollDefinitionFieldEditor
                        key={index}
                        onDelete={() => {
                            const shallow = fields.slice();
                            shallow.splice(index, 1);
                            onDataChange(shallow);
                        }}
                        onDataChange={(data: Partial<CollDefinitionModelField>) => {
                            const shallow = fields.slice();
                            shallow[index] = Object.assign({}, shallow[index], data);
                            onDataChange(shallow);
                        }}
                        field={field}
                    />

                );
            })}
            <Button
                onClick={() => {
                    onDataChange([...fields, {
                        id: randomId(),
                        key: '',
                        label: '',
                        type: 'text',
                        typeOptions: InitialCollDefinitionFieldOptions.text,
                        helpText: '',
                        isArray: false,
                        allowOverwrite: false
                    }]);
                }}
            >
                <Icon>add</Icon> Add field
            </Button>
        </div>
    );
};

export default CollDefinitionEditorFieldList;