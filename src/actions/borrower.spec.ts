import assert from 'assert';
const account = require('ethjs-account');
const randomString = require('randomstring');
import { Account } from '../../test/types';
import WithBorrower from './borrower';
import WithAnalytics from './analytics';
import WithAdmin from './admin';
import testConfig from '../../test/config';
import Tinlake from '../Tinlake';
import { createTinlake, TestProvider } from '../../test/utils';

const borrowerAccount = account.generate(randomString.generate(32));
const adminAccount = account.generate(randomString.generate(32));

const testProvider = new TestProvider(testConfig);
const adminTinlakeSetup = WithAdmin(Tinlake);
const borrowerTinlakeSetup = WithBorrower(Tinlake);
const borrowerTinlake = createTinlake(borrowerAccount, borrowerTinlakeSetup, testConfig);
const adminTinlake = createTinlake(adminAccount, adminTinlakeSetup, testConfig);

async function mintIssue(usr: Account) {
  // super user mints nft for borrower
  const mintResult : any = await testProvider.mintNFT(usr);
  const tokenId = mintResult.events[0].data[2].toString();

  // assert nft successfully minted
  assert.equal(mintResult.status, testConfig.SUCCESS_STATUS);
  // assert usr = nftOwner
  assert.equal((await borrowerTinlake.getNFTOwner(tokenId)).toLowerCase(), usr.address.toLowerCase());
  const issueResult : any = await borrowerTinlake.issue(testConfig.contractAddresses['COLLATERAL_NFT'], tokenId);
  const loanId = (await borrowerTinlake.getTitleCount()).toNumber() - 1;
  // assert loan successfully issued
  assert.equal(issueResult.status, testConfig.SUCCESS_STATUS);
  // assert usr = loanOwner
  assert.equal((await borrowerTinlake.getTitleOwner(loanId)).toLowerCase(), usr.address.toLowerCase());
  return { tokenId, loanId };
}

describe.only('borrower functions', () => {

  before(async () =>  {
    await testProvider.fundAccountWithETH(borrowerAccount, '2000000000000000000000');
    await testProvider.fundAccountWithETH(adminAccount, '200000000000000000');
  });

  it('issues a loan from a minted collateral NFT', async () => {
    await mintIssue(borrowerAccount);
  });

  it('fails when msg.sender is not the collateral NFT owner', async () => {
    const mintResult : any = await testProvider.mintNFT(adminAccount);
    const tokenId = mintResult.events[0].data[2].toString();
    const issueResult = await borrowerTinlake.issue(testConfig.contractAddresses['COLLATERAL_NFT'], tokenId);
    assert.equal(issueResult.status, testConfig.FAIL_STATUS);
  });

  it('closes a loan successfully', async () => {
    const { loanId } = await mintIssue(borrowerAccount);
    const closeResult = await borrowerTinlake.close(loanId);
    assert.equal(closeResult.status, testConfig.SUCCESS_STATUS);
  });

  it('locks nft successfully', async () => {
    // mint nft & issue loan
    const { tokenId, loanId } = await mintIssue(borrowerAccount);
    await borrowerTinlake.approveNFT(tokenId, borrowerTinlake.contractAddresses['SHELF']);

    // lock nft
    await borrowerTinlake.lock(loanId);
    assert.equal(await borrowerTinlake.getNFTOwner(tokenId), borrowerTinlake.contractAddresses['SHELF']);

    // fails because borrower does not own loan NFT anymore
    const failLockResult = await borrowerTinlake.lock(loanId);
    assert.equal(failLockResult.status, testConfig.FAIL_STATUS);
  });

  it('unlocks nft successfully', async () => {
    // mint nft & issue loan
    const { tokenId, loanId } = await mintIssue(borrowerAccount);
    await borrowerTinlake.approveNFT(tokenId, borrowerTinlake.contractAddresses['SHELF']);

    // lock nft
    await borrowerTinlake.lock(loanId);

    // unlock nft
    await borrowerTinlake.unlock(loanId);
  });

  it('borrows money successfully', async () => {
     // mint nft & issue loan
    const { tokenId, loanId } = await mintIssue(borrowerAccount);
    const ceiling = 10000;

    await borrowerTinlake.approveNFT(tokenId, testConfig.contractAddresses['SHELF']);

     // lock nft
    await borrowerTinlake.lock(loanId);

     // admin sets ceiling
    await testProvider.relyAccount(adminAccount, testConfig.contractAddresses['CEILING']);
    await adminTinlake.setCeiling(loanId, ceiling);

    // supply tranche with money
    // await tinlake.borrow(loanId - 1, ceilingAmount);
    // assert.equal(await tinlake.getCurrencyBalance(borrowerAccount.address), ceilingAmount);
  });
});
