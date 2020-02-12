const randomString = require('randomstring');
const account = require('ethjs-account');
import assert from 'assert';
import WithAdmin from './admin';
import Tinlake from '../Tinlake';
import testConfig from '../../test/config';
import { createTinlake, fundAccountWithETH, relyAccount, initTestUtils } from '../../test/utils';

const adminAccount = account.generate(randomString.generate(32));
const TinlakeSetup = WithAdmin(Tinlake);
const tinlake = createTinlake(adminAccount, TinlakeSetup, testConfig);

// describe('ceiling', function () {
//     before(async () =>  {
//         initTestUtils(testConfig);
//         // fund admin account
//         await fundAccountWithETH(adminAccount, testConfig);
//         // relyAccount(adminAccount, testConfig);
//     });
//
//     it('set ceiling for a loan', async () => {
//
//     });
//
//     it('update ceiling for a loan', async () => {
//     });
//
// });
//
// describe('interest rate', function () {
// });
//
// describe('threshold', function () {
// });
//
// describe('keeper', function () {
// });

