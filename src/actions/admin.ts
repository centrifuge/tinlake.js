import { Constructor, Tinlake } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';

function Admin<AdminBase extends Constructor<Tinlake>>(Base: AdminBase) {
  return class extends Base {
   
    fileCeiling = async (loanId: string, ceilingAmount: string) => {
      const txHash = await executeAndRetry(this.contracts.ceiling.file, [loanId, ceilingAmount, this.ethConfig]);
      console.log(`[Ceiling file] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['ceiling'].abi, this.transactionTimeout);
    }

    initRate = async (rate: string, speed: string) => {
      const txHash = await executeAndRetry(this.contracts.pile.file, [rate, speed, this.ethConfig]);
      console.log(`[Initialising rate] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['pile'].abi, this.transactionTimeout);
    }

    setRate = async (loan: string, rate: string) => {
      const txHash = await executeAndRetry(this.contracts.pile.setRate, [loan, rate, this.ethConfig]);
      console.log(`[Setting rate] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['pile'].abi, this.transactionTimeout);
    }

    // -- TRANCHE OPERATOR SETUP --
    approveAllowance = async (user: string, maxCurrency: string, maxToken: string) => {
      // TODO: which operator?
      const txHash = await executeAndRetry(this.contracts.jOperator.approve, [user, maxCurrency, maxToken, this.ethConfig]);
      console.log(`[Approve allowance] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['jOperator'].abi, this.transactionTimeout);
    }
  };
}

export default Admin;
