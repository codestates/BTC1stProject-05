const router = require('express').Router();
const {getBlalnce, getAccountTxs} = require('../service/account');

router.get('/', getBlalnce);

router.get('/specific', getAccountTxs)
  
module.exports = router;