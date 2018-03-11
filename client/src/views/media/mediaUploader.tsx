import {
    FileDropzone,
    FileSelect,
    FileUploader
}                 from '@j-lamberts/react-file-upload';
import {
    Button,
    Icon,
    LinearProgress
}                 from 'material-ui';
import * as React from 'react';

interface MediaUploaderProps {
    url: string;
}

export class MediaUploader extends React.PureComponent<MediaUploaderProps> {

    constructor(props: MediaUploaderProps) {
        super(props);
    }

    render() {
        const { url } = this.props;
        return (
            <FileUploader
                runManual={true}
                keepOnFinish={true}
                url={`${url}/upload`}
            >
                {({ handleFiles, queue, runManual }) => (
                    <div>
                        <FileDropzone onDrop={handleFiles}>
                            {queue.map((el, index) => (
                                <div key={index}>
                                    {index} {el.name}
                                    <LinearProgress
                                        variant={el.progressTotal
                                            ? 'determinate'
                                            : 'indeterminate'}
                                        value={el.progressLoaded / el.progressTotal * 100}
                                    />
                                </div>
                            ))}
                            DROP FILES HERE
                        </FileDropzone>
                        <FileSelect
                            onChange={handleFiles}
                            multiple={true}
                        >
                            <Icon>file_upload</Icon>Upload
                        </FileSelect>
                        <Button onClick={runManual}>
                            <Icon>check</Icon> Run
                        </Button>
                    </div>
                )}
            </FileUploader>
        );
    }
}