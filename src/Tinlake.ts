import Eth from 'ethjs';

import { Contracts, ethI, ContractAddresses, ContractAbis, AbiOutput, Options } from './types';

// TODO import collectively
// NFT
import contractAbiTitle from './abi/Title.abi.json';
import contractAbiCurrency from './abi/test/SimpleToken.abi.json';
import contractAbiShelf from './abi/Shelf.abi.json';
import contractAbiCeiling from './abi/Principal.abi.json';
import contractAbiCollector from './abi/Collector.abi.json';
import contractAbiThreshold from './abi/PushRegistry.abi.json';
import contractAbiPricePool from './abi/PricePool.abi.json';
import contractAbiPile from './abi/Pile.abi.json';
import contractAbiJOperator from './abi/AllowanceOperator.abi.json';
import contractAbiDistributor from './abi/DefaultDistributor.abi.json';
import contractAbiAssessor from './abi/DefaultAssessor.abi.json';

export class Tinlake {
  public provider: any;
  public eth: ethI;
  public ethOptions: any;
  public ethConfig: any;
  public contractAddresses: ContractAddresses;
  public transactionTimeout: number;
  public contracts: Contracts;
  public contractAbis: ContractAbis;

  // tslint:disable-next-line:max-line-length
  constructor(provider: any, contractAddresses: ContractAddresses, nftDataOutputs: AbiOutput[], transactionTimeout: number,
              { contractAbis, ethOptions, ethConfig }: Options = {}) {
    this.contractAbis = contractAbis || {
      nft: contractAbiTitle,
      title: contractAbiTitle,
      shelf: contractAbiShelf,
      ceiling: contractAbiCeiling,
      collector: contractAbiCollector,
      currency: contractAbiCurrency,
      threshold: contractAbiThreshold,
      pricePool: contractAbiPricePool,
      pile: contractAbiPile,
      jOperator: contractAbiJOperator,
      distributor: contractAbiDistributor,
      assessor: contractAbiAssessor,
      nftData: [{
        constant: true,
        inputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        name: 'data',
        outputs: nftDataOutputs,
        payable: false,
        stateMutability: 'view',
        type: 'function',
      }],
    };
    this.contractAddresses = contractAddresses;
    this.transactionTimeout = transactionTimeout;
    this.setProvider(provider, ethOptions);
    this.setEthConfig(ethConfig || {});
  }

  setProvider = (provider: any, ethOptions?: any) => {
    this.provider = provider;
    this.ethOptions = ethOptions || {};
    this.eth = new Eth(this.provider, this.ethOptions) as ethI;

    this.contracts = {
      // borrower
      title: this.eth.contract(this.contractAbis.title)
        .at(this.contractAddresses['BORROWER_TITLE']),
      currency: this.eth.contract(this.contractAbis.currency)
        .at(this.contractAddresses['TINLAKE_CURRENCY']),
      shelf: this.eth.contract(this.contractAbis.shelf)
        .at(this.contractAddresses['BORROWER_SHELF']),
      pile: this.eth.contract(this.contractAbis.pile)
        .at(this.contractAddresses['BORROWER_PILE']),
      ceiling: this.eth.contract(this.contractAbis.ceiling)
        .at(this.contractAddresses['BORROWER_CEILING']),
      collector: this.eth.contract(this.contractAbis.collector)
        .at(this.contractAddresses['BORROWER_COLLECTOR']),
      threshold: this.eth.contract(this.contractAbis.threshold)
        .at(this.contractAddresses['BORROWER_THRESHOLD']),
      pricePool: this.eth.contract(this.contractAbis.pricePool)
        .at(this.contractAddresses['BORROWER_PRICE_POOL']),

      nftData: this.eth.contract(this.contractAbis.nftData)
        .at(this.contractAddresses['NFT_COLLATERAL']),
      nft: this.eth.contract(this.contractAbis.nft)
        .at(this.contractAddresses['NFT_COLLATERAL']),
      // lender
      jOperator: this.eth.contract(this.contractAbis.jOperator)
        .at(this.contractAddresses['LENDER_JUNIOR_OPERATOR']),
      distributor: this.eth.contract(this.contractAbis.distributor)
        .at(this.contractAddresses['LENDER_DISTRIBUTOR']),
      assessor: this.eth.contract(this.contractAbis.assessor)
        .at(this.contractAddresses['LENDER_ASSESSOR']),
    };
  }
  setEthConfig = (ethConfig: { [key: string]: any }) => {
    this.ethConfig = ethConfig;
  }
}

export default Tinlake;

export * from './utils/baseToDisplay';
export * from './utils/bnToHex';
export * from './utils/displayToBase';
export * from './utils/feeToInterestRate';
export * from './utils/getLoanStatus';
export * from './utils/interestRateToFee';
