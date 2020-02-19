import { Account } from './types';
import Tinlake, { ITinlake } from '../src/Tinlake';
import { ethI, EthConfig, ContractAbis, ContractAddresses, ContractNames } from '../src/types';
import { executeAndRetry, waitAndReturnEvents } from '../src/ethereum';
const Eth = require('ethjs');
const SignerProvider = require('ethjs-provider-signer');
const { sign } = require('ethjs-signer');

export class TestProvider {
  public eth : ethI;
  public sponsorAccount: Account;
  public ethConfig: EthConfig;
  public contractAbis: ContractAbis;
  public contractAddresses: ContractAddresses;
  public transactionTimeout: number;
  public gasLimit: number;
  // make test provider to be singleton
  private static instance: TestProvider;

  constructor(testConfig: any) {
    if (TestProvider.instance) {
      return TestProvider.instance;
    }
    TestProvider.instance = this;
    const { rpcUrl, godAccount, contractAddresses, contractAbis, gasLimit, transactionTimeout } = testConfig;
    this.eth = new Eth(createSignerProvider(rpcUrl, godAccount));
    this.ethConfig = { from: godAccount.address, gasLimit: `0x${gasLimit.toString(16)}` };
    this.transactionTimeout = transactionTimeout;
    this.contractAddresses = contractAddresses;
    this.gasLimit = gasLimit;
    this.sponsorAccount = godAccount;
    this.contractAbis = contractAbis;
  }

  async fundAccountWithETH(usr: Account, amount: string) {
    const nonce = await this.eth.getTransactionCount(this.ethConfig.from);
    const transaction = {
      from: this.ethConfig.from,
      to: usr.address,
      value: amount,
      gas: this.gasLimit,
      nonce,
    };
    const signedTransaction = sign(transaction, this.sponsorAccount.privateKey);
    await executeAndRetry(this.eth.sendRawTransaction, [signedTransaction]);
    console.log(`User Account ${usr.address} funded with ${amount} ETH`);
  }

  async fundAccountWithCurrency(usr: Account, amount: string) {
    const currencyContract: any = this.eth.contract(this.contractAbis['TINLAKE_CURRENCY']).at(this.contractAddresses['TINLAKE_CURRENCY']);
    await executeAndRetry(currencyContract.mint, [usr.address, amount, this.ethConfig]);
    console.log(`User Account ${usr.address} funded with ${amount} TINLAKE_CURRENCY`);
  }

  async relyAccount(usr: Account, contractAddress: string) {
    const rootContract : any = this.eth.contract(this.contractAbis['ROOT_CONTRACT']).at(this.contractAddresses['ROOT_CONTRACT']);
    await executeAndRetry(rootContract.relyContract, [contractAddress, usr.address, this.ethConfig]);
    console.log(`User Account ${usr.address} relied on contract ${contractAddress}`);
  }

  async mintNFT(usr: Account) {
    const nftContract : any = this.eth.contract(this.contractAbis['COLLATERAL_NFT']).at(this.contractAddresses['COLLATERAL_NFT']);
    const txHash = await executeAndRetry(nftContract.issue, [usr.address, this.ethConfig]);
    console.log(`[Mint NFT] txHash: ${txHash}`);
    return waitAndReturnEvents(this.eth, txHash, nftContract.abi, this.transactionTimeout);
  }
}

export function createTinlake(usr: Account, testConfig: any) {
  const {
        rpcUrl,
        transactionTimeout,
        gasLimit,
        contractAddresses,
        nftDataContractCall,
    } = testConfig;

  const tinlake = new Tinlake(
        createSignerProvider(rpcUrl, usr),
        contractAddresses,
        nftDataContractCall.outputs,
        transactionTimeout,
      {
        ethConfig: { from: usr.address, gasLimit: `0x${gasLimit.toString(16)}` },
      },
    );

  return tinlake;
}

function createSignerProvider(rpcUrl: string, usr: Account) {
  return new SignerProvider(rpcUrl, {
      signTransaction: (rawTx: any, cb: (arg0: null, arg1: any) => void) =>
          cb(null, sign(rawTx, usr.privateKey)),
      accounts: (cb: (arg0: null, arg1: string[]) => void) => cb(null, [usr.address]),
    });
}
