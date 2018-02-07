import {
    Button,
    WithStyles
}                 from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import * as React from 'react';

const styles = {
    root: {
        position: 'absolute',
        bottom: '1rem',
        right: '1rem'
    } as React.CSSProperties
};

export default withStyles(styles)((props: {
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
});