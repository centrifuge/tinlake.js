import { Loan, Constructor, Tinlake } from './../types';
import BN from 'bn.js';
declare function AnalyticsActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase): {
    new (...args: any[]): {
        getTotalDebt: () => Promise<BN>;
        getTotalBalance: () => Promise<BN>;
        getPrincipal: (loanId: string) => Promise<BN>;
        getDebt: (loanID: string) => Promise<BN>;
        loanCount: () => Promise<BN>;
        getCollateral: (loanId: string) => Promise<Loan>;
        getInterestRate: (loanId: string) => Promise<BN>;
        getOwnerOfLoan: (loanId: string) => Promise<BN>;
        getLoan: (loanId: string) => Promise<Loan>;
        getLoanList: () => Promise<Loan[]>;
        provider: any;
        eth: import("../types").ethI;
        ethOptions: any;
        ethConfig: any;
        contractAddresses: import("../types").ContractAddresses;
        transactionTimeout: number;
        contracts: import("../types").Contracts;
        contractAbis: import("../types").ContractAbis;
    };
} & ActionsBase;
export declare type IAnalyticsActions = {
    getTotalDebt(): Promise<BN>;
    getTotalBalance(): Promise<BN>;
    loanCount(): Promise<BN>;
    getLoanList(): Promise<Loan[]>;
    getLoan(loanId: string): Promise<Loan>;
    getCollateral(loanId: string): Promise<any>;
    getPrincipal(loanId: string): Promise<BN>;
    getInterestRate(loanId: string): Promise<BN>;
    getOwnerOfLoan(loanId: string): Promise<BN>;
};
export default AnalyticsActions;
