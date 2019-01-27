const Joi = require('joi');

const register = Joi.object({
  body: Joi.object({
    sport: Joi.string()
      .max(100)
      .required(),
    college: Joi.string()
      .max(100)
      .required(),
    type: Joi.string()
      .max(100)
      .required(),
    teamSize: Joi.number().required(),
    collegePEContact: Joi.number().required(),
    name: Joi.string()
      .max(100)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    mobile: Joi.number().required(),
    // bankAccountNumber: Joi.string()
    //   .max(100)
    //   .required(),
    // bankIFSCCode: Joi.string()
    //   .max(100)
    //   .required(),
    // bankName: Joi.string()
    //   .max(100)
    //   .required(),
    // bankAccountType: Joi.string()
    //   .max(100)
    //   .required(),
    'g-recaptcha-response': Joi.string().required(),
    contact: Joi.array().items(
      Joi.object({
        name: Joi.string()
          .max(100)
          .required(),
        email: Joi.string()
          .email()
          .required(),
        phno: Joi.number().required()
      })
    )
  }).required()
});

const emailStatus = Joi.object({
  params: Joi.object({
    order_id: Joi.string().required()
  }).required()
});

module.exports = { register, emailStatus };
