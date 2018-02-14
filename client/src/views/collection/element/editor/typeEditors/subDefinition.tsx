import { Typography }                 from 'material-ui';
import { CollElementModelDataRecord } from 'props-cms.connector-common';
import * as React                     from 'react';
import CollElementModelEditor         from '../editorContent';
import { TypeElementEditorProps }     from './typeEditorProps';

export default ({ field, record, onDataChange }: TypeElementEditorProps<'subDefinition'>) => (
    <div>
        <Typography variant={'caption'}>
            {field.label}
        </Typography>
        <CollElementModelEditor
            fields={field.typeOptions.fields}
            data={record as CollElementModelDataRecord['subDefinition']}
            onDataChange={partialData => onDataChange(Object.assign({}, record, partialData))}
        />
    </div>
);