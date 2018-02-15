import {
    TextField,
    withStyles,
    WithStyles
}                         from 'material-ui';
import { InputAdornment } from 'material-ui/Input';
import { Theme }          from 'material-ui/styles';
import * as React         from 'react';

const styles = (theme: Theme) => ({
    colorBox: {
        marginBottom: '0.2rem',
        padding: '0.7rem',
        borderRadius: '2px',
        height: 'calc(100% - 0.2rem)',
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            fontSize: theme.typography.caption.fontSize,
            fontFamiliy: theme.typography.caption.fontFamily,
            whiteSpace: 'nowrap'
        },
        '& > *:not(:last-child)': {
            marginRight: '0.7rem'
        }
    } as React.CSSProperties
});

const decorateStyles = withStyles(styles);

type ColorInputProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
} & WithStyles<'colorBox'>;

interface ColorInputState {
    textVal: string;
    lastValidTextVal: string;
    error: boolean;
}

const ColorRegex = [
    /^#[\dABCDEFabcdef]{3,6}$/,
    /^rgb(\d+,\d+,\d+)$/,
    /^rgba(\d+,\d+,\d+,[01]\.\d+)$/,
    /^hsl(\d+,\d+,\d+,\d+)$/,
    /^hsla(\d+,\d+%,\d+%,[01]\.\d+)$/
];

class ColorInput extends React.PureComponent<ColorInputProps, ColorInputState> {

    private static stateFromProps(props: ColorInputProps): ColorInputState {
        return {
            textVal: props.value,
            lastValidTextVal: props.value,
            error: false
        };
    }

    constructor(props: ColorInputProps) {
        super(props);
        this.state = ColorInput.stateFromProps(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentWillReceiveProps(props: ColorInputProps) {
        this.setState(ColorInput.stateFromProps(props));
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const text = event.target.value;
        const txtNoWhitespace = text.replace(/\s/g, '');
        const valid = ColorRegex.some(regex => !!txtNoWhitespace.match(regex));
        const nextState: ColorInputState = {
            textVal: text,
            lastValidTextVal: text,
            error: false
        };
        if (!valid) {
            nextState.error = true;
            delete nextState.lastValidTextVal;
        }
        this.setState(nextState);
    }

    handleBlur() {
        if (this.state.lastValidTextVal !== this.props.value) {
            this.props.onChange(this.state.lastValidTextVal);
        }
    }

    render() {
        const { label, classes } = this.props;
        const { textVal, lastValidTextVal, error } = this.state;
        return (
            <TextField
                fullWidth={true}
                error={error}
                label={label}
                value={textVal}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                helperText={error ? 'Ungültiger Farbcode, Optionen: hex, rgb(a), hsl(a)' : ''}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <div
                                className={classes.colorBox}
                                style={{ backgroundColor: lastValidTextVal }}
                            >
                                <div style={{ color: 'black' }}>
                                    black text
                                </div>
                                <div style={{ color: 'white' }}>
                                    white text
                                </div>
                            </div>
                        </InputAdornment>
                    )
                }}
            />
        );
    }
}

export default decorateStyles(ColorInput);