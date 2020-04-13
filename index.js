const express = require('express');

const app = express();

//ejs: template engine - công cụ thao tác với html

//upload file
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public'),
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname )
});

const upload = multer({ storage }); // storage <=> storage: storage

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

app.get('/sign-up', (req, res) => res.render('sign-up'));
app.post('/signUp', upload.single('profile'), (req, res) => { // profile: tên của <input type="file" name="profile" />
    res.send(req.body);
})



app.listen(3000, () => console.log('Server listening on port 3000.'));