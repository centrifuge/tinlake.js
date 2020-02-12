import { Account } from "./types";
import { ethI } from '../src/types';
const Eth = require('ethjs');
const SignerProvider = require('ethjs-provider-signer');
const { sign } = require('ethjs-signer');
import { waitAndReturnEvents, executeAndRetry } from '../src/ethereum';
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
  console.log("god account", usr.address);
    return new SignerProvider(rpcUrl, {
        signTransaction: (rawTx: any, cb: (arg0: null, arg1: any) => void) =>
          cb(null, sign(rawTx, usr.privateKey)),
        accounts: (cb: (arg0: null, arg1: string[]) => void) => cb(null, [usr.address])
    });
}
