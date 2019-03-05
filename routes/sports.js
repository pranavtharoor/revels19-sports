const fetch = require('node-fetch');
const uuidv1 = require('uuid/v1');
const { sequelize } = require('../models');
const { sport, sportContact } = require('../models');
const to = require('../utils/to');

exports.init = async (req, res) => {
  let [err, count] = await to(
    sequelize.query(
      `select sport, count(*) as regCount, sports.type as type from sports join paytm on sports.order_id = paytm.order_id where status = 'TXN_SUCCESS' and paytm.type = 'SPORTS' group by sport, type`,
      { type: sequelize.QueryTypes.SELECT }
    )
  );
  count = count.filter(a => maxCount[a.sport][a.type] < a.regCount);
  if (err) return res.sendError(err);
  res.sendSuccess(count);
};

exports.register = async (req, res) => {
  let err, resp, captchaData, result;
  [err, resp] = await to(
    fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${
        process.env.RECAPTCHA_SECRET
      }&response=${req.body['g-recaptcha-response']}`
    )
  );
  if (err) return res.sendError();
  [err, captchaData] = await to(resp.json());
  if (err || !captchaData.success)
    return res.sendError({ err, captchaData }, 'Invalid captcha');
  const { contact, ...details } = req.body;
  const order_id = await uuidv1();

  if (
    // document.querySelector('#mahe-checkbox').checked &&
    // req.body.sport === 'Cricket' ||
    // req.body.sport !== 'Swimming' //||
    // (req.body.sport === 'Hockey' && req.body.type === 'Men') //||
    // (req.body.sport === 'Football' && req.body.type === 'Men')
    !// req.body.sport === 'Swimming' ||
    (
      (req.body.sport === 'Athletics' && req.body.referral === '1234') ||
      (req.body.sport === 'Chess' && req.body.referral === 'pes123') ||
      (req.body.sport === 'Basketball' &&
        req.body.type === 'Men' &&
        req.body.referral === 'pes123') ||
      // (req.body.sport === 'Tennis' && req.body.type === 'Women') ||
      (req.body.sport === 'Table Tennis' &&
        req.body.type === 'Men' &&
        req.body.referral === 'pes123') ||
      (req.body.sport === 'Badminton' &&
        req.body.type === 'Women' &&
        req.body.referral === 'pes123')
    )
  ) {
    res.sendError('Registrations full');
    return;
  }

  const sportItem = data.filter(sport => sport.sportName === req.body.sport)[0];
  if (!sportItem) return res.sendError(null, 'Sport not found', 404);
  const cost = sportItem.cost.filter(cost => cost.name === req.body.type)[0];
  if (!cost) return res.sendError(null, 'Category not found', 404);
  const sizeType = sportItem.sizeType;
  const allowedTeamSize = sportItem.teamSize
    ? sportItem.teamSize.filter(size => size.name === req.body.type)[0].size
    : -1;
  let enteredTeamSize = req.body.teamSize;
  try {
    enteredTeamSize = parseInt(enteredTeamSize);
  } catch (err) {
    return res.sendError(err, 'Invalid size');
  }
  if (
    allowedTeamSize !== -1 &&
    ((sizeType === 'max' && allowedTeamSize < enteredTeamSize) ||
      (sizeType === 'exact' && allowedTeamSize !== enteredTeamSize))
  )
    return res.sendError(null, 'Invalid size');

  const amount_req = cost.value;
  [err, result] = await to(
    sequelize.transaction(t =>
      sport
        .create({ ...details, order_id }, { transaction: t })
        .then(result =>
          sportContact.bulkCreate(
            contact.map(c => ({ ...c, sportId: result.id })),
            { transaction: t }
          )
        )
        .then(result =>
          sequelize.query(
            'INSERT INTO paytm(order_id, type, cust_id, amount_req, mobile, email) VALUES(:order_id, :type, :cust_id, :amount_req, :mobile, :email)',
            {
              replacements: {
                order_id,
                type:
                  process.env.NODE_ENV === 'development' ? 'TESTING' : 'SPORTS',
                cust_id: result[0].sportId,
                amount_req,
                mobile:
                  process.env.NODE_ENV === 'development'
                    ? process.env.PAYTM_MOBILE
                    : req.body.mobile,
                email: req.body.email
              },
              type: sequelize.QueryTypes.INSERT
            },
            { transaction: t }
          )
        )
    )
  );
  if (err) return res.sendError(err);
  if (process.env.NODE_ENV === 'development')
    console.log(`
      Mobile: ${process.env.PAYTM_MOBILE || 7777777777}
      OTP: ${process.env.PAYTM_OTP || 489871}
      `);
  res.sendSuccess({
    redirect: `https://paytm.mitportals.in/initiate?orderid=${order_id}&callback=${
      process.env.NODE_ENV === 'development'
        ? `http://localhost:${process.env.PORT || 3000}/api/paymentcomplete`
        : 'https://sports.mitrevels.in/api/paymentcomplete'
    }`
  });
};

exports.paytmDone = async (req, res) => {
  let err, resp, data;
  [err, resp] = await to(
    fetch('https://paytm.mitportals.in/getTxnStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderid: req.body.ORDERID })
    })
  );
  if (err) return res.send('ERROR');
  [err, data] = await to(resp.json());
  if (err || !data.success) return res.send('ERROR');
  console.log(data);
  if (data.status === 'TXN_SUCCESS') res.render('paytmDoneSuccess', data);
  else if (data.status === 'PENDING') res.render('paytmDonePending', data);
  else res.render('paytmDoneFailure', data);
};

exports.emailStatus = async (req, res) => {
  if (req.query.token !== 'arandomafauthtoken') return res.sendError();
  let err, resp, data;
  [err, data] = await to(
    sport.findOne({
      where: { order_id: req.params.order_id },
      attributes: [
        'sport',
        'college',
        'type',
        'teamSize',
        'collegePEContact',
        'name',
        'email',
        'order_id',
        'mobile'
      ]
    })
  );
  if (err) return res.sendError(err);

  [err, resp] = await to(
    fetch('https://mailer.mitrevels.in/getSportsConfirmationEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sport: data.sport,
        college: data.college,
        type: data.type,
        teamSize: data.teamSize,
        collegePEContact: data.collegePEContact,
        name: data.name,
        email: data.email,
        order_id: data.order_id,
        mobile: data.mobile,
        auth: process.env.MAILER_KEY
      })
    })
  );
  if (err) return res.sendError(err, 'Could not send email');
  [err, dataResp] = await to(resp.json());
  if (err || !dataResp.success)
    return res.sendError({ err, dataResp }, 'Could not send email');

  res.sendSuccess();

  [err, data] = await to(
    sequelize.query(
      `select sports.sport as Sport, sports.banned as Banned, sports.college as College, sports.type as Category, sports.teamSize as 'Team Size', sports.collegePEContact as 'PE Contact', sports.name as Name, sports.email as Email, sports.mobile as Mobile, paytm.amount_paid as 'Amount Paid' from sports join paytm on  sports.order_id = paytm.order_id where sports.order_id = '${
        req.params.order_id
      }'`,
      { type: sequelize.QueryTypes.SELECT }
    )
  );

  if (data.length > 0)
    [err, resp] = await to(
      fetch(
        'https://script.google.com/macros/s/AKfycbzD2X_4m5LMBkIqvQ9ZjBjndAQf_FqZyt2zmX1HamlETz20gl9G/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: searchParams(data[0])
        }
      )
    );
};

