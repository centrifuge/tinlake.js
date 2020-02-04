import Tinlake from "../Tinlake.ts";
import WithAnalytics from "./analytics";
const SignerProvider = require('ethjs-provider-signer');
const { sign } = require('ethjs-signer');


const borrowerEthFrom = `0x08f3Ba249a9507f4e91e8aD8a357dCF83Ea264A8`;
const transactionTimeout = 36000;
const gasLimit = 1000000;
const contractAddresses = {
  "CURRENCY": "0x2cab5720ce6e95fdfda58c1a6c693580324b7109",
  "TITLE": "0x36a02a1b00c11534154f8f3911259040dd463ab7",
  "LIGHTSWITCH": "0xe73c75c3ca7decd8c680149ab6e43f81e1d89461",
  "PILE": "0x4ba5a2315be7edaaf404636cd3a4657547a723cd",   
  "SHELF": "0xcefa4cb6a00b1f48d47937c5410e0e46a9048b03",  
  "COLLATERAL": "0xc6289cf245593b576cc451099ace11c5d30d4131", 
  "NFT_COLLATERAL": "0x3ca4150420b26093761f8a50e5982b1d8d24387a" 
};

const rpcUrl = "https://kovan.infura.io/v3/092108ec6aea46ab97b2175b45130455";

const nftDataContractCall = {
      outputs:[
      {"name":"document_version","type":"uint256" },
      {"name":"amount","type":"uint256" },
      {"name":"asis_value","type":"uint256" }, 
      {"name":"rehab_value","type":"uint256" }, 
      {"name":"borrower","type":"address" } 
    ],
    displayedFields:[
      {"key":"amount", "label":"Mortgage Amount", "type":"uint", "decimals":18, "precision":18, "suffix":" DAI" }, 
      {"key":"asis_value", "label":"As Is Value", "type":"uint", "decimals":18, "precision":18, "suffix":" DAI" }, 
      {"key":"rehab_value", "label":"Rehab Value", "type":"uint", "decimals":18, "precision":18, "suffix":" DAI" }
    ] 
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

getDebt();


async function getDebt(){
  const debt = await tinlake.getTotalDebt();
  console.log("total debt", debt);
}
