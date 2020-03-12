const randomString = require('randomstring');
const account = require('ethjs-account');
import assert from 'assert';
import { createTinlake, TestProvider } from '../../test/utils';
import testConfig from '../../test/config';
import { ethers } from 'ethers';
import BN from 'bn.js';

const testProvider = new TestProvider(testConfig);
const borrowerAccount = account.generate(randomString.generate(32));
const adminAccount = account.generate(randomString.generate(32));
const borrowerTinlake = createTinlake(borrowerAccount, testConfig);
const adminTinlake = createTinlake(adminAccount, testConfig);
const governanceTinlake = createTinlake(testConfig.godAccount, testConfig);

const { SUCCESS_STATUS, FAIL_STATUS, FAUCET_AMOUNT, contractAddresses } = testConfig;

describe.only('proxy tests', async () => {

  before(async () => {
    // fund accounts with ETH
    await testProvider.fundAccountWithETH(adminAccount.address, FAUCET_AMOUNT);
    await testProvider.fundAccountWithETH(borrowerAccount.address, FAUCET_AMOUNT);
  });

  describe.only('proxy registry', async () => {
    it('success: full loan cycle - open, borrow, lock, withdraw, repay, unlock, close', async () => {
      // create new proxy and mint collateral NFT to borrower
      const proxyAddr = await borrowerTinlake.proxyCreateNew(borrowerAccount.address);
      const mintResult: any = await governanceTinlake.mintTitleNFT(borrowerAccount.address);
      const nftId = mintResult.events[0].data[2].toString();
      await borrowerTinlake.approveNFT(nftId, proxyAddr);
      // issue loan from collateral NFT
      const issueResult = await borrowerTinlake.proxyTransferIssue(proxyAddr, nftId);
      assert.equal(issueResult.status, SUCCESS_STATUS);
      assert.equal(await borrowerTinlake.getNFTOwner(nftId), proxyAddr);
      // set loan parameters and fund tranche
      const loanId = await borrowerTinlake.nftLookup(contractAddresses.COLLATERAL_NFT, nftId);
      const amount = 1000;
      await governanceTinlake.relyAddress(adminTinlake.ethConfig.from, contractAddresses.CEILING);
      await adminTinlake.setCeiling(loanId, amount.toString());
      await fundTranche('1000000000');
      const initialTrancheBalance = await borrowerTinlake.getCurrencyBalance(contractAddresses.JUNIOR);
      // borrow
      const borrowResult = await borrowerTinlake.proxyLockBorrowWithdraw(proxyAddr, loanId, amount.toString(), borrowerAccount.address);
      const balance = await borrowerTinlake.getCurrencyBalance(borrowerAccount.address);
      const secondTrancheBalance = await borrowerTinlake.getCurrencyBalance(contractAddresses.JUNIOR);
      assert.equal(borrowResult.status, SUCCESS_STATUS);
      assert.equal(balance.toNumber(), amount);
      assert.equal(secondTrancheBalance.toNumber(), initialTrancheBalance.toNumber() - amount);
      // fuel borrower with extra to cover loan interest, approve borrower proxy to take currency
      await governanceTinlake.mintCurrency(borrowerAccount.address, amount.toString());
      await borrowerTinlake.approveCurrency(proxyAddr, amount.toString());
      // repay
      const repayResult = await borrowerTinlake.proxyRepayUnlockClose(proxyAddr, nftId, loanId, amount.toString());
      assert.equal(repayResult.status, SUCCESS_STATUS);
      // borrower should be owner of collateral NFT again
      // tranche balance should be back to pre-borrow amount
      const owner = await governanceTinlake.getNFTOwner(nftId);
      assert.equal(ethers.utils.getAddress(owner.toString()), ethers.utils.getAddress(borrowerAccount.address));
      await borrowerTinlake.getCurrencyBalance(proxyAddr);
      const finalTrancheBalance = await borrowerTinlake.getCurrencyBalance(contractAddresses.JUNIOR);
      assert.equal(initialTrancheBalance.toString(), finalTrancheBalance.toString());
    });

    it('fail: does not succeed if the proxy is not approved to take the NFT', async () => {
      const proxyAddr = await borrowerTinlake.proxyCreateNew(borrowerAccount.address);
      const mintResult: any = await governanceTinlake.mintTitleNFT(borrowerAccount.address);
      const nftId = mintResult.events[0].data[2].toString();
      const res = await borrowerTinlake.proxyTransferIssue(proxyAddr, nftId);
      assert.equal(res.status, FAIL_STATUS);
    });

    it('fail: does not succeed if the proxy is not approved to transfer currency from the borrower', async () => {
      // create new proxy and mint collateral NFT to vorrower
      const proxyAddr = await borrowerTinlake.proxyCreateNew(borrowerAccount.address);
      const mintResult: any = await governanceTinlake.mintTitleNFT(borrowerAccount.address);
      const nftId = mintResult.events[0].data[2].toString();
      await borrowerTinlake.approveNFT(nftId, proxyAddr);
      // issue loan from collateral NFT
      await borrowerTinlake.proxyTransferIssue(proxyAddr, nftId);
      // set loan parameters and fund tranche
      const loanId = await borrowerTinlake.nftLookup(contractAddresses.COLLATERAL_NFT, nftId);
      const amount = 1000;
      await governanceTinlake.relyAddress(adminTinlake.ethConfig.from, contractAddresses.CEILING);
      await adminTinlake.setCeiling(loanId, amount.toString());
      await fundTranche('1000000000');
      await borrowerTinlake.getCurrencyBalance(contractAddresses.JUNIOR);
      // borrow
      await borrowerTinlake.proxyLockBorrowWithdraw(proxyAddr, loanId, amount.toString(), borrowerAccount.address);
      await borrowerTinlake.getCurrencyBalance(borrowerAccount.address);
      await borrowerTinlake.getCurrencyBalance(contractAddresses.JUNIOR);
      // does not approve proxy to transfer currency
      await governanceTinlake.mintCurrency(borrowerAccount.address, amount.toString());
      // repay
      const repayResult = await borrowerTinlake.proxyRepayUnlockClose(proxyAddr, nftId, loanId, amount.toString());
      assert.equal(repayResult.status, FAIL_STATUS);
    });
  });
});

// TODO: move to utils
async function fundTranche(amount: string) {
  const lenderAccount = account.generate(randomString.generate(32));
  const lenderTinlake = createTinlake(lenderAccount, testConfig);
  // fund lender accoutn with eth
  await testProvider.fundAccountWithETH(lenderAccount.address, FAUCET_AMOUNT);
  // make admin adress ward on tranche operator
  await governanceTinlake.relyAddress(adminAccount.address, contractAddresses['JUNIOR_OPERATOR']);
  // whitelist lender
  await adminTinlake.approveAllowanceJunior(lenderAccount.address, amount, amount);
  // lender approves tranche to take currency
  await lenderTinlake.approveCurrency(contractAddresses['JUNIOR'], amount);
  // mint currency for lender
  await governanceTinlake.mintCurrency(lenderAccount.address, amount);
  // lender supplies tranche with funds
  await lenderTinlake.supplyJunior(amount);
}
