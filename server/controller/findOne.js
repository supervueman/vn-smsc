const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_smsc_setting_read) {
    logger('error', 'smsc', 403, 'findOne.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findOne({
    where: {
      contextId: req.context.id
    }
  }).catch((err) => {
    logger('error', 'smsc', 400, 'findOne.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'smsc', 404, 'findOne.js');
    sendRes({ res, status: 404 });
  }

  sendRes({ res, status: 200, data: item });
};
