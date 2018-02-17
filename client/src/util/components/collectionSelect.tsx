import {
    Icon,
    MenuItem,
    TextField
}                              from 'material-ui';
import { CollDefinitionModel } from 'props-cms.connector-common';
import * as React              from 'react';
import { withDatabaseConnect } from '../../redux/database/database.decorate';

interface DefinitionProps {
    className?: string;
    label: string;
    filter?: (model: CollDefinitionModel) => boolean;
    value?: string;
    onChange: (newModel: string) => void;
    collDefinitions: CollDefinitionModel[];
    onMount: () => void;
}

class CollElementEditorFieldSubContent extends React.PureComponent<DefinitionProps> {

    componentWillMount() {
        this.props.onMount();
    }

    render() {

        const { onChange, value, collDefinitions, filter, className, label } = this.props;

        let options = collDefinitions;

        if (filter) {
            options = options.filter(filter);
        }

        return (
            <TextField
                fullWidth={true}
                className={className}
                value={value || '%NONE%'}
                label={label}
                select={true}
                onChange={event => onChange(event.target.value)}
            >
                {options
                    .map(definition => (
                        <MenuItem
                            key={definition._id}
                            value={definition._id}
                        >
                            <Icon>{definition.icon}</Icon>{' '}{definition.label || definition._id}
                        </MenuItem>
                    ))}
            </TextField>
        );
    }
}

const decorateDatabase = withDatabaseConnect({ collDefinitions: 'coll_definition' }, {});

export default decorateDatabase(CollElementEditorFieldSubContent);