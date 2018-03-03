import { DateTimePicker }         from 'material-ui-pickers';
import { Moment }                 from 'moment';
import * as React                 from 'react';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ field, record, onDataChange }: TypeElementEditorProps<'dateTime'>) => (
    <DateTimePicker
        style={{ width: '100%' }}
        keyboard={true}
        clearable={true}
        value={record}
        label={field.label}
        format={'DD.MM.Y HH:mm'}
        ampm={false}
        onChange={(date: Moment) => onDataChange(date.toDate())}
    />
);