const multer =require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
   filename: function (req, file, cb) {
  const safeName = file.originalname.replace(/\s+/g, '-'); // replace spaces with dashes
  cb(null, `${Date.now()}-${safeName}`);
}

    });
    const fileFilter = (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    };
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    }
});
module.exports = upload;