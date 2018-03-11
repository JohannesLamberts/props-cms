import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
}                         from 'material-ui';
import * as React         from 'react';
import { ImmutableArray } from 'typescript-immutable';
import {
    MediaGridFile,
    MediaGridList
}                         from './mediaGridList';

interface MediaSelectDialogProps {
    multiple?: boolean;
    onClose: (ok: boolean, selected: MediaGridFile[]) => void;
}

export class MediaSelectDialog extends React.PureComponent<MediaSelectDialogProps, {
    selectedFiles: ImmutableArray<MediaGridFile>
}> {

    constructor(props: MediaSelectDialogProps) {
        super(props);
        this.state = {
            selectedFiles: new ImmutableArray<MediaGridFile>()
        };
    }

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
                    SELECT PROVIDER
                    <MediaGridList
                        url={'http://localhost:4006/'}
                    >
                        {({ children, file }: {
                            children: React.ReactNode; file: MediaGridFile
                        }): React.ReactElement<any> => (
                            <div
                                onClick={() => {
                                    const index = this.state.selectedFiles.indexOf(file);
                                    this.setState(
                                        {
                                            selectedFiles: index === -1
                                                ? this.state.selectedFiles.push(file)
                                                : this.state.selectedFiles.remove(index)
                                        });
                                }}
                                style={{
                                    backgroundColor: this.state.selectedFiles.indexOf(file) === -1
                                        ? 'grey'
                                        : 'blue'
                                }}
                            >
                                {children}
                            </div>
                        )}
                    </MediaGridList>
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