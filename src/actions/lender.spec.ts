import assert from 'assert';
const account = require('ethjs-account');
const randomString = require('randomstring');

import testConfig from '../../test/config';
import { ITinlake } from '../Tinlake';
import { createTinlake, TestProvider } from '../../test/utils';

const lenderAccount = account.generate(randomString.generate(32));
const adminAccount = account.generate(randomString.generate(32));
const testProvider = new TestProvider(testConfig);
const tinlake = createTinlake(lenderAccount, testConfig);


describe('lender functions', () => {
  before(async () =>  {
    // fund lender account with currency
    await testProvider.fundAccountWithETH(lenderAccount, '2000000000000000');
    // rely admin on junior operator
    await testProvider.relyAccount(adminAccount, testConfig.contractAddresses["JUNIOR_OPERATOR"]);

  });

  it('success: lender supplies tranche with funds', async () => {

    // rely lender
    const currencyAmount = 1000;
    const supplyResult = await tinlake.supplyJunior(currencyAmount);
    assert.equal(supplyResult.status, testConfig.SUCCESS_STATUS);
    assert.equal(await tinlake.getCurrencyBalance(tinlake.contractAddresses.JUNIOR), currencyAmount);
  });

  it('success: redeems tokens for a certain amount of currency', async () => {
    const currencyAmount = 1000;
    const tokenAmount = 1000;
    const redeemResult = await tinlake.redeemJunior(tokenAmount);
    assert.equal(redeemResult.status, testConfig.SUCCESS_STATUS);
    assert.equal(await tinlake.getCurrencyBalance(lenderAccount.address), currencyAmount);
  });
});