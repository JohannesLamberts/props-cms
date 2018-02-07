import {
    Chip,
    Icon,
    TextField
}                         from 'material-ui';
import { InputAdornment } from 'material-ui/Input';
import * as React         from 'react';

interface TagInputProps {
    values: string[];
    onChange: (newValues: string[]) => void;
}

export default class extends React.PureComponent<TagInputProps, {
    tagInput: string;
}> {
    constructor(props: TagInputProps) {
        super(props);
        this.state = {
            tagInput: ''
        };
    }

    render() {
        const { values, onChange } = this.props;
        const { tagInput } = this.state;
        return (
            <div>
                <div>
                    {values.map((value, index) => (
                        <Chip
                            style={{ margin: '0.2rem' }}
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