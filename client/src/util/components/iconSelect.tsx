import {
    Button,
    Icon,
    ListSubheader,
    Menu,
    MenuItem,
    MenuList,
    Typography
}                            from 'material-ui';
import * as React            from 'react';
import { IconSelectOptions } from './iconSelectOptions';

interface IconSelectProps {
    icon: string;
    onIconChange: (newIcon: string) => void;
}

export class IconSelect extends React.PureComponent<IconSelectProps, {
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
        const { onIconChange, icon } = this.props;
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
                            subheader={<ListSubheader>{label}</ListSubheader>}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexFlow: 'row wrap'
                                }}
                            >

                                {IconSelectOptions[label].map(option => (
                                    <MenuItem
                                        key={option}
                                        onClick={() => {
                                            onIconChange(option);
                                            this.handleClose();
                                        }}
                                    >
                                        <Icon>{option}</Icon>
                                    </MenuItem>
                                ))}
                            </div>
                        </MenuList>
                    ))}
                </Menu>
            </div>
        );
    }
}