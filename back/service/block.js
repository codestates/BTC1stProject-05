const {Block, Tx} = require('../src/db/models');

module.exports = {
    getBlocks : async(req, res, next) => {
        try{
            let datas = await Block.findAll({
                attributes: ['hash', 'height', 'time', 'miner_txid'],
                order: [['height', 'DESC']]
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
    getSpecificBlock: async(req, res, next) => {
        try{
            let datas = await Block.findOne({
                attributes: ['hash', 'tx_count', 'height', 'miner_txid', 'time'],
                where: {
                    hash: req.body.hash
                }
            });
            let txs = await Tx.findAll({
                attributes: ['tx_id', 'tx_status', 'tx_type', 'sender_address', 'block_hash'],
                where:{
                    block_hash: datas.dataValues.hash
                }
            });
            datas.dataValues.txs = txs;

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