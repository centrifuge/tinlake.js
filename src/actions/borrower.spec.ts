import assert from 'assert';
const account = require('ethjs-account');
const randomString = require('randomstring');

import WithBorrower from './borrower';
import WithAdmin from './admin';
import testConfig from '../../test/config';
import Tinlake from '../Tinlake';
import { createTinlake, TestProvider } from '../../test/utils';

const borrowerAccount = account.generate(randomString.generate(32));
const testProvider = new TestProvider(testConfig);
const TinlakeSetup = WithAdmin(WithBorrower(Tinlake));
const tinlake = createTinlake(borrowerAccount, TinlakeSetup, testConfig);

async function mintIssue(user: string) {
  const mintResult = await tinlake.mintNFT(user);
  assert.equal(mintResult.status, testConfig.SUCCESS_STATUS);
  const tokenCount = await tinlake.getNFTCount();
  await tinlake.issue(tinlake.contractAddresses.NFT, tokenCount -  1);
}

describe('borrower functions', () => {
  before(async () =>  {
    await testProvider.fundAccountWithETH(borrowerAccount, '2000000000000000');
  });

  it('issues a loan from a minted collateral NFT', async () => {
    const tokenCount = await tinlake.getNFTCount();
    const loanCount = await tinlake.getTitleCount();
    await mintIssue(borrowerAccount.address);
    const tokenCount_ = await tinlake.getNFTCount();
    const loanCount_ = await tinlake.getTitleCount();
    console.log('TokenID:', `${tokenCount_ - 1}`);
    console.log('LoanID:', `${loanCount_ - 1}`);

    assert(tokenCount.toNumber() ===  tokenCount_.toNumber() - 1);
    assert(loanCount.toNumber() ===  loanCount_.toNumber() - 1);
    assert.equal(await tinlake.getTitleOwner(loanCount - 1), borrowerAccount.address);
  });

  it('locks a loan title successfully', async () => {
    const loanCount = await tinlake.getTitleCount();
    console.log('LoanID:', `${loanCount - 1}`);
    assert.equal(await tinlake.getTitleOwner(loanCount - 1), borrowerAccount.address);
    await tinlake.lock(loanCount);
    assert.equal(await tinlake.getTitleOwner(loanCount - 1), tinlake.contractAddresses.SHELF);
  });

  it('unlocks a loan title successfully', async () => {
    const loanCount = await tinlake.getTitleCount();
    await tinlake.unlock(loanCount - 1);
    assert.equal(await tinlake.getTitleOwner(loanCount - 1), borrowerAccount.address);
  });

  it('borrows money based on a locked NFT successfully', async () => {
    const ceilingAmount = 10000;
    const loanId = await tinlake.getTitleCount();
    const fileResult = await tinlake.fileCeiling(loanId - 1 , ceilingAmount);
    assert.equal(fileResult.status, testConfig.SUCCESS_STATUS);
    // there should be money in the tranche
    await tinlake.borrow(loanId - 1, ceilingAmount);
    assert.equal(await tinlake.getCurrencyBalance(borrowerAccount.address), ceilingAmount);
  });

  it('closes a loan successfully', async () => {
    const loanCount = await tinlake.getTitleCount();
    const closeResult = await tinlake.close(loanCount - 1);
    assert.equal(closeResult.status, testConfig.SUCCESS_STATUS);
  });
});
