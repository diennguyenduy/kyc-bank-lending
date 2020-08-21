#!/bin/bash

echo "***********************************"
echo "          Enroll Admin             "
echo "***********************************"
node src/enrollAdmin.js bank
node src/enrollAdmin.js police

echo "***********************************"
echo "          Register user            "
echo "***********************************"

node src/registerUser.js

# echo "***********************************"
# echo "       Starting API server         "
# echo "***********************************"
# npm start