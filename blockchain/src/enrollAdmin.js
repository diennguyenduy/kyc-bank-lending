/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');
// const User = require('./server/model/User');
const USER_ROLES = require('./server/configs/constant').USER_ROLES;
// const mongoose = require('mongoose');
require('dotenv').config();

// Connect database
// mongoose.connect(
//   'mongodb://127.0.0.1:27017',
//   { useUnifiedTopology: true, useNewUrlParser: true },
//   (error) => {
//     if (error) console.log(error);
//   }
// );
// mongoose.set('useCreateIndex', true);

var Fabric_Client = require('fabric-client');
var util = require('util');
var os = require('os');

var fabric_client = new Fabric_Client();
var fabric_ca_client = null;
var admin_user = null;

async function main() {
  const args = process.argv.slice(2);
  const org = args[0];
  var store_path = path.join(process.cwd(), `wallet/wallet-${org}`);
  console.log(' Store path:' + store_path);

  // create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
  Fabric_Client.newDefaultKeyValueStore({ path: store_path })
    .then((state_store) => {
      // assign the store to the fabric client
      fabric_client.setStateStore(state_store);
      var crypto_suite = Fabric_Client.newCryptoSuite();
      // use the same location for the state store (where the users' certificate are kept)
      // and the crypto store (where the users' keys are kept)
      var crypto_store = Fabric_Client.newCryptoKeyStore({ path: store_path });
      crypto_suite.setCryptoKeyStore(crypto_store);
      fabric_client.setCryptoSuite(crypto_suite);

      const args = process.argv.slice(2);
      const org = args[0];
      const ccpPath = path.resolve(
        __dirname,
        '..',
        'connections',
        `connection-${org}.json`
      );

      const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
      const ccp = JSON.parse(ccpJSON);

      // Create a new CA client for interacting with the CA.
      const caInfo = ccp.certificateAuthorities[`ca.${org}.example.com`];
      const caTLSCACerts = caInfo.tlsCACerts.pem;

      fabric_ca_client = new FabricCAServices(
        caInfo.url,
        { trustedRoots: caTLSCACerts, verify: false },
        caInfo.caName
      );
      // be sure to change the http to https when the CA is running TLS enabled
      // fabric_ca_client = new Fabric_CA_Client('http://localhost:7054', tlsOptions , 'ca.example.com', crypto_suite);

      // first check to see if the admin is already enrolled
      return fabric_client.getUserContext('admin', true);
    })
    .then((user_from_store) => {
      if (user_from_store && user_from_store.isEnrolled()) {
        console.log('Successfully loaded admin from persistence');
        admin_user = user_from_store;
        return null;
      } else {
        // need to enroll it with CA server
        return fabric_ca_client
          .enroll({
            enrollmentID: 'admin',
            enrollmentSecret: 'adminpw',
          })
          .then((enrollment) => {
            console.log('Successfully enrolled admin user "admin"');
            const upper = org.replace(/^\w/, (c) => c.toUpperCase());
            return fabric_client.createUser({
              username: `${org}-admin`,
              mspid: `${upper}MSP`,
              cryptoContent: {
                privateKeyPEM: enrollment.key.toBytes(),
                signedCertPEM: enrollment.certificate,
              },
            });
          })
          .then((user) => {
            admin_user = user;
            return fabric_client.setUserContext(admin_user);
          })
          .catch((err) => {
            console.error(
              'Failed to enroll and persist admin. Error: ' + err.stack
                ? err.stack
                : err
            );
            throw new Error('Failed to enroll admin');
          });
      }
    })
    .then(() => {
      console.log(
        'Assigned the admin user to the fabric client ::' +
          admin_user.toString()
      );
    })
    .catch((err) => {
      console.error('Failed to enroll admin: ' + err);
    });
}

main();
