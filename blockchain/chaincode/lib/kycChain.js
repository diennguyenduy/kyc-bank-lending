'use strict';

const { Contract } = require('fabric-contract-api');

class KycChain extends Contract {
  // Customer create new asset and add into ledger
  async addAsset(ctx, asset) {
    console.info('============= START : Add asset ===========');
    await ctx.stub.putState(
      JSON.parse(asset).id.toString(),
      Buffer.from(asset)
    );
    console.info('============= END : Add asset ===========');
    return ctx.stub.getTxID();
  }

  async editAsset(ctx, assetId, newAsset) {
    console.info('============= START : editAsset ===========');

    const assetAsBytes = await ctx.stub.getState(assetId); // get the asset from chaincode state
    if (!assetAsBytes || assetAsBytes.length === 0) {
      throw new Error(`${assetId} does not exist`);
    }

    await ctx.stub.putState(assetId, Buffer.from(newAsset));
    console.info('============= END : editAsset ===========');
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

  async setStatus(ctx, formId, status) {
    console.info('============= START : Set status ===========');
    const keyAsBytes = await ctx.stub.getState(formId);
    if (!keyAsBytes || keyAsBytes.length === 0) {
      throw new Error(`Form ${formId} does not exist`);
    }
    let key = JSON.parse(keyAsBytes.toString());
    key.status = status;
    await ctx.stub.putState(id, Buffer.from(JSON.stringify(key)));
    console.info('============= END : Set status ===========');
    return ctx.stub.getTxID();
  }

  // Get asset from ledger by id
  async queryAsset(ctx, assetId) {
    console.info('============= START : Query asset ===========');
    const assetAsBytes = await ctx.stub.getState(assetId);
    if (!assetAsBytes || assetAsBytes.length === 0) {
      throw new Error(`${assetId} does not exist`);
    }
    console.log(assetAsBytes.toString());
    console.info('============= END : Query asset ===========');
    return assetAsBytes.toString();
  }

  // lấy danh sách đối tượng có thuộc tính = input
  async queryAllAssetByStatus(ctx, entity, status, statusId) {
    console.info('============= START : Query asset by status===========');

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
