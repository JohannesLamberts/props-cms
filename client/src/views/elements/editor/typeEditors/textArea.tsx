import * as React                 from 'react';
import { SimpleTextField }        from '../../../../util/index';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ field, record, onDataChange }: TypeElementEditorProps<'textArea'>) => (
    <SimpleTextField
        TextFieldProps={{
            fullWidth: true
        }}
        multiline={true}
        label={field.label}
        value={record as string}
        onBlur={onDataChange}
    />
);