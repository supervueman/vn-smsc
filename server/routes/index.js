const express = require('express');
const router = express.Router();

// Controllers
const controller = require('../controller');

// Middleware
const profileByAccessToken = require('../../../middleware/profileByAccessToken');
const profileByApiKey = require('../../../middleware/profileByApiKey');

/**
 * @swagger
 * tags:
 *   name: Smsc
 *   description: Smsc management
 */

/**
 * @swagger
 * path:
 *  /smsc/findone:
 *    get:
 *      summary: Get smsc setting
 *      tags: [Smsc]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *        - filterParam:
 *          in: query
 *          name: filter
 *          description: See sequelize documentation https://sequelize.org/v5/manual/querying.html
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *          example:
 *            where:
 *              slug: about
 *              published: true
 *      responses:
 *        "200":
 *          description: SmscSetting schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SmscSetting'
 *      security:
 *        - basicAuth: []
 */
router.get('/findone', profileByAccessToken, controller.findOne);

/**
 * @swagger
 * path:
 *  /smsc/create:
 *    post:
 *      summary: Create smsc setting
 *      tags: [Smsc]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SmscSettingCreate'
 *      responses:
 *        "200":
 *          description: Create smsc setting schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SmscSetting'
 *      security:
 *        - basicAuth: []
 */
router.post('/create', profileByAccessToken, controller.create);

/**
 * @swagger
 * path:
 *  /smsc/update/{id}:
 *    put:
 *      summary: Update smsc setting
 *      tags: [Smsc]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SmscSettingUpdate'
 *      responses:
 *        "200":
 *          description: SmscSetting schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SmscSetting'
 *      security:
 *        - basicAuth: []
 */
router.put('/update', profileByAccessToken, controller.update);

/**
 * @swagger
 * path:
 *  /smsc/remove/{id}:
 *    delete:
 *      summary: Delete smsc setting
 *      tags: [Smsc]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "204":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.delete('/remove', profileByAccessToken, controller.remove);

/**
 * @swagger
 * path:
 *  /smsc/send-sms:
 *    post:
 *      summary: Send sms
 *      tags: [Smsc]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phones:
 *                  type: array,
 *                mes:
 *                  type: string,
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.post('/send-sms', profileByAccessToken, controller.sendSms);

/**
 * @swagger
 * path:
 *  /smsc/balance:
 *    get:
 *      summary: Get balance
 *      tags: [Smsc]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: SmscSetting schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  balance:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.get('/balance', profileByAccessToken, controller.getBalance);

/**
 * @swagger
 * path:
 *  /smsc/create-by-phone:
 *    post:
 *      summary: Create profile by phone
 *      tags: [Smsc]
 *      parameters:
 *        - in: header
 *          name: x-api-key
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserCreate'
 *      responses:
 *        "200":
 *          description: Create profile schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.post('/create-by-phone', profileByApiKey, controller.createByPhone);

/**
 * @swagger
 * path:
 *  /smsc/reset-password:
 *    put:
 *      summary: Reset password
 *      tags: [Smsc]
 *      parameters:
 *        - in: header
 *          name: x-api-key
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phone:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Reset password
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.put('/reset-password', profileByApiKey, controller.resetPassword);

/**
 * @swagger
 * path:
 *  /smsc/change-phone:
 *    put:
 *      summary: Change phone
 *      tags: [Smsc]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phone:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Reset password
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.put('/change-phone', profileByAccessToken, controller.changePhone);

/**
 * @swagger
 * path:
 *  /smsc/login:
 *    post:
 *      summary: Login
 *      tags: [Smsc]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phone:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  access_token: string
 *      security:
 *        - basicAuth: []
 */
router.post('/login', controller.login);

/**
 * @swagger
 * path:
 *  /smsc/subscribe-sms:
 *    put:
 *      summary: Subscribe sms
 *      tags: [Smsc]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                isSubscribe:
 *                  type: boolean
 *      responses:
 *        "200":
 *          description: Reset password
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - basicAuth: []
 */
router.put('/subscribe-sms', profileByAccessToken, controller.subscribeSms);

/**
 * @swagger
 * path:
 *  /smsc/find-phones:
 *    get:
 *      summary: Get all phones
 *      tags: [Smsc]
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          required: true
 *          schema:
 *            type: string
 *        - filterParam:
 *          in: query
 *          name: filter
 *          description: See sequelize documentation https://sequelize.org/v5/manual/querying.html
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *          example:
 *            where:
 *              isSubscribe: true
 *      responses:
 *        "200":
 *          description: Array phones schema
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/SmscPhone'
 *      security:
 *        - basicAuth: []
 */
router.get('/find-phones', profileByAccessToken, controller.findPhones);

module.exports = router;
