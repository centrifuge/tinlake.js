import { Constructor, Tinlake } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';

function AdminActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase) {
  return class extends Base implements IAdminActions {
   
    // ------------ admin functions borrower-site -------------
    setCeiling = async (loanId: string, amount: string) => {
      const txHash = await executeAndRetry(this.contracts['CEILING'].file, [loanId, amount, this.ethConfig]);
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

    // ------------ admin functions lender-site -------------
    approveAllowance = async (user: string, maxCurrency: string, maxToken: string) => {
      console.log("details", user, maxCurrency, maxToken );
      console.log("config", this.ethConfig );
      const txHash = await executeAndRetry(this.contracts['JUNIOR_OPERATOR'].approve, [user, maxCurrency, maxToken, this.ethConfig]);
      console.log(`[Approve allowance] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['JUNIOR_OPERATOR'].abi, this.transactionTimeout);
    }
  };
}

export type IAdminActions = {
  setCeiling(loanId: string, amount: string): Promise<any>,
  initRate(rate: string, speed: string): Promise<any>,
  setRate(loan: string, rate: string): Promise<any>,
  approveAllowance(user: string, maxCurrency: string, maxToken: string): Promise<any>
}

export default AdminActions;
