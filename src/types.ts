// TODO : use Tinlake type
import BN from 'bn.js';
export type Constructor<T = {}> = new (...args: any[]) => T;

export interface ethI {
  web3_sha3: (signature: string) => string;
  getTransactionReceipt: (arg0: any, arg1: (err: any, receipt: any) => void) => void;
  getTransactionByHash: (arg0: any, arg1: (err: any, tx: any) => void) => void;
  contract: (arg0: any) => { at: (arg0: any) => void };
  abi: any;
}

export interface Options {
  contractAbis?: ContractAbis;
  ethOptions?: any;
  ethConfig?: any;
}

export interface EthConfig {
  from: string;
  gasLimit: string;
}

export interface Contracts {
  // borrower
  title: any;
  shelf: any;
  pile: any;
  ceiling: any;
  collector: any;
  threshold: any;
  pricePool: any;
  currency: any;
  // lender
  jOperator: any;
  distributor: any;
  assessor: any;

  nft: any;
  nftData: any;
}

// TODO: create abis based on contract names
// TODO cleanup
export interface ContractAbis {
  // borrower
  'title': any;
  'shelf': any;
  'pile': any;
  'ceiling': any;
  'collector': any;
  'threshold': any;
  'pricePool': any;
  'currency': any;
  // lender
  'jOperator': any;
  'distributor': any;
  'assessor': any;

  'nft': any;
  'nftData': any;
}

// TODO: update contract address strings
export interface ContractAddresses {
  // borrower
  'BORROWER_TITLE': string;
  'BORROWER_SHELF': string;
  'PILE': string;
  'BORROWER_CEILING': string;
  'BORROWER_COLLECTOR': string;
  'BORROWER_THRESHOLD': string;
  'BORROWER_PRICE_POOL': string;
  'TINLAKE_CURRENCY': string;
  // lender
  'LENDER_JUNIOR_OPERATOR': string;
  // 'LENDER_SENIOR_OPERATOR': string;
  'LENDER_DISTRIBUTOR': string;
  'LENDER_ASSESSOR': string;

  'NFT_COLLATERAL': string;
}

export interface Events {
  txHash: string;
  status: any;
  events: { event: { name: any }, data: any[] }[];
}

export interface Balance {
  [x: string]: { toString: () => string; };
}

export type Address = string;

export interface Loan {
  registry: Address;
  tokenId: BN;
  price: BN;
  principal: BN;
  status?: string;
}

export interface BalanceDebt {
  debt: BN;
  balance: BN;
  fee: BN;
  chi: BN;
}

export interface AbiOutput {
  name: string;
  type: 'address' | 'uint256';
}
