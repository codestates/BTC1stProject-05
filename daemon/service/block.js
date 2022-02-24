const connector = require('../connector');
const {Block} = require('../db/models')
const { connectWebSocketClient } = require('@stacks/blockchain-api-client');
const WSS_MAINET_URL = require('../config/stack_config').WSS_MAINET_URL;

module.exports = {
    UpdateWholeBlocks: async() => {
        let blockHeight = 1000 //await connector.getRecentBlockHeight();
        let updateDatas = [];

        for(let idx = 0; idx < blockHeight;){
            updateDatas = updateDatas.concat(await connector.getRecentBlocks(idx));
            
            if(updateDatas.length == 900){
                // DB Update
                await Block.bulkCreate(updateDatas).catch(err =>{
                    console.log(err);
                    throw "DB Update Exception";
                });
                updateDatas = [];
            }
            idx += 30;
        }
    },
    UpdateMissingBlocks: async() => {
        
    },
    UpdateBlock: async() => {
        try{
            const client = await connectWebSocketClient(WSS_MAINET_URL);
            
            await client.subscribeBlocks((block) => {
                console.log(block);

                Block.create({
                    'hash': block.hash,
                    'tx_count': block.txs.length,
                    'height': block.height,
                    'miner_txid': block.miner_txid,
                    'time': block.burn_block_time
                }).catch(err => {
                    console.log(err);
                    throw "DB Update Exception";
                });
            });
        }
        catch(err){
            console.log(err);
        }
    }
}