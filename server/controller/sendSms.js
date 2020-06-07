const Model = require('../model');

const send_sms = require('../helpers/send_sms');

module.exports = async (req, res) => {
  if (!req.rules.is_send_sms) {
    logger('error', 'smsc', 403, 'sendSms.js');
    sendRes({ res, status: 403 });
  }

  if (
    (req.body.phones && req.body.phones.length === 0) ||
    req.body.mes === ''
  ) {
    logger('error', 'smsc', 400, 'sendSms.js');
    sendRes({ res, status: 400 });
  }

  const item = await Model.findOne({
    where: {
      contextId: req.context.id
    }
  }).catch((err) => {
    logger('error', 'smsc', 400, 'sendSms.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'smsc', 404, 'sendSms.js');
    sendRes({ res, status: 404 });
  }

  await send_sms({
    login: item.login,
    password: item.password,
    phones: req.body.phones,
    mes: req.body.mes,
    errCb: (err) => {
      logger('error', 'smsc', 500, 'sendSms.js', err);
      sendRes({ res, status: 500 });
    },
    successCb: () => {
      sendRes({ res, status: 200 });
    }
  });
};
