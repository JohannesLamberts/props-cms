import * as React           from 'react';
import { TagInput }         from '../../../../util/index';
import { TypeSettingProps } from './typeOptionProps';

export default ({ typeOptions, onChange }: TypeSettingProps<'select'>) => (
    <TagInput
        values={typeOptions.values}
        onChange={values => onChange({ values })}
    />
);