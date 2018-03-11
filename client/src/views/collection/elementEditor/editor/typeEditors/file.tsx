import {
    FileDropzone,
    FileSelect,
    FileUploader
}                                 from '@j-lamberts/react-file-upload';
import {
    Button,
    Icon,
    LinearProgress
}                                 from 'material-ui';
import * as React                 from 'react';
import { TypeElementEditorProps } from './typeEditorProps';

export default ({ field, record, onDataChange }: TypeElementEditorProps<'file'>) => (
    <FileUploader
        runManual={true}
        keepOnFinish={true}
        url={'http://localhost:4005/upload'}
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
                <div>
                    Uploaded: {queue.length} <br/>
                    Waiting: {queue.filter(el => !el.ready).length}<br/>
                    Ready: {queue.filter(el => el.ready).length}
                </div>
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