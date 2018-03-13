import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
}                              from 'material-ui';
import { MediaProviderModel }  from 'props-cms.connector-common';
import * as React              from 'react';
import { ImmutableArray }      from 'typescript-immutable';
import { withDatabaseConnect } from '../../redux/database/database.decorate';
import { MediaFile }           from './media';
import {
    MediaGridFile,
    MediaGridList
}                              from './mediaGridList';

interface MediaSelectDialogProps {
    providers: MediaProviderModel[];
    onMount: () => void;
    multiple?: boolean;
    onClose: (ok: boolean, selected: MediaFile[]) => void;
}

class MediaSelectDialogBase extends React.PureComponent<MediaSelectDialogProps, {
    selectedFiles: ImmutableArray<MediaFile>;
    mediaProvider?: string;
}> {

    constructor(props: MediaSelectDialogProps) {
        super(props);
        this.state = {
            selectedFiles: new ImmutableArray<MediaFile>()
        };
    }

    componentWillMount() {
        this.props.onMount();
    }

    render() {
        const { onClose, providers, multiple } = this.props;
        const mediaProvider = this.state.mediaProvider || (providers[0]
            ? providers[0].url
            : '');
        return (
            <Dialog
                open={true}
                onClose={() => onClose(false, [])}
            >
                <DialogTitle>
                    Media
                </DialogTitle>
                <DialogContent>
                    <TextField
                        value={mediaProvider || '%NONE%'}
                        select={true}
                        onChange={e => this.setState({ mediaProvider: e.target.value })}
                    >
                        {providers.map(provider => (
                            <MenuItem
                                key={provider.url}
                                value={provider.url}
                            >
                                {provider.url}
                            </MenuItem>
                        ))}
                    </TextField>
                    {mediaProvider && (
                        <MediaGridList
                            url={mediaProvider}
                        >
                            {({ children, file }: {
                                children: React.ReactNode; file: MediaGridFile
                            }): React.ReactElement<any> => (
                                <div
                                    onClick={() => {

                                        const mediaFile: MediaFile = {
                                            provider: mediaProvider,
                                            id: file._id
                                        };

                                        if (!this.props.multiple) {
                                            this.props.onClose(true, [mediaFile]);
                                            return;
                                        }

                                        const index = this.state
                                                          .selectedFiles
                                                          .indexOfFn(checkFile =>
                                                                         checkFile.id === file._id);

                                        this.setState(
                                            {
                                                selectedFiles: index === -1
                                                    ? this.state.selectedFiles.push(mediaFile)
                                                    : this.state.selectedFiles.remove(index)
                                            });
                                    }}
                                    style={{
                                        backgroundColor: this.state
                                                             .selectedFiles
                                                             .indexOfFn(checkFile =>
                                                                            checkFile.id === file._id) === -1
                                            ? 'rgba(0,0,0,0)'
                                            : 'rgba(0,0,0,0.4)'
                                    }}
                                >
                                    {children}
                                </div>
                            )}
                        </MediaGridList>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => onClose(false, [])}
                    >
                        cancel
                    </Button>
                    <Button
                        onClick={() => onClose(true, this.state.selectedFiles.slice())}
                    >
                        ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export const MediaSelectDialog =
                 withDatabaseConnect({ providers: 'media_provider' }, {})
                 (MediaSelectDialogBase);
