const Phone = require('../model/phone');

module.exports = async (req, res) => {
  if (!req.rules.is_smsc_phones_read) {
    logger('error', 'smsc', 403, 'findPhones.js');
    sendRes({ res, status: 403 });
  }

  const filter = JSON.parse(req.query.filter || '{}');

  if (!filter.where && req.context.slug !== 'root') {
    filter.where = {};
  }
  if (req.context.slug !== 'root') {
    filter.where.contextId = req.context.id;
  }

  const items = await Phone.findAll(filter).catch((err) => {
    logger('error', 'resource', 400, 'findAll.js', err);
    sendRes({ res, status: 400 });
  });

  sendRes({ res, status: 200, data: items });
};
