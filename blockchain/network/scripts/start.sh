#!/bin/bash
export IMAGE_TAG=latest

echo "Creating containers... "
docker-compose -f ./network/docker-compose-cli.yaml up -d
echo
echo "Containers started"
echo
docker ps

docker exec -it cli ./scripts/channel/createChannel.sh

echo "Joining Bank to channel..."
docker exec -it cli ./scripts/channel/join-peer.sh peer0 bank BankMSP 7051 1.0
echo "Joining Police to channel..."
docker exec -it cli ./scripts/channel/join-peer.sh peer0 police PoliceMSP 9051 1.0
