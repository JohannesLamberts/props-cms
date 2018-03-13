import { DatePicker }             from 'material-ui-pickers';
import { Moment }                 from 'moment';
import * as React                 from 'react';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ prop, record, onDataChange }: TypeElementEditorProps<'date'>) => (
    <DatePicker
        style={{ width: '100%' }}
        keyboard={true}
        clearable={true}
        value={record}
        label={prop.label}
        format={'DD.MM.Y'}
        onChange={(date: Moment) => onDataChange(date.toDate())}
    />
);