import { ethI } from './services/ethereum';
declare const contractNames: string[];
declare type AbiOutput = {
    name: string;
    type: 'address' | 'uint256';
};
export declare type EthConfig = {
    from: string;
    gasLimit: string;
};
export declare type ContractNames = typeof contractNames[number];
export declare type Contracts = {
    [key in ContractNames]?: any;
};
export declare type ContractAbis = {
    [key in ContractNames]?: any;
};
export declare type ContractAddresses = {
    [key in ContractNames]?: string;
};
export declare type TinlakeParams = {
    provider: any;
    contractAddresses: ContractAddresses;
    nftDataOutputs: AbiOutput;
    transactionTimeout: number;
    contractAbis?: ContractAbis | {};
    ethConfig?: EthConfig | {};
    ethOptions?: any | {};
    contracts?: Contracts | {};
    contractConfig?: any | {};
};
export declare type Constructor<T = {}> = new (...args: any[]) => Tinlake;
export default class Tinlake {
    provider: any;
    eth: ethI;
    ethOptions: any;
    ethConfig: EthConfig | {};
    contractAddresses: ContractAddresses;
    transactionTimeout: number;
    contracts: Contracts;
    contractAbis: ContractAbis;
    contractConfig: any;
    constructor(params: TinlakeParams);
    setProvider: (provider: any, ethOptions?: any) => void;
    setEthConfig: (ethConfig: {} | EthConfig) => void;
    setContractAddresses: () => Promise<void>;
    createContract(address: string, abiName: string): void;
    nftLookup: (registry: string, tokenId: string) => Promise<any>;
    getOperatorType: (tranche: string) => any;
}
export {};
