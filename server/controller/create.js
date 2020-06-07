const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_smsc_setting_create && !req.context) {
    logger('error', 'smsc', 403, 'create.js');
    sendRes({ res, status: 403 });
  }

  const item = {
    login: req.body.login,
    password: req.body.password,
    contextId: req.context.id
  };

  let createdItem = await Model.create(item).catch((err) => {
    logger('error', 'smsc', 400, 'create.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: createdItem });
};
