import { Contracts, Constructor, EthConfig } from '../types';
declare function Admin<AdminBase extends Constructor<{}>>(Base: AdminBase): {
    new (...args: any[]): {
        contracts: Contracts;
        ethConfig: EthConfig;
        fileCeiling: (loanId: string, ceilingAmount: string) => Promise<unknown>;
        initRate: (rate: string, speed: string) => Promise<unknown>;
        setRate: (loan: string, rate: string) => Promise<unknown>;
        approveAllowance: (user: string, maxCurrency: string, maxToken: string) => Promise<unknown>;
    };
} & AdminBase;
export default Admin;
