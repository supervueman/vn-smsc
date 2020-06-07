const bcrypt = require('bcrypt');
const validator = require('validator');
const generatePassword = require('password-generator');

const User = require('../../../core/modules/user/model');
const Model = require('../model');
const Phone = require('../model/phone');

const send_sms = require('../helpers/send_sms');

// Validators
const phoneValidator = require('../../../validators/phoneRUValidator');

module.exports = async (req, res) => {
  if (!req.rules.is_user_update) {
    logger('error', 'smsc', 403, 'resetPassword.js');
    sendRes({ res, status: 403 });
  }

  if (!req.body.phone) {
    logger('error', 'smsc', 400, 'resetPassword.js');
    sendRes({ res, status: 403 });
  }

  const phone = phoneValidator(req.body.phone);

  if (!validator.isMobilePhone(phone, ['ru-RU'])) {
    logger('error', 'smsc', 400, 'resetPassword.js');
    sendRes({ res, status: 400 });
  }

  const existPhone = await Phone.findOne({
    where: {
      phone: phone
    }
  }).catch((err) => {
    logger('error', 'smsc', 404, 'resetPassword.js', err);
    sendRes({ res, status: 404 });
  });

  if (!existPhone) {
    logger('error', 'smsc', 404, 'resetPassword.js');
    sendRes({ res, status: 404 });
  }

  const existUser = await User.findByPk(existPhone.userId).catch((err) => {
    logger('error', 'smsc', 404, 'resetPassword.js', err);
    sendRes({ res, status: 404 });
  });

  if (!existUser) {
    logger('error', 'smsc', 409, 'resetPassword.js');
    sendRes({ res, status: 409 });
  }

  const genPass = generatePassword(6, false, /\d/).toLowerCase();

  const hashedPw = await bcrypt.hash(genPass, 12);

  await existUser
    .update({
      password: hashedPw
    })
    .catch((err) => {
      logger('error', 'smsc', 400, 'resetPassword.js', err);
      sendRes({ res, status: 400 });
    });

  const item = await Model.findOne({
    where: {
      contextId: req.context.id
    }
  }).catch((err) => {
    logger('error', 'smsc', 400, 'resetPassword.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'smsc', 404, 'resetPassword.js');
    sendRes({ res, status: 404 });
  }

  await send_sms({
    login: item.login,
    password: item.password,
    phones: [`7${phone}`],
    mes: `Your password: ${genPass}`,
    errCb: (err) => {
      logger('error', 'smsc', 500, 'resetPassword.js', err);
      sendRes({ res, status: 500 });
    },
    successCb: async () => {
      sendRes({ res, status: 200 });
    }
  });
};
