import { Constructor, Tinlake, Contracts, EthConfig } from '../types';
import BN from 'bn.js';
declare function LenderActions<ActionBase extends Constructor<Tinlake>>(Base: ActionBase): {
    new (...args: any[]): {
        contracts: Contracts;
        ethConfig: EthConfig;
        supplyJunior: (currencyAmount: string) => Promise<unknown>;
        redeemJunior: (tokenAmount: string) => Promise<unknown>;
        getJuniorTokenBalance: (user: string) => Promise<BN>;
        getSeniorTokenBalance: (user: string) => Promise<BN>;
        approveJuniorToken: (usr: string, tokenAmount: string) => Promise<unknown>;
        approveSeniorToken: (usr: string, tokenAmount: string) => Promise<unknown>;
        getMaxSupplyAmount: (user: string) => Promise<BN>;
        getMaxRedeemAmount: (user: string) => Promise<any>;
        balance: () => Promise<unknown>;
        provider: any;
        eth: import("../types").ethI;
        ethOptions: any;
        contractAddresses: import("../types").ContractAddresses;
        transactionTimeout: number;
        contractAbis: import("../types").ContractAbis;
    };
} & ActionBase;
export declare type ILenderActions = {
    supplyJunior(currencyAmount: string): Promise<any>;
    redeemJunior(tokenAmount: string): Promise<any>;
    getJuniorTokenBalance(user: string): Promise<BN>;
    getSeniorTokenBalance(user: string): Promise<BN>;
    getMaxSupplyAmount(user: string): Promise<BN>;
    getMaxRedeemAmount(user: string): Promise<BN>;
    balance(): Promise<any>;
};
export default LenderActions;
