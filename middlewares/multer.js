import multerS3 from 'multer-s3';
import multer from 'multer';
import AWS from 'aws-sdk';
import path from 'path';

AWS.config.update({
  accessKeyId: process.env.AWS_Access_Key_ID,
  secretAccessKey: process.env.AWS_Secret_Access_Key,
  region: 'ap-northeast-2'
});

export const upload = multer(
  {
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: 'tuninig-teacher-profile',
      ACL: 'public-read-write',
      key: function (req, file, cb) {
        cb(null, `original/${+Date.now()}${path.basename(file.originalname.replace(/ /gi, ''))}`);
      }
    })
  },
  'NONE'
);
