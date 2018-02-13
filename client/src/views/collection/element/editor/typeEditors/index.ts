import { CollDefinitionFieldTypeIdent } from 'props-cms.connector-common';
import Boolean                          from './boolean';
import Select                           from './select';
import SubContent                       from './subContent';
import SubDefinition                    from './subDefinition';
import Tags                             from './tags';
import Text                             from './text';
import TextArea                         from './textArea';
import { TypeEditorComponent }          from './typeEditorProps';

const formComponents: {
    [P in CollDefinitionFieldTypeIdent]?: TypeEditorComponent<P>
    } = {
    boolean: Boolean,
    select: Select,
    subContent: SubContent,
    subDefinition: SubDefinition,
    text: Text,
    textArea: TextArea,
    tags: Tags
};

export default formComponents;