const express = require('express'); //require thư viện express
// const app = require('express')();
const app = express(); 

// app.get('/', (request, response) => response.send('hello'));

const handle = (req, res) => {
    const name = req.params.name;
    const age = req.params.age;
    res.send(`Xin chao ${name} ${age} tuoi`);
}

app.get('/hello/:name/:age', handle); //chỉ đáp trả 1 lần

app.listen(3000)//port 0 -> 65000