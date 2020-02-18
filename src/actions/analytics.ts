import { Loan, Contracts, Constructor } from './../types';
import { executeAndRetry } from './../ethereum';
import BN from 'bn.js';

function AnalyticsActions<ActionsBase extends Constructor<{}>>(Base: ActionsBase) {
  return class extends Base implements IAnalyticsActions {

    contracts: Contracts;

    getTotalDebt = async (): Promise<BN> => {
      const res: { 0: BN } = await executeAndRetry(this.contracts.pile.Debt, []);
      return res['0'];
    }

    getTotalBalance = async (): Promise<BN> => {
      const res: { 0: BN } = await executeAndRetry(this.contracts.pile.Balance, []);
      return res['0'];
    }

    getNFTData: <T>(tokenId: string) => Promise<T> = async (tokenId) => {
      const res = await executeAndRetry(this.contracts.nftData.data, [tokenId]);
      return res;
    }

    getLoan = async (loanId: string): Promise<Loan> => {
      return await executeAndRetry(this.contracts.shelf.shelf, [loanId]);
    }

    loanCount = async (): Promise<BN> => {
      const res = await executeAndRetry(this.contracts.title.count, []);
      return res[0];
    }
  };
}

export type IAnalyticsActions = {
}

export default AnalyticsActions;
