const User = require('../../../core/modules/user/model');
const Phone = require('../model/phone');

module.exports = async (req, res) => {
  const existUser = await User.findByPk(req.id).catch((err) => {
    logger('error', 'smsc', 404, 'subscribeSms.js', err);
    sendRes({ res, status: 404 });
  });

  if (!existUser) {
    logger('error', 'smsc', 404, 'subscribeSms.js');
    sendRes({ res, status: 404 });
  }

  const existPhone = await Phone.findOne({
    where: { userId: existUser.id }
  }).catch((err) => {
    logger('error', 'smsc', 404, 'subscribeSms.js', err);
    sendRes({ res, status: 404 });
  });

  if (!existPhone) {
    logger('error', 'smsc', 404, 'subscribeSms.js');
    sendRes({ res, status: 404 });
  }

  await existPhone
    .update({
      isSubscribe: req.body.isSubscribe
    })
    .catch((err) => {
      logger('error', 'smsc', 400, 'subscribeSms.js', err);
      sendRes({ res, status: 400 });
    });

  sendRes({
    res,
    status: 200,
    data: { message: req.body.isSubscribe ? 'Subscribe' : 'Unsubscribe' }
  });
};
