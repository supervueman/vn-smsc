const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     SmscPhone:
 *       type: object
 *       properties:
 *         phone:
 *           type: string
 *         context:
 *           type: object
 *           description: Association name context
 *         user:
 *           type: object
 *           description: Association name user
 *         isSubscribe:
 *           type: boolean
 *       example:
 *         id: 2
 *         phone: +7 (111) 111-11-11
 *         userId: 1
 *         contextId: 1
 *         isSubscribe: true
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     SmscPhoneCreate:
 *       type: object
 *       required:
 *         - phone
 *         - password
 *         - contextId
 *       properties:
 *         phone:
 *           type: string
 *         user:
 *           type: object
 *           description: Association name user
 *         isSubscribe:
 *           type: boolean
 *       example:
 *         id: 2
 *         phone: +7 (111) 111-11-11
 *         userId: 1
 *         contextId: 1
 *         isSubscribe: true
 */

const Model = sequelize.define('smsc-phone', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  phone: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false,
    unique: true
  },
  isSubscribe: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Model;
