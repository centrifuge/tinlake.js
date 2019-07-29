#!/usr/bin/env bash
TESTNET_PORT=${TESTNET_PORT:-8545}
TESTNET_HOST=${TESTNET_HOST:-localhost}
TESTNET_URL="http://$TESTNET_HOST:$TESTNET_PORT"
ETH_KEYSTORE_PATH="$HOME/.dapp/testnet/$TESTNET_PORT/keystore"

export ETH_PASSWORD="/dev/nul"
export ETH_KEYSTORE="$HOME/.dapp/testnet/$TESTNET_PORT/keystore"
export ETH_RPC_URL="${ETH_RPC_URL:-$TESTNET_URL}"
export ETH_GAS=7000000
export ETH_FROM="${ETH_FROM:-$(seth ls | head -n1 | awk '{print $1}')}"
export GOD=$ETH_FROM

./tinlake/bin/deploy-all-mocked
cp tinlake/out/addresses-unknown.json ../test/addresses_tinlake.json
