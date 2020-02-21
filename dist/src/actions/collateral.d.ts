import { Constructor, Tinlake } from '../types';
import BN from 'bn.js';
declare function CollateralActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase): {
    new (...args: any[]): {
        mintNFT: (user: string) => Promise<unknown>;
        approveNFT: (tokenId: string, to: string) => Promise<unknown>;
        getNFTCount: () => Promise<BN>;
        getNFTOwner: (nftID: string) => Promise<BN>;
        provider: any;
        eth: import("../types").ethI;
        ethOptions: any;
        ethConfig: any;
        contractAddresses: import("../types").ContractAddresses;
        transactionTimeout: number;
        contracts: import("../types").Contracts;
        contractAbis: import("../types").ContractAbis;
    };
} & ActionsBase;
export declare type ICollateralActions = {
    mintNFT(usr: string): Promise<any>;
    approveNFT(tokenId: string, to: string): Promise<any>;
    getNFTCount(): Promise<BN>;
    getNFTOwner(nftID: string): Promise<BN>;
};
export default CollateralActions;
