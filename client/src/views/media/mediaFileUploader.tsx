import {
    FileDropzone,
    FileSelect,
    FileUploader
}                 from '@j-lamberts/react-file-upload';
import {
    Icon,
    LinearProgress,
    Theme,
    withStyles,
    WithStyles
}                 from 'material-ui';
import * as React from 'react';

const styles = (theme: Theme) => ({
    dropzone: {
        height: '100%',
        border: `2px dashed ${theme.palette.primary.main}`,
        borderRadius: '10px',
        padding: '10px'
    },
    dropzone_active: {
        borderColor: theme.palette.secondary.main
    }
});

const decorateStyle = withStyles(styles);

type MediaFileUploaderProps = {
    url: string;
    className?: string;
} & WithStyles<'dropzone' | 'dropzone_active'>;

class MediaFileUploaderBase extends React.PureComponent<MediaFileUploaderProps> {

    constructor(props: MediaFileUploaderProps) {
        super(props);
    }

    render() {
        const { url, classes, className } = this.props;
        return (
            <FileUploader
                keepOnFinish={true}
                url={`${url}/upload`}
            >
                {({ handleFiles, queue }) => (
                    <div className={className}>
                        <FileSelect
                            onChange={handleFiles}
                            multiple={true}
                        >
                            <FileDropzone
                                className={classes.dropzone}
                                classNameActive={classes.dropzone_active}
                                onDrop={handleFiles}
                            >
                                <Icon
                                    style={{
                                        display: 'block',
                                        margin: 'auto'
                                    }}
                                >
                                    file_upload
                                </Icon>
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
                            </FileDropzone>
                        </FileSelect>
                    </div>
                )}
            </FileUploader>
        );
    }
}

export const MediaFileUploader = decorateStyle(MediaFileUploaderBase);