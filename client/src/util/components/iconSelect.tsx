import * as classNames       from 'classnames';
import {
    Button,
    Icon,
    ListSubheader,
    Menu,
    MenuList,
    Typography,
    withStyles,
    WithStyles
}                            from 'material-ui';
import * as React            from 'react';
import { IconSelectOptions } from './iconSelectOptions';

const styles = {
    iconList: {
        display: 'flex',
        flexFlow: 'row wrap'
    },
    iconSelectedButton: {
        backgroundColor: 'rgba(0,0,0,0.14)'
    },
    iconButton: {
        padding: '0.4em',
        cursor: 'pointer',
        height: '1em',
        width: '1em',
        boxSizing: 'content-box',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.08)'
        }
    }
};

type IconSelectProps = {
    icon: string;
    onIconChange: (newIcon: string) => void;
} & WithStyles<keyof typeof styles>;

export const IconSelect = withStyles(styles)(class extends React.PureComponent<IconSelectProps, {
    open: boolean;
}> {

    constructor(props: IconSelectProps) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClose() {
        this.setState({ open: false });
    }

    handleOpen() {
        this.setState({ open: true });
    }

    render() {
        const { onIconChange, icon, classes } = this.props;
        return (
            <div>
                <Typography variant={'caption'}>
                    Icon
                </Typography>
                <Button
                    onClick={this.handleOpen}
                    fullWidth={true}
                >
                    <Icon>{icon}</Icon>
                </Button>
                <Menu
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    {Object.keys(IconSelectOptions).map(label => (
                        <MenuList
                            key={label}
                            subheader={<ListSubheader
                                style={{
                                    zIndex: 2,
                                    backgroundColor: 'white'
                                }}
                            >
                                {label}
                            </ListSubheader>}
                        >
                            <li className={classNames('material-icons', classes.iconList)}>
                                {IconSelectOptions[label].map(option => (
                                    <div
                                        className={classNames(classes.iconButton,
                                                              {
                                                                  [classes.iconSelectedButton]: option === icon
                                                              })}
                                        key={option}
                                        onClick={() => {
                                            onIconChange(option);
                                            this.handleClose();
                                        }}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </li>
                        </MenuList>
                    ))}
                </Menu>
            </div>
        );
    }
});