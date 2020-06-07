const Model = require('../model');

// Helpers
const smsc = require('../helpers/smsc_api');

module.exports = async (req, res) => {
  if (!req.rules.is_smsc_setting_read) {
    logger('error', 'smsc', 403, 'getBalance.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findOne({
    where: {
      contextId: req.context.id
    }
  }).catch((err) => {
    logger('error', 'smsc', 400, 'getBalance.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'smsc', 404, 'getBalance.js');
    sendRes({ res, status: 404 });
  }

  smsc.configure({
    login: item.login,
    password: item.password,
    ssl: process.env.NODE_ENV === 'development' ? false : true,
    charset: 'utf-8'
  });

  // Получение баланса
  await smsc.get_balance((balance, raw, err, code) => {
    if (err) {
      logger('error', 'smsc', 500, 'getBalance.js', `${err}, 'code:' ${code}`);
      sendRes({ res, status: 500, message: `${err}, 'code:' ${code}` });
    }
    sendRes({ res, status: 200, data: { balance } });
  });
};
