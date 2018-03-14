import {
    withStyles,
    WithStyles
}                              from 'material-ui';
import {
    ComponentModel,
    MediaProviderModel
}                              from 'props-cms.connector-common';
import * as React              from 'react';
import {
    RouteComponentProps,
    withRouter
}                              from 'react-router';
import { compose }             from 'redux';
import { withDatabaseConnect } from '../../redux/database/database.decorate';
import {
    MediaFileList,
    MediaListFile
}                              from './mediaFileList';
import { MediaFileUploader }   from './mediaFileUploader';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    } as React.CSSProperties,
    list: {
        flexBasis: '500px',
        flexGrow: 10
    },
    uploader: {
        flexBasis: '300px',
        flexShrink: 0,
        flexGrow: 1
    }
};

type MediaProviderFileBrowserProps<TData = any> = {
    onMount: () => void;
    onDelete: () => void;
    onDataChange: (data: Partial<ComponentModel>) => void;
    mediaProvider: MediaProviderModel;
} & WithStyles<keyof typeof styles>;

const decorateStyle = withStyles(styles);

class MediaProviderFileBrowser extends React.PureComponent<MediaProviderFileBrowserProps> {

    componentWillMount() {
        this.props.onMount();
    }

    render() {
        const { mediaProvider, classes } = this.props;

        if (!mediaProvider) {
            return null;
        }

        return (
            <div className={classes.root}>
                <div className={classes.list}>
                    <MediaFileList
                        url={mediaProvider.url}
                    >
                        {({ file }: { file: MediaListFile }) => (
                            <div>
                                {file.filename}
                            </div>
                        )}
                    </MediaFileList>
                </div>
                <MediaFileUploader
                    className={classes.uploader}
                    url={mediaProvider.url}
                />
            </div>
        );
    }
}

const decorateDatabase = withDatabaseConnect(
    {},
    (props: RouteComponentProps<{ providerIdent: string }>) => ({
        mediaProvider: {
            collection: 'media_provider' as 'media_provider',
            id: props.match.params.providerIdent
        }
    })
);

export default compose(withRouter,
                       decorateDatabase,
                       decorateStyle)(MediaProviderFileBrowser);