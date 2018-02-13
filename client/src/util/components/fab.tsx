import {
    Button,
    WithStyles
}                 from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import * as React from 'react';

const styles = {
    root: {
        position: 'absolute',
        bottom: '2rem',
        right: '2rem'
    } as React.CSSProperties
};

const decorateStyles = withStyles(styles);

const Fab = (props: {
    onClick?: () => void;
    children: React.ReactNode;
} & WithStyles<keyof typeof styles>) => {
    return (
        <Button
            onClick={props.onClick}
            className={props.classes.root}
            variant={'fab'}
            color={'secondary'}
        >
            {props.children}
        </Button>
    );
};

export default decorateStyles(Fab);