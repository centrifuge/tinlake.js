import { Constructor, Tinlake } from '../types';
import BN from 'bn.js';
declare function ProxyActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase): {
    new (...args: any[]): {
        getAccessTokenOwner: (tokenId: string) => Promise<BN>;
        getNFTOwner: (tokenId: string) => Promise<BN>;
        transferNFT: (from: string, to: string, tokenId: string) => Promise<unknown>;
        buildProxy: (owner: string) => Promise<any>;
        getProxy: (accessTokenId: string) => Promise<any>;
        getProxyAccessToken: (proxyAddr: string) => Promise<any>;
        proxyCreateNew: (borrowerAddr: string) => Promise<any>;
        proxyTransferIssue: (proxyAddr: string, tokenId: string) => Promise<unknown>;
        proxyLockBorrowWithdraw: (proxyAddr: string, loanId: string, amount: string, usr: string) => Promise<unknown>;
        proxyRepayUnlockClose: (proxyAddr: string, tokenId: string, loanId: string, amount: string) => Promise<unknown>;
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
    buildProxy(owner: string): Promise<any>;
    getProxy(accessTokenId: string): Promise<any>;
    getProxyAccessToken(proxyAddr: string): Promise<any>;
    getAccessTokenOwner(tokenId: string): Promise<any>;
    getNFTOwner(tokenId: string): Promise<BN>;
    proxyCreateNew(borrowerAddr: string): Promise<any>;
    proxyTransferIssue(proxyAddr: string, tokenId: string): Promise<any>;
    proxyLockBorrowWithdraw(proxyAddr: string, loanId: string, amount: string, usr: string): Promise<any>;
    proxyRepayUnlockClose(proxyAddr: string, tokenId: string, loanId: string, amount: string): Promise<any>;
};
export default ProxyActions;
