import Tinlake from '../Tinlake';
import WithAnalytics from './analytics';
const SignerProvider = require('ethjs-provider-signer');
const { sign } = require('ethjs-signer');

const borrowerEthFrom = '0x08f3Ba249a9507f4e91e8aD8a357dCF83Ea264A8';
const transactionTimeout = 36000;
const gasLimit = 1000000;
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
  NFT_COLLATERAL: '0x3ca4150420b26093761f8a50e5982b1d8d24387a',
};

const rpcUrl = 'https://kovan.infura.io/v3/092108ec6aea46ab97b2175b45130455';

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

const TinlakeSetup = WithAnalytics(Tinlake);

const tinlake = new TinlakeSetup(
  new SignerProvider(rpcUrl, {
    signTransaction: (rawTx: any, cb: (arg0: null, arg1: any) => void) =>
    cb(null, sign(rawTx, process.env.DEFAULT_TEST_BORROWER_SK)),
    accounts: (cb: (arg0: null, arg1: string[]) => void) => cb(null, [borrowerEthFrom]),
  }),
  contractAddresses,
  nftDataContractCall.outputs,
  transactionTimeout,
  {
    ethConfig: { from: borrowerEthFrom, gasLimit: `0x${gasLimit.toString(16)}` },
  },
);

// getDebt();
//
// async function getDebt() {
//   const debt = await tinlake.getTotalDebt();
//   console.log('total debt', debt);
// }

