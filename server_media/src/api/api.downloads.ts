import { ApiSegment } from 'server-modules';

export const UpAPI: ApiSegment = new ApiSegment('up');

UpAPI.addRoute<{ file_id: string }>('/file/:file_id')
     .get((req, res) => {
         res.end();
     });

UpAPI.addRoute<{ file_id: string }>('/image/:file_id')
     .get((req, res) => {
         res.end();
     });