import { ObjectID } from 'mongodb';
import {
    ApiSegment,
    EHttpState
}                   from 'server-modules';
import * as sharp   from 'sharp';
import {
    getCollection,
    getFsBucket
}                   from '../database';

export const DownloadAPI: ApiSegment = new ApiSegment('download');

DownloadAPI.addRoute('')
           .get((req, res) => {
               getCollection('fs.files')
                   .find()
                   .toArray()
                   .then(files => {
                       res.json(files);
                   })
                   .catch(e => {
                       res.sendStatus(EHttpState.eServerError);
                   });
           });

DownloadAPI.addRoute<{ file_id: string }>('/raw/:file_id')
           .get((req, res) => {
               const _id = new ObjectID(req.params.file_id);
               getCollection('fs.files')
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

               const _id = new ObjectID(req.params.file_id);

               const { width, height } = req.query;

               const resizePipeline =
                         sharp()
                             .resize(width
                                         ? parseInt(width, 10)
                                         : undefined,
                                     height
                                         ? parseInt(height, 10)
                                         : undefined)
                             .png();

               getCollection('fs.files')
                   .findOne({ _id })
                   .then(file => {
                       if (!file) {
                           res.sendStatus(EHttpState.eNotFound);
                           return;
                       }
                       if (!file.contentType.match(/^image/)) {
                           res.sendStatus(EHttpState.eBadRequest);
                           return;
                       }
                       res.setHeader('content-type', file.contentType || 'application/octet-stream');
                       res.setHeader('content-disposition', `inline; filename="${file.filename}.png"`);

                       const fStream = getFsBucket().openDownloadStream(_id);

                       fStream.pipe(resizePipeline)
                              .pipe(res)
                              .on('error', e => res.sendStatus(EHttpState.eServerError));
                   });
           });