#!/bin/bash
ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
CORE_PEER_LOCALMSPID=PoliceMSP
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/police.example.com/peers/peer0.police.example.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/police.example.com/users/Admin@police.example.com/msp
CORE_PEER_ADDRESS=peer0.police.example.com:9051
CHANNEL_NAME=mychannel
CORE_PEER_TLS_ENABLED=true
peer channel join -b mychannel.block >&log.txt
cat log.txt