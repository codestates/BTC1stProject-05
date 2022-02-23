const cron = require('node-cron');
const connector = require('./connector');

connector.getRecentBlocks();

//const task = cron.schedule(5, )