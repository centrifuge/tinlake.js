import assert from 'assert';
const SignerProvider = require('ethjs-provider-signer');
const { sign } = require('ethjs-signer');
import WithLender from './lender';
import WithAdmin from './admin';
import Tinlake, { displayToBase } from '../Tinlake';

export const lenderEthFrom = '0xe467AEf2203b64760e28D727901067f4745Ea8b8';
const lenderPK = '0xbf42a45ab45850cbc3f6095e608ed8704a3a7276b33c82730d5929ff4966566e';

// TODO: move testing config elsewhere
const transactionTimeout = 50000;
const gasLimit = 7000000;
const SUCCESS_STATUS = '0x1';

// TODO: pull from address json after deployer script
const contractAddresses = {
  TINLAKE_CURRENCY: '0x280b9c9319aeba68bf867823079d769766a0811a',
  LENDER_JUNIOR_OPERATOR: '0x2959c357ae5d93b693cf51a96721d64f3075f9c1',
  LENDER_DISTRIBUTOR: '0x97348a6a790f8e62f7b42175158b152573dc851e',
  LENDER_ASSESSOR: '0xe87d4f7425a361099312739b040e9852aaee2adf',
  BORROWER_TITLE: '0x8a34240c2ab43eb04d2e22710cc5f2a1ba77edd7',
  BORROWER_SHELF: '0x4947553dd3a9a35d0a55c6e47dd90888e48ece63',
  BORROWER_CEILING: '0xdc1ba41aa655acada6ccfe7582183f1effaddd92',
  BORROWER_COLLECTOR: '0x1d7ed2d29df79ee9f5db22f465bc0eb7b89652ab',
  BORROWER_THRESHOLD: '0x77535199f933f0199f59843f381c6ec480971006',
  BORROWER_PRICE_POOL: '0xa72b37fc17a8b5d4be711fdf8d3b5fad0d97ed94',
  // Manually deployed Title Contract
  NFT_COLLATERAL: '0xb5bd3762ffa159fa0b216316719db0a8fb103da7',
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

const TinlakeSetup = WithAdmin(WithLender(Tinlake));

const tinlake = new TinlakeSetup(
  new SignerProvider(rpcUrl, {
    signTransaction: (rawTx: any, cb: (arg0: null, arg1: any) => void) =>
      cb(null, sign(rawTx, lenderPK)),
    accounts: (cb: (arg0: null, arg1: string[]) => void) => cb(null, [lenderEthFrom]),
  }),
  contractAddresses,
  nftDataContractCall.outputs,
  transactionTimeout,
  {
    ethConfig: { from: lenderEthFrom, gasLimit: `0x${gasLimit.toString(16)}` },
  },
);

// it('supplies a tranche with some funds', async () => {
//   const currencyAmount = '1000';
//   const supplyResult = await tinlake.supplyJunior(currencyAmount);
//   assert.equal(supplyResult.status, SUCCESS_STATUS);
// });

