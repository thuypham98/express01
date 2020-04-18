const express = require('express');

const app = express();

app.get('/tinh/:tenPhepTinh/:soA/:soB', (req, res) => {
    const { tenPhepTinh, soA, soB } = req.params;
    const pt = new PhepTinh(soA, soB, tenPhepTinh);
    res.send(pt.getResult() + '');
});

app.listen(3000, () => console.log('Server started - port 3000'));

class PhepTinh {
    constructor(soA, soB, tenPhepTinh) {
        this.soA = soA;
        this.soB = soB;
        this.tenPhepTinh = tenPhepTinh;
    }

    getResult() {
        switch (this.tenPhepTinh) {
            case 'cong': return +this.soA + +this.soB;
            case 'tru': return this.soA - this.soB;
            case 'nhan': return this.soA * this.soB;
            default: return this.soA / this.soB;
        }
    }
}

module.exports = PhepTinh;