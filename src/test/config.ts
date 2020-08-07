import contractAddresses from './addresses.json';
import abiDefinitions from '../abi/';
import { Account } from './types';
import { ContractAddresses, ContractAbis } from '../Tinlake';
import dotenv from 'dotenv';

dotenv.config();

const GWEI = 10e9;

const testConfig : ProviderConfig = {
  contractAddresses: process.env.CONTRACTS && JSON.parse(process.env.CONTRACTS) || contractAddresses,
  godAccount: {
    address: process.env.GOD_ADDRESS || '0xf6fa8a3f3199cdd85749ec749fb8f9c2551f9928',
    publicKey: process.env.GOD_PUB_KEY || '',
    privateKey: process.env.GOD_PRIV_KEY || '0xb2e0c8e791c37df214808cdadc187f0cba0e36160f1a38b321a25c9a0cea8c11',
  },
  transactionTimeout: 50000,
  gasPrice: `${10 * GWEI}`,
  gas: '4712388',
  rpcUrl: process.env.RPC_URL || 'http://127.0.0.1:8545',
  contractAbis: abiDefinitions,
  SUCCESS_STATUS: '0x1',
  FAIL_STATUS: '0x0',
  FAUCET_AMOUNT: '100000000000000000',
};

console.log({ testConfig1: testConfig });

export type ProviderConfig = {
  rpcUrl: string;
  godAccount: Account;
  gas: string;
  gasPrice: string;
  transactionTimeout: number;
  contractAddresses: ContractAddresses;
  contractAbis: ContractAbis;
  SUCCESS_STATUS: '0x1';
  FAIL_STATUS: '0x0';
  FAUCET_AMOUNT: string;
};

export default testConfig;
