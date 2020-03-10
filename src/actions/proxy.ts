import { Constructor, Tinlake } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';
const abiCoder = require('web3-eth-abi');
import BN from 'bn.js';

function ProxyActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase) {

  return class extends Base implements IProxyActions {

    shelf = this.contracts['SHELF'].address;
    currency = this.contracts['TINLAKE_CURRENCY'].address;
    registry = this.contracts['COLLATERAL_NFT'].address;
    actions = this.contracts['ACTIONS'].address;
    proxy = this.eth.contract(this.contractAbis['PROXY']).at(this.ethConfig.proxy)

    checkProxy = async () => {
      if (this.ethConfig.proxy === '') {
        const accessToken = await this.newProxy(this.ethConfig.from);
        this.ethConfig.proxy = await this.getProxy(accessToken);
      }
      this.proxy = this.eth.contract(this.contractAbis['PROXY']).at(this.ethConfig.proxy);
    }

    approveNFT = async (tokenId: string, to: string) => {
      const txHash = await executeAndRetry(this.contracts['COLLATERAL_NFT'].approve, [to, tokenId, this.ethConfig]);
      console.log(`[NFT Approve] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['COLLATERAL_NFT'].abi, this.transactionTimeout);
    }

    getTokenOwner = async (tokenId: string): Promise<BN> => {
      const res : { 0: BN } = await executeAndRetry(this.contracts['PROXY_REGISTRY'].ownerOf, [tokenId]);
      return res[0];
    }

    getNFTOwner = async (tokenId: string): Promise<BN> => {
      const res : { 0: BN } = await executeAndRetry(this.contracts['COLLATERAL_NFT'].ownerOf, [tokenId]);
      return res[0];
    }

    transferNFT = async (from: string, to: string, tokenId: string) => {
      const txHash = await executeAndRetry(this.contracts['COLLATERAL_NFT'].transferFrom, [from, to, tokenId, this.ethConfig]);
      console.log(`[NFT Approve] txHash: ${txHash}`);
      return waitAndReturnEvents(this.eth, txHash, this.contracts['COLLATERAL_NFT'].abi, this.transactionTimeout);
    }

    newProxy = async (owner: string) => {
      const txHash = await executeAndRetry(this.contracts['PROXY_REGISTRY'].build, [owner, this.ethConfig]);
      console.log(`[Proxy created] txHash: ${txHash}`);
      const response: any = await waitAndReturnEvents(this.eth, txHash, this.contracts['PROXY_REGISTRY'].abi, this.transactionTimeout);
      return response.events[0].data[2].toString();
    }

    getProxy = async (accessTokenId: string) => {
      const res = await executeAndRetry(this.contracts['PROXY_REGISTRY'].proxies,  [accessTokenId, this.ethConfig]);
      return res[0];
    }

    getProxyAccessToken = async () => {
      await this.checkProxy();
      const proxy: any = this.eth.contract(this.contractAbis['PROXY']).at(this.ethConfig.proxy);
      const res = await executeAndRetry(proxy.accessToken, [this.ethConfig]);
      return res[0].toNumber();
    }

    proxyTransferIssue = async (tokenId: string)  => {
      await this.checkProxy();
      const proxy: any = this.eth.contract(this.contractAbis['PROXY']).at(this.ethConfig.proxy);

      const encoded = abiCoder.encodeFunctionCall({
        name: 'transferIssue',
        type :'function',
        inputs: [
          { type: 'address', name: 'shelf' },
          { type: 'address', name: 'registry' },
          { type: 'uint256', name: 'token' }]},
                                                  [this.shelf, this.registry, tokenId],
      );

      const txHash = await executeAndRetry(proxy.execute, [this.actions, encoded, this.ethConfig]);
      console.log(`[Proxy Transfer Issue Loan] txHash: ${txHash}`);
      return await waitAndReturnEvents(this.eth, txHash, this.contractAbis['PROXY'], this.transactionTimeout);
    }

    proxyLockBorrowWithdraw = async (loanId: string, amount: string, usr: string) => {
      await this.checkProxy();
      const proxy: any = this.eth.contract(this.contractAbis['PROXY']).at(this.ethConfig.proxy);
      const encoded = abiCoder.encodeFunctionCall({
        name: 'lockBorrowWithdraw',
        type :'function',
        inputs: [
                                                      { type: 'address', name: 'shelf' },
                                                      { type: 'uint256', name: 'loan' },
                                                      { type: 'uint256', name: 'amount' },
                                                      { type: 'address', name: 'usr' }]},
                                                  [this.shelf, loanId, amount, usr],
      );
      const txHash = await executeAndRetry(proxy.execute, [this.actions, encoded, this.ethConfig]);
      console.log(`[Proxy Lock Borrow Withdraw] txHash: ${txHash}`);
      return await waitAndReturnEvents(this.eth, txHash, this.contractAbis['PROXY'], this.transactionTimeout);
    }

    proxyRepayUnlockClose = async (tokenId: string, loanId: string, amount: string) => {
      await this.checkProxy();
      const proxy: any = this.eth.contract(this.contractAbis['PROXY']).at(this.ethConfig.proxy);
      const encoded = abiCoder.encodeFunctionCall({
        name: 'repayUnlockClose',
        type :'function',
        inputs: [
                                                      { type: 'address', name: 'shelf' },
                                                      { type: 'address', name: 'registry' },
                                                      { type: 'uint256', name: 'token' },
                                                      { type: 'address', name: 'erc20' },
                                                      { type: 'uint256', name: 'loan' },
                                                      { type: 'uint256', name: 'amount' }]},
                                                  [this.shelf, this.registry, tokenId, this.currency, loanId, amount],
      );
      const txHash = await executeAndRetry(proxy.execute, [this.actions, encoded, this.ethConfig]);
      console.log(`[Proxy Repay Unlock Close] txHash: ${txHash}`);
      return await waitAndReturnEvents(this.eth, txHash, this.contractAbis['PROXY'], this.transactionTimeout);
    }
  };
}

export type IProxyActions = {
  newProxy(owner: string): Promise<any>,
  getProxy(accessTokenId: string): Promise<any>,
  getProxyAccessToken(): Promise<any>,
  proxyTransferIssue(shelf: string, registry: string, token: string): Promise<any>,
  proxyLockBorrowWithdraw(loanId: string, amount: string, usr: string): Promise<any>,
  proxyRepayUnlockClose(tokenId: string, loanId: string, amount: string): Promise<any>,
};

export default ProxyActions;
