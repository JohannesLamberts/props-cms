import { CollDefinitionFieldTypeIdent } from '../../../../../connector/common/src';

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
    time: ui('Time'),
    date: ui('Date'),
    dateTime: ui('DateTime'),
    file: ui('File', '#000'),
    image: ui('Image', '#000'),
    select: ui('Select (1)'),
    selectMultiple: ui('Select (n)'),
    tags: ui('Tags'),
    import: ui('Import'),
    subContent: ui('Content'),
    subDefinition: ui('MediaDashboardBase')
};