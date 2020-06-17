var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
import Tinlake from '../Tinlake';
import { executeAndRetry } from '../services/ethereum';
var Eth = require('ethjs');
var SignerProvider = require('ethjs-provider-signer');
var sign = require('ethjs-signer').sign;
var TestProvider = /** @class */ (function () {
    function TestProvider(testConfig) {
        var rpcUrl = testConfig.rpcUrl, godAccount = testConfig.godAccount, gasLimit = testConfig.gasLimit, transactionTimeout = testConfig.transactionTimeout;
        this.eth = new Eth(createSignerProvider(rpcUrl, godAccount));
        this.ethConfig = { from: godAccount.address, gasLimit: "0x" + gasLimit.toString(16) };
        this.transactionTimeout = transactionTimeout;
        this.sponsorAccount = godAccount;
    }
    TestProvider.prototype.fundAccountWithETH = function (usr, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var nonce, transaction, signedTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.eth.getTransactionCount(this.ethConfig.from)];
                    case 1:
                        nonce = _a.sent();
                        transaction = {
                            nonce: nonce,
                            from: this.ethConfig.from,
                            to: usr,
                            value: amount,
                            gas: this.ethConfig.gasLimit,
                        };
                        signedTransaction = sign(transaction, this.sponsorAccount.privateKey);
                        return [4 /*yield*/, executeAndRetry(this.eth.sendRawTransaction, [signedTransaction])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestProvider;
}());
export { TestProvider };
export function createTinlake(usr, testConfig) {
    var rpcUrl = testConfig.rpcUrl, transactionTimeout = testConfig.transactionTimeout, gasLimit = testConfig.gasLimit, contractAddresses = testConfig.contractAddresses;
    var tinlake = new Tinlake({
        contractAddresses: contractAddresses,
        transactionTimeout: transactionTimeout,
        provider: createSignerProvider(rpcUrl, usr),
        ethConfig: { from: usr.address, gasLimit: "0x" + gasLimit.toString(16) },
    });
    return tinlake;
}
function createSignerProvider(rpcUrl, usr) {
    return new SignerProvider(rpcUrl, {
        signTransaction: function (rawTx, cb) {
            return cb(null, sign(rawTx, usr.privateKey));
        },
        accounts: function (cb) { return cb(null, [usr.address]); },
    });
}
//# sourceMappingURL=utils.js.map