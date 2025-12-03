const multer = require("multer");

// Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },

  filename: function (req, file, cb) {
    // Extracting the extension from the original file
    const extensionFile = file.originalname.split('.')[1];

    // Create file name
    const newFileName = require('crypto')
        .randomBytes(36)
        .toString('hex');

    // Indicates the new file name
    cb(null, `${newFileName}.${extensionFile}`)
  },
});


const upload = multer({ storage: storage })
module.exports = upload;