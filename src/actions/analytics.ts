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

    getPrincipal = async (loanId: string): Promise<BN> => {
      const res = await executeAndRetry(this.contracts['CEILING'].ceiling, [loanId]);
      return res ? res[0] : Promise.resolve(new BN(0));
    }

    getDebt = async (loanID: string): Promise<BN> => {
      const res = await executeAndRetry(this.contracts['PILE'].debt, [loanID]);
      return res ? res[0] : Promise.resolve(new BN(0));
    }

    loanCount = async (): Promise<BN> => {
      const res: { 0: BN }  = await executeAndRetry(this.contracts['TITLE'].count, []);
      return res[0];
    }

    getCollateral = async (loanId: string): Promise<any> => {
      const res = await executeAndRetry(this.contracts['SHELF'].shelf, [loanId]);
      return res;
    }

    getInterestRate = async (loanId: string): Promise<BN> => {
      const res = await executeAndRetry(this.contracts['PILE'].loanRates, [loanId]);
      return res ? res[0] : new BN(0);
    }

    getOwnerOfLoan = async (loanId: string): Promise<any> => {
      const res = await executeAndRetry(this.contracts['TITLE'].ownerOf, [loanId]);
      return res[0];
    }
   
    getLoan = async (loanId: string): Promise<Loan> => {
      const collateral = await this.getCollateral(loanId);
      const principal = (await this.getPrincipal(loanId));
      const ownerOf = await this.getOwnerOfLoan(loanId);
      const interestRate = await this.getInterestRate(loanId);
      const debt = (await this.getDebt(loanId));
      return {
       loanId: loanId,
       registry: collateral.registry,
       tokenId: collateral.tokenId,
       principal,
       interestRate,
       ownerOf,
       debt,
      };
    }

    getLoanList = async (): Promise<Loan[]> => {
      const loanArray = [];
      const count = (await this.loanCount()).toNumber();
      for (let i = 0; i < count; i++) {
        const loan = await this.getLoan(i.toString());
        loanArray.push(loan);
      }
      return loanArray;
    }
  };
}

export type IAnalyticsActions = {
  getTotalDebt(): Promise<BN>,
  getTotalBalance(): Promise<BN>,
  getDebt(loanId:string): Promise<BN>,
  loanCount(): Promise<BN>,
  getLoanList(): Promise<Loan[]>,
  getLoan(loanId: string): Promise<Loan>,
  getCollateral(loanId:string):Promise<any>,
  getPrincipal(loanId:string):Promise<BN>,
  getInterestRate(loanId:string):Promise<BN>,
  getOwnerOfLoan(loanId:string):Promise<BN>
};

export default AnalyticsActions;
