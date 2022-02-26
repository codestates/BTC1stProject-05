const axios = require('axios');
const url = require('./config/stack_config').HTTPS_MAINNET_URL;


function getContent(tx, type) {
    switch(type){
        case 'token_transfer':
            return tx.token_transfer;
        case 'contract_call':
            return tx.contract_call;
        default:
            return "";
    }
}

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
    },
    getTxsInBlock: async(blockHeight) => {
        var result;

        await axios.get(`${url}tx/block_height/${blockHeight}`).then((res) => {
            result = res.data.results.map((tx) => {
                return {
                    'block_hash': tx.block_hash,
                    'block_height': tx.block_height,
                    'fee_rate': tx.fee_rate,
                    'sender_address': tx.sender_address,
                    'tx_id': tx.tx_id,
                    'tx_index': tx.tx_index,
                    'tx_status': tx.tx_status,
                    'tx_type': tx.tx_type,
                    'content': getContent(tx, tx.tx_type)
                };
            });
        });

        return result;
    }   
}