const fetch = require('node-fetch');
const uuidv1 = require('uuid/v1');
const { sequelize } = require('../models');
const { sport, sportContact } = require('../models');
const to = require('../utils/to');

exports.register = async (req, res) => {
  // @TODO: check teamSize
  const { contact, ...details } = req.body;
  const order_id = await uuidv1();
  const sportItem = data.filter(sport => sport.sportName === req.body.sport)[0];
  if (!sportItem) return res.sendError(null, 'Sport not found', 404);
  const cost = sportItem.cost.filter(cost => cost.name === req.body.type)[0];
  if (!cost) return res.sendError(null, 'Category not found', 404);
  const amount_req = cost.value;
  const [err, result] = await to(
    sequelize.transaction(t =>
      sport
        .create(details, { transaction: t })
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

const data = [
  {
    sportName: 'Athletics',
    cost: [{ name: 'Men', value: 3186 }, { name: 'Women', value: 2360 }]
  },
  {
    sportName: 'Badminton',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 7 }, { name: 'Women', size: 4 }],
    cost: [{ name: 'Men', value: 2478 }, { name: 'Women', value: 1180 }]
  },
  {
    sportName: 'Basketball',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 12 }, { name: 'Women', size: 12 }],
    cost: [{ name: 'Men', value: 4248 }, { name: 'Women', value: 3540 }]
  },
  {
    sportName: 'Chess',
    sizeType: 'max',
    teamSize: [{ name: 'Combined', size: 5 }],
    cost: [{ name: 'Combined', value: 1770 }]
  },
  {
    sportName: 'Cricket',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 18 }],
    cost: [{ name: 'Men', value: 6372 }]
  },
  {
    sportName: 'Cross-Country',
    sizeType: 'exact',
    teamSize: [{ name: 'Men', size: 3 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 1062 }, { name: 'Women', value: 295 }]
  },
  {
    sportName: 'Football',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 18 }, { name: 'Women', size: 11 }],
    cost: [{ name: 'Men', value: 6372 }, { name: 'Women', value: 3245 }]
  },
  {
    sportName: 'Hockey',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 16 }],
    cost: [{ name: 'Men', value: 5664 }]
  },
  {
    sportName: 'Squash',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 1 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 354 }, { name: 'Women', value: 295 }]
  },
  {
    sportName: 'Swimming',
    cost: [{ name: 'Men', value: 4602 }, { name: 'Women', value: 3835 }]
  },
  {
    sportName: 'T.T',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 3 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 1062 }, { name: 'Women', value: 295 }]
  },
  {
    sportName: 'Volleyball',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 12 }, { name: 'Women', size: 12 }],
    cost: [{ name: 'Men', value: 4248 }, { name: 'Women', value: 3540 }]
  },
  {
    sportName: 'Handball',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 16 }],
    cost: [{ name: 'Men', value: 5664 }]
  },
  {
    sportName: 'Tennis',
    sizeType: 'max',
    teamSize: [{ name: 'Men', size: 5 }, { name: 'Women', size: 1 }],
    cost: [{ name: 'Men', value: 1770 }, { name: 'Women', value: 295 }]
  },
  {
    sportName: 'Throwball',
    sizeType: 'max',
    teamSize: [{ name: 'Women', size: 10 }],
    cost: [{ name: 'Women', value: 3245 }]
  }
];
