import {
    Divider,
    Icon,
    IconButton,
    TextField,
    Typography,
    withStyles,
    WithStyles
}                              from 'material-ui';
import { InputAdornment }      from 'material-ui/Input';
import { CollDefinitionModel } from 'props-cms.connector-common';
import * as React              from 'react';

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    } as React.CSSProperties,
    tilesWrapper: {
        display: 'flex',
        flexFlow: 'row wrap',
        width: '100%',
        padding: '1rem 0'
    }
};

const decorateStyles = withStyles(styles);

type CollectionGridSectionProps = {
    label: string;
    models: CollDefinitionModel[];
    onPush: (id: string) => void;
    onDelete: (id: string) => void;
    tile: React.ComponentType<{ collDefinition: CollDefinitionModel; onDelete: () => void; }>;
} & WithStyles<keyof typeof styles>;

class CollectionGridSection extends React.PureComponent<CollectionGridSectionProps, {
    newIdent: string;
}> {

    constructor(props: CollectionGridSectionProps) {
        super(props);
        this.state = {
            newIdent: ''
        };
    }

    render() {
        const { label, models, tile: TileComponent, onDelete, onPush, classes } = this.props;
        return (
            <section>
                <div className={classes.header}>
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
                <div className={classes.tilesWrapper}>
                    {models.map(collDefinition => (
                        <TileComponent
                            key={collDefinition._id}
                            collDefinition={collDefinition}
                            onDelete={() => onDelete(collDefinition._id!)}
                        />
                    ))}
                </div>
            </section>
        );
    }
}

export default decorateStyles(CollectionGridSection);