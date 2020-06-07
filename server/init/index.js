// Data
const enLexicons = require('../data/en.json');
const ruLexicons = require('../data/ru.json');
const defaultRules = require('../data/rules_default.json');
const adminRules = require('../data/rules_admin.json');
const managerRules = require('../data/rules_manager.json');

// Helpers
const createLexicons = require('../../../core/modules/lexicon/helpers/createLexicons');
const addRules = require('../../../core/modules/role/handlers/addNewRules');

module.exports = async () => {
  await addRules('default', defaultRules);
  await addRules('admin', adminRules);
  await addRules('manager', managerRules);

  await createLexicons('ru', ruLexicons);
  await createLexicons('en', enLexicons);
};
