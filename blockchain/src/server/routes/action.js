const router = require('express').Router();
const fabricNetwork = require('../fabricNetwork');
const USER_ROLES = require('../configs/constant').USER_ROLES;
const { body, validationResult, check } = require('express-validator');
var uuidv4 = require('uuid/v4');

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
      'connection-bank.json',
      'wallet/wallet-bank',
      req.decoded.user.username
    );

    let action = {
      id: 'Action' + uuidv4(),
      imgUrl: req.body.imgUrl,
      action: req.body.action,
      time: req.body.time,
      description: req.body.description,
      formId: req.body.formId,
    };
    let tx = await contract.submitTransaction(
      'addAsset',
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

router.get('/:id', async function (req, res) {
  try {
    console.log(req);

    const contract = await fabricNetwork.connectNetwork(
      'connection-bank.json',
      'wallet/wallet-bank',
      process.env.ADMIN_BANK_USERNAME
    );
    const result = await contract.evaluateTransaction(
      'queryAsset',
      req.params.id.toString()
    );
    let response = JSON.parse(result.toString());
    res.json({ result: response });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
});

router.put('/:id', async function (req, res) {
  try {
    if (req.decoded.user.role !== USER_ROLES.CUSTOMER) {
      return res.status(403).json({
        msg: 'Permission Denied',
      });
    }
    const contract = await fabricNetwork.connectNetwork(
      'connection-bank.json',
      'wallet/wallet-bank',
      process.env.ADMIN_BANK_USERNAME
    );
    let form = {
      id: req.params.id.toString(),
      name: req.body.name,
      sowingDate: req.body.sowingDate,
      harvestDate: req.body.harvestDate,
      productId: req.body.productId,
      formUsername: req.decoded.user.username,
    };
    const result = await contract.submitTransaction(
      'editAsset',
      form.id.toString(),
      JSON.stringify(form)
    );

    res.json({
      status: 'Edit Customer successful!',
      txid: result.toString(),
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
});

router.delete('/:id', check('id').trim().escape(), async function (req, res) {
  try {
    if (req.decoded.user.role !== USER_ROLES.CUSTOMER) {
      return res.status(403).json({
        msg: 'Permission Denied',
      });
    }
    const contract = await fabricNetwork.connectNetwork(
      'connection-bank.json',
      'wallet/wallet-bank',
      process.env.ADMIN_BANK_USERNAME
    );
    const result = await contract.submitTransaction(
      'deleteAsset',
      req.params.id.toString()
    );

    res.status(200).json({
      result: result,
      msg: 'Delete successful!',
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
