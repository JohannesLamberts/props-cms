import {
    FormControlLabel,
    Switch,
    Typography
}                   from 'material-ui';
import * as React   from 'react';
import {
    CollDefinitionFieldOptions,
    CollDefinitionFieldTypeIdent
}                   from '../../../../models/collectionDefinition.model';
import { TagInput } from '../../../../util';

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
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={selectData.multiple}
                            onChange={(event, multiple) => update({ multiple })}
                        />
                    }
                    label={'Mehrfach'}
                />
                <TagInput
                    values={selectData.values}
                    onChange={values => update({ values })}
                />
            </div>
        );
    }

    if (!form) {
        return null;
    }

    return (
        <div
            style={{
                backgroundColor: '#eeeeee',
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