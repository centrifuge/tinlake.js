import Eth from 'ethjs';
import { Contracts, ethI, ContractAddresses, ContractAbis, AbiOutput, Options } from './types';
import abiDefinitions from './abi/index';


export class Tinlake {
  public provider: any;
  public eth: ethI;
  public ethOptions: any;
  public ethConfig: any;
  public contractAddresses: ContractAddresses;
  public transactionTimeout: number;
  public contracts: Contracts;
  public contractAbis: ContractAbis;

  constructor(provider: any, contractAddresses: ContractAddresses, nftDataOutputs: AbiOutput[], transactionTimeout: number,
              { contractAbis, ethOptions, ethConfig }: Options = {}) {
    this.contractAbis = contractAbis || {
      nft: abiDefinitions.title,
      title: abiDefinitions.title,
      shelf: abiDefinitions.shelf,
      ceiling: abiDefinitions.ceiling,
      collector: abiDefinitions.collector,
      currency: abiDefinitions.currency,
      threshold: abiDefinitions.threshold,
      pricePool: abiDefinitions.pricePool,
      pile: abiDefinitions.pile,
      jOperator: abiDefinitions.operator,
      distributor: abiDefinitions.distributor,
      assessor: abiDefinitions.assessor,
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
