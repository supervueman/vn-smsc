const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_smsc_setting_update) {
    logger('error', 'smsc', 403, 'update.js');
    sendRes({ res, status: 403 });
  }

  const item = await Model.findOne({
    where: {
      contextId: req.context.id
    }
  }).catch((err) => {
    logger('error', 'smsc', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  if (!item) {
    logger('error', 'smsc', 404, 'update.js');
    sendRes({ res, status: 404 });
  }

  const updateItem = {
    login: req.body.login,
    password: req.body.password
  };

  const updatedItem = await item.update(updateItem).catch((err) => {
    logger('error', 'smsc', 400, 'update.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: updatedItem });
};
