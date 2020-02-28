const randomString = require('randomstring');
const account = require('ethjs-account');
import assert from 'assert';
import { ITinlake } from '../Tinlake';
import { Account } from '../../test/types';
import { createTinlake, TestProvider } from '../../test/utils';
import testConfig from '../../test/config';
import BN from 'bn.js';

const testProvider = new TestProvider(testConfig);
const adminAccount = account.generate(randomString.generate(32));
const adminTinlake = createTinlake(adminAccount, testConfig);
const governanceTinlake = createTinlake(testConfig.godAccount, testConfig);

const { SUCCESS_STATUS, FAUCET_AMOUNT, contractAddresses } = testConfig;

describe.only('proxy tests', async () => {

  before(async () => {
    // fund admin account with eth
    await testProvider.fundAccountWithETH(adminAccount.address, FAUCET_AMOUNT);
  });

  describe.only('proxy registry', async () => {

    it('success: creates a proxy contract', async () => {
      // const accessToken = await governanceTinlake.newTestProxy('0x4ed5a0eb97d03ab30501856a8a679946db8d552b');
      const accessToken = await governanceTinlake.newTestProxy(governanceTinlake.ethConfig.from);
      const proxyAddress = await governanceTinlake.getTestProxy(accessToken);
      await testProvider.fundAccountWithETH(proxyAddress, FAUCET_AMOUNT);
      governanceTinlake.ethConfig.proxy = proxyAddress

      console.log('proxy address', proxyAddress)
      const nftId = await governanceTinlake.mintNFT(governanceTinlake.ethConfig.from);
      // const owner = await governanceTinlake.getNFTOwner(nftId);
      // console.log('nftId', nftId, 'owner', owner.toString());

      const res = await governanceTinlake.proxyApproveNFT(proxyAddress, nftId);
      console.log(res);
      // const test = await adminTinlake.;
      // console.log(test);
    });

  });

});
