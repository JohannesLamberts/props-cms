import {
    Icon,
    IconButton,
    WithStyles,
    withStyles
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
    SimpleTable
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
                    <SimpleTable
                        data={providers}
                    >
                        {[
                            {
                                head: '',
                                content: (el) => (
                                    <div>
                                        <Link to={`media/${el._id}`}>
                                            <IconButton>
                                                <Icon>edit</Icon>
                                            </IconButton>
                                        </Link>
                                        <IconButton onClick={() => onDelete(el._id)}>
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </div>
                                )
                            },
                            {
                                head: 'Label',
                                content: el => el.label
                            },
                            {
                                head: 'URL',
                                content: el => el.url
                            }
                        ]}
                    </SimpleTable>
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