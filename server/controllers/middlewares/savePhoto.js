const multer = require('multer');
const AppError = require('../../utils/appError');

const multerStorage = multer.diskStorage({
  destination: 'public/images',
  filename: (req, file, cb) => {
    if (file) {
      const ext = file.mimetype.split('/')[1];
      const fileName = `${(Math.random() * 1000).toFixed(
        0
      )}-${Date.now()}.${ext}`;

      req.body.image = `/images/${fileName}`;
      cb(null, fileName);
    }
  },
  fileFilter: (req, file, cb) => {
    if (file) {
      if (
        (process.env.ACCEPTED_FILE_MIMES || '')
          .split(',')
          .includes(file.mimetype.toLowerCase())
      ) {
        cb(null, true);
      } else {
        cb(new AppError('unaceptable file type', 400));
      }
    }
  }
});

const upload = multer({
  storage: multerStorage
});
module.exports = upload.single('image');
