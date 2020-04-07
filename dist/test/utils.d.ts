import { Account } from './types';
import { ethI, EthConfig } from '../src/types';
export declare class TestProvider {
    eth: ethI;
    sponsorAccount: Account;
    ethConfig: EthConfig;
    transactionTimeout: number;
    gasLimit: number;
    constructor(testConfig: any);
    fundAccountWithETH(usr: string, amount: string): Promise<void>;
}
export declare function createTinlake(usr: Account, testConfig: any): any;
