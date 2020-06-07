const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_smsc_setting_delete) {
    logger('error', 'smsc', 403, 'remove.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findOne({
    where: {
      contextId: req.context.id
    }
  }).catch((err) => {
    logger('error', 'smsc', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'smsc', 404, 'remove.js');
    sendRes({ res, status: 404 });
  }

  await Model.destroy({
    where: {
      contextId: req.context.id
    }
  }).catch((err) => {
    logger('error', 'smsc', 400, 'remove.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 204 });
};
