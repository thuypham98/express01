const request = require('request');

function getIp(cb){
    request('http://ip.jsontest.com/', (error, response, body) => {
        //1 tác vụ bất đồng bộ, không thể return giá trị nó đi lấy (request này không thể return về body được) -> s.dụng callback để output ra giá trị đó
        cb(error, body);
    });
}

// getIp((err, ip) => {
//     if(err) return console.log(err.message); //tất cả các lỗi đều có thuộc tính message
//     console.log(ip);
// });

function congHaiSo(a, b, cb){
    if(typeof a !== 'number' || typeof b !== 'number'){
        return cb(new Error('Type Error')); // cb() chỉ truyền 1 tham số -> mặc định tham số thứ 2 là undefined
    }
    request(`http://localhost:3000/tinh/cong/${a}/${b}`, (err, res, body) => {
        cb(err, body);
    });
}

function nhanHaiSo(a, b, cb){
    if(typeof a !== 'number' || typeof b !== 'number') {
        return cb(new Error('Type Error'));// cb() chỉ truyền 1 tham số -> mặc định tham số thứ 2 là undefined
    }
    const url = `http://localhost:3000/tinh/nhan/${a}/${b}`;
    request(url, (err, res, body) => {
        cb(err, body);
    });
}

function chiaHaiSo(a, b, cb){
    if(typeof a !== 'number' || typeof b !== 'number'){
        return cb(new Error('Type Error')); // cb() chỉ truyền 1 tham số -> mặc định tham số thứ 2 là undefined
    }
    if(b === 0)  return cb(new Error('Devide by zero'));
    request(`http://localhost:3000/tinh/chia/${a}/${b}`, (err, res, body) => {
        cb(err, body);
    });
}

// congHaiSo(9, 8, (err, kq) => {
//     if(err) return console.log(err.message);
//     console.log('Ket qua phep cong: ' + kq);
// });

// nhanHaiSo(9, 3, (err, kq) => {
//     if(err) return console.log(err.message);
//     console.log('Ket qua phep nhan: ' + kq);
// });

// chiaHaiSo(9, 3, (err, kq) => {
//     if(err) return console.log(err.message);
//     console.log('Ket qua phep chia: ' + kq);
// });

//(a + b) * h / 2
function dienTichHinhThang(a, b, h, cb){
    congHaiSo(a, b , (errCong, tong) => {
        if(errCong) return cb(errCong);
        nhanHaiSo(parseInt(tong) , h, (errNhan, tich) => {
            if(errNhan) return cb(errNhan);
            chiaHaiSo(parseInt(tich), 2, (errChia, kq) => {
                if(errChia) return cb(errChia);
                cb(null, kq);
            });
        });
    });
}

dienTichHinhThang(4, 5, 6, (err, kq) => {
    if(err) return console.log(err.message);
    console.log('Dien tich la: ' + kq); //kết quả sai (expected 27)
});