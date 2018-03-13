import { Typography }             from 'material-ui';
import { ElementModelDataRecord } from 'props-cms.connector-common';
import * as React                 from 'react';
import ElementModelEditor         from '../editorContent';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ prop, record, onDataChange }: TypeElementEditorProps<'subDefinition'>) => (
    <div>
        <Typography variant={'caption'}>
            {prop.label}
        </Typography>
        <ElementModelEditor
            properties={prop.typeOptions.props}
            data={record as ElementModelDataRecord['subDefinition']}
            onDataChange={partialData => onDataChange(Object.assign({}, record, partialData))}
        />
    </div>
);