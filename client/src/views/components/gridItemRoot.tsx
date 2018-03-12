import {
    Icon,
    IconButton,
    Paper,
    Typography,
    withStyles,
    WithStyles
}                              from 'material-ui';
import { CollDefinitionModel } from 'props-cms.connector-common';
import * as React              from 'react';

import { Link } from 'react-router-dom';

const styles = {
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        padding: '0.5rem',
        margin: '0.5rem',
        flexBasis: '16rem'
    } as React.CSSProperties,
    icon: {
        fontSize: '4rem',
        margin: '0.5rem',
        color: 'grey'
    },
    footer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    } as React.CSSProperties
};

const decorateStyles = withStyles(styles);

const CollectionGridItem = (props: {
    collDefinition: CollDefinitionModel;
    onDelete: () => void;
} & WithStyles<keyof typeof styles>) => {
    const { collDefinition, onDelete, classes } = props;
    return (
        <Paper className={classes.root}>
            <Link to={`/collection/${collDefinition._id}/elements`}>
                <Icon className={classes.icon}>
                    {collDefinition.icon || 'more_horiz'}
                </Icon>
            </Link>
            <div className={classes.footer}>
                <Link to={`/collection/${collDefinition._id}`}>
                    <IconButton>
                        <Icon>settings</Icon>
                    </IconButton>
                </Link>
                <Link to={`/collection/${collDefinition._id}/elements`}>
                    <Typography variant={'caption'}>
                        {collDefinition.label || collDefinition._id}
                    </Typography>
                </Link>
                <IconButton
                    onClick={onDelete}
                >
                    <Icon>delete</Icon>
                </IconButton>
            </div>
        </Paper>
    );
};

export default decorateStyles(CollectionGridItem);