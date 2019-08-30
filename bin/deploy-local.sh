#! /usr/bin/env bash

message() {
    echo
    echo ----------------------------------------------
    echo "$@"
    echo ----------------------------------------------
    echo
}


message Set enviroment for local node

BIN_DIR=${BIN_DIR:-$(cd "${0%/*}"&&pwd)}
NODE_DIR=$HOME/.dapp/testnet/8545
export ETH_RPC_URL=http://127.0.0.1:8545

# God Address
export ETH_FROM=0x$(sed -n '1p' $NODE_DIR/config/account)
echo "GOD Account: $ETH_FROM"
export GOD_ADDR=$ETH_FROM
export ETH_KEYSTORE=$NODE_DIR/keystore/
touch $NODE_DIR/.empty-password
export ETH_PASSWORD=$NODE_DIR/.empty-password

# Backer Address
export BACKER_ETH_FROM=0x$(sed -n '2p' $NODE_DIR/config/account)
echo "Backer Account: $ETH_FROM"
export BACKER_ETH_KEYSTORE=$NODE_DIR/keystore/
export BACKER_ETH_PASSWORD=$NODE_DIR/.empty-password
export BACKER_ADDR=$BACKER_ETH_FROM
cd bin
if [ ! -d "tinlake" ]; then
  echo "clone Tinlake and dapp update ..."
  git clone https://github.com/centrifuge/tinlake.git
  cd tinlake
  dapp update
else
  cd tinlake
fi

# Create Address file
rm -rf addresses/addresses-$(seth chain).json
touch addresses/addresses-$(seth chain).json

message Deploy ERC20 for currency and nft collateral
./bin/deploy-mocks


# Deploy Tinlake
message Deploy Tinlake with Backer
./bin/deploy-all-backer


ADDRESSES=${ADDRESSES:-$PWD/addresses/addresses-$(seth chain).json}
CURRENCY=$(cat $ADDRESSES | jq  -r '.CURRENCY')
COLLATERAL=$(cat $ADDRESSES | jq  -r '.COLLATERAL')
LENDER=$(cat $ADDRESSES | jq  -r '.LENDER')
ADMIT=$(cat $ADDRESSES | jq  -r '.ADMIT')
APPRAISER=$(cat $ADDRESSES | jq  -r '.APPRAISER')
SHELF=$(cat $ADDRESSES | jq  -r '.SHELF')


message Send Ether
DEFAULT_TEST_ADMIN=0xe467AEf2203b64760e28D727901067f4745Ea8b8
DEFAULT_TEST_ADMIN_SK=0xbf42a45ab45850cbc3f6095e608ed8704a3a7276b33c82730d5929ff4966566e

DEFAULT_TEST_BORROWER=0xF6fa8a3F3199cDd85749Ec749Fb8F9C2551F9928
DEFAULT_TEST_BORROWER_SK=0xb2e0c8e791c37df214808cdadc187f0cba0e36160f1a38b321a25c9a0cea8c11

SUPPLY_LIST=($BACKER_ETH_FROM $DEFAULT_TEST_ADMIN $DEFAULT_TEST_BORROWER $BORROWER_ETH_FROM)
for addr in "${SUPPLY_LIST[@]}"; do seth send --value $(seth --to-wei 3 eth) $addr; done


message Mint Currency
# 1000 Currency
AMOUNT=1000000000000000000000
AMOUNT=$(seth --to-uint256 $AMOUNT)
for addr in "${SUPPLY_LIST[@]}"; do seth send $CURRENCY 'mint(address,uint)' $addr $AMOUNT; done

# Mint extra for Backer
AMOUNT=100000000000000000000000000
AMOUNT=$(seth --to-uint256 $AMOUNT)
seth send $CURRENCY 'mint(address,uint)' $BACKER_ETH_FROM $AMOUNT


message Add Admin
./bin/admin rely $DEFAULT_TEST_ADMIN
seth send $APPRAISER 'rely(address)' $DEFAULT_TEST_ADMIN
seth send $ADMIT 'rely(address)' $DEFAULT_TEST_ADMIN
seth send $SHELF 'rely(address)' $DEFAULT_TEST_ADMIN

message Backer Approve
./bin/backer-approve


message CREATE ENV FILE
cd ..
cat > env-local <<EOF
# node
export ETH_RPC_URL=$ETH_RPC_URL

# default account
export ETH_FROM=$ETH_FROM
export GOD_ADDR=$GOD_ADDR
export ETH_KEYSTORE=$ETH_KEYSTORE
export ETH_PASSWORD=$ETH_PASSWORD

# backer account
export BACKER_ETH_FROM=$BACKER_ETH_FROM
export BACKER_ETH_KEYSTORE=$ETH_KEYSTORE
export BACKER_ETH_PASSWORD=$ETH_PASSWORD

# default borrow and admin
export DEFAULT_TEST_ADMIN=$DEFAULT_TEST_ADMIN
export DEFAULT_TEST_ADMIN_SK=$DEFAULT_TEST_ADMIN_SK

export DEFAULT_TEST_BORROWER=$DEFAULT_TEST_BORROWER
export DEFAULT_TEST_BORROWER_SK=$DEFAULT_TEST_BORROWER_SK

EOF

# copy deployment to tests
cp tinlake/addresses/addresses-unknown.json addresses-local.json
cp tinlake/addresses/addresses-unknown.json ../test/addresses_tinlake.json


