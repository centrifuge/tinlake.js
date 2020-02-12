import { Loan, Contracts, Constructor } from './../types';
import { executeAndRetry } from './../ethereum';
import BN from 'bn.js';

// tslint:disable-next-line:function-name
function Analytics<AnalyticsBase extends Constructor<{}>>(Base: AnalyticsBase) {
  return class extends Base {

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

    // getCurrentDebt = async (loanId: string): Promise<BN> => {
    //   const res = await executeAndRetry(this.contracts.pile.burden, [loanId]);
    //   return res['0'];
    // }
  };
}

export default Analytics;

    /*
  getAllLoans = async (): Promise<Loan[]> => {
    const loanCountBn = await this.loanCount()
    const loanCount = loanCountBn && loanCountBn.toNumber() || 0;
    const loans = [];

    for (let id = 0; id < loanCount; id++) {
      const loanId = `${id}`
      const loan = await this.getLoan(loanId);
      if (!loan) {
        continue;
      }
      const balanceDebtRes = await this.getBalanceDebt(loanId);
      const balanceDebt = balanceDebtRes && balanceDebtRes.debt && new Decimal(balanceDebtRes.debt.toString());
      const principal = new Decimal(loan.principal.toString());
      const zeroDecimal = new Decimal(0)

      if (principal.greaterThan(zeroDecimal)) {
        loan['status'] = 'Whitelisted';
      } else if (principal.isZero() && balanceDebt.greaterThan(zeroDecimal)) {
        loan['status'] = 'Ongoing';
      } else if (principal.isZero() && balanceDebt.isZero()) {
        loan['status'] = 'Repaid';
      } else {
        loan['status'] = 'Other';
      }
      loans.push(loan)

  /*
  getBalanceDebt = async (loanId: string): Promise<BalanceDebt> => {
    return await executeAndRetry(this.contracts.pile.loans, [loanId]);
  }
  */