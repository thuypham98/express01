const express = require('express');

const app = express();

//ejs: template engine - công cụ thao tác với html

app.set('views', './views'); //set thư mục chưa các file template engine
app.set('view engine', 'ejs'); //set view engine sử dụng ejs

// app.get('/', (req, res) => res.send('<h1 style = "color: red;">Hello world</h1>'));
app.get('/', (req, res) => res.render('home'));


app.listen(3000, () => console.log('Server started'));