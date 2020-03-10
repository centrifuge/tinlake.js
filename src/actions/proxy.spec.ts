const randomString = require('randomstring');
const account = require('ethjs-account');
import assert from 'assert';
import { createTinlake, TestProvider } from '../../test/utils';
import testConfig from '../../test/config';
import BN from 'bn.js';

const testProvider = new TestProvider(testConfig);
const borrowerAccount = account.generate(randomString.generate(32));
const borrowerTinlake = createTinlake(borrowerAccount, testConfig);
const governanceTinlake = createTinlake(testConfig.godAccount, testConfig);

const { SUCCESS_STATUS, FAIL_STATUS, FAUCET_AMOUNT, contractAddresses } = testConfig;

describe.only('proxy tests', async () => {

  before(async () => {
    // fund borrower account with ETH
    await testProvider.fundAccountWithETH(borrowerAccount.address, FAUCET_AMOUNT);
  });

  describe.only('proxy registry', async () => {

    it('success: creates a proxy contract and issues a loan with the proxy', async () => {
      const accessToken = await borrowerTinlake.newProxy(borrowerTinlake.ethConfig.from);
      const proxyAddress = await borrowerTinlake.getProxy(accessToken);

      borrowerTinlake.ethConfig.proxy = proxyAddress;
      const mintResult: any = await governanceTinlake.mintTitleNFT(borrowerTinlake.ethConfig.from);
      const nftId = mintResult.events[0].data[2].toString();
      await borrowerTinlake.approveNFT(nftId, proxyAddress);
      const res = await borrowerTinlake.proxyTransferIssue(nftId);
      assert.equal(res.status, SUCCESS_STATUS);
      assert.equal(await borrowerTinlake.getNFTOwner(nftId), borrowerTinlake.ethConfig.proxy);
    });

    it('fail: does not succeed if the proxy is not approved to take the NFT', async () => {
      const accessToken = await borrowerTinlake.newProxy(borrowerTinlake.ethConfig.from);
      const proxyAddress = await borrowerTinlake.getProxy(accessToken);

      borrowerTinlake.ethConfig.proxy = proxyAddress;
      const mintResult: any = await governanceTinlake.mintTitleNFT(borrowerTinlake.ethConfig.from);
      const nftId = mintResult.events[0].data[2].toString();
      const res = await borrowerTinlake.proxyTransferIssue(nftId);
      assert.equal(res.status, FAIL_STATUS);
    });

      it('success: successfully locks and withdraws a loan', async () => {
    });

  });

});
