import { Constructor, Contracts, EthConfig } from '../types';
declare function Lender<LenderBase extends Constructor<{}>>(Base: LenderBase): {
    new (...args: any[]): {
        contracts: Contracts;
        ethConfig: EthConfig;
        supplyJunior: (currencyAmount: string) => Promise<unknown>;
        redeemJunior: (tokenAmount: string) => Promise<unknown>;
        balance: () => Promise<unknown>;
    };
} & LenderBase;
export default Lender;
