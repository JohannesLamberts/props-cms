import {
    Icon,
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
        margin: '0.5rem',
        flexBasis: '7.5rem'
    },
    elementPaper: {
        padding: '0.5rem',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        width: '100%'
    } as React.CSSProperties,
    elementIcon: {
        fontSize: '2rem',
        margin: '0.5rem',
        color: 'grey'
    }
};

const decorateStyles = withStyles(styles);

const CollectionGridItemSub = (props: {
    collDefinition: CollDefinitionModel;
    onDelete: () => void;
} & WithStyles<keyof typeof styles>) => {
    const { collDefinition, onDelete, classes } = props;
    return (
        <Link
            to={`/collection/${collDefinition._id}`}
            className={classes.root}
        >
            <Paper className={classes.elementPaper}>
                <Icon className={classes.elementIcon}>
                    {collDefinition.icon}
                </Icon>
                <Typography variant={'caption'}>
                    {collDefinition.label || collDefinition._id}
                </Typography>
            </Paper>
        </Link>
    );
};

export default decorateStyles(CollectionGridItemSub);