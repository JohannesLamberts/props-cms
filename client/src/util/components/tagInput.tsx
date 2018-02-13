import {
    Chip,
    Icon,
    TextField,
    WithStyles,
    withStyles
}                         from 'material-ui';
import { InputAdornment } from 'material-ui/Input';
import * as React         from 'react';

const styles = {
    chip: {
        margin: '0.2rem'
    }
};

type TagInputProps = {
    values: string[];
    onChange: (newValues: string[]) => void;
} & WithStyles<keyof typeof styles>;

const decorateStyles = withStyles(styles);

class TagInput extends React.PureComponent<TagInputProps, {
    tagInput: string;
}> {
    constructor(props: TagInputProps) {
        super(props);
        this.state = {
            tagInput: ''
        };
    }

    render() {
        const { values, onChange, classes } = this.props;
        const { tagInput } = this.state;
        return (
            <div>
                <div>
                    {values.map((value, index) => (
                        <Chip
                            className={classes.chip}
                            key={value + index}
                            label={value}
                            onDelete={() => {
                                const shallow = values.slice();
                                shallow.splice(index, 1);
                                onChange(shallow);
                            }}
                        />
                    ))}
                </div>
                <TextField
                    fullWidth={true}
                    helperText={'Enter drücken, um zu bestätigen'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon>label</Icon>
                            </InputAdornment>
                        )
                    }}
                    value={tagInput}
                    onChange={event => this.setState({ tagInput: event.target.value })}
                    inputProps={{
                        onKeyDown: (event) => {
                            if (event.keyCode === 13) {
                                const val = this.state.tagInput.trim();
                                if (values.indexOf(val) === -1) {
                                    onChange([...values, val]);
                                    this.setState({ tagInput: '' });
                                }
                            }
                        }
                    }}
                />
            </div>
        );
    }
}

export default decorateStyles(TagInput);