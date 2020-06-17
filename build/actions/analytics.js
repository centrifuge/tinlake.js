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
import { executeAndRetry, ZERO_ADDRESS } from '../services/ethereum';
import BN from 'bn.js';
export function AnalyticsActions(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // borrower analytics
            _this.getTotalDebt = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['PILE'].total, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.getTotalBalance = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['SHELF'].balance, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.getPrincipal = function (loanId) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['CEILING'].ceiling, [loanId])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res ? res[0] : new BN(0)];
                    }
                });
            }); };
            _this.getDebt = function (loanID) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['PILE'].debt, [loanID])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res ? res[0] : new BN(0)];
                    }
                });
            }); };
            _this.loanCount = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['TITLE'].count, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.getCollateral = function (loanId) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['SHELF'].shelf, [loanId])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res];
                    }
                });
            }); };
            _this.getOwnerOfCollateral = function (nftRegistryAddr, tokenId) { return __awaiter(_this, void 0, void 0, function () {
                var nft, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            nft = this.eth.contract(this.contractAbis['COLLATERAL_NFT']).at(nftRegistryAddr);
                            return [4 /*yield*/, executeAndRetry(nft.ownerOf, [tokenId])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.getInterestRate = function (loanId) { return __awaiter(_this, void 0, void 0, function () {
                var nftId, riskGroupRes, riskGroup, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['NFT_FEED'].nftID, [loanId])];
                        case 1:
                            nftId = (_a.sent())[0];
                            return [4 /*yield*/, executeAndRetry(this.contracts['NFT_FEED'].risk, [nftId])];
                        case 2:
                            riskGroupRes = _a.sent();
                            riskGroup = riskGroupRes[0] || new BN(0);
                            return [4 /*yield*/, executeAndRetry(this.contracts['PILE'].rates, [riskGroup])];
                        case 3:
                            res = _a.sent();
                            return [2 /*return*/, res ? res[2] : new BN(0)];
                    }
                });
            }); };
            _this.getOwnerOfLoan = function (loanId) { return __awaiter(_this, void 0, void 0, function () {
                var address, res, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, executeAndRetry(this.contracts['TITLE'].ownerOf, [loanId])];
                        case 1:
                            res = _a.sent();
                            address = res[0];
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            address = ZERO_ADDRESS;
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/, address];
                    }
                });
            }); };
            _this.getStatus = function (nftRegistryAddr, tokenId, loanId) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOwnerOfCollateral(nftRegistryAddr, tokenId)];
                        case 1:
                            if ((_a.sent()) === this.contracts['SHELF'].address) {
                                return [2 /*return*/, 'ongoing'];
                            }
                            return [4 /*yield*/, this.getOwnerOfLoan(loanId)];
                        case 2:
                            if ((_a.sent()) === ZERO_ADDRESS) {
                                return [2 /*return*/, 'closed'];
                            }
                            return [2 /*return*/, 'opened'];
                    }
                });
            }); };
            _this.getLoan = function (loanId) { return __awaiter(_this, void 0, void 0, function () {
                var collateral, principal, ownerOf, interestRate, debt, status;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (loanId === '0') {
                                return [2 /*return*/, null];
                            }
                            return [4 /*yield*/, this.getCollateral(loanId)];
                        case 1:
                            collateral = _a.sent();
                            return [4 /*yield*/, this.getPrincipal(loanId)];
                        case 2:
                            principal = _a.sent();
                            return [4 /*yield*/, this.getOwnerOfLoan(loanId)];
                        case 3:
                            ownerOf = _a.sent();
                            return [4 /*yield*/, this.getInterestRate(loanId)];
                        case 4:
                            interestRate = _a.sent();
                            return [4 /*yield*/, this.getDebt(loanId)];
                        case 5:
                            debt = _a.sent();
                            return [4 /*yield*/, this.getStatus(collateral.registry, collateral.tokenId, loanId)];
                        case 6:
                            status = _a.sent();
                            return [2 /*return*/, {
                                    loanId: loanId,
                                    principal: principal,
                                    interestRate: interestRate,
                                    ownerOf: ownerOf,
                                    debt: debt,
                                    status: status,
                                    registry: collateral.registry,
                                    tokenId: collateral.tokenId,
                                }];
                    }
                });
            }); };
            _this.getLoanList = function () { return __awaiter(_this, void 0, void 0, function () {
                var loanArray, count, i, loan;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            loanArray = [];
                            return [4 /*yield*/, this.loanCount()];
                        case 1:
                            count = (_a.sent()).toNumber();
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < count)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.getLoan(i.toString())];
                        case 3:
                            loan = _a.sent();
                            loan && loanArray.push(loan);
                            _a.label = 4;
                        case 4:
                            i += 1;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, loanArray];
                    }
                });
            }); };
            // lender analytics
            _this.getInvestor = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var includeSenior, tokenBalanceJunior, tokenBalanceSenior, _a, maxSupplyJunior, maxSupplySenior, _b, maxRedeemJunior, maxRedeemSenior, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            includeSenior = this.existsSenior();
                            return [4 /*yield*/, this.getJuniorTokenBalance(user)];
                        case 1:
                            tokenBalanceJunior = _d.sent();
                            _a = includeSenior;
                            if (!_a) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.getSeniorTokenBalance(user)];
                        case 2:
                            _a = (_d.sent());
                            _d.label = 3;
                        case 3:
                            tokenBalanceSenior = _a || new BN(0);
                            return [4 /*yield*/, this.getMaxSupplyAmountJunior(user)];
                        case 4:
                            maxSupplyJunior = _d.sent();
                            _b = includeSenior;
                            if (!_b) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.getMaxSupplyAmountSenior(user)];
                        case 5:
                            _b = (_d.sent());
                            _d.label = 6;
                        case 6:
                            maxSupplySenior = _b || new BN(0);
                            return [4 /*yield*/, this.getMaxRedeemAmountJunior(user)];
                        case 7:
                            maxRedeemJunior = _d.sent();
                            _c = includeSenior;
                            if (!_c) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.getMaxRedeemAmountSenior(user)];
                        case 8:
                            _c = (_d.sent());
                            _d.label = 9;
                        case 9:
                            maxRedeemSenior = _c || new BN(0);
                            return [2 /*return*/, {
                                    junior: {
                                        tokenBalance: tokenBalanceJunior,
                                        maxSupply: maxSupplyJunior,
                                        maxRedeem: maxRedeemJunior,
                                    },
                                    senior: {
                                        tokenBalance: tokenBalanceSenior || new BN(0),
                                        maxSupply: maxSupplySenior || new BN(0),
                                        maxRedeem: maxRedeemSenior || new BN(0),
                                    },
                                    address: user,
                                }];
                    }
                });
            }); };
            _this.getJuniorTokenBalance = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['JUNIOR_TOKEN'].balanceOf, [user])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.getJuniorTotalSupply = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['JUNIOR_TOKEN'].totalSupply, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.getMaxSupplyAmountJunior = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['JUNIOR_OPERATOR'].maxCurrency, [user])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.getMaxRedeemAmountJunior = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['JUNIOR_OPERATOR'].maxToken, [user])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.getTokenPriceJunior = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['ASSESSOR'].calcTokenPrice, [this.contractAddresses['JUNIOR']])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.existsSenior = function () {
                return _this.contractAddresses['SENIOR_OPERATOR'] !== ZERO_ADDRESS;
            };
            _this.getSeniorTokenBalance = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.existsSenior()) {
                                return [2 /*return*/, new BN(0)];
                            }
                            return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR_TOKEN'].balanceOf, [user])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.getSeniorTotalSupply = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.existsSenior()) {
                                return [2 /*return*/, new BN(0)];
                            }
                            return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR_TOKEN'].totalSupply, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.getMaxSupplyAmountSenior = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var operatorType, maxSupply, _a, supplyLimitRes, suppliedRes, res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.contractAddresses['SENIOR_OPERATOR'] === ZERO_ADDRESS)
                                return [2 /*return*/, new BN(0)];
                            operatorType = this.getOperatorType('senior');
                            _a = operatorType;
                            switch (_a) {
                                case 'PROPORTIONAL_OPERATOR': return [3 /*break*/, 1];
                                case 'ALLOWANCE_OPERATOR': return [3 /*break*/, 4];
                            }
                            return [3 /*break*/, 6];
                        case 1: return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR_OPERATOR'].supplyMaximum, [user])];
                        case 2:
                            supplyLimitRes = _b.sent();
                            return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR_OPERATOR'].tokenReceived, [user])];
                        case 3:
                            suppliedRes = _b.sent();
                            maxSupply = supplyLimitRes[0].sub(suppliedRes[0]);
                            return [3 /*break*/, 7];
                        case 4: return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR_OPERATOR'].maxCurrency, [user])];
                        case 5:
                            res = _b.sent();
                            maxSupply = res[0];
                            return [3 /*break*/, 7];
                        case 6:
                            maxSupply = new BN(0);
                            _b.label = 7;
                        case 7: return [2 /*return*/, maxSupply];
                    }
                });
            }); };
            _this.getMaxRedeemAmountSenior = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var operatorType, maxRedeem, _a, redeemLimitRes, res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.contractAddresses['SENIOR_OPERATOR'] === ZERO_ADDRESS)
                                return [2 /*return*/, new BN(0)];
                            operatorType = this.getOperatorType('senior');
                            _a = operatorType;
                            switch (_a) {
                                case 'PROPORTIONAL_OPERATOR': return [3 /*break*/, 1];
                                case 'ALLOWANCE_OPERATOR': return [3 /*break*/, 3];
                            }
                            return [3 /*break*/, 5];
                        case 1: return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR_OPERATOR'].calcMaxRedeemToken, [user])];
                        case 2:
                            redeemLimitRes = _b.sent();
                            maxRedeem = redeemLimitRes[0];
                            return [3 /*break*/, 6];
                        case 3: return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR_OPERATOR'].maxToken, [user])];
                        case 4:
                            res = _b.sent();
                            maxRedeem = res[0];
                            return [3 /*break*/, 6];
                        case 5:
                            maxRedeem = new BN(0);
                            _b.label = 6;
                        case 6: return [2 /*return*/, maxRedeem];
                    }
                });
            }); };
            _this.getTokenPriceSenior = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var operatorType, tokenPrice, _a, customTokenPriceRes, res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.contractAddresses['SENIOR_OPERATOR'] === ZERO_ADDRESS)
                                return [2 /*return*/, new BN(0)];
                            operatorType = user ? this.getOperatorType('senior') : 'ALLOWANCE_OPERATOR';
                            _a = operatorType;
                            switch (_a) {
                                case 'PROPORTIONAL_OPERATOR': return [3 /*break*/, 1];
                                case 'ALLOWANCE_OPERATOR': return [3 /*break*/, 3];
                            }
                            return [3 /*break*/, 5];
                        case 1: return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR_OPERATOR'].calcTokenPrice, [user])];
                        case 2:
                            customTokenPriceRes = _b.sent();
                            tokenPrice = customTokenPriceRes[0];
                            return [3 /*break*/, 6];
                        case 3: return [4 /*yield*/, executeAndRetry(this.contracts['ASSESSOR'].calcTokenPrice, [this.contractAddresses['SENIOR']])];
                        case 4:
                            res = _b.sent();
                            tokenPrice = res[0];
                            return [3 /*break*/, 6];
                        case 5:
                            tokenPrice = new BN(0);
                            _b.label = 6;
                        case 6: return [2 /*return*/, tokenPrice];
                    }
                });
            }); };
            _this.getSeniorReserve = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.contractAddresses['SENIOR'] !== ZERO_ADDRESS)) return [3 /*break*/, 2];
                            return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR'].balance, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0] || new BN(0)];
                        case 2: return [2 /*return*/, new BN(0)];
                    }
                });
            }); };
            _this.getJuniorReserve = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['JUNIOR'].balance, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0] || new BN(0)];
                    }
                });
            }); };
            _this.getMinJuniorRatio = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['ASSESSOR'].minJuniorRatio, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0] || new BN(0)];
                    }
                });
            }); };
            _this.getCurrentJuniorRatio = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['ASSESSOR'].currentJuniorRatio, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0] || new BN(0)];
                    }
                });
            }); };
            _this.getAssetValueJunior = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['ASSESSOR'].calcAssetValue, [this.contractAddresses['JUNIOR']])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0] || new BN(0)];
                    }
                });
            }); };
            _this.getSeniorDebt = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.contractAddresses['SENIOR'] !== ZERO_ADDRESS)) return [3 /*break*/, 2];
                            return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR'].debt, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0] || new BN(0)];
                        case 2: return [2 /*return*/, new BN(0)];
                    }
                });
            }); };
            _this.getSeniorInterestRate = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.contractAddresses['SENIOR'] !== ZERO_ADDRESS)) return [3 /*break*/, 2];
                            return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR'].ratePerSecond, [])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0] || new BN(0)];
                        case 2: return [2 /*return*/, new BN(0)];
                    }
                });
            }); };
            return _this;
        }
        return class_1;
    }(Base));
}
export default AnalyticsActions;
//# sourceMappingURL=analytics.js.map