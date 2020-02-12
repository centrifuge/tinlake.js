import { Constructor, Contracts, EthConfig } from '../types';
declare function Lender<LenderBase extends Constructor<{}>>(Base: LenderBase): {
    new (...args: any[]): {
        contracts: Contracts;
        ethConfig: EthConfig;
        supply: (currencyAmount: string) => Promise<unknown>;
        redeem: (tokenAmount: string) => Promise<unknown>;
        balance: () => Promise<unknown>;
    };
} & LenderBase;
export default Lender;
