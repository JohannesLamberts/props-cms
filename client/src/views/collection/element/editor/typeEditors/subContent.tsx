import { Typography }                   from 'material-ui';
import { CollElementModelDataRecord }   from 'props-cms.connector-common';
import * as React                       from 'react';
import CollElementEditorFieldSubContent from '../editorFieldSubContent';
import { TypeElementEditorProps }       from './typeEditorProps';

export default ({ field, record, onDataChange }: TypeElementEditorProps<'subContent'>) => (
    <div>
        <Typography variant={'caption'}>
            {field.label}
        </Typography>
        <CollElementEditorFieldSubContent
            typeOptions={field.typeOptions}
            record={record as CollElementModelDataRecord['subContent']}
            onDataChange={onDataChange}
        />
    </div>
);