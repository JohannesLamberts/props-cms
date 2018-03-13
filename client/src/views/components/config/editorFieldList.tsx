import {
    Button,
    Chip,
    Icon,
    IconButton,
    Paper,
    Table
}                                            from 'material-ui';
import { CollDefinitionModelField }          from 'props-cms.connector-common';
import * as React                            from 'react';
import { InitialCollDefinitionFieldOptions } from '../../../initializers/collectionDefinitionFieldOptionInitial';
import {
    SimpleTableBody,
    SimpleTableHeader
}                                            from '../../../util';
import { CollDefinitionFieldTypeUI }         from './typeNames';

const randomId = (length: number = 16): string => {
    let str = '';
    for (let i = 0; i < length; i++) {
        str += Math.floor(Math.random() * 16).toString(16);
    }
    return str;
};

const CollDefinitionEditorFieldList = (props: {
    fields: CollDefinitionModelField[];
    onDataChange: (data: CollDefinitionModelField[]) => void;
}) => {
    const { fields, onDataChange } = props;
    return (
        <div>
            <Paper
                style={{
                    marginBottom: '1rem'
                }}
            >
                <Table>
                    <SimpleTableHeader>
                        {['Typ', 'Label', 'Optionen', 'Info', 'ID', 'Actions']}
                    </SimpleTableHeader>
                    <SimpleTableBody
                        data={fields}
                    >
                        {(field: CollDefinitionModelField) => [
                            (
                                <span
                                    style={{
                                        backgroundColor: CollDefinitionFieldTypeUI[field.type].color,
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '2px'
                                    }}
                                >
                                    {CollDefinitionFieldTypeUI[field.type].name}
                                </span>
                            ),
                            field.label,
                            (
                                <span>
                                    {field.isArray && <Chip>Array</Chip>}
                                    {field.allowOverwrite && <Chip>AllowOverwrite</Chip>}
                                </span>
                            ),
                            field.helpText,
                            field.key,
                            (
                                <div>
                                    {/*<IconButton onClick={() => this.setState({ editorOpen: true })}>
                                     <Icon>edit</Icon>
                                     </IconButton>*/}
                                    <IconButton
                                        onClick={() => {
                                            const shallow = fields.slice();
                                            shallow.splice(fields.indexOf(field), 1);
                                            onDataChange(shallow);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        ]}
                    </SimpleTableBody>
                </Table>
            </Paper>
            <Button
                onClick={() => {
                    onDataChange([...fields, {
                        id: randomId(),
                        key: '',
                        label: '',
                        type: 'text',
                        typeOptions: InitialCollDefinitionFieldOptions.text,
                        helpText: '',
                        isArray: false,
                        allowOverwrite: false
                    }]);
                }}
            >
                <Icon>add</Icon> Add field
            </Button>
        </div>
    );
};
/*
 <CollDefinitionFieldEditor
 key={index}
 onDelete={}
 onDataChange={(data: Partial<CollDefinitionModelField>) => {
 const shallow = fields.slice();
 shallow[index] = Object.assign({}, shallow[index], data);
 onDataChange(shallow);
 }}
 field={field}
 />*/

export default CollDefinitionEditorFieldList;