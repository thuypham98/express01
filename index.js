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

app.get('/tinh/:tenPhepTinh/:soA/:soB', (request, response) => {
    const { tenPhepTinh, soA, soB } = request.params;
    const pt = new Tinh(tenPhepTinh, soA, soB);
    response.send(pt.getResultString());
});

app.listen(3000)//port 0 -> 65000

class Tinh{
    constructor(tenPhepTinh, soA, soB){
        this.tenPhepTinh = tenPhepTinh;
        this.soA = soA;
        this.soB = soB;
    }

    _getChuoiPhepTinh(){    // thêm " _ " để đánh dấu - hiểu là private method
        const { tenPhepTinh, soA, soB } = this;
        if(tenPhepTinh === 'cong') return `${soA} + ${soB}`;
        if(tenPhepTinh === 'tru') return `${soA} - ${soB}`;
        if(tenPhepTinh === 'nhan') return `${soA} * ${soB}`;
        return `${soA} / ${soB}`;
    }

    getResultString(){
        const chuoiPhepTinh = this._getChuoiPhepTinh();
        const result = eval(chuoiPhepTinh);
        return `${chuoiPhepTinh} = ${result}`;
    }
}

// const pt = new Tinh('tru', 8, 7);
// console.log(pt.getResultString()); // 8 - 7 = 1
