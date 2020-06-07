const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('../../../core/modules/user/model');
const Phone = require('../model/phone');

// Validators
const phoneValidator = require('../../../validators/phoneRUValidator');

module.exports = async (req, res) => {
  if (!req.body.phone) {
    logger('error', 'smsc', 400, 'login.js');
    sendRes({ res, status: 400 });
  }

  const phone = phoneValidator(req.body.phone);

  if (!validator.isMobilePhone(phone, ['ru-RU'])) {
    logger('error', 'smsc', 400, 'login.js');
    sendRes({ res, status: 400 });
  }

  const existPhone = await Phone.findOne({
    where: { phone }
  }).catch((err) => {
    logger('error', 'smsc', 400, 'login.js', err);
    sendRes({ res, status: 400 });
  });

  if (!existPhone) {
    logger('error', 'smsc', 404, 'login.js');
    sendRes({ res, status: 404 });
  }

  const user = await User.findByPk(existPhone.userId).catch((err) => {
    logger('error', 'smsc', 400, 'login.js', err);
    sendRes({ res, status: 400 });
  });

  if (!user) {
    logger('error', 'smsc', 404, 'login.js');
    sendRes({ res, status: 404 });
  }

  // Сравниваем пароли
  const isEqual = await bcrypt.compare(req.body.password, user.password);

  if (!isEqual) {
    logger('error', 'smsc', 400, 'login.js');
    sendRes({ res, status: 400 });
  }

  const access_token = jwt.sign(
    {
      id: user.id,
      phone: existPhone.phone
    },
    process.env.SECRET_KEY_FOR_JWT,
    {
      expiresIn: '360h'
    }
  );

  sendRes({ res, status: 200, data: { access_token } });
};
