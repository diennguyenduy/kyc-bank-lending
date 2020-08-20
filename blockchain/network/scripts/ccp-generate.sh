#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${ORGMSP}/$2/" \
        -e "s/\${P0PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ./connections/ccp-template.json
}


ORG=bank
ORGMSP=Bank
P0PORT=7051
CAPORT=7054
PEERPEM=./network/crypto-config/peerOrganizations/bank.example.com/tlsca/tlsca.bank.example.com-cert.pem
CAPEM=./network/crypto-config/peerOrganizations/bank.example.com/ca/ca.bank.example.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./connections/connection-bank.json

ORG=police
ORGMSP=Police
P0PORT=9051
CAPORT=9054
PEERPEM=./network/crypto-config/peerOrganizations/police.example.com/tlsca/tlsca.police.example.com-cert.pem
CAPEM=./network/crypto-config/peerOrganizations/police.example.com/ca/ca.police.example.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" > ./connections/connection-police.json
