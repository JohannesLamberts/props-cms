import { ObjectID } from 'mongodb';
import {
    ApiSegment,
    EHttpState
}                   from 'server-modules';
import {
    getFsBucket,
    getFsCollection
}                   from '../database/database';

export const DownloadAPI: ApiSegment = new ApiSegment('files');

DownloadAPI.addRoute<{ file_id: string }>('/file/:file_id')
           .get((req, res) => {
               const _id = new ObjectID(req.params.file_id);
               getFsCollection()
                   .findOne({ _id })
                   .then(file => {
                       if (!file) {
                           res.sendStatus(EHttpState.eNotFound);
                           return;
                       }
                       res.setHeader('content-type', file.contentType || 'application/octet-stream');
                       res.setHeader('content-disposition', `inline; filename="${file.filename}"`);
                       getFsBucket()
                           .openDownloadStream(_id)
                           .pipe(res)
                           .on('error', e => res.sendStatus(EHttpState.eServerError));
                   });
           });

DownloadAPI.addRoute<{ file_id: string }>('/image/:file_id')
           .get((req, res) => {
               res.sendStatus(EHttpState.eNotImplemented);
           });