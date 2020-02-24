# run testnet
# dapp testnet

# remove tinlake submodule and install newest dependency
[ -d ./tinlake ] && rm -r ./tinlake
[ -d ./tinlake-proxy ] && rm -r ./tinlake-proxy
[ -d ./tinlake-actions ] && rm -r ./tinlake-actions
git submodule update --init --recursive
git submodule update --recursive --remote --merge

# superpower user for tinlake.js tests
GOD_ADDRESS=0xf6fa8a3f3199cdd85749ec749fb8f9c2551f9928

# make superpower user from tinlake.js tests to be the governance address (control over the root contract)
# be sure to use the same address in tinlake.js test config
export GOVERNANCE=$GOD_ADDRESS

# setup local config
./tinlake/bin/test/setup_local_config.sh

# src env for contract deployment
source ./tinlake/bin/util/util.sh
source ./tinlake/bin/test/local_env.sh

#create address folder
mkdir ./tinlake/deployments

# deploy contracts
./tinlake/bin/deploy.sh

# deploy nft
./tinlake/bin/test/deploy_collateral_nft.sh

# copy the addresses of deployed contracts from tinlake folder to tinlake.js test folder
touch ./test/addresses.json
cat ./tinlake/deployments/addresses_unknown.json > ./test/addresses.json

# rely superpower user on nft collateral contract
NFT_COLLATERAL_ADDRESS=$(cat ./test/addresses.json | jq '.COLLATERAL_NFT' | tr -d '"')
seth send $NFT_COLLATERAL_ADDRESS 'rely(address)' $GOD_ADDRESS

# send funds to superpower user
seth send --value 10000000000000000000000000000000000000000000000000000000 $GOD_ADDRESS

# deploy proxy registry contract
# build contracts if needed

BIN_DIR=${BIN_DIR:-$(cd "${1%/*}"&&pwd)}

cd $BIN_DIR/tinlake-proxy && dapp build --extract

export PROXY_REGISTRY=$(seth send --create ./out/ProxyRegistry.bin 'ProxyRegistry()')
message Proxy Registry Address: $PROXY_REGISTRY

DEPLOYMENT_FILE=$BIN_DIR/tinlake/deployments/addresses_$(seth chain).json

addValuesToFile $DEPLOYMENT_FILE <<EOF
{
    "PROXY_REGISTRY" :"$PROXY_REGISTRY"
}
EOF

# deploy tinlake actions

cd $BIN_DIR/tinlake-actions && dapp build --extract

export ACTIONS=$(seth send --create ./out/Actions.bin 'Actions()')
message Tinlake Actions Address: $ACTIONS

addValuesToFile $DEPLOYMENT_FILE <<EOF
{
    "ACTIONS" :"$ACTIONS"
}
EOF

