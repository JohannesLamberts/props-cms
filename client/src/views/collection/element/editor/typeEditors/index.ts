import { CollDefinitionFieldTypeIdent } from 'props-cms.connector-common';
import Boolean                          from './boolean';
import Date                             from './date';
import Import                           from './import';
import Select                           from './select';
import SelectMultiple                   from './selectMultiple';
import SubContent                       from './subContent';
import SubDefinition                    from './subDefinition';
import Tags                             from './tags';
import Text                             from './text';
import TextArea                         from './textArea';
import Time                             from './time';
import { TypeEditorComponent }          from './typeEditorProps';

const formComponents: {
    [P in CollDefinitionFieldTypeIdent]?: TypeEditorComponent<P>
    } = {
    boolean: Boolean,
    date: Date,
    import: Import,
    select: Select,
    selectMultiple: SelectMultiple,
    subContent: SubContent,
    subDefinition: SubDefinition,
    tags: Tags,
    text: Text,
    textArea: TextArea,
    time: Time
};

export default formComponents;