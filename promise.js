const request = require('request');
const fs = require('fs');

function readFile(path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if(err) reject(err);
            resolve(data);
        });
    });
}

// readFile('./file.txt')
// .then(result => console.log(result))
// .catch(err => console.log(err.message));

function congPromise(a, b){
    return new Promise((resolve, reject) => {
        if(typeof a !== 'number' || typeof b !== 'number'){
            return reject(new Error('Type Error'));
        }
        const url = `http://localhost:3000/tinh/cong/${a}/${b}`;
        request(url, (err, res, body) => {
            if(err) return reject(err);
            resolve(body);
        });
    });
}

congPromise(8,7)
.then(result => console.log(result))
.catch(err => console.log(err.message));

function nhanPromise(a, b){
    return new Promise((resolve, reject) => {
        if(typeof a !== 'number' || typeof b!== 'number'){
            return reject(new Error('Type Error'));
        }
        const url = `http://localhost:3000/tinh/nhan/${a}/${b}`;
        request(url, (err, res, body) => {
            if(err) return reject(err);
            resolve(body);
        });
    });
}

nhanPromise(8, 7)
.then(result => console.log(result))
.catch(err => console.log(err));


function chiaPromise(a, b){
    return new Promise((resolve, reject) => {
        if(typeof a !== 'number' || typeof b!== 'number'){
            return reject(new Error('Type Error'));
        }
        if(b === 0) return reject(new Error('Devide by zero'));
        const url = `http://localhost:3000/tinh/chia/${a}/${b}`;
        request(url, (err, res, body) => {
            if(err) return reject(err);
            resolve(body);
        });
    });
}

chiaPromise(8, 2)
.then(result => console.log(result))
.catch(err => console.log(err));

// (4 + 5) * 6 / 2
// congPromise(4, 5)
// .then(tong => nhanPromise(+tong, 6))
// .then(tich => chiaPromise(+tich, 2))
// .then(kq => console.log('KQ: ' + kq))
// .catch(err => console.log(err));

function tinhDienTich(a, b, h){
    return congPromise(a, b)
    .then(tong => nhanPromise(+tong, h))
    .then(tich => chiaPromise(+tich, 2))
}

tinhDienTich(4, 5, 6)
.then(kq => console.log('Dien tich: ',kq))
.catch(err => console.log(err.message));