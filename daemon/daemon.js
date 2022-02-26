const cron = require('node-cron');
const block = require('./service/block');
const models = require('./db/models/index');

v = async() => {
    console.log('node start');
    //let s = await block.UpdateWholeBlocks();
    let v = block.UpdateBlock();
}
v();
