//upload file with npm multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public'),
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname )
});
const limits = { fileSize: 102400 }; //chỉ cho up file dưới 100kb
function fileFilter(req, file, cb){
    const { mimetype } = file;
    if( mimetype === 'image/png' || mimetype === 'image/jpeg'){
        return cb(null, true);
    }
    cb(new Error('File không đúng định dạng'));
}
const upload = multer({ storage, limits, fileFilter }); // storage <=> storage: storage

module.exports = upload;