import { Constructor, Tinlake, Contracts, EthConfig } from '../types';
import { executeAndRetry, waitAndReturnEvents } from '../ethereum';
import BN from 'bn.js';

function LenderActions<ActionBase extends Constructor<Tinlake>>(Base: ActionBase) {
  return class extends Base implements ILenderActions {
    contracts: Contracts;
    ethConfig: EthConfig;

    supplyJunior = async (currencyAmount: string) => {
      const txHash = await executeAndRetry(this.contracts['JUNIOR_OPERATOR'].supply, [currencyAmount, this.ethConfig]);
      console.log(`[Supply] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['JUNIOR_OPERATOR'].abi, this.transactionTimeout);
    }

    redeemJunior = async (tokenAmount: string) => {
      const txHash = await executeAndRetry(this.contracts['JUNIOR_OPERATOR'].redeem, [tokenAmount, this.ethConfig]);
      console.log(`[Redeem] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['JUNIOR_OPERATOR'].abi, this.transactionTimeout);
    }

    getJuniorTokenBalance = async (user: string) => {
      const res : { 0: BN } = await executeAndRetry(this.contracts['JUNIOR_TOKEN'].balanceOf, [user]);
      return res[0];
    }

    getSeniorTokenBalance = async (user: string) => {
      const res : { 0: BN } = await executeAndRetry(this.contracts['SENIOR_TOKEN'].balanceOf, [user]);
      return res[0];
    }

    approveJuniorToken = async (usr: string, tokenAmount: string) => {
      const txHash = await executeAndRetry(this.contracts['JUNIOR_TOKEN'].approve, [usr, tokenAmount, this.ethConfig])
      console.log(`[Currency.approve] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['JUNIOR_TOKEN'].abi, this.transactionTimeout);
    }

    approveSeniorToken = async (usr: string, tokenAmount: string) => {
      const txHash = await executeAndRetry(this.contracts['SENIOR_TOKEN'].approve, [usr, tokenAmount, this.ethConfig])
      console.log(`[Currency.approve] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['SENIOR_TOKEN'].abi, this.transactionTimeout);
    }

    getMaxSupplyAmount = async (user: string) => {
      const res : { 0: BN } =  await executeAndRetry(this.contracts["JUNIOR_OPERATOR"].maxCurrency, [user]);
      return res[0];
    }

    getMaxRedeemAmount = async (user: string) => {
      const res  =  await executeAndRetry(this.contracts["JUNIOR_OPERATOR"].maxToken, [user]);
      return res[0];
    }

    balance = async () => {
      const txHash = await executeAndRetry(this.contracts['DISTRIBUTOR'].balance, [this.ethConfig]);
      console.log(`[Balance] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['DISTRIBUTOR'].abi, this.transactionTimeout);
    }
  };
}

export type ILenderActions = {
  supplyJunior(currencyAmount: string): Promise<any>,
  redeemJunior(tokenAmount: string): Promise<any>,
  getCurrencyBalance(user: string): Promise<BN>,
  getJuniorTokenBalance(user: string): Promise<BN>,
  getSeniorTokenBalance(user: string): Promise<BN>,
  getMaxSupplyAmount(user: string): Promise<BN>,
  getMaxRedeemAmount(user: string): Promise<BN>,
  balance(): Promise<any>,
}

export default LenderActions;
