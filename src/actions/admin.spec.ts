const randomString = require('randomstring');
const account = require('ethjs-account');
import assert from 'assert';
import { ITinlake } from '../Tinlake';
import { Account } from '../../test/types';
import { createTinlake, TestProvider } from '../../test/utils';
import testConfig from '../../test/config';

const testProvider = new TestProvider(testConfig);
const adminAccount = account.generate(randomString.generate(32));
const lenderAccount = account.generate(randomString.generate(32));
const adminTinlake = createTinlake(adminAccount, testConfig);

// ------------ admin tests borrower-site -------------

describe('ceiling', function () {
    before(async () =>  {
        // fund admin account with eth
        await testProvider.fundAccountWithETH(adminAccount, "20000000");
    });

    it('success: set ceiling for a loan', async () => {
        // rely admin on ceiling contract
        await testProvider.relyAccount(adminAccount, testConfig.contractAddresses["CEILING"]);
        // await tinlake.setCeiling(loanId, ceiling);
    });

    it('success: update ceiling for a loan', async () => {
    });

});

describe('pile', function () {
     //rely admin account on pile
});

// ------------ admin tests lender-site -------------
describe.only('operator', function () {
    it('success: set allowance for junior investor', async () => {
        // rely admin on junior operator
        await testProvider.relyAccount(adminAccount, testConfig.contractAddresses["JUNIOR_OPERATOR"]);
        const maxCurrency = 10000000;
        const maxToken = 10000000;
        // set allowance for lender address
        const allowanceResult: any = await adminTinlake.approveAllowance(lenderAccount.address, maxCurrency, maxToken);
        assert.equal(allowanceResult.status, testConfig.SUCCESS_STATUS);
        // add assertions
    })
})
