const Tinh = require('../models/tinh');
module.exports = (request, response) => {
    const { tenPhepTinh, soA, soB } = request.params;
    const pt = new Tinh(tenPhepTinh, soA, soB);
    response.send(pt.getResultString());
}