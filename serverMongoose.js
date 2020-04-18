const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser').urlencoded({ extended: false });

const Word = require('./word-mongoose');
// mongoose.Promise = global.Promise;

const app = express();
app.set('views', './views'); //set thư mục chưa các file view template engine
app.set('view engine', 'ejs'); //set view engine sử dụng ejs
app.use(express.static('public'));

app.get('/', (req, res) => {
    Word.find()
    .then(result => res.render('home1', { arrWords: result }));
});

//insert data
app.post('/addWords', parser, (req, res) => {
    const { en, vn } = req.body;
    const word = new Word({ en, vn });
    word.save()
    .then(() => res.redirect('/'))
    .catch(err => res.send(err.message));
});

//Edit data
app.get('/editWords/:id', (req, res) => {
    const { id } = req.params;
    Word.findById(id)
    .then(result => res.render('edit-word', { result })) //gửi { result: result } đến edit-word.ejs
    .catch(err => res.send(err.message));
});
app.post('/updateWord/:id', parser, (req, res) => {
    const { id } = req.params;
    const { en, vn } = req.body;
    Word.findByIdAndUpdate(id, { en, vn })
    .then(() => res.redirect('/'))
    .catch(err => res.send(err.message));
});

//Remove data
app.get('/deleteWords/:id', (req, res) => {
    const { id } = req.params;
    Word.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(err => res.send(err.message));
});

const uri = 'mongodb://localhost/shop';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    // console.log('Connected');
    app.listen(3000, () => console.log('Server port 3000 started!'));
});