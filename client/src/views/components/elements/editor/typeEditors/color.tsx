import * as React                 from 'react';
import { ColorTextInput }         from '../../../../../util/index';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ prop, record, onDataChange }: TypeElementEditorProps<'color'>) => (
    <ColorTextInput
        label={prop.label}
        value={record as string}
        onChange={onDataChange}
    />
);