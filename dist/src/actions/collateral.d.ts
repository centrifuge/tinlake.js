import { Constructor, Tinlake } from '../types';
import BN from 'bn.js';
declare function CollateralActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase): {
    new (...args: any[]): {
        mintNFT: (user: string) => Promise<any>;
        approveNFT: (tokenId: string, to: string) => Promise<unknown>;
        getNFTCount: () => Promise<BN>;
        getNFTOwner: (tokenId: string) => Promise<BN>;
        getNFTData: (tokenId: string) => Promise<any>;
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
    getNFTOwner(tokenId: string): Promise<BN>;
    getNFTData(tokenId: string): Promise<any>;
};
export default CollateralActions;
