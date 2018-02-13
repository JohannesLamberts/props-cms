import * as React           from 'react';
import { TagInput }         from '../../../../util/index';
import { TypeSettingProps } from './typeOptionProps';

export default ({ typeOptions, onChange }: TypeSettingProps<'subContent'>) => (
    <TagInput
        values={typeOptions.options}
        onChange={options => onChange({ options })}
    />
);