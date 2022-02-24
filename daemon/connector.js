const axios = require('axios');
const url = require('./config/stack_config').HTTPS_TESTNET_URL;

module.exports = {
    getRecentBlocks: async(index) => {
        var result;
        await axios.get(`${url}block?limit=30&offset=${index != 0 ? index : 0}`).then((res) => {
            result = res.data.results;
        });

        return result.map((block) => {
            return {
                'hash': block.hash,
                'tx_count': block.txs.length,
                'height': block.height,
                'miner_txid': block.miner_txid,
                'time': block.burn_block_time
            }
        });
    },
    getRecentBlockHeight: async() => {
        var height;

        await axios.get(`${url}block?limit=1`).then((res) => {
            height = res.data.results[0].height;
        });

        return height;
    }   
}