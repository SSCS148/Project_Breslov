const multer = require('multer');
const path = require('path');

// Configure Multer to store files on the persistent disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/var/data/uploads'); // Mount point for persistent disk
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
