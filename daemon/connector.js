const axios = require('axios');
const url = require('./config/stack_config').TESTNET_URL;

module.exports = {
    getRecentBlocks: async(index) => {
        var result = undefined;
        await axios.get(`${url}block?limit=30&index=${index != 0 ? index : 0}`).then((res) => {
            result = res.data.results;
        });

        return result;
    }
    
}