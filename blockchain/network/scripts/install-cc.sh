#!/bin/bash

echo "Installing chaincode for bank..."
docker exec -it cli ./scripts/install-cc/install-peer.sh peer0 bank BankMSP 7051 1.0
echo "Installing chaincode for police..."
docker exec -it cli ./scripts/install-cc/install-peer.sh peer0 police PoliceMSP 9051 1.0
echo "Instanciating the chaincode..."
docker exec -it cli ./scripts/install-cc/instanciate.sh 