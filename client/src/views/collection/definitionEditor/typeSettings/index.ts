import { CollDefinitionFieldTypeIdent } from 'props-cms.connector-common';
import SelectForm                       from './select';
import SelectMultipleForm               from './selectMultiple';
import SubContetForm                    from './subContent';
import { TypeSettingsComponent }        from './typeOptionProps';

const formComponents: {
    [P in CollDefinitionFieldTypeIdent]?: TypeSettingsComponent<P>
    } = {
    select: SelectForm,
    selectMultiple: SelectMultipleForm,
    subContent: SubContetForm
};

export default formComponents;