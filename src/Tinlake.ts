import Eth from 'ethjs';


import { Contracts, ethI, ContractAddresses, ContractAbis, AbiOutput, Options } from "./types";

// TODO import collectively
import contractAbiNft from './abi/test/SimpleNFT.abi.json';
import contractAbiTitle from './abi/Title.abi.json';
import contractAbiCurrency from './abi/test/SimpleToken.abi.json';
import contractAbiShelf from './abi/Shelf.abi.json';
import contractAbiCollateral from './abi/Collateral.abi.json';
import contractAbiPile from './abi/Pile.abi.json';

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
      nft: contractAbiNft,
      title: contractAbiTitle,
      currency: contractAbiCurrency,
      shelf: contractAbiShelf,
      collateral: contractAbiCollateral,
      pile: contractAbiPile,
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
      nft: this.eth.contract(this.contractAbis.nft)
        .at(this.contractAddresses['NFT_COLLATERAL']),
      title: this.eth.contract(this.contractAbis.title)
        .at(this.contractAddresses['TITLE']),
      currency: this.eth.contract(this.contractAbis.currency)
        .at(this.contractAddresses['CURRENCY']),
      shelf: this.eth.contract(this.contractAbis.shelf)
        .at(this.contractAddresses['SHELF']),
      collateral: this.eth.contract(this.contractAbis.collateral)
        .at(this.contractAddresses['COLLATERAL']),
      pile: this.eth.contract(this.contractAbis.pile)
        .at(this.contractAddresses['PILE']),
      nftData: this.eth.contract(this.contractAbis.nftData)
        .at(this.contractAddresses['NFT_COLLATERAL']),
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
