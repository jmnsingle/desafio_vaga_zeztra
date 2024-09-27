import multer from 'multer';
import path from 'path';
import fs from 'fs';

class UploadTransactions {
  private URL: string = path.join(__dirname, '..', '..', 'upload');
  getUrl() {
    return this.URL;
  }
  get getConfig(): multer.Options {
    return {
      storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
          if (!fs.existsSync(this.URL)) {
            fs.mkdirSync(this.URL);
          }
          cb(null, this.URL);
        },
        filename: (_req, file, cb) => {
          const parts = file.originalname.split('.');
          const extension = parts[parts.length - 1];
          const filename = `${Date.now()}.${extension}`;
          cb(null, filename);
        },
      }),
      fileFilter(_req, file, callback) {
        const parts = file.originalname.split('.');
        const extension = parts[parts.length - 1];
        const conditions = ['txt', 'csv'];
        if (conditions.includes(`${extension}`)) {
          callback(null, true);
        }
        callback(null, false);
      },
    };
  }
}

export const uploadTransactions = new UploadTransactions();
