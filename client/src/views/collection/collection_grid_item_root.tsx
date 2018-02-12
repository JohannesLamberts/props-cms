import {
    Icon,
    IconButton,
    Paper,
    Typography
}                              from 'material-ui';
import { CollDefinitionModel } from 'props-cms.connector-common';
import * as React              from 'react';

import { Link } from 'react-router-dom';

export const CollectionGridItem = (props: {
    collDefinition: CollDefinitionModel;
    onDelete: () => void;
}) => {
    const { collDefinition, onDelete } = props;
    return (
        <Paper
            style={{
                display: 'flex',
                flexFlow: 'column nowrap',
                alignItems: 'center',
                padding: '0.5rem',
                margin: '0.5rem',
                flexBasis: '16rem'
            }}
        >
            <Link to={`/collection/${collDefinition._id}/elements`}>
                <Icon
                    style={{
                        fontSize: '4rem',
                        margin: '0.5rem',
                        color: 'grey'
                    }}
                >
                    {collDefinition.icon || 'more_horiz'}
                </Icon>
            </Link>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
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