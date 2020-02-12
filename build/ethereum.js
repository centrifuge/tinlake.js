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
var _this = this;
import { AbiCoder } from 'web3-eth-abi';
import { sha3 } from 'web3-utils';
var abiCoder = new AbiCoder();
// tslint:disable-next-line:prefer-array-literal
export function executeAndRetry(f, args) {
    if (args === void 0) { args = []; }
    return __awaiter(this, void 0, void 0, function () {
        var result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, f.apply(void 0, args)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    e_1 = _a.sent();
                    // using error message, since error code -32603 is not unique enough
                    // todo introduce retry limit
                    if (e_1 && e_1.message && (e_1.message.indexOf("Cannot read property 'number' of null") !== -1 ||
                        e_1.message.indexOf('error with payload') !== -1)) {
                        console.log('internal RPC error detected, retry triggered...', e_1);
                        throw (new Error('Internal RPC Error. Please try again.'));
                        // await sleep(1000);
                        // return executeAndRetry(f, args);
                    }
                    else {
                        throw (e_1);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// tslint:disable-next-line:max-line-length
export var waitAndReturnEvents = function (eth, txHash, abi, transactionTimeout) { return __awaiter(_this, void 0, void 0, function () {
    var tx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, waitForTransaction(eth, txHash, transactionTimeout)];
            case 1:
                tx = _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        eth.getTransactionReceipt(tx.hash, function (err, receipt) {
                            if (err != null) {
                                reject('failed to get receipt');
                            }
                            var events = getEvents(receipt, abi);
                            resolve({ events: events, txHash: tx.hash, status: receipt.status });
                        });
                    })];
        }
    });
}); };
// todo replace with a better polling
// TODO : use polling interval from config
export var waitForTransaction = function (eth, txHash, transactionTimeout) {
    return new Promise(function (resolve, reject) {
        var secMax = transactionTimeout;
        var sec = 0;
        var wait = function (txHash) {
            setTimeout(function () {
                eth.getTransactionByHash(txHash, function (err, tx) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (tx && tx.blockHash != null) {
                        resolve(tx);
                        return;
                    }
                    console.log("waiting for tx :" + txHash);
                    sec = sec + 1;
                    if (sec < secMax) {
                        wait(txHash);
                    }
                    else {
                        // tslint:disable-next-line:max-line-length
                        reject(new Error("waiting for transaction tx " + txHash + " timed out after " + secMax + " seconds"));
                    }
                });
            }, 1000);
        };
        wait(txHash);
    });
};
export var findEvent = function (abi, funcSignature) {
    return abi.filter(function (item) {
        if (item.type !== 'event')
            return false;
        var signature = item.name + "(" + item.inputs.map(function (input) { return input.type; }).join(',') + ")";
        var hash = sha3(signature);
        if (hash === funcSignature)
            return true;
    });
};
var getEvents = function (receipt, abi) {
    if (receipt.logs.length === 0) {
        return null;
    }
    var events = [];
    receipt.logs.forEach(function (log) {
        var funcSignature = log.topics[0];
        var matches = findEvent(abi, funcSignature);
        if (matches.length === 1) {
            var event = matches[0];
            var inputs = event.inputs.filter(function (input) { return input.indexed; })
                .map(function (input) { return input.type; });
            // remove 0x prefix from topics
            var topics = log.topics.map(function (t) {
                return t.replace('0x', '');
            });
            // concat topics without first topic (func signature)
            var bytes = "0x" + topics.slice(1).join('');
            var data = abiCoder.decodeParameters(inputs, bytes);
            events.push({ event: event, data: data });
        }
    });
    return events;
};
//# sourceMappingURL=ethereum.js.map