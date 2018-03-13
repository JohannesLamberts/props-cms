import { CollDefinitionFieldTypeIdent } from 'props-cms.connector-common';

const ui = (name, color = '#00a') => ({
    name,
    color
});

export const CollDefinitionFieldTypeUI: Record<CollDefinitionFieldTypeIdent, {
    name: string;
    color: string;
}> = {
    text: ui('Text', '#aa0'),
    textArea: ui('Text (mehrzeilig)', '#aa0'),
    boolean: ui('Boolean', '#0a0'),
    number: ui('Number', '#a00'),
    color: ui('Color', '#a0a'),
    time: ui('Time', '#fa0'),
    date: ui('Date', '#fa0'),
    dateTime: ui('DateTime', '#fa0'),
    file: ui('File', '#000'),
    image: ui('Image', '#000'),
    select: ui('Select (1)', '#00a'),
    selectMultiple: ui('Select (n)', '#00a'),
    tags: ui('Tags', '#0aa'),
    import: ui('Import', '#ff0'),
    subContent: ui('Content', '#0ff'),
    subDefinition: ui('MediaDashboardBase', '#f0f')
};