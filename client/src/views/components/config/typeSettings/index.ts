import { ComponentPropTypes }    from 'props-cms.connector-common';
import SelectForm                from './select';
import SelectMultipleForm        from './selectMultiple';
import SubContetForm             from './subContent';
import SubDefinition             from './subDefinition';
import { TypeSettingsComponent } from './typeOptionProps';

const formComponents: {
    [P in ComponentPropTypes]?: TypeSettingsComponent<P>
    } = {
    select: SelectForm,
    selectMultiple: SelectMultipleForm,
    subContent: SubContetForm,
    subDefinition: SubDefinition
};

export default formComponents;