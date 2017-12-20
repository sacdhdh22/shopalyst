'use strict';

const express = require('express');
const router = express.Router();
const methods = require('./account/methods.js');

router.post('/submitFeedback', methods.submitFeedback);
router.get('/getResult', methods.getResult);

module.exports = router;