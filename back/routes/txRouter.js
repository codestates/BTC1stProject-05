const router = require('express').Router();
const {getTxs, getSpecificTx} = require('../service/tx')

/* GET users listing. */
router.get('/', getTxs);

router.get('/specific', getSpecificTx);
  
module.exports = router;