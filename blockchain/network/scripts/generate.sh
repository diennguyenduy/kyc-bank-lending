#!/bin/bash
export IMAGE_TAG=latest
echo "Generating cryto material for peers..."
[ -d ./network/channel-artifacts ] || mkdir ./network/channel-artifacts

././bin/cryptogen generate --config=./network/crypto-config.yaml --output="./network/crypto-config"

[ -d ./network/crypto-config ] || mkdir ./network/crypto-config

echo "Generating channel artifacts and genesis block..."
././bin/configtxgen -configPath ./network -profile BankOrdererGenesis -outputBlock ./network/channel-artifacts/genesis.block
././bin/configtxgen -configPath ./network -profile BankChannel -outputCreateChannelTx ./network/channel-artifacts/channel.tx -channelID mychannel

 CURRENT_DIR=$PWD
 cd ./network/base
 cp docker-compose-base-template.yaml docker-compose-base.yaml
 OPTS="-i"
 cd $CURRENT_DIR
 cd ./network/crypto-config/peerOrganizations/bank.example.com/ca/
 PRIV_KEY=$(ls *_sk)
 cd $CURRENT_DIR
 cd ./network/base
 sed $OPTS "s/CA1_PRIVATE_KEY/${PRIV_KEY}/g" docker-compose-base.yaml

 cd $CURRENT_DIR
 cd ./network/crypto-config/peerOrganizations/police.example.com/ca/
 PRIV_KEY=$(ls *_sk)
 cd $CURRENT_DIR
 cd ./network/base
 sed $OPTS "s/CA2_PRIVATE_KEY/${PRIV_KEY}/g" docker-compose-base.yaml

 cd $CURRENT_DIR
 ./network/scripts/ccp-generate.sh
