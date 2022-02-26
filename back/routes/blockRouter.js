const router = require('express').Router();
const {getBlocks, getSpecificBlock} = require('../service/block');

/* GET users listing. */
router.get('/', getBlocks);

router.get('/specific', getSpecificBlock)
  
module.exports = router;