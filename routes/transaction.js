const express = require('express')

const router = express.Router();
const {addTransaction,getAllTransactions} = require('../Controllers/transactions');

router.route('/addTransaction').post(addTransaction);
router.route('/getAllTransactions/:name').get(getAllTransactions)
module.exports = router;