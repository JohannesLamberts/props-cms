import {
    Icon,
    IconButton,
    Table,
    withStyles,
    WithStyles
}                              from 'material-ui';
import { MediaProviderModel }  from 'props-cms.connector-common';
import * as React              from 'react';
import { connect }             from 'react-redux';
import { Link }                from 'react-router-dom';
import { compose }             from 'redux';
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
    },
    table: {
        '& td:last-child': {
            textAlign: 'center',
            width: '150px'
        },
        '& th:last-child': {
            textAlign: 'center'
        }
    }
};

type MediaProviderListBaseProps = {
    providers: MediaProviderModel[];
    onMount: () => void;
    onPush: (url: string) => void;
    onDelete: (ident: string) => void;
} & WithStyles<keyof typeof styles>;

const decorateStyle = withStyles(styles);

class MediaProviderListBase extends React.PureComponent<MediaProviderListBaseProps, {}> {

    constructor(props: MediaProviderListBaseProps) {
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
                    <Table className={classes.table}>
                        <SimpleTableHeader>
                            {['Label', 'URL', 'Actions']}
                        </SimpleTableHeader>
                        <SimpleTableBody data={providers}>
                            {(provider: MediaProviderModel) => [
                                provider.label,
                                provider.url,
                                (
                                    <div>
                                        <Link to={`media/${provider._id}`}>
                                            <IconButton>
                                                <Icon>image</Icon>
                                            </IconButton>
                                        </Link>
                                        <IconButton onClick={() => onDelete(provider._id)}>
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </div>
                                )
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
                       decorateStyle)(MediaProviderListBase);