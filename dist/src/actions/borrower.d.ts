import { Constructor, Tinlake } from '../types';
import BN from 'bn.js';
declare function Borrower<BorrowerBase extends Constructor<Tinlake>>(Base: BorrowerBase): {
    new (...args: any[]): {
        mintNFT: (user: string) => Promise<unknown>;
        getNFTCount: () => Promise<BN>;
        getTitleCount: () => Promise<BN>;
        getNFTOwner: (nftID: string) => Promise<BN>;
        getTitleOwner: (loanID: string) => Promise<BN>;
        getCurrencyBalance: (user: string) => Promise<BN>;
        issue: (registry: string, tokenId: string) => Promise<BN>;
        lock: (loan: string) => Promise<unknown>;
        unlock: (loan: string) => Promise<unknown>;
        close: (loan: string) => Promise<unknown>;
        borrow: (loan: string, currencyAmount: string) => Promise<unknown>;
        withdraw: (loan: string, currencyAmount: string) => Promise<unknown>;
        repay: (loan: string, currencyAmount: string) => Promise<unknown>;
        approveCurrency: (usr: string, currencyAmount: string) => Promise<unknown>;
        provider: any;
        eth: import("../types").ethI;
        ethOptions: any;
        ethConfig: any;
        contractAddresses: import("../types").ContractAddresses;
        transactionTimeout: number;
        contracts: import("../types").Contracts;
        contractAbis: import("../types").ContractAbis;
    };
} & BorrowerBase;
export default Borrower;
