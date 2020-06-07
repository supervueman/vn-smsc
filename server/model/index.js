const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     SmscSetting:
 *       type: object
 *       properties:
 *         login:
 *           type: string
 *         password:
 *           type: string
 *         context:
 *           type: object
 *           description: Association name context
 *       example:
 *         id: 2
 *         phone: +7 (111) 111-11-11
 *         login: Smsc-login
 *         password: Smsc-password
 *         contextId: 1
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     SmscSettingCreate:
 *       type: object
 *       required:
 *         - login
 *         - password
 *         - contextId
 *       properties:
 *         login:
 *           type: string
 *         password:
 *           type: string
 *         context:
 *           type: object
 *           description: Association name context
 *       example:
 *         id: 2
 *         phone: +7 (111) 111-11-11
 *         login: Smsc-login
 *         password: Smsc-password
 *         contextId: 1
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     SmscSettingUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         login:
 *           type: string
 *         password:
 *           type: string
 *         context:
 *           type: object
 *           description: Association name context
 *       example:
 *         login: new-sms-login
 *         password: new-smsc-password
 */

const Model = sequelize.define('smsc-setting', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  login: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false
  }
});

module.exports = Model;
