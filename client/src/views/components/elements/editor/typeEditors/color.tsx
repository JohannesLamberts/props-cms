import * as React                 from 'react';
import { ColorTextInput }         from '../../../../../util/index';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ field, record, onDataChange }: TypeElementEditorProps<'color'>) => (
    <ColorTextInput
        label={field.label}
        value={record as string}
        onChange={onDataChange}
    />
);