import { Constructor, Tinlake  } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';
import BN from 'bn.js';

// tslint:disable-next-line:function-name
function Borrower<BorrowerBase extends Constructor<Tinlake>>(Base: BorrowerBase) {
  return class extends Base {

    mintNFT = async (usr: string) => {
      const txHash = await executeAndRetry(this.contracts['NFT'].issue, [usr, this.ethConfig]);
      console.log(`[Mint NFT] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['NFT'].abi, this.transactionTimeout);
    }

    getNFTCount = async (): Promise<BN> => {
      const res : { 0: BN } = await executeAndRetry(this.contracts['NFT'].count, []);
      return res[0];
    }

    getTitleCount = async (): Promise<BN> => {
      const res : { 0: BN } = await executeAndRetry(this.contracts['TITLE'].count, []);
      return res[0];
    }

    issue = async (registry: string, tokenId: string): Promise<BN> => {
      const res : { 0: BN } = await executeAndRetry(this.contracts['SHELF'].issue, [registry, tokenId, this.ethConfig]);
      return res[0];
    }

    lock = async (loan: string) => {
      const res : { 0: BN } = await executeAndRetry(this.contracts['SHELF'].lock, [loan, this.ethConfig]);
      return res[0];
      // const txHash = await executeAndRetry(this.contracts['SHELF'].lock, [loan, this.ethConfig]);
      // console.log(`[Collateral NFT lock] txHash: ${txHash}`);
      // return waitAndReturnEvents(this.eth, txHash, this.contracts['SHELF'].abi, this.transactionTimeout);
    }

    unlock = async (loan: string) => {
      const txHash = await executeAndRetry(this.contracts['SHELF'].unlock, [loan, this.ethConfig]);
      console.log(`[Collateral NFT unlock] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['SHELF'].abi, this.transactionTimeout);
    }

    close = async (loan: string) => {
      const txHash = await executeAndRetry(this.contracts['SHELF'].close, [loan, this.ethConfig]);
      console.log(`[Loan close] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['SHELF'].abi, this.transactionTimeout);
    }

    borrow = async (loan: string, currencyAmount: string) => {
      const txHash = await executeAndRetry(this.contracts['SHELF'].borrow, [loan, currencyAmount, this.ethConfig]);
      console.log(`[Borrow] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['SHELF'].abi, this.transactionTimeout);
    }

    withdraw = async (loan: string, currencyAmount: string) => {
      const txHash = await executeAndRetry(this.contracts['SHELF'].withdraw, [loan, currencyAmount, this.ethConfig]);
      console.log(`[Withdraw] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['SHELF'].abi, this.transactionTimeout);
    }

    repay = async (loan: string, currencyAmount: string) => {
      const txHash = await executeAndRetry(this.contracts['SHELF'].repay, [loan, currencyAmount, this.ethConfig]);
      console.log(`[Repay] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['SHELF'].abi, this.transactionTimeout);
    }

    approveCurrency = async (usr: string, currencyAmount: string) => {
      const txHash = await executeAndRetry(this.contracts['CURRENCY'], [usr, currencyAmount, this.ethConfig]);
      console.log(`[Repay] txHash: ${txHash}`);
    // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['SHELF'].abi, this.transactionTimeout);
    }
  };
  // TODO: pile contract calls
  // TODO: pool calls
}

export default Borrower;
