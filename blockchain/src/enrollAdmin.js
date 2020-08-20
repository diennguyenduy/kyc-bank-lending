/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const User = require('./server/model/User');
const USER_ROLES = require('./server/configs/constant').USER_ROLES;
// const mongoose = require('mongoose');
require('dotenv').config();

// Connect database
// mongoose.connect(
//   process.env.MONGODB_URI,
//   { useUnifiedTopology: true, useNewUrlParser: true },
//   (error) => {
//     if (error) console.log(error);
//   }
// );
// mongoose.set('useCreateIndex', true);

async function main() {
  try {
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
    const ca = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName
    );

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), `wallet/wallet-${org}`);
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the admin user.
    const adminExists = await wallet.exists('admin');
    if (adminExists) {
      console.log(
        'An identity for the admin user "admin" already exists in the wallet'
      );
      return;
    }

    let user;

    if (org === 'bank') {
      user = new User({
        username: process.env.ADMIN_BANK_USERNAME,
        password: process.env.ADMIN_BANK_PASSWORD,
        role: USER_ROLES.ADMIN_BANK,
      });
    } else if (org === 'police') {
      user = new User({
        username: process.env.ADMIN_POLICE_USERNAME,
        password: process.env.ADMIN_POLICE_PASSWORD,
        role: USER_ROLES.ADMIN_POLICE,
      });
    }

    let userSaved = await user.save();
    if (userSaved) {
      // Enroll the admin user, and import the new identity into the wallet.
      const upper = org.replace(/^\w/, (c) => c.toUpperCase());
      const enrollment = await ca.enroll({
        enrollmentID: 'admin',
        enrollmentSecret: 'adminpw',
      });
      const identity = X509WalletMixin.createIdentity(
        `${upper}MSP`,
        enrollment.certificate,
        enrollment.key.toBytes()
      );
      await wallet.import(user.username, identity);
      console.log(
        `Successfully enrolled admin user ${user.username} and imported it into the wallet`
      );
    }
    process.exit();
  } catch (error) {
    console.error(`Failed to enroll admin user "admin": ${error}`);
    process.exit(1);
  }
}

main();
