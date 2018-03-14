import {
    Icon,
    IconButton,
    TextField,
    withStyles,
    WithStyles
}                         from 'material-ui';
import { InputAdornment } from 'material-ui/Input';
import * as React         from 'react';
import PaperWithHead      from './paperWithHead';

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    } as React.CSSProperties
};

const decorateStyles = withStyles(styles);

type SectionWithActionInputProps = {
    label: string;
    inputLabel: string;
    onEnter: (value: string) => void;
    children: React.ReactNode;
} & WithStyles<keyof typeof styles>;

export class SectionWithActionInputBase extends React.PureComponent<SectionWithActionInputProps, {
    inputTxt: string;
}> {

    constructor(props: SectionWithActionInputProps) {
        super(props);
        this._handlePush = this._handlePush.bind(this);
        this.state = {
            inputTxt: ''
        };
    }

    render() {

        const { classes, label, children, inputLabel } = this.props;

        return (
            <PaperWithHead
                label={label}
                action={(
                    <TextField
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={this._handlePush}>
                                        <Icon>add</Icon>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        margin={'dense'}
                        label={inputLabel}
                        value={this.state.inputTxt}
                        onChange={event => this.setState({ inputTxt: event.target.value })}
                        inputProps={{
                            onKeyDown: (event) => {
                                if (event.keyCode === 13) {
                                    this._handlePush();
                                }
                            }
                        }}
                    />
                )}
            >
                {children}
            </PaperWithHead>
        );
    }

    private _handlePush() {
        this.props.onEnter(this.state.inputTxt);
    }
}

export default decorateStyles(SectionWithActionInputBase);