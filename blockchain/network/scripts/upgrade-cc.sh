#!/bin/bash
echo $1
echo "Installing chaincode for bank..."
docker exec -it cli ./scripts/install-cc/install-bank.sh $1
echo "Installing chaincode for police..."
docker exec -it cli ./scripts/install-cc/install-police.sh $1
echo "Instanciating the chaincode..."
docker exec -it cli ./scripts/install-cc/upgrade.sh $1