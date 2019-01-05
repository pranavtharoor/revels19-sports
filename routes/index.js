const express = require('express');
const router = express.Router();

const validator = require('../utils/validator');
const schemas = require('../schemas');

const sports = require('./sports');

router.post('/register', validator(schemas.sports.register), sports.register);

router.post('/paymentcomplete', sports.paytmDone);

router.get('/', (req, res) => res.render('paytmDonePending'));

module.exports = router;
