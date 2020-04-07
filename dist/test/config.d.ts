declare const testConfig: {
    contractAddresses: any;
    nftDataContractCall: any;
    godAccount: {
        address: string;
        publicKey: string;
        privateKey: string;
    };
    transactionTimeout: number;
    gasPrice: number;
    gasLimit: number;
    rpcUrl: string;
    contractAbis: any;
    SUCCESS_STATUS: string;
    FAIL_STATUS: string;
    FAUCET_AMOUNT: string;
};
export default testConfig;
