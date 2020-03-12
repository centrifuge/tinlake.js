import { Constructor, Tinlake } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';
const abiCoder = require('web3-eth-abi');
import BN from 'bn.js';
import { ethers } from 'ethers';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

function ProxyActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase) {

  return class extends Base implements IProxyActions {

    getAccessTokenOwner = async (tokenId: string): Promise<BN> => {
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

    buildProxy = async (owner: string) => {
      const txHash = await executeAndRetry(this.contracts['PROXY_REGISTRY'].build, [owner, this.ethConfig]);
      console.log(`[Proxy created] txHash: ${txHash}`);
      const response: any = await waitAndReturnEvents(this.eth, txHash, this.contracts['PROXY_REGISTRY'].abi, this.transactionTimeout);
      return response.events[0].data[2].toString();
    }

    getProxy = async (accessTokenId: string) => {
      const res = await executeAndRetry(this.contracts['PROXY_REGISTRY'].proxies,  [accessTokenId, this.ethConfig]);
      return res[0];
    }

    getProxyAccessToken = async (proxyAddr: string) => {
      const proxy: any = this.eth.contract(this.contractAbis['PROXY']).at(proxyAddr);
      const res = await executeAndRetry(proxy.accessToken, [this.ethConfig]);
      return res[0].toNumber();
    }

    getProxyFromLoan = async (loanId: string) => {
      let address;
      let accessTokenId;
      try {
        const res = await executeAndRetry(this.contracts['TITLE'].ownerOf, [loanId]);
        address = res[0];
      } catch (e) {
        address = ZERO_ADDRESS;
      }
      if (address !== ZERO_ADDRESS) {
        try {
          accessTokenId = await this.getProxyAccessToken(address);
        } catch (e) {
          accessTokenId = null;
        }
      }
      if (accessTokenId) {
        return await this.getAccessTokenOwner(accessTokenId);
      }
    }

    proxyCount = async (): Promise<BN> => {
      const res: { 0: BN }  = await executeAndRetry(this.contracts['PROXY_REGISTRY'].count, []);
      return res[0];
    }

    checkProxyExistence = async (borrowerAddr: string) => {
      let proxy;
      const count = (await this.proxyCount()).toNumber();
      for (let i = 0; i < count; i += 1) {
        const ownerBN = this.getAccessTokenOwner(i.toString())
        if (ownerBN && ethers.utils.getAddress(ownerBN.toString()) === ethers.utils.getAddress(borrowerAddr)) {
          const proxyAddress = await this.getProxy(i.toString());
          proxy = proxyAddress;
        }
      }
      return proxy;
    }

    proxyCreateNew = async (borrowerAddr: string) => {
      const accessToken = await this.buildProxy(borrowerAddr);
      return await this.getProxy(accessToken);
    }

    proxyTransferIssue = async (proxyAddr: string, tokenId: string)  => {
      const proxy: any = this.eth.contract(this.contractAbis['PROXY']).at(proxyAddr);

      const encoded = abiCoder.encodeFunctionCall({
        name: 'transferIssue',
        type :'function',
        inputs: [
          { type: 'address', name: 'shelf' },
          { type: 'address', name: 'registry' },
          { type: 'uint256', name: 'token' }]},   [this.contracts['SHELF'].address, this.contracts['COLLATERAL_NFT'].address, tokenId],
      );

      const txHash = await executeAndRetry(proxy.execute, [this.contracts['ACTIONS'].address, encoded, this.ethConfig]);
      console.log(`[Proxy Transfer Issue Loan] txHash: ${txHash}`);
      return await waitAndReturnEvents(this.eth, txHash, this.contractAbis['PROXY'], this.transactionTimeout);
    }

    proxyLockBorrowWithdraw = async (proxyAddr: string, loanId: string, amount: string, usr: string) => {
      const proxy: any = this.eth.contract(this.contractAbis['PROXY']).at(proxyAddr);
      const encoded = abiCoder.encodeFunctionCall({
        name: 'lockBorrowWithdraw',
        type :'function',
        inputs: [
                                                      { type: 'address', name: 'shelf' },
                                                      { type: 'uint256', name: 'loan' },
                                                      { type: 'uint256', name: 'amount' },
                                                      { type: 'address', name: 'usr' }]},
                                                  [this.contracts['SHELF'].address, loanId, amount, usr],
      );
      const txHash = await executeAndRetry(proxy.execute, [this.contracts['ACTIONS'].address, encoded, this.ethConfig]);
      console.log(`[Proxy Lock Borrow Withdraw] txHash: ${txHash}`);
      return await waitAndReturnEvents(this.eth, txHash, this.contractAbis['PROXY'], this.transactionTimeout);
    }

    proxyRepayUnlockClose = async (proxyAddr: string, tokenId: string, loanId: string, amount: string) => {
      const proxy: any = this.eth.contract(this.contractAbis['PROXY']).at(proxyAddr);
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
                                                  [this.contracts['SHELF'].address, this.contracts['COLLATERAL_NFT'].address, tokenId, this.contracts['TINLAKE_CURRENCY'].address, loanId, amount],
      );
      const txHash = await executeAndRetry(proxy.execute, [this.contracts['ACTIONS'].address, encoded, this.ethConfig]);
      console.log(`[Proxy Repay Unlock Close] txHash: ${txHash}`);
      return await waitAndReturnEvents(this.eth, txHash, this.contractAbis['PROXY'], this.transactionTimeout);
    }
  };
}

export type IProxyActions = {
  buildProxy(owner: string): Promise<any>,
  checkProxyExistence(provider:any, borrowerAddr: string): any,
  getProxy(accessTokenId: string): Promise<any>,
  proxyCount(): Promise<any>,
  getProxyAccessToken(proxyAddr: string): Promise<any>,
  getAccessTokenOwner(tokenId: string): Promise<any>,
  getNFTOwner(tokenId: string): Promise<BN>,
  getProxyFromLoan(loanId: string): Promise<any>,
  proxyCreateNew(borrowerAddr: string): Promise<any>,
  proxyTransferIssue(proxyAddr:string , tokenId: string): Promise<any>,
  proxyLockBorrowWithdraw(proxyAddr:string, loanId: string, amount: string, usr: string): Promise<any>,
  proxyRepayUnlockClose(proxyAddr: string, tokenId: string, loanId: string, amount: string): Promise<any>,
};

export default ProxyActions;
