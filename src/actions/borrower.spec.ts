import assert from 'assert';
const account = require('ethjs-account');
const randomString = require('randomstring');

import WithBorrower from './borrower';
import WithAdmin from './admin';
import testConfig from '../../test/config';
import Tinlake from '../Tinlake';
import { createTinlake, TestProvider } from '../../test/utils';

const SUCCESS_STATUS = '0x1';

const borrowerAccount = account.generate(randomString.generate(32));
const testProvider = new TestProvider(testConfig);
const TinlakeSetup = WithAdmin(WithBorrower(Tinlake));
const tinlake = createTinlake(borrowerAccount, TinlakeSetup, testConfig);

async function mintIssue(user: string) {
  const mintResult = await tinlake.mintNFT(user);
  assert.equal(mintResult.status, SUCCESS_STATUS);
  const tokenCount = await tinlake.getNFTCount();
  await tinlake.issue(tinlake.contractAddresses.NFT_COLLATERAL, tokenCount -  1);
}

describe('borrower functions', () => {
  before(async () =>  {
    await testProvider.fundAccountWithETH(borrowerAccount, '2000000000000000');
  });
  it('issues a loan from a minted collateral NFT', async () => {
    await mintIssue(borrowerAccount.address);
    const tokenCount = await tinlake.getNFTCount();
    const loanCount = await tinlake.getTitleCount();
    console.log('TokenID:', `${tokenCount - 1}`);
    console.log('LoanID:', `${loanCount - 1}`);
    assert.equal(tokenCount, loanCount);
  });
//
//   it('locks an NFT successfully', async () => {
//     const loanCount = await tinlake.getTitleCount();
//     const lockResult = await tinlake.lock(loanCount - 1);
//     assert.equal(lockResult.status, SUCCESS_STATUS);
//   });
//
// // it('unlocks an NFT successfully', async () => {
// //   const loanCount = await tinlake.getTitleCount();
// //   const unlockResult = await tinlake.unlock(loanCount - 1);
// //   assert.equal(unlockResult.status, SUCCESS_STATUS);
// // });
//
//   it('borrows money based on a locked NFT successfully', async () => {
//     const ceilingAmount = '10000';
//     const loanId = await tinlake.getTitleCount();
//     const fileResult = await tinlake.fileCeiling(loanId - 1 , ceilingAmount);
//     assert.equal(fileResult.status, SUCCESS_STATUS);
//   });
//
//   it('borrows money based on a locked NFT successfully', async () => {
//     // const loanId = await tinlake.getTitleCount();
//     // console.log('$$$$$$$', loanId.toString());
//     // await tinlake.borrow;
//   });
//
// // const fileResult = await tinlake.fileCeiling(loanId.toString(), ceilingAmount);
// // assert.equal(fileResult.status, SUCCESS_STATUS);

});
