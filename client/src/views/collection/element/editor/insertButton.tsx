import {
    Icon,
    WithStyles,
    withStyles
}                 from 'material-ui';
import * as React from 'react';

const styles = {
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.1rem',
        borderRadius: '2px',
        color: 'grey',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.12)'
        }
    } as React.CSSProperties,
    icon: {
        fontSize: '0.9rem'
    }
};

const decorateStyles = withStyles(styles);

const InsertButton = ({ onClick, classes }: {
    onClick: () => void;
} & WithStyles<keyof typeof styles>) => (
    <div
        className={classes.root}
        onClick={onClick}
    >
        <Icon className={classes.icon}>add</Icon>
    </div>
);

export default decorateStyles(InsertButton);