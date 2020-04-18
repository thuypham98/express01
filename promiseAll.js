const request = require('request');

function congPromise(a, b) {
    return new Promise((resolve, reject) => {
        if(typeof a !== 'number' || typeof b !== 'number') {
            return reject(new Error('Type error'));
        }
        const url = `http://localhost:3000/tinh/cong/${a}/${b}`;
        request(url, (err, res, body) => {
            if (err) return reject(err);
            resolve(body);
        });
    });
}

function nhanPromise(a, b) {
    return new Promise((resolve, reject) => {
        if(typeof a !== 'number' || typeof b !== 'number') {
            return reject(new Error('Type error'));
        }
        const url = `http://localhost:3000/tinh/nhan/${a}/${b}`;
        request(url, (err, res, body) => {
            if (err) return reject(err);
            resolve(body);
        });
    });
}

function chiaPromise(a, b) {
    return new Promise((resolve, reject) => {
        if(typeof a !== 'number' || typeof b !== 'number') {
            return reject(new Error('Type error'));
        }
        if(b === 0) return reject(new Error('Divide by zero'));
        const url = `http://localhost:3000/tinh/chia/${a}/${b}`;
        request(url, (err, res, body) => {
            if (err) return reject(err);
            resolve(body);
        });
    });
}

// (4 + 5) * 6 / 2

Promise.all([congPromise('4', 5).catch(err => 100), chiaPromise(6, 2)]) //congPromise err vẫn thực hiện promise sau
// .then(mang => console.log(mang))
.then(mang => nhanPromise(+mang[0], +mang[1]))
.then(kq => console.log(kq))
.catch(err => console.log(err.message));

// (4 + 5) * 6 / 2

// congPromise(4, 5)
// .then(tong => nhanPromise(tong, 6), () => 100)
// .then(tich => chiaPromise(+tich, 2))
// .then(kq => console.log(kq))
// .catch(err => console.log(err));

// (4 + 5) * 6 / 2

congPromise(4, 5)
.then(tong => nhanPromise(+tong, 6), () => 100)
.then(tich => chiaPromise(+tich, 2))
.then(kq => console.log(kq))
.catch(err => console.log(err));