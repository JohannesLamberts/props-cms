import { Typography }                   from 'material-ui';
import * as React                       from 'react';
import { CollElementModelDataRecord }   from '../../../../../../../connector/common/src';
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