import {
    withStyles,
    WithStyles
}                                 from 'material-ui';
import { CollDefinitionModel }    from 'props-cms.connector-common';
import * as React                 from 'react';
import { SectionWithActionInput } from '../../util';

const styles = {
};

const decorateStyles = withStyles(styles);

type CollectionGridSectionProps = {
    label: string;
    models: CollDefinitionModel[];
    onPush: (id: string) => void;
    onDelete: (id: string) => void;
    tile: React.ComponentType<{ collDefinition: CollDefinitionModel; onDelete: () => void; }>;
} & WithStyles<keyof typeof styles>;

class CollectionGridSection extends React.PureComponent<CollectionGridSectionProps> {

    render() {
        const { label, models, tile: TileComponent, onDelete, onPush, classes } = this.props;
        return (
            <SectionWithActionInput
                label={label}
                onEnter={onPush}
            >
                <div className={classes.tilesWrapper}>
                    {models.map(collDefinition => (
                        <TileComponent
                            key={collDefinition._id}
                            collDefinition={collDefinition}
                            onDelete={() => onDelete(collDefinition._id!)}
                        />
                    ))}
                </div>
            </SectionWithActionInput>
        );
    }
}

export default decorateStyles(CollectionGridSection);