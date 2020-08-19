#!/bin/bash

echo "***********************************"
echo "       Stopping network            "
echo "***********************************"
docker-compose -f ./network/docker-compose-cli.yaml down --volumes --remove-orphans
rm -r ./network/crypto-config
rm -r ./network/channel-artifacts
# rm -r ./network/base/docker-compose-base.yaml
# rm -r ./wallet