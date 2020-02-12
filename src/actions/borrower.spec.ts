import assert from 'assert';
const SignerProvider = require('ethjs-provider-signer');
const { sign } = require('ethjs-signer');
import WithBorrower from './borrower';
import Tinlake from '../Tinlake';

const borrowerEthFrom = '0xF6fa8a3F3199cDd85749Ec749Fb8F9C2551F9928';
const borrowerPK = '0xb2e0c8e791c37df214808cdadc187f0cba0e36160f1a38b321a25c9a0cea8c11';
const transactionTimeout = 36000;
const gasLimit = 1000000;

const SUCCESS_STATUS = '0x1';

// TODO: pull from address json after deployer script
const contractAddresses = {
  TINLAKE_CURRENCY: '0xd961caaad74eaa1f58969b0e841fe40642734469',
  LENDER_JUNIOR_OPERATOR: '0x3a3990838ed9ef61c433ed617d6059ffd0fd8a23',
  LENDER_DISTRIBUTOR: '0x7bdf4f54f90d45f6351a8fa9c02dd5fb23b5a36b',
  LENDER_ASSESSOR: '0xcc47983c4bacafd5dac609b412d42492f2076545',
  BORROWER_TITLE: '0xd9c4a49acf5b00f285ed537f2e40d3303e1ff917',
  BORROWER_SHELF: '0xe7675779f9b0a52a0e2b69044e0fd9882f347aad',
  BORROWER_CEILING: '0x837ed57890991b14f8fec146350c1675917d47f5',
  BORROWER_COLLECTOR: '0x23bb459601167cf2f457d041f47fe39f12a2df1f',
  BORROWER_THRESHOLD: '0xd5785559ff692cd235759ca01b78ba594f997c57',
  BORROWER_PRICE_POOL: '0xe7a4fb8f5bfb886b9c356f636c368d31df6fe493',
  // Manually deployed Title Contract
  NFT: '0x90e549d37be6f3b73e58306c338f199023dfccf8',
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

const TinlakeSetup = WithBorrower(Tinlake);

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

async function testMintIssue() {
  console.log(tinlake.ethConfig);
  const mintResult = await tinlake.mintNFT(borrowerEthFrom);
  assert.equal(mintResult.status, SUCCESS_STATUS);
  // // console.log(nftId);
  // // assert status success
  // const tokenId = await tinlake.getNFTCount();
  // console.log(`TokenID: ${tokenId.toString()}`);
  // await tinlake.issue(contractAddresses.NFT, `${tokenId.toString()}`);
  // const count = await tinlake.getTitleCount();
  // console.log(`LoanID: ${count.toString()}`);
  // await tinlake.lock(count.toString());
}

//testMintIssue();
