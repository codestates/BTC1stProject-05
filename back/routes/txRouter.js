const router = require('express').Router();
const {getTxs, getSpecificTx} = require('../service/tx')

/* GET users listing. */
router.get('/', getTxs);

router.post('/specific', getSpecificTx);
  
module.exports = router;