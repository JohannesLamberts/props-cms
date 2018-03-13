import { TimePicker }             from 'material-ui-pickers';
import { Moment }                 from 'moment';
import * as React                 from 'react';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ prop, record, onDataChange }: TypeElementEditorProps<'time'>) => (
    <TimePicker
        style={{ width: '100%' }}
        keyboard={true}
        clearable={true}
        ampm={false}
        value={record}
        label={prop.label}
        format={'HH:mm'}
        onChange={(date: Moment) => onDataChange(date.toDate())}

    />
);