const randomString = require('randomstring');
const account = require('ethjs-account');
import assert from 'assert';
import WithAdmin from './admin';
import Tinlake from '../Tinlake';
import testConfig from '../../test/config';
import { createTinlake, TestProvider} from '../../test/utils';

const adminAccount = account.generate(randomString.generate(32));
const testProvider = new TestProvider(testConfig);
const TinlakeSetup = WithAdmin(Tinlake);
const tinlake = createTinlake(adminAccount, TinlakeSetup, testConfig);

// ------------ admin tests borrower -------------

describe('ceiling', function () {
    before(async () =>  {
        // fund admin account with eth
        await testProvider.fundAccountWithETH(adminAccount, "20000000");
    });

    it('set ceiling for a loan', async () => {
        // rely admin account on ceiling
        // relyAccount(adminAccount, testConfig);
    });

    it('update ceiling for a loan', async () => {
         //rely admin account on ceiling
    });

});

describe('interest rate', function () {
     //rely admin account on pile
});

describe('threshold', function () {
    //rely admin account on threshold
});

describe('collector', function () {
    //rely admin account on collector
});

// ------------ admin tests lender -------------

