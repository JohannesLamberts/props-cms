import { TimePicker }             from 'material-ui-pickers';
import * as React                 from 'react';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ field, record, onDataChange }: TypeElementEditorProps<'time'>) => (
    <TimePicker
        style={{ width: '100%' }}
        keyboard={true}
        clearable={true}
        ampm={false}
        value={record}
        label={field.label}
        format={'HH:mm'}
        returnMoment={false}
        onChange={onDataChange as (date: Date) => void}
    />
);