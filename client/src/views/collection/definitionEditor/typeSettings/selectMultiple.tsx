import * as React           from 'react';
import { TagInput }         from '../../../../util/index';
import { TypeSettingProps } from './typeOptionProps';

export default ({ typeOptions, onChange }: TypeSettingProps<'selectMultiple'>) => (
    <TagInput
        values={typeOptions.values}
        onChange={values => onChange({ values })}
    />
);