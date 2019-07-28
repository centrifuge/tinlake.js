import BN from 'bn.js';
export declare type LoanStatus = 'Whitelisted' | 'Ongoing' | 'Repaid';
export default function getLoanStatus(principal: BN, debt: BN): LoanStatus;
