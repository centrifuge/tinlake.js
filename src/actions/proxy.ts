import { Constructor, Tinlake } from '../types';
import { waitAndReturnEvents, executeAndRetry } from '../ethereum';
import { AbiCoder } from 'web3-eth-abi';
const Contract = require('web3-eth-contract');
const abiCoder = new AbiCoder();
import BN from 'bn.js';

function ProxyActions<ActionsBase extends Constructor<Tinlake>>(Base: ActionsBase) {
  return class extends Base implements IProxyActions {

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

    newTestProxy = async (owner: string) => {
      const txHash = await executeAndRetry(this.contracts['TEST_PROXY_REGISTRY'].build, [owner, this.ethConfig]);
      console.log(`[Proxy created] txHash: ${txHash}`);
      const response: any = await waitAndReturnEvents(this.eth, txHash, this.contracts['TEST_PROXY_REGISTRY'].abi, this.transactionTimeout);
      return response.events[0].data[2].toString();
    }

    getTestProxy = async (accessTokenId: string) => {
      const res = await executeAndRetry(this.contracts['TEST_PROXY_REGISTRY'].proxies,  [accessTokenId, this.ethConfig]);
      return res[0];
    }

    getProxy = async (accessTokenId: string) => {
      const res = await executeAndRetry(this.contracts['PROXY_REGISTRY'].proxies,  [accessTokenId, this.ethConfig]);
      return res[0];
    }

    getProxyAccessToken = async () => {
      if (this.ethConfig.proxy === '') {
        const accessToken = await this.newProxy(this.ethConfig.from);
        const address = await this.getProxy(accessToken);
        this.ethConfig.proxy = address;
      }
      const proxy: any = this.eth.contract(this.contractAbis['PROXY']).at(this.ethConfig.proxy);
      const res = await executeAndRetry(proxy.accessToken, [this.ethConfig]);
      return res[0].toNumber();
    }

    proxyApproveNFT = async (address: string, tokenId: string) => {
      const registry = this.contracts['COLLATERAL_NFT'].address;
      const proxy: any = this.eth.contract(this.contractAbis['PROXY']).at(this.ethConfig.proxy);

      const actions = new Contract(this.contractAbis['ACTIONS'], this.contracts['ACTIONS'].address, this.ethConfig);
      const encoded = actions.methods.approveNFT(registry, address, tokenId).encodeABI();
      console.log('TESTencoded!', encoded);


      const txHash = await executeAndRetry(proxy.execute, [this.contracts['ACTIONS'].address, encoded, this.ethConfig]);
      console.log(`[Approve NFT] txHash: ${txHash}`);
      return await waitAndReturnEvents(this.eth, txHash, this.contractAbis['ACTIONS'], this.transactionTimeout);
    }

    testProxy = async () => {
      const access = await this.getProxyAccessToken();
      console.log('owner of token', await this.getTokenOwner(access));
      const encoded1 = abiCoder.encodeFunctionCall({
        name: 'test',
        type :'function',
        inputs: []},
                                                   [],
      );
      console.log('TEST', encoded1)

      // const proxy: any = this.eth.contract(this.contractAbis['TEST_PROXY_REGISTRY']).at(0x207b2fe52ce5d935a93785238b2879e2e07de756');
      const registry = new Contract(this.contractAbis['TEST_PROXY_REGISTRY'], '0x207b2fe52ce5d935a93785238b2879e2e07de756', this.ethConfig);
      const encoded = registry.methods.test().encodeABI();
      console.log('TESTencoded!', encoded);

      // const txHash = await executeAndRetry(proxy.execute, [registry, encoded, this.ethConfig]);
      // console.log(`[TESTTESTTEST] txHash: ${txHash}`);
      // return await waitAndReturnEvents(this.eth, txHash, this.contractAbis['TEST_PROXY_REGISTRY'], this.transactionTimeout);
    }

    proxyTransferIssue = async (tokenId: string)  => {
      if (this.ethConfig.proxy === '') {
        const accessToken = await this.newProxy(this.ethConfig.from);
        const address = await this.getProxy(accessToken);
        this.ethConfig.proxy = address;
      }
      console.log('proxy inside', this.ethConfig.proxy);
      const access = await this.getProxyAccessToken();
      console.log('owner of token', await this.getTokenOwner(access));
      const shelf = this.contracts['SHELF'].address;
      const registry = this.contracts['COLLATERAL_NFT'].address;
      const proxy: any = this.eth.contract(this.contractAbis['PROXY']).at(this.ethConfig.proxy);
      const actions = this.contracts['ACTIONS'].address;

      const encoded = abiCoder.encodeFunctionCall({
        name: 'transferIssue',
        type :'function',
        inputs: [{ name:'shelf', type:'address' }, { name:'registry', type:'address' }, { name:'token', type:'uint256' }]},
                                                  [shelf, registry, tokenId],
      );

      console.log('encoded', encoded);
      // console.log('proxy', proxy)

      // await this.approveNFT(tokenId, actions);
      const approve = await this.approveNFT(tokenId, this.ethConfig.proxy);
      console.log('nft approve', approve);
      // await this.transferNFT(this.ethConfig.from, this.ethConfig.proxy, tokenId);
      console.log('NFT OWNER NOW', await this.getNFTOwner(tokenId));

      const txHash = await executeAndRetry(proxy.execute, [actions, encoded, this.ethConfig]);
      console.log(`[Transfer Issue Loan] txHash: ${txHash}`);
      const res = await waitAndReturnEvents(this.eth, txHash, this.contractAbis['ACTIONS'], this.transactionTimeout);
      console.log(res);
      return await this.getNFTOwner(tokenId);
    }

    // transferIssue = async (tokenId: string) => {
    //   const txHash = await executeAndRetry(this.contracts['ACTIONS'].transferIssue, [this.contractAddresses['SHELF'], [this.contractAddresses['COLLATERAL_NFT], tokenId, this.ethConfig]);
    //   console.log(`[Mint NFT] txHash: ${txHash}`);
    //   return waitAndReturnEvents(this.eth, txHash, this.contracts['ACTIONS'].abi, this.transactionTimeout);
    // }
    //
    // lock = async (loan: string) => {
    //   const txHash = await executeAndRetry(this.contracts['ACTIONS'].lock, [loan, this.ethConfig]);
    //   console.log(`[Collateral NFT lock] txHash: ${txHash}`);
    //   return waitAndReturnEvents(this.eth, txHash, this.contracts['ACTIONS'].abi, this.transactionTimeout);
    // }

    // unlock = async (loan: string) => {
    //   const txHash = await executeAndRetry(this.contracts['SHELF'].unlock, [loan, this.ethConfig]);
    //   console.log(`[Collateral NFT unlock] txHash: ${txHash}`);
    //   return waitAndReturnEvents(this.eth, txHash, this.contracts['SHELF'].abi, this.transactionTimeout);
    // }
    //
    // close = async (loan: string) => {
    //   const txHash = await executeAndRetry(this.contracts['SHELF'].close, [loan, this.ethConfig]);
    //   console.log(`[Loan close] txHash: ${txHash}`);
    //   return waitAndReturnEvents(this.eth, txHash, this.contracts['SHELF'].abi, this.transactionTimeout);
    // }
    //
    // borrow = async (loan: string, currencyAmount: string) => {
    //   const txHash = await executeAndRetry(this.contracts['SHELF'].borrow, [loan, currencyAmount, this.ethConfig]);
    //   console.log(`[Borrow] txHash: ${txHash}`);
    //   return waitAndReturnEvents(this.eth, txHash, this.contracts['SHELF'].abi, this.transactionTimeout);
    // }
    //
    // withdraw = async (loan: string, currencyAmount: string, usr: string) => {
    //   const txHash = await executeAndRetry(this.contracts['SHELF'].withdraw, [loan, currencyAmount, usr, this.ethConfig]);
    //   console.log(`[Withdraw] txHash: ${txHash}`);
    //   return waitAndReturnEvents(this.eth, txHash, this.contracts['SHELF'].abi, this.transactionTimeout);
    // }
    //
    // repay = async (loan: string, currencyAmount: string) => {
    //   const txHash = await executeAndRetry(this.contracts['SHELF'].repay, [loan, currencyAmount, this.ethConfig]);
    //   console.log(`[Repay] txHash: ${txHash}`);
    //   return waitAndReturnEvents(this.eth, txHash, this.contracts['SHELF'].abi, this.transactionTimeout);
    // }
  };
}

export type IProxyActions = {
  newProxy(owner: string): Promise<any>,
  getProxy(accessTokenId: string): Promise<any>,
  getProxyAccessToken(): Promise<any>,
  proxyTransferIssue(shelf: string, registry: string, token: string): Promise<any>,
  // lock(loan: string): Promise<any>,
  // unlock(loan: string): Promise<any>,
  // close(loan: string): Promise<any>,
  // borrow(loan: string, currencyAmount: string): Promise<any>,
  // withdraw(loan: string, currencyAmount: string, usr: string) : Promise<any>,
  // repay(loan: string, currencyAmount: string): Promise<any>,
};

export default ProxyActions;
