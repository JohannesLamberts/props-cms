import * as React                 from 'react';
import { SimpleTextField }        from '../../../../../util/index';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ prop, record, onDataChange }: TypeElementEditorProps<'text'>) => (
    <SimpleTextField
        TextFieldProps={{
            fullWidth: true
        }}
        label={prop.label}
        value={record as string}
        onBlur={onDataChange}
    />
);