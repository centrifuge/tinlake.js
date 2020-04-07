 import { TinlakeActions } from '../actions';
import BN from 'bn.js';

export type Loan = {
  loanId: string;
  registry: string;
  tokenId: BN;
  ownerOf: BN;
  principal: BN;
  interestRate: BN;
  debt: BN;
  threshold?: BN;
  price?: BN;
  status?: string;
  nft?: NFT;
  proxyOwner?: string;
};

export type Tranche = {
  availableFunds: BN;
  tokenPrice: BN;
  type: string;
  token: string;
};
export type NFT = {
  tokenId: BN;
  nftOwner: string;
  nftData: any;
};
export type Investor = {
  maxSupplyJunior: BN;
  maxSupplySenior?: BN;
  maxRedeemJunior: BN;
  maxRedeemSenior?: BN;
  tokenBalanceJunior: BN;
  tokenBalanceSenior?: BN;
  address: string;
};

export type ITinlake = TinlakeActions & {
  setProvider(provider: any, ethOptions?: any): void;
  setEthConfig(ethConfig: {
    [key: string]: any;
  }): void;
};
