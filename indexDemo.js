const express = require('express'); //require thư viện express
// const app = require('express')();
const app = express(); 

//ejs: template engine - công cụ thao tác với html
//nodemon: when change code, auto restart server

const handle = (req, res) => {
    // const name = req.params.name;
    // const age = req.params.age;

    //or
    const { name, age } = req.params;
    res.send(`Xin chao ${name} ${age} tuoi`);
}

//chỉ đáp trả 1 lần
app.get('/hello/:name/:age', handle); 

app.get('/tinh/:tenPhepTinh/:soA/:soB', require('./controllers/tinhController'));

app.get('*', (req, res) => res.send('Not found')); //tat ca cac route

// app.listen(port, function khi mở port thành công);
app.listen(3000, () => console.log('Server started'))//port ~ 1 -> 65535

