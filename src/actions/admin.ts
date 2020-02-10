import { Contracts, Constructor, EthConfig } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';

// tslint:disable-next-line:function-name
function Admin<AdminBase extends Constructor<{}>>(Base: AdminBase) {
  return class extends Base {
    contracts: Contracts;
    ethConfig: EthConfig;

    // -- LOAN SETUP --

    fileCeiling = async (loanId: string, ceilingAmount: string) => {
      // tslint:disable-next-line:max-line-length
      const txHash = await executeAndRetry(this.contracts.ceiling.file, [loanId, ceilingAmount, this.ethConfig]);
      console.log(`[Ceiling file] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['ceiling'].abi, this.transactionTimeout);
    }

    initRate = async (rate: string, speed: string) => {
      // tslint:disable-next-line:max-line-length
      const txHash = await executeAndRetry(this.contracts.pile.file, [rate, speed, this.ethConfig]);
      console.log(`[Initialising rate] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['pile'].abi, this.transactionTimeout);
    }

    setRate = async (loan: string, rate: string) => {
      // tslint:disable-next-line:max-line-length
      const txHash = await executeAndRetry(this.contracts.pile.setRate, [loan, rate, this.ethConfig]);
      console.log(`[Setting rate] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['pile'].abi, this.transactionTimeout);
    }

    // TODO: admitLoan

    // -- TRANCHE OPERATOR SETUP --

    approveAllowance = async (user: string, maxCurrency: string, maxToken: string) => {
      // tslint:disable-next-line:max-line-length
      // TODO: which operator?
      // tslint:disable-next-line:max-line-length
      const txHash = await executeAndRetry(this.contracts.jOperator.approve, [user, maxCurrency, maxToken, this.ethConfig]);
      console.log(`[Approve allowance] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['jOperator'].abi, this.transactionTimeout);
    }

    // -- COLLECTOR --

  };
}

export default Admin;
