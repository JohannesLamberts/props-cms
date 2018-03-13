import * as React                 from 'react';
import { SimpleTextField }        from '../../../../../util/index';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ prop, record, onDataChange }: TypeElementEditorProps<'textArea'>) => (
    <SimpleTextField
        TextFieldProps={{
            fullWidth: true
        }}
        multiline={true}
        label={prop.label}
        value={record as string}
        onBlur={onDataChange}
    />
);