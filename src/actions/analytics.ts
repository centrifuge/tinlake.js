import { Loan, Constructor, Tinlake } from './../types';
import { executeAndRetry } from './../ethereum';
import BN from 'bn.js';

function AnalyticsActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase) {
  return class extends Base implements IAnalyticsActions {

    getTotalDebt = async (): Promise<BN> => {
      const res: { 0: BN } = await executeAndRetry(this.contracts['PILE'].total, []);
      return res[0];
    }

    getTotalBalance = async (): Promise<BN> => {
      const res: { 0: BN } = await executeAndRetry(this.contracts['SHELF'].balance, []);
      return res[0];
    }

    getPrincipal = async (loanId: number): Promise<BN> => {
      const res = await executeAndRetry(this.contracts['CEILING'].ceiling, [loanId]);
      return res ? res[0] : Promise.resolve(new BN(0));
    }

    loanCount = async (): Promise<BN> => {
      const res: { 0: BN }  = await executeAndRetry(this.contracts['TITLE'].count, []);
      return res[0];
    }

    getLoan = async (loanId: number): Promise<Loan> => {
      const res = await executeAndRetry(this.contracts['SHELF'].shelf, [loanId]);
      return res;
    }

    getInterestRate = async (loanId: number): Promise<BN> => {
      const res = await executeAndRetry(this.contracts['PILE'].loanRates, [loanId]);
      return res ? res[0] : Promise.resolve(new BN(0));
    }

    getOwnerOfLoan = async (loanId: number): Promise<BN> => {
      const res: { 0: BN }  = await executeAndRetry(this.contracts['TITLE'].ownerOf, [loanId]);
      return res[0];
    }

    assembleLoan = async (loanId: number): Promise<Loan> => {
      const res = await this.getLoan(loanId);
      const principalBN = await this.getPrincipal(loanId);
      const ownerOfBN = await this.getOwnerOfLoan(loanId);
      const interestRateBN = await this.getInterestRate(loanId);

      const loan = {
        loanId: new BN(loanId),
        registry: res.registry,
        tokenId: res.tokenId,
        principal: principalBN,
        interestRate: interestRateBN,
        ownerOf: ownerOfBN,
      };
      return loan;
    }

    getLoanList = async (): Promise<Loan[]> => {
      const loanArray = [];
      const count = (await this.loanCount()).toNumber() - 1;
      for (let i = 0; i <= count; i += 1) {
        const loan = await this.assembleLoan(i);
        loanArray.push(loan);
      }
      return loanArray;
    }
  };
}

export type IAnalyticsActions = {
  getTotalDebt(): Promise<BN>,
  getTotalBalance(): Promise<BN>,
  loanCount(): Promise<BN>
  getLoanList(): Promise<Loan[]>,
};

export default AnalyticsActions;
