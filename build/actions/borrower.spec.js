var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import assert from 'assert';
var SignerProvider = require('ethjs-provider-signer');
var sign = require('ethjs-signer').sign;
import WithBorrower from './borrower';
import Tinlake from '../Tinlake';
var borrowerEthFrom = '0xc769dF0292450129452ce8EEDc5437f46EB77b97';
var borrowerPK = '0xb2e0c8e791c37df214808cdadc187f0cba0e36160f1a38b321a25c9a0cea8c11';
var transactionTimeout = 36000;
var gasLimit = 7000000;
var SUCCESS_STATUS = '0x1';
// TODO: pull from address json after deployer script
var contractAddresses = {
    "DEPLOYMENT_NAME": "Local Test Deployment",
    "ROOT_CONTRACT": "0xde0446b1c883179fd99f7c02d6fb376b93c0ffc6",
    "TINLAKE_CURRENCY": "0xaffae363518f811bbc1a6df93e6816d9cfa07365",
    "LENDER_DEPLOYER": "0xd3b7bc2ac07b53c040731031d9ac8693d140984b",
    "LENDER_OPERATOR_FAB": "0xee32dc5dfe4faefc5545f0eb44cca6de2390e8d7",
    "LENDER_ASSESSOR_FAB": "0x7d6bdd535dfbdda3b2c29b508a9444098c8410b9",
    "LENDER_DISTRIBUTOR_FAB": "0x41d064b13c142380d6f1dfd6b3498ed41b187813",
    "LENDER_TRANCHE_FAB": "0x96fb41252f9b1145ea239784e3323c8fc6d93417",
    "LENDER_SENIOR_TRANCHE_FAB": "0x0000000000000000000000000000000000000000",
    "LENDER_SENIOR_OPERATOR_FAB": "0x0000000000000000000000000000000000000000",
    "LENDER_JUNIOR_OPERATOR": "0xbc12a1d5f650918ed248a1278ebf62a7486d1c83",
    "LENDER_JUNIOR": "0x662a1e022d4cc32683ac7bfbf7ffdee672cfcc4a",
    "LENDER_SENIOR": "0x0000000000000000000000000000000000000000",
    "LENDER_SENIOR_OPERATOR": "0x0000000000000000000000000000000000000000",
    "LENDER_DISTRIBUTOR": "0xda2d8534114deb59a780f45f0ba4d4cab3606291",
    "LENDER_ASSESSOR": "0x426cca49ac3dbf04efe77149b84e4fe94cd686bf",
    "BORROWER_DEPLOYER": "0x4e1c46f4b970f2b388552e118c15a2ac8caafe3a",
    "BORROWER_TITLE_FAB": "0xc9018407717e56ee8b29d36a3e3940a991c2fae0",
    "BORROWER_SHELF_FAB": "0xab7f045057b295d13741f02b26c239d7d784876a",
    "BORROWER_PILE_FAB": "0x5a6c7a0eb7af5c393ff65115de35d42f08165c70",
    "BORROWER_COLLECTOR_FAB": "0xb77f77648eb84b826ccd80dfdbdcf6c0d7ea61c9",
    "BORROWER_THRESHOLD_FAB": "0x0416064b20507de4bfadd07a577a7dc95ba12630",
    "BORROWER_PRICEPOOL_FAB": "0xabcf7a0f1ea7415c2fe45df5baa2a25b4bf0ac48",
    "BORROWER_CEILING_FAB": "0xaffc29ccad57d6cd1d21d2a1bcc93b01540de561",
    "BORROWER_TITLE": "0x18b844f9645843acab1196436777acbb826d95b9",
    "BORROWER_PILE": "0x1122f3a97c3eae6ec3ef5977b6b72526890aca4b",
    "BORROWER_SHELF": "0x59d9c26b7c9218ffc393dd8a608c76597cda46da",
    "BORROWER_CEILING": "0xca9d6f90adfbdae5dfae43b0976809f2bf0f0f85",
    "BORROWER_COLLECTOR": "0x6bbb53585d4742754e90f13fd0f6faf8980f47e7",
    "BORROWER_THRESHOLD": "0x5678fde6dbc58855a44989c90b3a83a789de4771",
    "BORROWER_PRICE_POOL": "0x79b3b11fa680b55c8e38047427d10d4351ffa4da",
    "GOVERNANCE": "0xc769df0292450129452ce8eedc5437f46eb77b97"
};
var rpcUrl = 'http://127.0.0.1:8545';
var nftDataContractCall = {
    outputs: [
        { name: 'document_version', type: 'uint256' },
        { name: 'amount', type: 'uint256' },
        { name: 'asis_value', type: 'uint256' },
        { name: 'rehab_value', type: 'uint256' },
        { name: 'borrower', type: 'address' },
    ],
    displayedFields: [
        // tslint:disable-next-line:max-line-length
        { key: 'amount', label: 'Mortgage Amount', type: 'uint', decimals: 18, precision: 18, suffix: ' DAI' },
        // tslint:disable-next-line:max-line-length
        { key: 'asis_value', label: 'As Is Value', type: 'uint', decimals: 18, precision: 18, suffix: ' DAI' },
        // tslint:disable-next-line:max-line-length
        { key: 'rehab_value', label: 'Rehab Value', type: 'uint', decimals: 18, precision: 18, suffix: ' DAI' },
    ],
};
var TinlakeSetup = WithBorrower(Tinlake);
var tinlake = new TinlakeSetup(new SignerProvider(rpcUrl, {
    signTransaction: function (rawTx, cb) {
        return cb(null, sign(rawTx, borrowerPK));
    },
    accounts: function (cb) { return cb(null, [borrowerEthFrom]); },
}), contractAddresses, nftDataContractCall.outputs, transactionTimeout, {
    ethConfig: { from: borrowerEthFrom, gasLimit: "0x" + gasLimit.toString(16) },
});
function testMintIssue() {
    return __awaiter(this, void 0, void 0, function () {
        var mintResult, tokenId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(tinlake.ethConfig);
                    console.log("mint mint");
                    return [4 /*yield*/, tinlake.mintNFT(borrowerEthFrom)];
                case 1:
                    mintResult = _a.sent();
                    console.log("mint mint", mintResult);
                    assert.equal(mintResult.status, SUCCESS_STATUS);
                    return [4 /*yield*/, tinlake.getNFTCount()];
                case 2:
                    tokenId = _a.sent();
                    console.log("TokenID: " + tokenId.toString());
                    return [2 /*return*/];
            }
        });
    });
}
testMintIssue();
//# sourceMappingURL=borrower.spec.js.map