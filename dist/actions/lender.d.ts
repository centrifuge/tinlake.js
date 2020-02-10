import { Constructor, Contracts } from '../types';
declare function Lender<LenderBase extends Constructor<{}>>(Base: LenderBase): {
    new (...args: any[]): {
        contracts: Contracts;
        supply: (currencyAmount: number, config: any) => Promise<unknown>;
        redeem: (tokenAmount: number) => Promise<unknown>;
        balance: () => Promise<unknown>;
    };
} & LenderBase;
export default Lender;
