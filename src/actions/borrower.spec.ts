import assert from 'assert';
const SignerProvider = require('ethjs-provider-signer');
const { sign } = require('ethjs-signer');
import WithBorrower from './borrower';
import WithAdmin from './admin';
import Tinlake from '../Tinlake';
import { lenderEthFrom } from './lender.spec';

const borrowerEthFrom = '0xF6fa8a3F3199cDd85749Ec749Fb8F9C2551F9928';
const borrowerPK = '0xb2e0c8e791c37df214808cdadc187f0cba0e36160f1a38b321a25c9a0cea8c11';

// TODO: move test config elsewhere
const transactionTimeout = 36000;
const gasLimit = 7000000;
const SUCCESS_STATUS = '0x1';

// TODO: pull from address json after deployer script
const contractAddresses = {
  TINLAKE_CURRENCY: '0x5c5aca985b1192b7149e0ff472228657c1d899a5',
  LENDER_JUNIOR_OPERATOR: '0xcbc1d81eb47d9de4259a31a8621ec8ca28bfb9a6',
  LENDER_DISTRIBUTOR: '0x2ab5e425210f411e678fecf28d49447518c96109',
  LENDER_ASSESSOR: '0xb9eba93e0c1b45273df91ad43e4881778a0d3932',
  BORROWER_TITLE: '0x61495db693a97fc5050ea787cabcd7bcc38f2ffe',
  BORROWER_SHELF: '0xd0933554dc917f5442aacd4630ede1bd036e3ee7',
  BORROWER_CEILING: '0xc0fc295b5fba369a380c0ec6dc58819fecef92e9',
  BORROWER_COLLECTOR: '0xe3374163b5fefb152052e02a4bcd45e6842d640a',
  BORROWER_THRESHOLD: '0x1f4ce293468c7e67d0024d8a1f6a018ccb5e86e4',
  BORROWER_PRICE_POOL: '0xfbe942f36274a2de6ec4452e63fb3daf7a453ba2',
  // Manually deployed Title Contract
  NFT_COLLATERAL: '0xd9990b2e170d7e738c793e7236780ca2acca135c',
};

const rpcUrl = 'http://127.0.0.1:8545';

const nftDataContractCall = {
  outputs:[
    { name:'document_version', type:'uint256' },
    { name:'amount', type:'uint256' },
    { name:'asis_value', type:'uint256' },
    { name:'rehab_value', type:'uint256' },
    { name:'borrower', type:'address' },
  ],
  displayedFields:[
    // tslint:disable-next-line:max-line-length
    { key:'amount', label:'Mortgage Amount', type:'uint', decimals:18, precision:18, suffix:' DAI' },
    // tslint:disable-next-line:max-line-length
    { key:'asis_value', label:'As Is Value', type:'uint', decimals:18, precision:18, suffix:' DAI' },
    // tslint:disable-next-line:max-line-length
    { key:'rehab_value', label:'Rehab Value', type:'uint', decimals:18, precision:18, suffix:' DAI' },
  ],
};

const TinlakeSetup = WithAdmin(WithBorrower(Tinlake));

const tinlake = new TinlakeSetup(
  new SignerProvider(rpcUrl, {
    signTransaction: (rawTx: any, cb: (arg0: null, arg1: any) => void) =>
      cb(null, sign(rawTx, borrowerPK)),
    accounts: (cb: (arg0: null, arg1: string[]) => void) => cb(null, [borrowerEthFrom]),
  }),
  contractAddresses,
  nftDataContractCall.outputs,
  transactionTimeout,
  {
    ethConfig: { from: borrowerEthFrom, gasLimit: `0x${gasLimit.toString(16)}` },
  },
);

async function mintIssue(user: string) {
  const mintResult = await tinlake.mintNFT(user);
  assert.equal(mintResult.status, SUCCESS_STATUS);
  const tokenCount = await tinlake.getNFTCount();
  await tinlake.issue(contractAddresses.NFT_COLLATERAL, tokenCount -  1);
}

it('issues a loan from a minted collateral NFT', async () => {
  await mintIssue(borrowerEthFrom);
  const tokenCount = await tinlake.getNFTCount();
  const loanCount = await tinlake.getTitleCount();
  console.log('TokenID:', `${tokenCount - 1}`);
  console.log('LoanID:', `${loanCount - 1}`);
  assert.equal(tokenCount, loanCount);
});

it('locks an NFT successfully', async () => {
  const loanCount = await tinlake.getTitleCount();
  const lockResult = await tinlake.lock(loanCount - 1);
  assert.equal(lockResult.status, SUCCESS_STATUS);
});

// it('unlocks an NFT successfully', async () => {
//   const loanCount = await tinlake.getTitleCount();
//   const unlockResult = await tinlake.unlock(loanCount - 1);
//   assert.equal(unlockResult.status, SUCCESS_STATUS);
// });

it('borrows money based on a locked NFT successfully', async () => {
  const ceilingAmount = '10000';
  const loanId = await tinlake.getTitleCount();
  const fileResult = await tinlake.fileCeiling(loanId - 1 , ceilingAmount);
  assert.equal(fileResult.status, SUCCESS_STATUS);
});

it('borrows money based on a locked NFT successfully', async () => {
  // const loanId = await tinlake.getTitleCount();
  // console.log('$$$$$$$', loanId.toString());
  // await tinlake.borrow;
});

// const fileResult = await tinlake.fileCeiling(loanId.toString(), ceilingAmount);
// assert.equal(fileResult.status, SUCCESS_STATUS);
