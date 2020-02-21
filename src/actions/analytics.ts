import {Loan, Constructor, Tinlake, ContractNames} from './../types';
import {executeAndRetry, waitAndReturnEvents} from './../ethereum';
import BN from 'bn.js';

function AnalyticsActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase) {
  return class extends Base implements IAnalyticsActions {

    getTotalDebt = async (): Promise<BN> => {
      const res: { 0: BN } = await executeAndRetry(this.contracts['PILE'].Debt, []);
      return res[0];
    }

    getTotalBalance = async (): Promise<BN> => {
      const res: { 0: BN } = await executeAndRetry(this.contracts['PILE'].Balance, []);
      return res[0];
    }

    getLoan = async (loanId: number): Promise<Loan> => {
      const res: { 0: Loan } = await executeAndRetry(this.contracts['SHELF'].shelf, [loanId]);
      return res[0];
    }

    getLoanList = async (): Promise<Loan[]> => {
      let loanArray = [];
      const count = (await this.loanCount()).toNumber() - 1;
      for (let i = 0; i <= count; i += 1) {
        const loan = await this.getLoan(i);
        loanArray.push(loan);
      }
      return loanArray;
    }

    loanCount = async () => {
      const txHash = await executeAndRetry(this.contracts['TITLE'].count, []);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['TITLE'].abi, this.transactionTimeout);
    }

  };
}

export type IAnalyticsActions = {
  getLoanList(): Promise<Loan[]>,
}

export default AnalyticsActions;
