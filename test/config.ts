import contractAddresses from './addresses.json';
import nftDataContractCall from './nft_data_contract_call.json';
import abiDefinitions from '../src/abi/index';



const testConfig = {
    godAccount: {
        address: '0xF6fa8a3F3199cDd85749Ec749Fb8F9C2551F9928',
        privateKey: '0xb2e0c8e791c37df214808cdadc187f0cba0e36160f1a38b321a25c9a0cea8c11'
    },
    transactionTimeout: 36000,
    gasLimit: 7000000,
    SUCCESS_STATUS: '0x1',
    rpcUrl: 'http://127.0.0.1:8545',
    contractAddresses,
    contractAbis: abiDefinitions,
    nftDataContractCall
}

export default testConfig;