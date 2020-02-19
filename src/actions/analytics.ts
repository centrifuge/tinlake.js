import { Loan, Constructor, Tinlake } from './../types';
import { executeAndRetry } from './../ethereum';
import BN from 'bn.js';

function AnalyticsActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase) {
  return class extends Base implements IAnalyticsActions {

    getTotalDebt = async (): Promise<BN> => {
      const res: { 0: BN } = await executeAndRetry(this.contracts['PILE'].Debt, []);
      return res['0'];
    }

    getTotalBalance = async (): Promise<BN> => {
      const res: { 0: BN } = await executeAndRetry(this.contracts['PILE'].Balance, []);
      return res['0'];
    }

    getLoan = async (loanId: string): Promise<Loan> => {
      return await executeAndRetry(this.contracts['SHELF'].shelf, [loanId]);
    }

    loanCount = async (): Promise<BN> => {
      const res = await executeAndRetry(this.contracts['TITLE'].count, []);
      return res[0];
    }
  };
}

export type IAnalyticsActions = {
}

export default AnalyticsActions;
