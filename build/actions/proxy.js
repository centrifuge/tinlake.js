var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { waitAndReturnEvents, executeAndRetry } from '../services/ethereum';
var abiCoder = require('web3-eth-abi');
import { ethers } from 'ethers';
export function ProxyActions(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.getProxyAccessTokenOwner = function (tokenId) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['PROXY_REGISTRY'].ownerOf, [tokenId])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.buildProxy = function (owner) { return __awaiter(_this, void 0, void 0, function () {
                var txHash, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['PROXY_REGISTRY'].build, [owner, this.ethConfig])];
                        case 1:
                            txHash = _a.sent();
                            console.log("[Proxy created] txHash: " + txHash);
                            return [4 /*yield*/, waitAndReturnEvents(this.eth, txHash, this.contracts['PROXY_REGISTRY'].abi, this.transactionTimeout)];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, response.events[0].data[2].toString()];
                    }
                });
            }); };
            _this.getProxy = function (accessTokenId) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['PROXY_REGISTRY'].proxies, [accessTokenId, this.ethConfig])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.getProxyAccessToken = function (proxyAddr) { return __awaiter(_this, void 0, void 0, function () {
                var proxy, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proxy = this.eth.contract(this.contractAbis['PROXY']).at(proxyAddr);
                            return [4 /*yield*/, executeAndRetry(proxy.accessToken, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0].toNumber()];
                    }
                });
            }); };
            _this.getProxyOwnerByLoan = function (loanId) { return __awaiter(_this, void 0, void 0, function () {
                var res, loanOwner, accessToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['TITLE'].ownerOf, [loanId])];
                        case 1:
                            res = _a.sent();
                            loanOwner = res[0];
                            return [4 /*yield*/, this.getProxyAccessToken(loanOwner)];
                        case 2:
                            accessToken = _a.sent();
                            return [2 /*return*/, this.getProxyAccessTokenOwner(accessToken)];
                    }
                });
            }); };
            _this.getProxyOwnerByAddress = function (proxyAddress) { return __awaiter(_this, void 0, void 0, function () {
                var accessToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getProxyAccessToken(proxyAddress)];
                        case 1:
                            accessToken = _a.sent();
                            return [2 /*return*/, this.getProxyAccessTokenOwner(accessToken)];
                    }
                });
            }); };
            _this.proxyCount = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['PROXY_REGISTRY'].count, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.checkProxyExists = function (address) { return __awaiter(_this, void 0, void 0, function () {
                var count, i, accessToken, ownerBN;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.proxyCount()];
                        case 1:
                            count = (_a.sent()).toNumber();
                            i = 1;
                            _a.label = 2;
                        case 2:
                            if (!(i < count)) return [3 /*break*/, 6];
                            accessToken = i.toString();
                            return [4 /*yield*/, this.getProxyAccessTokenOwner(accessToken)];
                        case 3:
                            ownerBN = _a.sent();
                            if (!(ownerBN && ethers.utils.getAddress(ownerBN.toString()) === ethers.utils.getAddress(address))) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.getProxy(accessToken)];
                        case 4: return [2 /*return*/, _a.sent()];
                        case 5:
                            i += 1;
                            return [3 /*break*/, 2];
                        case 6: return [2 /*return*/, null];
                    }
                });
            }); };
            _this.proxyCreateNew = function (address) { return __awaiter(_this, void 0, void 0, function () {
                var accessToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.buildProxy(address)];
                        case 1:
                            accessToken = _a.sent();
                            return [2 /*return*/, this.getProxy(accessToken)];
                    }
                });
            }); };
            _this.proxyIssue = function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            }); };
            _this.proxyTransferIssue = function (proxyAddr, nftRegistryAddr, tokenId) { return __awaiter(_this, void 0, void 0, function () {
                var proxy, encoded, txHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proxy = this.eth.contract(this.contractAbis['PROXY']).at(proxyAddr);
                            encoded = abiCoder.encodeFunctionCall({
                                name: 'transferIssue',
                                type: 'function',
                                inputs: [
                                    { type: 'address', name: 'shelf' },
                                    { type: 'address', name: 'registry' },
                                    { type: 'uint256', name: 'token' }
                                ]
                            }, [this.contracts['SHELF'].address, nftRegistryAddr, tokenId]);
                            return [4 /*yield*/, executeAndRetry(proxy.execute, [this.contracts['ACTIONS'].address, encoded, this.ethConfig])];
                        case 1:
                            txHash = _a.sent();
                            console.log("[Proxy Transfer Issue Loan] txHash: " + txHash);
                            return [2 /*return*/, waitAndReturnEvents(this.eth, txHash, this.contractAbis['PROXY'], this.transactionTimeout)];
                    }
                });
            }); };
            _this.proxyLockBorrowWithdraw = function (proxyAddr, loanId, amount, usr) { return __awaiter(_this, void 0, void 0, function () {
                var proxy, encoded, txHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proxy = this.eth.contract(this.contractAbis['PROXY']).at(proxyAddr);
                            encoded = abiCoder.encodeFunctionCall({
                                name: 'lockBorrowWithdraw',
                                type: 'function',
                                inputs: [
                                    { type: 'address', name: 'shelf' },
                                    { type: 'uint256', name: 'loan' },
                                    { type: 'uint256', name: 'amount' },
                                    { type: 'address', name: 'usr' }
                                ]
                            }, [this.contracts['SHELF'].address, loanId, amount, usr]);
                            return [4 /*yield*/, executeAndRetry(proxy.execute, [this.contracts['ACTIONS'].address, encoded, this.ethConfig])];
                        case 1:
                            txHash = _a.sent();
                            console.log("[Proxy Lock Borrow Withdraw] txHash: " + txHash);
                            return [2 /*return*/, waitAndReturnEvents(this.eth, txHash, this.contractAbis['PROXY'], this.transactionTimeout)];
                    }
                });
            }); };
            _this.proxyRepayUnlockClose = function (proxyAddr, tokenId, loanId, registry) { return __awaiter(_this, void 0, void 0, function () {
                var proxy, encoded, txHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proxy = this.eth.contract(this.contractAbis['PROXY']).at(proxyAddr);
                            encoded = abiCoder.encodeFunctionCall({
                                name: 'repayUnlockClose',
                                type: 'function',
                                inputs: [
                                    { type: 'address', name: 'shelf' },
                                    { type: 'address', name: 'pile' },
                                    { type: 'address', name: 'registry' },
                                    { type: 'uint256', name: 'token' },
                                    { type: 'address', name: 'erc20' },
                                    { type: 'uint256', name: 'loan' }
                                ]
                            }, [this.contracts['SHELF'].address, this.contracts['PILE'].address, registry, tokenId, this.contracts['TINLAKE_CURRENCY'].address, loanId]);
                            return [4 /*yield*/, executeAndRetry(proxy.execute, [this.contracts['ACTIONS'].address, encoded, this.ethConfig])];
                        case 1:
                            txHash = _a.sent();
                            console.log("[Proxy Repay Unlock Close] txHash: " + txHash);
                            return [2 /*return*/, waitAndReturnEvents(this.eth, txHash, this.contractAbis['PROXY'], this.transactionTimeout)];
                    }
                });
            }); };
            return _this;
        }
        return class_1;
    }(Base));
}
export default ProxyActions;
//# sourceMappingURL=proxy.js.map