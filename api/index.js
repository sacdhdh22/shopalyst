'use strict';
const express = require('express');
const router = express.Router();

router.use('/survey',require('./survey'));

module.exports = router;
