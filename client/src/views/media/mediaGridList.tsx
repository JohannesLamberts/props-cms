import { Grid }    from 'material-ui';
import * as React  from 'react';
import { HttpApi } from '../../services/api';

export interface MediaGridFile {
    _id: string;
    filename: string;
    contentType: string;
    metadata: {
        tags: string[]
    };
}

type MediaGridListWrapperComponent = React.ComponentType<{ children: React.ReactNode; file: MediaGridFile }>;

interface MediaGridListProps {
    url: string;
    children?: MediaGridListWrapperComponent;
}

export class MediaGridList extends React.PureComponent<MediaGridListProps, {
    files: MediaGridFile[];
}> {

    constructor(props: MediaGridListProps) {
        super(props);
        this.state = {
            files: []
        };
    }

    componentWillMount() {
        const api = new HttpApi(this.props.url);
        api.get('files')
           .then((files: MediaGridFile[]) => {
               this.setState({ files });
           });
    }

    render() {

        const WrapperComponent = this.props.children as MediaGridListWrapperComponent | undefined;

        return (
            <div>
                <Grid container={true}>
                    {this.state.files.map(file => {

                        const preview = (
                            <div
                                style={{
                                    height: '100px',
                                    backgroundImage: `url(${this.props.url}files/image/${file._id}?height=100)`,
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'top',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />
                        );

                        const content = WrapperComponent
                            ? (
                                            <WrapperComponent
                                                file={file}
                                            >
                                                {preview}
                                            </WrapperComponent>
                                        )
                            : preview;

                        return (
                            <Grid
                                item={true}
                                key={file._id}
                                xs={6}
                                sm={4}
                                md={3}
                                style={{ wordWrap: 'break-word' }}
                            >
                                {content}
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        );
    }
}