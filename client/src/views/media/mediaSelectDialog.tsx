import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
}                 from 'material-ui';
import * as React from 'react';

interface MediaDialogProps {
    multiple?: boolean;
    onClose: (ok: boolean, selected: string[]) => void;
}

export class MediaDialog extends React.PureComponent<MediaDialogProps> {
    render() {
        const { onClose } = this.props;
        return (
            <Dialog
                open={true}
                onClose={() => onClose(false, [])}
            >
                <DialogTitle>
                    Media
                </DialogTitle>
                <DialogContent>
                    GRID
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => onClose(false, [])}
                    >
                        cancel
                    </Button>
                    <Button
                        onClick={() => onClose(true, [])}
                    >
                        ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}