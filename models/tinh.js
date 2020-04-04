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

module.exports = Tinh;

// const pt = new Tinh('tru', 8, 7);
// console.log(pt.getResultString()); // 8 - 7 = 1
