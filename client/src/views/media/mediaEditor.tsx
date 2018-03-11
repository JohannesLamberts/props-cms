import * as React        from 'react';
import { MediaGridList } from './mediaGridList';
import { MediaUploader } from './mediaUploader';

interface MediaEditorProps {
}

export class MediaEditor extends React.PureComponent<MediaEditorProps> {

    constructor(props: MediaEditorProps) {
        super(props);
    }

    render() {
        return (
            <div>
                SELECT PROVIDER
                <MediaGridList
                    url={'http://localhost:4006/'}
                />
                <MediaUploader
                    url={'http://localhost:4005'}
                />
            </div>
        );
    }
}