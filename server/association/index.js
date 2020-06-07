const Model = require('../model');
const Phone = require('../model/phone');
const Context = require('../../../core/modules/context/model');
const User = require('../../../core/modules/user/model');

module.exports = () => {
  Model.belongsTo(Context, {
    onDelete: 'cascade'
  });

  Phone.belongsTo(Context, {
    onDelete: 'cascade'
  });

  Phone.belongsTo(User, {
    onDelete: 'cascade'
  });
};
