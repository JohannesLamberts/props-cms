import {
    Divider,
    Icon,
    IconButton,
    TextField,
    Typography
}                              from 'material-ui';
import { InputAdornment }      from 'material-ui/Input';
import { CollDefinitionModel } from 'props-cms.connector-common';
import * as React              from 'react';

interface CollectionGridSectionProps {
    label: string;
    models: CollDefinitionModel[];
    onPush: (id: string) => void;
    onDelete: (id: string) => void;
    tile: React.ComponentType<{ collDefinition: CollDefinitionModel; onDelete: () => void; }>;
}

export class CollectionGridSection extends React.PureComponent<CollectionGridSectionProps, {
    newIdent: string;
}> {

    constructor(props: CollectionGridSectionProps) {
        super(props);
        this.state = {
            newIdent: ''
        };
    }

    render() {
        const { label, models, tile: TileComponent, onDelete, onPush } = this.props;
        return (
            <section>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}
                >
                    <Typography variant={'headline'}>
                        {label}
                    </Typography>
                    <div>
                        <TextField
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => onPush(this.state.newIdent)}>
                                            <Icon>add</Icon>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            margin={'dense'}
                            label={'New ident'}
                            value={this.state.newIdent}
                            onChange={event => this.setState({ newIdent: event.target.value })}
                        />
                    </div>
                </div>
                <Divider/>
                <div
                    style={{
                        display: 'flex',
                        flexFlow: 'row wrap',
                        width: '100%',
                        padding: '1rem 0'
                    }}
                >
                    {models.map(collDefinition => (
                        <TileComponent
                            collDefinition={collDefinition}
                            onDelete={() => onDelete(collDefinition._id!)}
                        />
                    ))}
                </div>
            </section>
        );
    }
}