const express = require('express');
const { queryBQ, queryDB } = require('../controller/inventory');

const router = express.Router()

router.get('/logs', queryBQ)
router.get('/errors', queryDB )

module.exports = router