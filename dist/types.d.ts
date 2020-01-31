export declare type Constructor<T = {}> = new (...args: any[]) => T;
export interface ethI {
    web3_sha3: (signature: string) => string;
    getTransactionReceipt: (arg0: any, arg1: (err: any, receipt: any) => void) => void;
    getTransactionByHash: (arg0: any, arg1: (err: any, tx: any) => void) => void;
    contract: (arg0: any) => {
        at: (arg0: any) => void;
    };
    abi: any;
}
export interface ContractAddresses {
    'NFT_COLLATERAL': string;
    'TITLE': string;
    'CURRENCY': string;
    'SHELF': string;
    'COLLATERAL': string;
    'PILE': string;
}
export interface Options {
    contractAbis?: ContractAbis;
    ethOptions?: any;
    ethConfig?: any;
}
export interface Contracts {
    title: any;
    nft: any;
    currency: any;
    shelf: any;
    collateral: any;
    pile: any;
    nftData: any;
}
export interface ContractAbis {
    'nft': any;
    'title': any;
    'currency': any;
    'shelf': any;
    'collateral': any;
    'pile': any;
    'nftData': any;
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
export interface AbiOutput {
    name: string;
    type: 'uint265' | 'address';
}
