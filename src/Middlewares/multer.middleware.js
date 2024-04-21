// Purpose: Multer middleware for file upload.
import multer from 'multer';


// this is multer middleware for file upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './temp');
  }   ,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage: storage });