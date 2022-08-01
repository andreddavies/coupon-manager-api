import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const { originalname } = file;
    const filename = originalname.split("/")[0].split(".")[0];
    const dir = `./public/coupon/${filename}`;
    const fetchDir = fs.existsSync(dir);
    if (!fetchDir) {
      fs.mkdir(dir, (err) => {
        callback(err, dir);
      });
    }
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    callback(null, `image.${file.originalname.split(".")[1]}`);
  },
});

export const imageUploaderMiddleware = multer({
  storage,
});
