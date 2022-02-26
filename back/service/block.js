const connector = require('../connector');

module.exports = {
    getBlocks : async(req, res, next) => {
        try{
            let {index, chain} = req.query;
            let datas = await connector.getRecentBlocks(chain, index);
            
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
    getSpecificBlock: async(req, res, next) => {
        try{
            let {hash, chain} = req.query;
            let block = await connector.getBlockByHash(chain, hash);
            let txs = await connector.getTxsInBlock(chain, hash);
            block.txs = txs;
            
            res.status('200').send({
                code: '200',
                message: "Success",
                data: block
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