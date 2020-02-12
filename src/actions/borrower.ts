import { Constructor, Tinlake  } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';
import BN from 'bn.js';

// tslint:disable-next-line:function-name
function Borrower<BorrowerBase extends Constructor<Tinlake>>(Base: BorrowerBase) {
  return class extends Base {

    // -- TESTING FUNCTIONS --
    mintNFT = async (usr: string) => {
      // tslint:disable-next-line:max-line-length
      const txHash = await executeAndRetry(this.contracts.nft.issue, [usr, this.ethConfig]);
      console.log(`[Mint NFT] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['shelf'].abi, this.transactionTimeout);
    }

    getNFTCount = async (): Promise<BN> => {
      const res : { 0: BN } = await executeAndRetry(this.contracts.nft.count, []);
      return res[0];
    }

    getTitleCount = async (): Promise<BN> => {
      const res : { 0: BN } = await executeAndRetry(this.contracts.title.count, []);
      return res[0];
    }
    // -- TESTING FUNCTIONS END --

    issue = async (registry: string, tokenId: string): Promise<BN> => {
      const res : { 0: BN } = await executeAndRetry(this.contracts.shelf.issue, [registry, tokenId, this.ethConfig]);
      return res[0];
    }

    lock = async (loan: string) => {
      const txHash = await executeAndRetry(this.contracts.shelf.lock, [loan, this.ethConfig]);
      console.log(`[Collateral NFT lock] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['shelf'].abi, this.transactionTimeout);
    }

    unlock = async (loan: string) => {
      const txHash = await executeAndRetry(this.contracts.shelf.unlock, [loan, this.ethConfig]);
      console.log(`[Collateral NFT unlock] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['shelf'].abi, this.transactionTimeout);
    }

    close = async (loan: string) => {
      const txHash = await executeAndRetry(this.contracts.shelf.close, [loan, this.ethConfig]);
      console.log(`[Loan close] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['shelf'].abi, this.transactionTimeout);
    }

    borrow = async (loan: string, currencyAmount: string) => {
      const txHash = await executeAndRetry(this.contracts.shelf.borrow, [loan, currencyAmount, this.ethConfig]);
      console.log(`[Borrow] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['shelf'].abi, this.transactionTimeout);
    }

    withdraw = async (loan: string, currencyAmount: string) => {
      const txHash = await executeAndRetry(this.contracts.shelf.withdraw, [loan, currencyAmount, this.ethConfig]);
      console.log(`[Withdraw] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['shelf'].abi, this.transactionTimeout);
    }

    repay = async (loan: string, currencyAmount: string) => {
      const txHash = await executeAndRetry(this.contracts.shelf.repay, [loan, currencyAmount, this.ethConfig]);
      console.log(`[Repay] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['shelf'].abi, this.transactionTimeout);
    }

    approveCurrency = async (usr: string, currencyAmount: string) => {
      const txHash = await executeAndRetry(this.contracts.currency, [usr, currencyAmount, this.ethConfig]);
      console.log(`[Repay] txHash: ${txHash}`);
    // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['shelf'].abi, this.transactionTimeout);
    }
}
  // TODO: pile contract calls
  // TODO: pool calls
}

export default Borrower;
