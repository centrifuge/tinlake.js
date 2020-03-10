import { Constructor, Tinlake } from '../types';
import BN from 'bn.js';
declare function ProxyActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase): {
    new (...args: any[]): {
        shelf: any;
        currency: any;
        registry: any;
        actions: any;
        proxy: void;
        checkProxy: () => Promise<void>;
        approveNFT: (tokenId: string, to: string) => Promise<unknown>;
        getTokenOwner: (tokenId: string) => Promise<BN>;
        getNFTOwner: (tokenId: string) => Promise<BN>;
        transferNFT: (from: string, to: string, tokenId: string) => Promise<unknown>;
        newProxy: (owner: string) => Promise<any>;
        getProxy: (accessTokenId: string) => Promise<any>;
        getProxyAccessToken: () => Promise<any>;
        proxyTransferIssue: (tokenId: string) => Promise<unknown>;
        proxyLockBorrowWithdraw: (loanId: string, amount: string, usr: string) => Promise<unknown>;
        proxyRepayUnlockClose: (tokenId: string, loanId: string, amount: string) => Promise<unknown>;
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
    proxyLockBorrowWithdraw(loanId: string, amount: string, usr: string): Promise<any>;
    proxyRepayUnlockClose(tokenId: string, loanId: string, amount: string): Promise<any>;
};
export default ProxyActions;
