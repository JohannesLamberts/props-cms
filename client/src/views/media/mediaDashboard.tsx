import {
    Icon,
    IconButton,
    Table,
    withStyles,
    WithStyles
}                              from 'material-ui';
import * as React              from 'react';
import { connect }             from 'react-redux';
import { Link }                from 'react-router-dom';
import { compose }             from 'redux';
import { MediaProviderModel }  from '../../../../connector/common/src/mediaProvider.model';
import {
    DatabaseDelete,
    DatabasePush
}                              from '../../redux/database/database.actions';
import { withDatabaseConnect } from '../../redux/database/database.decorate';
import {
    SectionWithActionInput,
    SimpleTableBody,
    SimpleTableHeader
}                              from '../../util';

const styles = {
    root: {
        width: '100%'
    }
};

type MediaDashboardBaseProps = {
    providers: MediaProviderModel[];
    onMount: () => void;
    onPush: (url: string) => void;
    onDelete: (ident: string) => void;
} & WithStyles<keyof typeof styles>;

const decorateStyle = withStyles(styles);

class MediaDashboardBase extends React.PureComponent<MediaDashboardBaseProps, {}> {

    constructor(props: MediaDashboardBaseProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.onMount();
    }

    render() {
        const { providers, onPush, onDelete, classes } = this.props;
        return (
            <div className={classes.root}>
                <SectionWithActionInput
                    label={'Provider'}
                    onEnter={onPush}
                    inputLabel={'new provider'}
                >
                    <Table>
                        <SimpleTableHeader>
                            {['', 'Label', 'URL']}
                        </SimpleTableHeader>
                        <SimpleTableBody data={providers}>
                            {(provider: MediaProviderModel) => [
                                (
                                    <div>
                                        <Link to={`media/${provider._id}`}>
                                            <IconButton>
                                                <Icon>edit</Icon>
                                            </IconButton>
                                        </Link>
                                        <IconButton onClick={() => onDelete(provider._id)}>
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </div>
                                ),
                                provider.label,
                                provider.url
                            ]}
                        </SimpleTableBody>
                    </Table>
                </SectionWithActionInput>
            </div>
        );
    }
}

const decorateStore = connect(
    null,
    dispatch => ({
        onDelete: (collIdent: string) => {
            dispatch(DatabaseDelete('media_provider', collIdent));
        },
        onPush: (url: string) => {
            dispatch(DatabasePush('media_provider', {
                url,
                description: '',
                label: ''
            } as MediaProviderModel));
        }
    }));

export default compose(withDatabaseConnect({
                                               providers: 'media_provider'
                                           },
                                           {}),
                       decorateStore,
                       decorateStyle)(MediaDashboardBase);