import { Loan, Constructor, Tinlake } from './../types';
import { executeAndRetry } from './../ethereum';
import BN from 'bn.js';

function AnalyticsActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase) {
  return class extends Base implements IAnalyticsActions {

    getTotalDebt = async (): Promise<BN> => {
      const res: { 0: BN } = await executeAndRetry(this.contracts['PILE'].total, []);
      return res['0'];
    }

    getTotalBalance = async (): Promise<BN> => {
      const res: { 0: BN } = await executeAndRetry(this.contracts['SHELF'].balance, []);
      return res['0'];
    }

    loanCount = async (): Promise<BN> => {
      const res = await executeAndRetry(this.contracts['TITLE'].count, []);
      return res[0];
    }
  };
}

export type IAnalyticsActions = {
  getTotalDebt(): Promise<BN>,
  getTotalBalance(): Promise<BN>,
  loanCount(): Promise<BN>
}

export default AnalyticsActions;
