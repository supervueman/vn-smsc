const bcrypt = require('bcrypt');
const validator = require('validator');
const generatePassword = require('password-generator');

const User = require('../../../core/modules/user/model');
const Role = require('../../../core/modules/role/model');
const Model = require('../model');
const Phone = require('../model/phone');

const send_sms = require('../helpers/send_sms');

// Validators
const phoneValidator = require('../../../validators/phoneRUValidator');

module.exports = async (req, res) => {
  if (!req.rules.is_user_create) {
    logger('error', 'smsc', 403, 'createByPhone.js');
    sendRes({ res, status: 403 });
  }

  if (!req.body.phone) {
    logger('error', 'smsc', 400, 'createByPhone.js');
    sendRes({ res, status: 400 });
  }

  const phone = phoneValidator(req.body.phone);

  const existPhone = await Phone.findOne({
    where: {
      phone: phone
    }
  });

  if (existPhone) {
    logger('error', 'smsc', 409, 'createByPhone.js');
    sendRes({ res, status: 409 });
  }

  if (!validator.isMobilePhone(phone, ['ru-RU'])) {
    logger('error', 'smsc', 400, 'createByPhone.js');
    sendRes({ res, status: 400 });
  }

  const genPass = generatePassword(6, false, /\d/).toLowerCase();

  const hashedPw = await bcrypt.hash(genPass, 12);

  const item = await Model.findOne({
    where: {
      contextId: req.context.id
    }
  }).catch((err) => {
    logger('error', 'smsc', 400, 'createByPhone.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'smsc', 404, 'createByPhone.js');
    sendRes({ res, status: 404 });
  }

  // назначить default роль
  const defaultRole = await Role.findOne({
    where: {
      slug: 'default'
    }
  }).catch((err) => {
    logger('error', 'smsc', 400, 'createByPhone.js', err);
    sendRes({ res, status: 400 });
  });

  const createdUser = await User.create({
    slug: req.body.slug,
    email: req.body.email,
    phone: phone,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    middlename: req.body.middlename,
    birthday: req.body.birthday,
    country: req.body.country,
    city: req.body.city,
    street: req.body.street,
    home: req.body.home,
    apartment: req.body.apartment,
    image: req.body.image,
    facebook: req.body.facebook,
    vkontakte: req.body.vkontakte,
    instagram: req.body.instagram,
    password: hashedPw,
    contextId: req.context.id,
    roleId: defaultRole.id,
    verified: true
  }).catch((err) => {
    logger('error', 'smsc', 400, 'createByPhone.js', err);
    sendRes({ res, status: 400 });
  });

  await Phone.create({
    phone: phone,
    userId: createdUser.id,
    contextId: req.context.id,
    isSubscribe: false
  }).catch((err) => {
    logger('error', 'smsc', 400, 'createByPhone.js', err);
    sendRes({ res, status: 400 });
  });

  await send_sms({
    login: item.login,
    password: item.password,
    phones: [`7${phone}`],
    mes: `Your password: ${genPass}`,
    errCb: (err) => {
      logger('error', 'smsc', 500, 'createByPhone.js', err);
      sendRes({ res, status: 500 });
    },
    successCb: async () => {
      sendRes({ res, status: 200 });
    }
  });
};
