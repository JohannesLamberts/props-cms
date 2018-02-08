import {
    Icon,
    Paper,
    Typography
}                 from 'material-ui';
import * as React from 'react';

import { Link }                from 'react-router-dom';
import { CollDefinitionModel } from '../../models/collectionDefinition.model';

export const CollectionGridItemSub = (props: {
    collDefinition: CollDefinitionModel;
    onDelete: () => void;
}) => {
    const { collDefinition, onDelete } = props;
    return (
        <Link
            to={`/collection/${collDefinition._id}`}
            style={{
                display: 'flex',
                margin: '0.5rem',
                flexBasis: '7.5rem'
            }}
        >
            <Paper
                style={{
                    padding: '0.5rem',
                    display: 'flex',
                    flexFlow: 'column nowrap',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                <Icon
                    style={{
                        fontSize: '2rem',
                        margin: '0.5rem',
                        color: 'grey'
                    }}
                >
                    {collDefinition.icon || 'more_horiz'}
                </Icon>
                <Typography variant={'caption'}>
                    {collDefinition.label}
                </Typography>
            </Paper>
        </Link>
    );
};