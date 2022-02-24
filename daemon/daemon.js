const cron = require('node-cron');
const block = require('./service/block');
const connector = require('./connector');
const models = require('./db/models/index');

v = async()=> {
    console.log('node start');
    //let s = await block.UpdateWholeBlocks();
    let v = await block.UpdateBlock();
}
v();

// db Update Code
// models.sequelize.sync().then(() => {
//     console.log('success');
// }).catch(err =>{
//     console.log(err);
// });

//const task = cron.schedule(5, )