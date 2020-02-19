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

const { SUCCESS_STATUS, FAUCET_AMOUNT } = testConfig

// ------------ admin tests borrower-site -------------
describe('admin tests', () => {

    before(async () =>  {
        // fund admin account with eth
        console.log("admin account", adminAccount.address);
        await testProvider.fundAccountWithETH(adminAccount, FAUCET_AMOUNT);
    });

    
    describe('ceiling', function () {
       
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
    describe('operator', function () {
        it('success: set allowance for junior investor', async () => {
                // rely admin on junior operator
                await testProvider.relyAccount(adminAccount, testConfig.contractAddresses["JUNIOR_OPERATOR"]);
                // const isWard = await adminTinlake.isWard(adminAccount.address, "JUNIOR_OPERATOR");
                const maxCurrency = 1000;
                const maxToken = 100;

                // set allowance for lender address
                const allowanceResult: any = await adminTinlake.approveAllowance(lenderAccount.address, maxCurrency, maxToken);
                            
                const maxSupplyAmount = await adminTinlake.getMaxSupplyAmount(lenderAccount.address);
                const maxRedeemAmount = await adminTinlake.getMaxRedeemAmount(lenderAccount.address);
                assert.equal(allowanceResult.status, testConfig.SUCCESS_STATUS);
                assert.equal(maxRedeemAmount, maxToken);
                assert.equal(maxSupplyAmount, maxCurrency);
        })
    })

})
