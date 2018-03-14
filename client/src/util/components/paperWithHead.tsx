import {
    Paper,
    Typography,
    WithStyles,
    withStyles
}                 from 'material-ui';
import * as React from 'react';

const styles = {
    header: {
        backgroundColor: 'rgba(0,0,0,0.07)',
        padding: '0 1rem',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between'
    } as React.CSSProperties
};

const decorateStyles = withStyles(styles);

type PaperWithHeadProps = {
    children: React.ReactNode;
    label: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
    classNameContent?: string;
    style?: React.CSSProperties;
} & WithStyles<keyof typeof styles>;

class PaperWithHead extends React.PureComponent<PaperWithHeadProps> {

    constructor(props: PaperWithHeadProps) {
        super(props);
    }

    render() {

        const { children, classes, label, action, className, style, classNameContent } = this.props;

        return (
            <Paper
                className={className}
                style={style}
            >
                <div className={classes.header}>
                    <Typography variant={'headline'}>
                        {label}
                    </Typography>
                    <div>
                        {action}
                    </div>
                </div>
                <div className={classNameContent}>
                    {children}
                </div>
            </Paper>
        );
    }
}

export default decorateStyles(PaperWithHead);