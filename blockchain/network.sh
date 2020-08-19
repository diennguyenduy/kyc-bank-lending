#!/bin/bash
if [ "$1" == "start" ]; then
    echo "***********************************"
    echo "       Generating artifacts        "
    echo "***********************************"
    ./network/scripts/generate.sh
    echo "***********************************"
    echo "       Starting network            "
    echo "***********************************"
    ./network/scripts/start.sh
    echo "***********************************"
    echo "       Installing chaincodes       "
    echo "***********************************"
    ./network/scripts/install-cc.sh
    echo "***********************************"
    echo "       Registering users           "
    echo "***********************************"
    ./network/scripts/register-users.sh
elif [ "$1" == "stop" ]; then
    ./network/scripts/stop.sh
elif [ "$1" == "upgrade" ]; then
    ./network/scripts/upgrade-cc.sh
elif [ "$1" == "install" ]; then
    cd ./chaincode
    npm install
    cd ..
    npm install
fi