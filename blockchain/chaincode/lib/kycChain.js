/*
Function list:
- Customer:
  + Submit form
  + Destroy form -> set status & delete
- Bank:
  + Get all waiting form -> query all form by attribute (eg. 'waiting')
  + Submit form to Police -> query by id and send that form
  + Get all responsed form -> query all form by attribute (eg. 'responsed')
  + Aprove form & send money -> putState
  + Reject form -> putState & deleteState
- Police
  + Get all form -> query all by status (eg. waiting for response')
  + Send infomation to Bank -> editState
*/

'use strict';

const { Contract } = require('fabric-contract-api');

class KycChain extends Contract {
  // Customer create new form and add into ledger
  async addForm(ctx, form) {
    console.info('============= START : Add form ===========');
    await ctx.stub.putState(JSON.parse(form).id.toString(), Buffer.from(form));
    console.info('============= END : Add form ===========');
    return ctx.stub.getTxID();
  }

  async deleteAsset(ctx, assetId) {
    // Delete the key from the state in ledger
    console.info('============= START : deleteAsset ===========');

    const assetAsBytes = await ctx.stub.getState(assetId); // get the asset from chaincode state
    if (!assetAsBytes || assetAsBytes.length === 0) {
      throw new Error(`${assetId} does not exist`);
    }
    try {
      await ctx.stub.deleteState(assetId);
      console.log(`Delete asset ${assetId} successful`);
    } catch (e) {
      console.log(e);

      throw new Error(`delete error`, e);
    }
    console.info('============= END : deleteAsset ===========');
  }

  async setStatus(ctx, id, status) {
    console.info('============= START : Set status ===========');
    const keyAsBytes = await ctx.stub.getState(id);
    if (!keyAsBytes || keyAsBytes.length === 0) {
      throw new Error(`${id} does not exist`);
    }
    let key = JSON.parse(keyAsBytes.toString());
    key.status = status;
    await ctx.stub.putState(id, Buffer.from(JSON.stringify(key)));
    console.info('============= END : Set status ===========');
    return ctx.stub.getTxID();
  }

  async deleteForm(ctx, assetId) {
    // Delete the key from the state in ledger
    console.info('============= START : deleteAsset ===========');

    const assetAsBytes = await ctx.stub.getState(assetId); // get the asset from chaincode state
    if (!assetAsBytes || assetAsBytes.length === 0) {
      throw new Error(`${assetId} does not exist`);
    }
    try {
      await ctx.stub.deleteState(assetId);
      console.log(`Delete asset ${assetId} successful`);
    } catch (e) {
      console.log(e);

      throw new Error(`delete error`, e);
    }
    console.info('============= END : deleteAsset ===========');
  }

  // Get form from ledger by id
  async queryForm(ctx, formId) {
    console.info('============= START : Query form ===========');
    const assetAsBytes = await ctx.stub.getState(formId);
    if (!assetAsBytes || assetAsBytes.length === 0) {
      throw new Error(`${formId} does not exist`);
    }
    console.log(assetAsBytes.toString());
    console.info('============= END : Query asset ===========');
    return assetAsBytes.toString();
  }

  // lấy danh sách đối tượng có thuộc tính = input
  async queryAllFormByStatus(ctx, entity, status, statusId) {
    console.info('============= START : Query form by status===========');

    const startKey = '';
    const endKey = 'zzzzzzzz';

    const iterator = await ctx.stub.getStateByRange(
      entity + startKey,
      entity + endKey
    );

    const allResults = [];
    while (true) {
      const res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        console.log(res.value.value.toString('utf8'));
        let Record;
        try {
          Record = JSON.parse(res.value.value.toString('utf8'));
          console.log(Record);
        } catch (err) {
          console.log(err);
          Record = res.value.value.toString('utf8');
        }
        console.log('Record' + Record);

        console.log(Record[attribute]);

        if (Record[status] == statusId) allResults.push(Record);
      }
      if (res.done) {
        console.log('end of data');
        await iterator.close();
        console.info(allResults);
        return allResults;
      }
    }
  }

  async getHistory(ctx, id) {
    console.info('============= START : Query History ===========');
    let iterator = await ctx.stub.getHistoryForKey(id);
    let result = [];
    let res = await iterator.next();
    while (!res.done) {
      if (res.value) {
        console.info(
          `found state update with value: ${res.value.value.toString('utf8')}`
        );
        const value = JSON.parse(res.value.value.toString('utf8'));
        const key = JSON.parse(res.value.key.toString('utf8'));

        result.push({ key, value });
      }
      res = await iterator.next();
    }
    await iterator.close();
    console.info('============= END : Query History ===========');
    return result;
  }
}

module.exports = KycChain;
