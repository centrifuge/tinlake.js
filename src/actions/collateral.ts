import { Constructor, Tinlake  } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';
import BN from 'bn.js';

function CollateralActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase) {
  return class extends Base implements ICollateralActions {

    mintNFT = async (user: string) => {
      const txHash = await executeAndRetry(this.contracts['COLLATERAL_NFT'].issue, [user, this.ethConfig]);
      console.log(`[Mint NFT] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['COLLATERAL_NFT'].abi, this.transactionTimeout);
    }

    approveNFT = async (tokenId: string, to: string) => {
      const txHash = await executeAndRetry(this.contracts["COLLATERAL_NFT"].approve, [to, tokenId, this.ethConfig])
      console.log(`[NFT Approve] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts["COLLATERAL_NFT"].abi, this.transactionTimeout);
    }

    getNFTCount = async (): Promise<BN> => {
      const res : { 0: BN } = await executeAndRetry(this.contracts['COLLATERAL_NFT'].count, []);
      return res[0];
    }

    getNFTOwner = async (tokenId: string): Promise<BN> => {
      const res : { 0: BN } = await executeAndRetry(this.contracts['COLLATERAL_NFT'].ownerOf, [tokenId]);
      return res[0];
    }

    getNFTData = async (tokenId: string): Promise<any> => {
      const res = await executeAndRetry(this.contracts['COLLATERAL_NFT'].data, [tokenId]);
      return res;
    }

  }
}

export type ICollateralActions = {
  mintNFT(usr: string): Promise<any>,
  approveNFT(tokenId: string, to: string) : Promise<any>,
  getNFTCount(): Promise<BN>,
  getNFTOwner(tokenId: string): Promise<BN>,
  getNFTData(tokenId: string): Promise<any>
}

export default CollateralActions;
