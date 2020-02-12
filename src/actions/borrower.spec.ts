import assert from 'assert';
const SignerProvider = require('ethjs-provider-signer');
const { sign } = require('ethjs-signer');
import WithBorrower from './borrower';
import Tinlake from '../Tinlake';
import contractAddresses from '../../test/addresses.json';
import nftDataContractCall from '../../test/nft_data_contract_call.json';

const borrowerEthFrom = '0xF6fa8a3F3199cDd85749Ec749Fb8F9C2551F9928';
const borrowerPK = '0xb2e0c8e791c37df214808cdadc187f0cba0e36160f1a38b321a25c9a0cea8c11';
const transactionTimeout = 36000;
const gasLimit = 7000000;
const SUCCESS_STATUS = '0x1';
const rpcUrl = 'http://127.0.0.1:8545';

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
  const mintResult = await tinlake.mintNFT(borrowerEthFrom);
  assert.equal(mintResult.status, SUCCESS_STATUS);

  // assert status success
  const tokenCount = await tinlake.getNFTCount();
  const tokenId = tokenCount - 1;
  const loanId = await tinlake.issue(contractAddresses.NFT_COLLATERAL, tokenId);
  const count = await tinlake.getTitleCount();
  console.log("loans minted", count);
  await tinlake.lock(loanId);
  const nftCount = await tinlake.getNFTCount();
  console.log("nfts minted", nftCount);
}


//testMintIssue();
