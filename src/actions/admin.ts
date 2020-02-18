import { Constructor, Tinlake } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';

function Admin<AdminBase extends Constructor<Tinlake>>(Base: AdminBase) {
  return class extends Base {
   
    setCeiling = async (loanId: string, ceilingAmount: string) => {
      const txHash = await executeAndRetry(this.contracts['CEILING'].file, [loanId, ceilingAmount, this.ethConfig]);
      console.log(`[Ceiling file] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['CEILING'].abi, this.transactionTimeout);
    }

    initRate = async (rate: string, speed: string) => {
      const txHash = await executeAndRetry(this.contracts['PILE'].file, [rate, speed, this.ethConfig]);
      console.log(`[Initialising rate] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['PILE'].abi, this.transactionTimeout);
    }

    setRate = async (loan: string, rate: string) => {
      const txHash = await executeAndRetry(this.contracts['PILE'].setRate, [loan, rate, this.ethConfig]);
      console.log(`[Setting rate] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['PILE'].abi, this.transactionTimeout);
    }

    // -- TRANCHE OPERATOR SETUP --
    approveAllowance = async (user: string, maxCurrency: string, maxToken: string) => {
      // TODO: which operator?
      const txHash = await executeAndRetry(this.contracts['JUNIOR_OPERATOR'].approve, [user, maxCurrency, maxToken, this.ethConfig]);
      console.log(`[Approve allowance] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['JUNIOR_OPERATOR'].abi, this.transactionTimeout);
    }
  };
}

export default Admin;
