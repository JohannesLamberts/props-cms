import {
    Request,
    Response
}                      from 'express';
import * as fs         from 'fs';
import * as multer     from 'multer';
import * as path       from 'path';
import { ApiSegment }  from 'server-modules';
import { EHttpState }  from 'server-modules/build/modules/express/httpState';
import { getFsBucket } from '../database/database';

const upload = multer({ dest: '_tmp_file_update' }).single('file');

export const DownAPI: ApiSegment = new ApiSegment('down');

const writeFile = (req: Request, res: Response) => {
    const file: Express.Multer.File = req.file;
    const parsedFileName = path.parse(file.originalname);
    const stream = getFsBucket().openUploadStream(parsedFileName.name);
    fs.createReadStream(file.path)
      .pipe(stream)
      .on('error', () => {
          res.sendStatus(EHttpState.eServerError);
      })
      .on('finish', () => {
          res.json({ id: stream.id })
             .status(EHttpState.eOk);
      });
};

DownAPI.addRoute('/files')
       .post(upload,
             (req, res) => {
                 writeFile(req, res);
             });

DownAPI.addRoute<{ file_id: string }>('/files/:file_id')
       .put(upload,
            (req, res) => {
                getFsBucket()
                    .delete(
                        req.params.id,
                        err => {
                            if (err) {
                                res.sendStatus(EHttpState.eServerError);
                                return;
                            }
                            writeFile(req, res);
                        });
            });