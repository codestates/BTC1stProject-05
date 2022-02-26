const connector = require('../connector');

module.exports = {
    getBlalnce : async(req, res, next) => {
        try{
            let {chain, address} = req.query;
            let datas = await connector.getAccountBlance(chain, address);

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
    getAccountTxs: async(req, res, next) => {
        try{
            let {chain, address, index} = req.query;
            let datas = await connector.getAccountTxs(chain, address, index);

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
    }
}