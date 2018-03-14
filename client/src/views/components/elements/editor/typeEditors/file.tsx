import { Button }                 from 'material-ui';
import * as React                 from 'react';
import { MediaFileSelectDialog }  from '../../../../media/mediaFileSelectDialog';
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
                    Select
                </Button>
                {this.state.dialogOpen && (
                    <MediaFileSelectDialog
                        multiple={false}
                        onClose={(ok, selected) => {
                            this.setState({ dialogOpen: false });
                            if (ok && selected[0]) {
                                onDataChange(selected[0]);
                            }
                        }}
                    />
                )}
            </div>
        );
    }
}