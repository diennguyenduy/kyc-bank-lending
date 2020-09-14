const router = require('express').Router();
const fabricNetwork = require('../fabricNetwork');

require('dotenv').config();
router.get('/customer/:id', async function (req, res) {
  try {
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
router.get('/form/:id', async function (req, res) {
  try {
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

router.get('/actions/:formId', async function (req, res) {
  try {
    const contract = await fabricNetwork.connectNetwork(
      'connection-bank.json',
      'wallet/wallet-bank',
      process.env.ADMIN_BANK_USERNAME
    );
    const result = await contract.evaluateTransaction(
      'queryAllAssetByStatus',
      'Action',
      'formId',
      req.params.formId
    );
    let response = JSON.parse(result.toString());
    res.json({ actions: response ? response : [] });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
});

router.get('/customer-detail/:username', async function (req, res) {
  try {
    const contract = await fabricNetwork.connectNetwork(
      'connection-bank.json',
      'wallet/wallet-bank',
      process.env.ADMIN_BANK_USERNAME
    );
    const result = await contract.evaluateTransaction(
      'queryAllAssetByStatus',
      'Customer',
      'username',
      req.params.username.toString()
    );
    let response = JSON.parse(result.toString());

    res.json({ customer: response });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
});

router.get('/certificate/:username', async function (req, res) {
  try {
    const contract = await fabricNetwork.connectNetwork(
      'connection-bank.json',
      'wallet/wallet-bank',
      process.env.ADMIN_BANK_USERNAME
    );
    const result = await contract.evaluateTransaction(
      'queryAllAssetByStatus',
      'Certificate',
      'customer',
      req.params.username.toString()
    );
    let response = JSON.parse(result.toString());

    res.json({ certificate: response });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
