import { Contracts, Constructor, EthConfig } from '../types';
import BN from 'bn.js';
declare function Borrower<BorrowerBase extends Constructor<{}>>(Base: BorrowerBase): {
    new (...args: any[]): {
        contracts: Contracts;
        ethConfig: EthConfig;
        mintNFT: (usr: string) => Promise<unknown>;
        getNFTCount: () => Promise<BN>;
        getTitleCount: () => Promise<BN>;
        issue: (registry: string, tokenId: string) => Promise<BN>;
        lock: (loan: string) => Promise<unknown>;
        unlock: (loan: string) => Promise<unknown>;
        close: (loan: string) => Promise<unknown>;
        borrow: (loan: string, currencyAmount: string) => Promise<unknown>;
        withdraw: (loan: string, currencyAmount: string) => Promise<unknown>;
        repay: (loan: string, currencyAmount: string) => Promise<unknown>;
        approveCurrency: (usr: string, currencyAmount: string) => Promise<unknown>;
    };
} & BorrowerBase;
export default Borrower;
