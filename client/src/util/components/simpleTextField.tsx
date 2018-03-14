import { TextField }      from 'material-ui';
import { TextFieldProps } from 'material-ui/TextField';
import * as React         from 'react';

interface SimpleTextFieldProps {
    value: string;
    label: string;
    required?: boolean;
    multiline?: boolean;
    onBlur?: (val: string) => void;
    TextFieldProps?: Partial<TextFieldProps>;
}

export default class extends React.PureComponent<SimpleTextFieldProps, {
    textVal: string;
}> {
    constructor(props: SimpleTextFieldProps) {
        super(props);
        this.state = {
            textVal: props.value
        };
    }

    componentWillReceiveProps(props: SimpleTextFieldProps) {
        this.setState({ textVal: props.value });
    }

    render() {
        const { label, onBlur, multiline, required } = this.props;
        const { textVal } = this.state;
        return (
            <TextField
                required={required}
                InputLabelProps={{ shrink: !!textVal }}
                multiline={multiline}
                label={label}
                value={textVal}
                onChange={event => this.setState({ textVal: event.target.value })}
                onBlur={event => {
                    if (onBlur) {
                        onBlur(event.target.value);
                    }
                }}
                {...this.props.TextFieldProps}
            />
        );
    }
}