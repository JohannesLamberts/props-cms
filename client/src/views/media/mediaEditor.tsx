import {
    withStyles,
    WithStyles
}                              from 'material-ui';
import {
    CollDefinitionModel,
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
    MediaGridFile,
    MediaGridList
}                              from './mediaGridList';
import { MediaUploader }       from './mediaUploader';

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

type DefinitionProps<TData = any> = {
    onMount: () => void;
    onDelete: () => void;
    onDataChange: (data: Partial<CollDefinitionModel>) => void;
    mediaProvider: MediaProviderModel;
} & WithStyles<keyof typeof styles>;

const decorateStyle = withStyles(styles);

class CollDefinitionEditor extends React.PureComponent<DefinitionProps> {

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
                    <MediaGridList
                        url={mediaProvider.url}
                    >
                        {({ file }: { file: MediaGridFile }) => (
                            <div>
                                {file.filename}
                            </div>
                        )}
                    </MediaGridList>
                </div>
                <MediaUploader
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
                       decorateStyle)(CollDefinitionEditor);