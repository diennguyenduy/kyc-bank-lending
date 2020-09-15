const router = require('express').Router();
var uuidv4 = require('uuid/v4');
const fabricNetwork = require('../fabricNetwork');
const USER_ROLES = require('../configs/constant').USER_ROLES;
const { body, validationResult, check } = require('express-validator');

require('dotenv').config();
router.post('/', async function (req, res) {
  try {
    // if (req.decoded.user.role !== USER_ROLES.CUSTOMER) {
    //   return res.status(403).json({
    //     msg: 'Permission Denied',
    //   });
    // }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const contract = await fabricNetwork.connectNetwork(
      'connection-bank.json',
      'wallet/wallet-bank',
      // req.decoded.user.username
      'bank-client'
    );

    // Edit by form type
    let form = {
      id: 'Form' + uuidv4(),
      // customer: req.decoded.user.username,
      customer: req.body.username,
      customerId: req.body.customerId,
      amount: req.body.amount,
    };

    let tx = await contract.submitTransaction('addAsset', JSON.stringify(form));

    res.json({
      status: 'Create form successful!',
      txid: tx.toString(),
      Form: form,
    });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
});

// router.get('/', async function (req, res) {
//   try {
//     const contract = await fabricNetwork.connectNetwork(
//       'connection-bank.json',
//       'wallet/wallet-bank',
//       process.env.ADMIN_BANK_USERNAME
//     );
//     const result = await contract.evaluateTransaction('queryAllAsset', 'Form');
//     let response = JSON.parse(result.toString());
//     res.json({ forms: response });
//   } catch (error) {
//     console.error(`Failed to evaluate transaction: ${error}`);
//     res.status(500).json({
//       error: error,
//     });
//   }
// });

router.get('/', async function (req, res) {
  try {
    const contract = await fabricNetwork.connectNetwork(
      'connection-bank.json',
      'wallet/wallet-bank',
      process.env.ADMIN_BANK_USERNAME
    );

    const result = await contract.evaluateTransaction(
      'queryAllAssetByAttribute',
      'Form',
      // req.params.attribute.toString(),
      // req.params.attributeId.toString(),
      req.body.attribute,
      req.body.attributeId
    );

    let response = JSON.parse(result.toString());
    res.json({ forms: response });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
});

router.put('/:id', async function (req, res) {
  try {
    // if (req.decoded.user.role === USER_ROLES.CUSTOMER) {
    //   return res.status(403).json({
    //     msg: 'Permission Denied',
    //   });
    // }

    const contract = await fabricNetwork.connectNetwork(
      'connection-bank.json',
      'wallet/wallet-bank',
      // req.decoded.user.username
      'bank-client'
    );

    let newForm = {
      id: req.params.id.toString(),
      // customer: req.decoded.user.username,
      customer: req.body.username,
      customerId: req.body.customerId,
      amount: req.body.amount,
    };

    const result = await contract.submitTransaction(
      'editAsset',
      newForm.id.toString(),
      JSON.stringify(newForm)
    );
    res.json({
      status: 'Set status successful!',
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
    // if (req.decoded.user.role !== USER_ROLES.CUSTOMER) {
    //   return res.status(403).json({
    //     msg: 'Permission Denied',
    //   });
    // }
    const contract = await fabricNetwork.connectNetwork(
      'connection-bank.json',
      'wallet/wallet-bank',
      // req.decoded.user.username
      'bank-client'
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