const data = [
  {
    sportName: 'Athletics',
    cost: [{ name: 'Men', value: 3300 }, { name: 'Women', value: 2500 }]
  },
  {
    sportName: 'Badminton',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 7 }, { name: 'Women', size: 4 }],
    cost: [{ name: 'Men', value: 2600 }, { name: 'Women', value: 1300 }]
  },
  {
    sportName: 'Basketball',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 12 }, { name: 'Women', size: 12 }],
    cost: [{ name: 'Men', value: 4400 }, { name: 'Women', value: 3700 }]
  },
  {
    sportName: 'Chess',
    sizeType: 'max',
    teamSize: [{ name: 'Combined', size: 5 }],
    cost: [{ name: 'Combined', value: 1800 }]
  },
  {
    sportName: 'Cricket',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 18 }],
    cost: [{ name: 'Men', value: 6600 }]
  },
  {
    sportName: 'Cross-Country',
    sizeType: 'exact',
    teamSize: [{ name: 'Men', size: 3 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 1100 }, { name: 'Women', value: 300 }]
  },
  {
    sportName: 'Football',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 18 }, { name: 'Women', size: 11 }],
    cost: [{ name: 'Men', value: 6600 }, { name: 'Women', value: 3400 }]
  },
  {
    sportName: 'Hockey',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 16 }],
    cost: [{ name: 'Men', value: 5900 }]
  },
  {
    sportName: 'Squash',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 1 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 370 }, { name: 'Women', value: 300 }]
  },
  {
    sportName: 'Swimming',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 1 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 500 }, { name: 'Women', value: 500 }]
  },
  {
    sportName: 'Table Tennis',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 4 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 1100 }, { name: 'Women', value: 300 }]
  },
  {
    sportName: 'Volleyball',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 12 }, { name: 'Women', size: 12 }],
    cost: [{ name: 'Men', value: 4400 }, { name: 'Women', value: 3700 }]
  },
  {
    sportName: 'Handball',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 16 }],
    cost: [{ name: 'Men', value: 5900 }]
  },
  {
    sportName: 'Tennis',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 5 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 1900 }, { name: 'Women', value: 300 }]
  },
  {
    sportName: 'Throwball',
    sizeType: 'max',
    teamSize: [{ name: 'Women', size: 10 }],
    cost: [{ name: 'Women', value: 3700 }]
  }
];

const maxCount = {
  Athletics: {
    Men: 16,
    Women: 16
  },
  Badminton: {
    Men: 8,
    Women: 8
  },
  Basketball: {
    Men: 12,
    Women: 8
  },
  Chess: {
    Combined: 32
  },
  Cricket: {
    Men: 12,
    Women: 12
  },
  'Cross-Country': {
    Men: 99999,
    Women: 99999
  },
  Football: {
    Men: 21,
    Women: 8
  },
  Hockey: {
    Men: 18,
    Women: 18
  },
  Squash: {
    Men: 5,
    Women: 5
  },
  Swimming: {
    Men: 12,
    Women: 12
  },
  'Table Tennis': {
    Men: 8,
    Women: 8
  },
  Volleyball: {
    Men: 10,
    Women: 6
  },
  Handball: {
    Men: 8,
    Women: 8
  },
  Tennis: {
    Men: 7,
    Women: 5
  },
  Throwball: {
    Men: 6,
    Women: 6
  }
};

const searchParams = params =>
  Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
