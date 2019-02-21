const express = require('express');
const router = express.Router();

const validator = require('../utils/validator');
const schemas = require('../schemas');

const sports = require('./sports');

router.post('/register', validator(schemas.sports.register), sports.register);

router.post('/paymentcomplete', sports.paytmDone);

router.get('/init', sports.init);

router.get('/', (req, res) => res.render('paytmDonePending'));

router.get(
  '/emailstatus/:order_id',
  validator(schemas.sports.emailStatus),
  sports.emailStatus
);

module.exports = router;
