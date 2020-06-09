import { Account } from './types';
import { EthConfig, TinlakeParams } from '../Tinlake';
import { ITinlake } from '../types/tinlake';
import { ethI } from '../services/ethereum';
interface ProviderConfig extends TinlakeParams {
    rpcUrl: string;
    godAccount: Account;
    gasLimit: number;
}
export declare class TestProvider {
    eth: ethI;
    sponsorAccount: Account;
    ethConfig: EthConfig;
    transactionTimeout: number;
    gasLimit: number;
    constructor(testConfig: Partial<ProviderConfig>);
    fundAccountWithETH(usr: string, amount: string): Promise<void>;
}
export declare function createTinlake(usr: Account, testConfig: Partial<ProviderConfig>): Partial<ITinlake>;
export {};
