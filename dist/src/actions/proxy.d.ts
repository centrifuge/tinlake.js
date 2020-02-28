import { Constructor, Tinlake } from '../types';
import BN from 'bn.js';
declare function ProxyActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase): {
    new (...args: any[]): {
        approveNFT: (tokenId: string, to: string) => Promise<unknown>;
        getTokenOwner: (tokenId: string) => Promise<BN>;
        getNFTOwner: (tokenId: string) => Promise<BN>;
        transferNFT: (from: string, to: string, tokenId: string) => Promise<unknown>;
        newProxy: (owner: string) => Promise<any>;
        newTestProxy: (owner: string) => Promise<any>;
        getTestProxy: (accessTokenId: string) => Promise<any>;
        getProxy: (accessTokenId: string) => Promise<any>;
        getProxyAccessToken: () => Promise<any>;
        proxyApproveNFT: (address: string, tokenId: string) => Promise<unknown>;
        testProxy: () => Promise<void>;
        proxyTransferIssue: (tokenId: string) => Promise<BN>;
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
export declare type IProxyActions = {
    newProxy(owner: string): Promise<any>;
    getProxy(accessTokenId: string): Promise<any>;
    getProxyAccessToken(): Promise<any>;
    proxyTransferIssue(shelf: string, registry: string, token: string): Promise<any>;
};
export default ProxyActions;
