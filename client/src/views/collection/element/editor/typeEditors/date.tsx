import { DatePicker }             from 'material-ui-pickers';
import * as React                 from 'react';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ field, record, onDataChange }: TypeElementEditorProps<'date'>) => (
    <DatePicker
        style={{ width: '100%' }}
        keyboard={true}
        clearable={true}
        value={record}
        label={field.label}
        format={'DD.MM.Y'}
        returnMoment={false}
        onChange={onDataChange as (date: Date) => void}
    />
);