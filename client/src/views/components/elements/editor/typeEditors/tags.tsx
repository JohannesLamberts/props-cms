import * as React                 from 'react';
import { TagInput }               from '../../../../util/index';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ field, record, onDataChange }: TypeElementEditorProps<'tags'>) => (
    <TagInput
        values={record || []}
        onChange={onDataChange}
    />
);