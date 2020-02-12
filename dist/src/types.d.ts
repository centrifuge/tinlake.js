import BN from 'bn.js';
export declare type Constructor<T = {}> = new (...args: any[]) => T;
export interface Tinlake {
    provider: any;
    eth: ethI;
    ethOptions: any;
    ethConfig: any;
    contractAddresses: ContractAddresses;
    transactionTimeout: number;
    contracts: Contracts;
    contractAbis: ContractAbis;
}
export interface ethI {
    web3_sha3: (signature: string) => string;
    getTransactionReceipt: (arg0: any, arg1: (err: any, receipt: any) => void) => void;
    getTransactionByHash: (arg0: any, arg1: (err: any, tx: any) => void) => void;
    contract: (arg0: any) => {
        at: (arg0: any) => void;
    };
    sendRawTransaction: any;
    getTransactionCount: any;
    abi: any;
}
export interface Options {
    contractAbis?: ContractAbis;
    ethOptions?: any;
    ethConfig?: any;
}
export interface EthConfig {
    from: string;
    gasLimit: string;
}
export interface Contracts {
    title: any;
    shelf: any;
    pile: any;
    ceiling: any;
    collector: any;
    threshold: any;
    pricePool: any;
    currency: any;
    jOperator: any;
    distributor: any;
    assessor: any;
    nft: any;
    nftData: any;
}
export interface ContractAbis {
    'title': any;
    'shelf': any;
    'pile': any;
    'ceiling': any;
    'collector': any;
    'threshold': any;
    'pricePool': any;
    'currency': any;
    'jOperator': any;
    'distributor': any;
    'assessor': any;
    'nft': any;
    'nftData': any;
}
export interface ContractAddresses {
    "DEPLOYMENT_NAME": "Local Test Deployment";
    "ROOT_CONTRACT": string;
    "TINLAKE_CURRENCY": string;
    "LENDER_DEPLOYER": string;
    "LENDER_JUNIOR_OPERATOR": string;
    "LENDER_JUNIOR": string;
    "LENDER_SENIOR": string;
    "LENDER_SENIOR_OPERATOR": string;
    "LENDER_DISTRIBUTOR": string;
    "LENDER_ASSESSOR": string;
    "BORROWER_DEPLOYER": string;
    "BORROWER_TITLE": string;
    "BORROWER_PILE": string;
    "BORROWER_SHELF": string;
    "BORROWER_CEILING": string;
    "BORROWER_COLLECTOR": string;
    "BORROWER_THRESHOLD": string;
    "BORROWER_PRICE_POOL": string;
    "GOVERNANCE": string;
    "NFT_COLLATERAL": string;
}
export interface AbiOutput {
    name: string;
    type: 'address' | 'uint256';
}
export interface Events {
    txHash: string;
    status: any;
    events: {
        event: {
            name: any;
        };
        data: any[];
    }[];
}
export interface Balance {
    [x: string]: {
        toString: () => string;
    };
}
export declare type Address = string;
export interface Loan {
    registry: Address;
    tokenId: BN;
    price: BN;
    principal: BN;
    status?: string;
}
export interface BalanceDebt {
    debt: BN;
    balance: BN;
    fee: BN;
    chi: BN;
}
