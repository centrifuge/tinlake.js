import assert from 'assert';
const account = require('ethjs-account');
const randomString = require('randomstring');

import WithLender from './lender';
import WithAdmin from './admin';
import testConfig from '../../test/config';
import Tinlake from '../Tinlake';
import { createTinlake, TestProvider } from '../../test/utils';

const lenderAccount = account.generate(randomString.generate(32));
const testProvider = new TestProvider(testConfig);
const TinlakeSetup = WithAdmin(WithLender(Tinlake));
const tinlake = createTinlake(lenderAccount, TinlakeSetup, testConfig);

describe('borrower functions', () => {
  before(async () =>  {
    await testProvider.fundAccountWithETH(lenderAccount, '2000000000000000');
  });
  it('supplies a tranche with some funds', async () => {
    // const currencyAmount = '1000';
    // const supplyResult = await tinlake.supplyJunior(currencyAmount);
    // assert.equal(supplyResult.status, testConfig.SUCCESS_STATUS);
  });
});
