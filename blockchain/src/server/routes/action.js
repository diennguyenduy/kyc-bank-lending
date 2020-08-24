const router = require('express').Router();
var uuidv4 = require('uuid/v4');
const fabricNetwork = require('../fabricNetwork');
const USER_ROLES = require('../configs/constant').USER_ROLES;
const { body, validationResult, check } = require('express-validator');

require('dotenv').config();
router.post('/', async function (req, res) {
  try {
    if (req.decoded.user.role !== USER_ROLES.CUSTOMER) {
      return res.status(403).json({
        msg: 'Permission Denied',
      });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const contract = await fabricNetwork.connectNetwork(
      'connection-producer.json',
      'wallet/wallet-bank',
      req.decoded.user.username
    );

    let action = {
      id: 'Action' + uuidv4(),
      imgUrl: req.body.imgUrl,
      action: req.body.action,
      time: req.body.time,
      description: req.body.description,
      seasonId: req.body.seasonId,
    };
    let tx = await contract.submitTransaction(
      'addForm',
      JSON.stringify(action)
    );

    res.json({
      status: 'Create Action successful!',
      txid: tx.toString(),
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
});
