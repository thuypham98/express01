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
        const url = `http://localhost:3000/tinh/CHIA/${a}/${b}`;
        request(url, (err, res, body) => {
            if (err) return reject(err);
            resolve(body);
        });
    });
}

//async await

// async function tinhDienTich(a, b, h) {
//     try {
//         const tong = await congPromise(a, b);
//         const tich = await nhanPromise(+tong, h);
//         const kq = await chiaPromise(+tich, 2);
//         return Promise.resolve(kq);
//     } catch(err) {
//         // return Promise.reject(new Error('Loi tinh dien tich'));
//         throw new Error('Loi');
//     }
// }

// tinhDienTich(4, 5, 6)
// .then(kq => console.log(kq))
// .catch(err => console.log(err.message));

Promise.race([congPromise(4, 5), nhanPromise('3', 2)])
.then(x => console.log(x))
.catch(err => console.log(err.message));