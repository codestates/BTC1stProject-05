const connector = require('../connector');

module.exports = {
    getTxs: async(req, res, next) => {
        try{
            let {index, chain} = req.query;
            let datas = await connector.getRecentTxs(chain, index);
            
            res.status('200').send({
                code: '200',
                message: "Success",
                data: datas
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
            let {hash, chain} = req.query;
            let tx = await connector.getTx(chain, hash);
            
            res.status('200').send({
                code: '200',
                message: "Success",
                data: tx
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