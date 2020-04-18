//buổi 14
const mongoose = require('mongoose');
const WordSchema = new mongoose.Schema({ // schema: bản vẽ/định dạng dữ liệu (mô tả dữ liệu có những gì)
    en: String,
    vn: String
});

const Word = mongoose.model('Word', WordSchema); //Tạo lớp đối tượng từ bản vẽ //'Word'(trong ngoặc): tên collection (tự thêm s)
// const uri = 'mongodb://localhost/shop';

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connection.once('open', () => {
//     // console.log('Connected');
//     const remote = new Word({ en: "remote", vn: "Điều khiển"});
//     remote.save() //insert data
//     .then(() => console.log('Seved'));
// });

module.exports = Word;