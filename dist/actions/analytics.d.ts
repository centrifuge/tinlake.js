import { Loan, Contracts } from "./../types";
import BN from 'bn.js';
declare type Constructor<T = {}> = new (...args: any[]) => T;
declare function Analytics<AnalyticsBase extends Constructor<{}>>(Base: AnalyticsBase): {
    new (...args: any[]): {
        contracts: Contracts;
        getTotalDebt: () => Promise<BN>;
        getTotalBalance: () => Promise<BN>;
        getNFTData: <T>(tokenId: string) => Promise<T>;
        getLoan: (loanId: string) => Promise<Loan>;
        loanCount: () => Promise<BN>;
        getCurrentDebt: (loanId: string) => Promise<BN>;
    };
} & AnalyticsBase;
export default Analytics;
