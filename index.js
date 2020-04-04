const express = require('express'); //require thư viện express
// const app = require('express')();
const app = express(); 

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

app.listen(3000)//port 0 -> 65000

