import { Constructor, Contracts, EthConfig } from '../types';
import { executeAndRetry, waitAndReturnEvents } from '../ethereum';

// tslint:disable-next-line:function-name
function Lender<LenderBase extends Constructor<{}>>(Base: LenderBase) {
  return class extends Base {
    contracts: Contracts;
    ethConfig: EthConfig;

    supplyJunior = async (currencyAmount: string) => {
      const txHash = await executeAndRetry(this.contracts.jOperator.supply, [currencyAmount, this.ethConfig]);
      console.log(`[Supply] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['jOperator'].abi, this.transactionTimeout);
    }

    redeemJunior = async (tokenAmount: string) => {
      const txHash = await executeAndRetry(this.contracts.jOperator.redeem, [tokenAmount, this.ethConfig]);
      console.log(`[Redeem] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['jOperator'].abi, this.transactionTimeout);
    }

    balance = async () => {
      const txHash = await executeAndRetry(this.contracts.distributor.balance, [this.ethConfig]);
      console.log(`[Balance] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['distributor'].abi, this.transactionTimeout);
    }
    // TODO: assessor accrueTrancheInterest
  };
}

export default Lender;
