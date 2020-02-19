import { Constructor, Tinlake  } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';

function CollateralActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase) {
  return class extends Base implements ICollateralActions {

    async mintNFT(usr: string, registry: string) {
      const txHash = await executeAndRetry(this.contracts[registry].issue, [usr, this.ethConfig]);
      console.log(`[Mint NFT] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts[registry].abi, this.transactionTimeout);
    }
  }
}

export type ICollateralActions = {
  mintNFT(usr: string, registry: string): Promise<any>
}

export default CollateralActions;
