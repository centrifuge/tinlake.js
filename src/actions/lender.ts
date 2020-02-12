import { Constructor, Contracts, EthConfig } from '../types';
import { executeAndRetry, waitAndReturnEvents } from '../ethereum';

// tslint:disable-next-line:function-name
function Lender<LenderBase extends Constructor<{}>>(Base: LenderBase) {
  return class extends Base {
    contracts: Contracts;
    ethConfig: EthConfig;

    // TODO: dynamic address in process.env
    // lenderEthFrom = '0xF6fa8a3F3199cDd85749Ec749Fb8F9C2551F9928';
    // gasLimit = 1000000;
    // ethConfig = { from: this.lenderEthFrom, gasLimit: `0x${this.gasLimit.toString(16)}` }

    supply = async (currencyAmount: string) => {
      const txHash = await executeAndRetry(this.contracts.operator.supply, [currencyAmount, this.ethConfig]);
      console.log(`[Supply] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['operator'].abi, this.transactionTimeout);
    }

    redeem = async (tokenAmount: string) => {
      const txHash = await executeAndRetry(this.contracts.operator.redeem, [tokenAmount, this.ethConfig]);
      console.log(`[Redeem] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['operator'].abi, this.transactionTimeout);
    }

    balance = async () => {
      const txHash = await executeAndRetry(this.contracts.distributor.balance, []);
      console.log(`[Balance] txHash: ${txHash}`);
      // tslint:disable-next-line:max-line-length
      return waitAndReturnEvents(this.eth, txHash, this.contracts['distributor'].abi, this.transactionTimeout);
    }
    // TODO: assessor accrueTrancheInterest
  };
}

export default Lender;
