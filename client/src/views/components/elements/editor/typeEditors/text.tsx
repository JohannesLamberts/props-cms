import * as React                 from 'react';
import { SimpleTextField }        from '../../../../util/index';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ field, record, onDataChange }: TypeElementEditorProps<'text'>) => (
    <SimpleTextField
        TextFieldProps={{
            fullWidth: true
        }}
        label={field.label}
        value={record as string}
        onBlur={onDataChange}
    />
);