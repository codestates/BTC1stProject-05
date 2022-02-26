const axios = require('axios');
const url = require('../daemon/config/stack_config');


function getURL(chain) {
    switch(chain){
        case 'main':
            return url.HTTPS_MAINNET_URL;
        case 'test':
            return url.HTTPS_TESTNET_URL;
        default:
            return "";
    }
}

module.exports = {
    getRecentBlocks: async(chain, index) => {
        var result;
        await axios.get(`${getURL(chain)}block?limit=30&offset=${index}`).then((res) => {
            result = res.data.results;
        });

        return result;
    },
    getRecentBlockHeight: async(chain) => {
        var height;

        await axios.get(`${getURL(chain)}block?limit=1`).then((res) => {
            height = res.data.results[0].height;
        });

        return height;
    },
    getBlockByHash: async(chain, hash) => {
        var result;

        await axios.get(`${getURL(chain)}block/${hash}`).then((res) => {
            result = res.data;
        });

        return result;
    },
    getTxsInBlock: async(chain, hash) => {
        var result;

        await axios.get(`${getURL(chain)}tx/block/${hash}`).then((res) => {
            result = res.data.results;
        });

        return result;
    },
    getRecentTxs: async(chain, index) => {
        var result;
        await axios.get(`${getURL(chain)}tx?limit=30&offset=${index}`).then((res) => {
            result = res.data.results;
        });
            
        return result;
    },
    getTx: async(chain, hash) => {
        var result;

        await axios.get(`${getURL(chain)}tx/${hash}`).then((res) => {
            result = res.data;
        });

        return result;
    },
    getAccountBlance: async(chain, address) => {
        var result;
        
        await axios.get(`${getURL(chain)}address/${address}/balances`).then((res) => {
            result = res.data.stx;
        });

        return result;
    },
    getAccountTxs: async(chain, address, index) => {
        var result;

        await axios.get(`${getURL(chain)}address/${address}/transactions?limit=30&offset=${index}`).then((res) => {
            result = res.data.results;
        });

        return result;
    }   
}