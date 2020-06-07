const smsc = require('./smsc_api.js');

// Отправка смс сообщения
module.exports = async ({ login, password, phones, mes, errCb, successCb }) => {
  let isSend = false;

  smsc.configure({
    login,
    password,
    ssl: process.env.NODE_ENV === 'development' ? false : true,
    charset: 'utf-8'
  });

  await smsc.send_sms({ phones, mes }, (data, raw, err, code) => {
    if (err) {
      logger('error', 'smsc', 500, 'send_sms.js');
      errCb(err);
      isSend = true;
      return isSend;
    }
    successCb();
  });
};
