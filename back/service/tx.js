const {Tx} = require('../src/db/models')

module.exports = {
    getTxs: async(req, res, next) => {
        try{
            let datas = await Tx.findAll({
                attributes: ['tx_id', 'tx_status', 'tx_type', 'block_hash', 'sender_address', 'block_height'],
                order: [['block_height', 'DESC']]
            });
            
            res.status('200').send({
                code: '200',
                message: "Success",
                data: datas.map(row => row.dataValues)
            });
        }
        catch(e){
            res.status('500').send({
                code: '500',
                message: "Error",
            });
        }
    },
    getSpecificTx: async(req, res, nex) => {
        try{
            let datas = await Tx.findOne({
                where: {
                    tx_id: req.body.hash
                }
            });
            res.status('200').send({
                code: '200',
                message: "Success",
                data: datas.dataValues
            });
        }
        catch(e){
            res.status('500').send({
                code: '500',
                message: "Error",
            });
        }
    }
}