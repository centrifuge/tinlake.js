import { Account } from "./types";
<<<<<<< HEAD
import { ethI, EthConfig, ContractAbis, ContractAddresses } from '../src/types';
=======
import { ethI } from '../src/types';
>>>>>>> upstream/naxos
const Eth = require('ethjs');
const SignerProvider = require('ethjs-provider-signer');
const { sign } = require('ethjs-signer');
import { waitAndReturnEvents, executeAndRetry } from '../src/ethereum';
<<<<<<< HEAD


export class TestProvider {
  public eth : ethI;
  public sponsorAccount: Account;
  public ethConfig: EthConfig;
  public contractAbis: ContractAbis;
  public contractAddresses: ContractAddresses;
  public transactionTimeout: number;
  public gasLimit: number;

  constructor(testConfig: any) {
    const { rpcUrl, godAccount, contractAddresses, contractAbis, gasLimit, transactionTimeout} = testConfig;
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
      nonce
    };
    const signedTransaction = sign(transaction, this.sponsorAccount.privateKey);
    const txHash = await executeAndRetry(this.eth.sendRawTransaction, [signedTransaction]);
    await waitAndReturnEvents(this.eth, txHash, this.contractAbis.currency, this.transactionTimeout);
    console.log(`User Account ${usr.address} funded with ${amount} ETH`)
  }

  async fundAccountWithCurrency(usr: Account, amount: string) {
    const currencyContract: any = this.eth.contract(this.contractAbis.currency).at(this.contractAddresses['TINLAKE_CURRENCY']);
    this.eth.contract(this.contractAbis.currency)
        .at(this.contractAddresses['TINLAKE_CURRENCY'])
    const txHash = await executeAndRetry(currencyContract.mint, [usr.address, amount, this.ethConfig]);
    await waitAndReturnEvents(this.eth, txHash, this.contractAbis.currency, this.transactionTimeout);
    console.log(`User Account ${usr.address} funded with ${amount} DAI`)
  }

  async  relyAccount(usr: Account, contract: string) {;
  }
=======
import currencyContractAbi from '../src/abi/test/SimpleToken.abi.json';

// TODO: use strict typing

let eth : ethI;
let currencyContract: any;

export function initTestUtils(testConfig: any) {
  const { rpcUrl, godAccount, contractAddresses } = testConfig;

  eth = eth || new Eth(createSignerProvider(rpcUrl, godAccount));
  const currencyAddress = testConfig.contractAddresses['TINLAKE_CURRENCY'];
  currencyContract = eth.contract(currencyContractAbi).at(contractAddresses[currencyAddress]);
}


export async function fundAccountWithETH(usr: Account, testConfig: any) {
  const { godAccount,transactionTimeout, gasLimit } = testConfig;
  const ethConfig = { from: godAccount.address, gasLimit: `0x${gasLimit.toString(16)}` };
  const txHash = await executeAndRetry(eth.send, [usr.address, 999, ethConfig]);
  console.log(`[Currency.mint] txHash: ${txHash}`);
  await waitAndReturnEvents(eth, txHash, currencyContractAbi, transactionTimeout);
  console.log("worked worked");
  // transfer from god Account to provided user Adress
}

export async function fundAccountWithCurrency(usr: Account, testConfig: any) {
  const { godAccount,transactionTimeout, gasLimit } = testConfig;
  const ethConfig = { from: godAccount.address, gasLimit: `0x${gasLimit.toString(16)}` };
  const txHash = await executeAndRetry(currencyContract.transfer, [godAccount.address, usr.address, 999, ethConfig]);
  console.log(`[Currency.mint] txHash: ${txHash}`);
  await waitAndReturnEvents(eth, txHash, currencyContractAbi, transactionTimeout);
  console.log("worked worked");
  // transfer from god Account to provided user Adress
}

export function relyAccount(usr: Account, testConfig: any) {
>>>>>>> upstream/naxos
}

export function createTinlake(usr: Account, TinlakeSetup: any, testConfig: any) {
    const {
        rpcUrl, 
        transactionTimeout,
        gasLimit,
        contractAddresses,
        nftDataContractCall
    } = testConfig;

    const tinlake = new TinlakeSetup(
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
<<<<<<< HEAD
=======
  console.log("god account", usr.address);
>>>>>>> upstream/naxos
    return new SignerProvider(rpcUrl, {
        signTransaction: (rawTx: any, cb: (arg0: null, arg1: any) => void) =>
          cb(null, sign(rawTx, usr.privateKey)),
        accounts: (cb: (arg0: null, arg1: string[]) => void) => cb(null, [usr.address])
    });
}
