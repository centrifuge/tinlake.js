import { Constructor, Tinlake } from '../types';
declare function Admin<AdminBase extends Constructor<Tinlake>>(Base: AdminBase): {
    new (...args: any[]): {
        setCeiling: (loanId: string, ceilingAmount: string) => Promise<unknown>;
        initRate: (rate: string, speed: string) => Promise<unknown>;
        setRate: (loan: string, rate: string) => Promise<unknown>;
        approveAllowance: (user: string, maxCurrency: string, maxToken: string) => Promise<unknown>;
        provider: any;
        eth: import("../types").ethI;
        ethOptions: any;
        ethConfig: any;
        contractAddresses: import("../types").ContractAddresses;
        transactionTimeout: number;
        contracts: import("../types").Contracts;
        contractAbis: import("../types").ContractAbis;
    };
} & AdminBase;
export default Admin;
