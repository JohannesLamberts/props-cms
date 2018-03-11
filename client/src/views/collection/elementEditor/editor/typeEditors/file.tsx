import { Button }                 from 'material-ui';
import * as React                 from 'react';
import { MediaSelectDialog }      from '../../../../media/mediaSelectDialog';
import { TypeElementEditorProps } from './typeEditorProps';

export default class extends React.PureComponent<TypeElementEditorProps<'file'>, {
    dialogOpen: boolean;
}> {

    constructor(props: TypeElementEditorProps<'file'>) {
        super(props);
        this.state = {
            dialogOpen: false
        };
    }

    render() {

        const { record, onDataChange } = this.props;

        return (
            <div>
                {record && `${record.id}@${record.provider}`}
                <Button
                    onClick={() => this.setState({ dialogOpen: true })}
                >
                    ADD
                </Button>
                {this.state.dialogOpen && (
                    <MediaSelectDialog
                        multiple={false}
                        onClose={(ok, selected) => {
                            this.setState({ dialogOpen: false });
                            if (ok && selected[0]) {
                                // TODO: IMPLEMENT
                                // onDataChange(selected[0]);
                            }
                        }}
                    />
                )}
            </div>
        );
    }
}