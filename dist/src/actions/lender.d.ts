import { Constructor, Contracts, EthConfig } from '../types';
import BN from 'bn.js';
declare function Lender<LenderBase extends Constructor<{}>>(Base: LenderBase): {
    new (...args: any[]): {
        contracts: Contracts;
        ethConfig: EthConfig;
        supplyJunior: (currencyAmount: string) => Promise<unknown>;
        redeemJunior: (tokenAmount: string) => Promise<unknown>;
        getCurrencyBalance: (user: string) => Promise<BN>;
        balance: () => Promise<unknown>;
    };
} & LenderBase;
export default Lender;
