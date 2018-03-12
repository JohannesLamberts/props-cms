import * as React                 from 'react';
import typeEditorComponents       from './typeEditors/index';
import { TypeElementEditorProps } from './typeEditors/typeEditorProps';

export default (props: TypeElementEditorProps<any>) => {

    const type = props.field.type;
    const Component = typeEditorComponents[type];

    if (!Component) {
        return <span>NOT IMPLEMENTED: {type}</span>;
    }

    return <Component {...props} />;
};