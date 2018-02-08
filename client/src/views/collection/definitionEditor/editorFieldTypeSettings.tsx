import { Typography } from 'material-ui';
import * as React     from 'react';
import {
    CollDefinitionFieldOptions,
    CollDefinitionFieldTypeIdent
}                     from '../../../models/collectionDefinition.model';
import { TagInput }   from '../../../util/index';

export const CollDefinitionFieldTypeSettings = <TKey extends CollDefinitionFieldTypeIdent>(props: {
    typeIdent: TKey;
    typeOptions: CollDefinitionFieldOptions[TKey];
    onTypeDataChange: (data: CollDefinitionFieldOptions[TKey]) => void;
}) => {
    const { typeIdent, typeOptions, onTypeDataChange } = props;

    let form: React.ReactNode | undefined = undefined;

    if (typeIdent === 'select') {
        const selectData = typeOptions as CollDefinitionFieldOptions['select'];
        const update = (partial: Partial<CollDefinitionFieldOptions['select']>) => {
            onTypeDataChange(Object.assign({}, selectData, partial));
        };
        form = (
            <TagInput
                values={selectData.values}
                onChange={values => update({ values })}
            />
        );

    } else if (typeIdent === 'selectMultiple') {

        const selectData = typeOptions as CollDefinitionFieldOptions['selectMultiple'];
        const update = (partial: Partial<CollDefinitionFieldOptions['selectMultiple']>) => {
            onTypeDataChange(Object.assign({}, selectData, partial));
        };
        form = (
            <TagInput
                values={selectData.values}
                onChange={values => update({ values })}
            />
        );
    }

    if (!form) {
        return null;
    }

    return (
        <div
            style={{
                backgroundColor: 'rgba(0,0,0,0.07)',
                padding: '12px'
            }}
        >
            <Typography variant={'caption'}>
                OPTIONEN
            </Typography>
            {form}
        </div>
    );
};