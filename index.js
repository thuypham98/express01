const express = require('express');

const app = express();

const upload = require('./controllers/uploadConfig'); //upload file

//ejs: template engine - công cụ thao tác với html

app.set('views', './views'); //set thư mục chưa các file view template engine
app.set('view engine', 'ejs'); //set view engine sử dụng ejs

const arrPeople = [
    { name: 'Ronaldo', age: 35 },
    { name: 'Marcelo', age: 33 },
    { name: 'Navas', age: 34 },
]

// app.get('/', (req, res) => res.send('<h1 style = "color: red;">Hello world</h1>'));
app.get('/', (req, res) => res.render('home'));

app.get('/learn', (req, res) => {
    res.render('learn', { username: 'Ronaldo', arrPeople}); //arrPeople <=> arrPeople: arrPeople
});
//=========================================================================

// upload file. ( upload.single - upload 1 file, upload.array - upload nhiều file, upload.fields - thêm các option khác) - ( youtube buổi 10 )
app.get('/sign-up', (req, res) => res.render('sign-up'));
// app.post('/signUp', upload.single('profile'), (req, res) => { // profile: tên của <input type="file" name="profile" />
//     res.send(req.body);
// });
app.post('/signUp', upload.array('profile'), (req, res) => { // 
    res.send(req.files);
});

//handle lỗi, có lỗi sẽ nhảy vào middleware này
app.use((err, req, res, next) => {
    res.send(err.message);
});

app.get('*', (req, res) => res.send('Not found')); //không tìm thấy route

app.listen(3000, () => console.log('Server listening on port 3000.'));