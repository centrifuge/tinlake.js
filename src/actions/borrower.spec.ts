import assert from 'assert';
const account = require('ethjs-account');
const randomString = require('randomstring');
import { Account } from '../../test/types';
import testConfig from '../../test/config';
import { ITinlake } from '../Tinlake';
import { createTinlake, TestProvider} from '../../test/utils';

const borrowerAccount = account.generate(randomString.generate(32));
const adminAccount = account.generate(randomString.generate(32));

// user with super powers can fund and rely accounts
const governanceTinlake = createTinlake(testConfig.godAccount, testConfig);
const borrowerTinlake = createTinlake(borrowerAccount, testConfig);
const adminTinlake = createTinlake(adminAccount, testConfig);

const testProvider = new TestProvider(testConfig);

const { SUCCESS_STATUS, FAUCET_AMOUNT } = testConfig

describe('borrower tests', () => {

  before(async () =>  {
    // fund borrowerAccount with ETH
    await testProvider.fundAccountWithETH(borrowerAccount.address, FAUCET_AMOUNT);
    await testProvider.fundAccountWithETH(adminAccount.address, FAUCET_AMOUNT);
  });

  it('success: issue loan from a minted collateral NFT', async () => {
    await mintIssue(borrowerAccount.address, borrowerTinlake);
  });

  it('success: close loan', async () => {
    const { loanId } = await mintIssue(borrowerAccount.address, borrowerTinlake);
    const closeResult = await borrowerTinlake.close(loanId);
    assert.equal(closeResult.status, SUCCESS_STATUS);
  });

  it('success: lock nft', async () => {
    // mint nft & issue loan
    const { tokenId, loanId } = await mintIssue(borrowerAccount.address, borrowerTinlake);
    await borrowerTinlake.approveNFT(tokenId, testConfig.contractAddresses["SHELF"]);
   
    // lock nft
    await borrowerTinlake.lock(loanId);
    assert.equal(await borrowerTinlake.getNFTOwner(tokenId), testConfig.contractAddresses["SHELF"]);
  });

  it('success: unlock nft', async () => {
    // mint nft & issue loan 
    const { tokenId, loanId } = await mintIssue(borrowerAccount.address, borrowerTinlake);
    await borrowerTinlake.approveNFT(tokenId, testConfig.contractAddresses["SHELF"]);
    
    // lock nft
    await borrowerTinlake.lock(loanId);

    // unlock nft
    await borrowerTinlake.unlock(loanId);
  });

  it('success: borrow', async () => {
     // mint nft & issue loan 
     const { tokenId, loanId } = await mintIssue(borrowerAccount.address, borrowerTinlake);
     const ceiling = '10000';
    
     // approve shelf to take nft
     await borrowerTinlake.approveNFT(tokenId, testConfig.contractAddresses["SHELF"]);
     // lock nft
     await borrowerTinlake.lock(loanId);
     // admin sets ceiling
     await governanceTinlake.relyAddress(adminAccount.address, testConfig.contractAddresses["CEILING"]);
     await adminTinlake.setCeiling(loanId, ceiling);

    // supply tranche with money
    // await tinlake.borrow(loanId - 1, ceilingAmount);
    // assert.equal(await tinlake.getCurrencyBalance(borrowerAccount.address), ceilingAmount);
  });
});

export async function mintIssue(usr: string, tinlake: ITinlake) {
  // super user mints nft for borrower
  const mintResult : any = await governanceTinlake.mintNFT(usr, "COLLATERAL_NFT");
  const tokenId = mintResult.events[0].data[2].toString();
  // assert nft successfully minted
  assert.equal(mintResult.status, SUCCESS_STATUS);
  // assert usr = nftOwner
  const nftOwner = `${await tinlake.getNFTOwner(tokenId)}`;
  assert.equal(nftOwner.toLowerCase(), usr.toLowerCase());

  const issueResult : any = await tinlake.issue(testConfig.contractAddresses["COLLATERAL_NFT"], tokenId);
  const loanId = `${(await tinlake.getTitleCount()).toNumber() - 1}`;
  // assert loan successfully issued
  assert.equal(issueResult.status, SUCCESS_STATUS);
  // assert usr = loanOwner
  const titleOwner = `${await tinlake.getTitleOwner(loanId)}`;
  assert.equal(titleOwner.toLowerCase(), usr.toLowerCase());

  return { tokenId: `${tokenId}`, loanId : `${loanId}` };
}

export async function mintIssueBorrow(usr: Account, tinlake: ITinlake) {
}

