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
import { waitAndReturnEvents, executeAndRetry, ZERO_ADDRESS } from '../services/ethereum';
import BN from 'bn.js';
var web3 = require('web3-utils');
export function AdminActions(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.canQueryPermissions = function () {
                var _a, _b, _c, _d, _e, _f, _g;
                return !!((_a = _this.contracts['PILE']) === null || _a === void 0 ? void 0 : _a.wards) &&
                    !!((_b = _this.contracts['SENIOR']) === null || _b === void 0 ? void 0 : _b.wards) &&
                    !!((_c = _this.contracts['PRICE_POOL']) === null || _c === void 0 ? void 0 : _c.wards) &&
                    !!((_d = _this.contracts['ASSESSOR']) === null || _d === void 0 ? void 0 : _d.wards) &&
                    !!((_e = _this.contracts['JUNIOR_OPERATOR']) === null || _e === void 0 ? void 0 : _e.wards) &&
                    !!((_f = _this.contracts['SENIOR_OPERATOR']) === null || _f === void 0 ? void 0 : _f.wards) &&
                    !!((_g = _this.contracts['COLLECTOR']) === null || _g === void 0 ? void 0 : _g.wards);
            };
            _this.isWard = function (user, contractName) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = this.contracts[contractName]) === null || _a === void 0 ? void 0 : _a.wards)) {
                                return [2 /*return*/, new BN(0)];
                            }
                            return [4 /*yield*/, executeAndRetry(this.contracts[contractName].wards, [user])];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res[0]];
                    }
                });
            }); };
            _this.canSetInterestRate = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = this.contracts['PILE']) === null || _a === void 0 ? void 0 : _a.wards)) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, executeAndRetry(this.contracts['PILE'].wards, [user])];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res[0].toNumber() === 1];
                    }
                });
            }); };
            _this.canSetSeniorTrancheInterest = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(this.contractAddresses['SENIOR'] !== ZERO_ADDRESS)) return [3 /*break*/, 2];
                            if (!((_a = this.contracts['SENIOR']) === null || _a === void 0 ? void 0 : _a.wards)) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR'].wards, [user])];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res[0].toNumber() === 1];
                        case 2: return [2 /*return*/, false];
                    }
                });
            }); };
            _this.canSetRiskScore = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = this.contracts['PRICE_POOL']) === null || _a === void 0 ? void 0 : _a.wards)) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, executeAndRetry(this.contracts['PRICE_POOL'].wards, [user])];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res[0].toNumber() === 1];
                    }
                });
            }); };
            // lender permissions (note: allowance operator for default deployment)
            _this.canSetMinimumJuniorRatio = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = this.contracts['ASSESSOR']) === null || _a === void 0 ? void 0 : _a.wards)) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, executeAndRetry(this.contracts['ASSESSOR'].wards, [user])];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res[0].toNumber() === 1];
                    }
                });
            }); };
            _this.canSetInvestorAllowanceJunior = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = this.contracts['JUNIOR_OPERATOR']) === null || _a === void 0 ? void 0 : _a.wards)) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, executeAndRetry(this.contracts['JUNIOR_OPERATOR'].wards, [user])];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res[0].toNumber() === 1];
                    }
                });
            }); };
            _this.canSetInvestorAllowanceSenior = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = this.contracts['SENIOR_OPERATOR']) === null || _a === void 0 ? void 0 : _a.wards)) {
                                return [2 /*return*/, false];
                            }
                            if (!(this.contractAddresses['SENIOR_OPERATOR'] !== ZERO_ADDRESS)) return [3 /*break*/, 2];
                            return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR_OPERATOR'].wards, [user])];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res[0].toNumber() === 1];
                        case 2: return [2 /*return*/, false];
                    }
                });
            }); };
            _this.canSetLoanPrice = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!((_a = this.contracts['COLLECTOR']) === null || _a === void 0 ? void 0 : _a.wards)) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, executeAndRetry(this.contracts['COLLECTOR'].wards, [user])];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res[0].toNumber() === 1];
                    }
                });
            }); };
            // ------------ admin functions borrower-site -------------
            _this.existsRateGroup = function (ratePerSecond) { return __awaiter(_this, void 0, void 0, function () {
                var rateGroup, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rateGroup = getRateGroup(ratePerSecond);
                            return [4 /*yield*/, executeAndRetry(this.contracts['PILE'].rates, [rateGroup])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, !res.ratePerSecond.isZero()];
                    }
                });
            }); };
            _this.initRate = function (ratePerSecond) { return __awaiter(_this, void 0, void 0, function () {
                var rateGroup, txHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rateGroup = getRateGroup(ratePerSecond);
                            return [4 /*yield*/, executeAndRetry(this.contracts['PILE'].file, [web3.fromAscii('rate'), rateGroup, ratePerSecond, this.ethConfig])];
                        case 1:
                            txHash = _a.sent();
                            console.log("[Initialising rate] txHash: " + txHash);
                            return [2 /*return*/, waitAndReturnEvents(this.eth, txHash, this.contracts['PILE'].abi, this.transactionTimeout)];
                    }
                });
            }); };
            _this.changeRate = function (loan, ratePerSecond) { return __awaiter(_this, void 0, void 0, function () {
                var rateGroup, txHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rateGroup = getRateGroup(ratePerSecond);
                            return [4 /*yield*/, executeAndRetry(this.contracts['PILE'].changeRate, [loan, rateGroup, this.ethConfig])];
                        case 1:
                            txHash = _a.sent();
                            console.log("[Initialising rate] txHash: " + txHash);
                            return [2 /*return*/, waitAndReturnEvents(this.eth, txHash, this.contracts['PILE'].abi, this.transactionTimeout)];
                    }
                });
            }); };
            _this.setRate = function (loan, ratePerSecond) { return __awaiter(_this, void 0, void 0, function () {
                var rateGroup, txHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rateGroup = getRateGroup(ratePerSecond);
                            return [4 /*yield*/, executeAndRetry(this.contracts['PILE'].setRate, [loan, rateGroup, this.ethConfig])];
                        case 1:
                            txHash = _a.sent();
                            console.log("[Setting rate] txHash: " + txHash);
                            return [2 /*return*/, waitAndReturnEvents(this.eth, txHash, this.contracts['PILE'].abi, this.transactionTimeout)];
                    }
                });
            }); };
            // ------------ admin functions lender-site -------------
            _this.setMinimumJuniorRatio = function (ratio) { return __awaiter(_this, void 0, void 0, function () {
                var txHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['ASSESSOR'].file, [web3.fromAscii('minJuniorRatio'), ratio, this.ethConfig])];
                        case 1:
                            txHash = _a.sent();
                            console.log("[Assessor file] txHash: " + txHash);
                            return [2 /*return*/, waitAndReturnEvents(this.eth, txHash, this.contracts['ASSESSOR'].abi, this.transactionTimeout)];
                    }
                });
            }); };
            _this.approveAllowanceJunior = function (user, maxCurrency, maxToken) { return __awaiter(_this, void 0, void 0, function () {
                var txHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['JUNIOR_OPERATOR'].approve, [user, maxCurrency, maxToken, this.ethConfig])];
                        case 1:
                            txHash = _a.sent();
                            console.log("[Approve allowance Junior] txHash: " + txHash);
                            return [2 /*return*/, waitAndReturnEvents(this.eth, txHash, this.contracts['JUNIOR_OPERATOR'].abi, this.transactionTimeout)];
                    }
                });
            }); };
            _this.approveAllowanceSenior = function (user, maxCurrency, maxToken) { return __awaiter(_this, void 0, void 0, function () {
                var operatorType, txHash, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            operatorType = this.getOperatorType('senior');
                            _a = operatorType;
                            switch (_a) {
                                case 'PROPORTIONAL_OPERATOR': return [3 /*break*/, 1];
                            }
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR_OPERATOR'].approve, [user, maxCurrency, this.ethConfig])];
                        case 2:
                            txHash = _b.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, executeAndRetry(this.contracts['SENIOR_OPERATOR'].approve, [user, maxCurrency, maxToken, this.ethConfig])];
                        case 4:
                            txHash = _b.sent();
                            _b.label = 5;
                        case 5:
                            console.log("[Approve allowance Senior] txHash: " + txHash);
                            return [2 /*return*/, waitAndReturnEvents(this.eth, txHash, this.contracts['SENIOR_OPERATOR'].abi, this.transactionTimeout)];
                    }
                });
            }); };
            return _this;
        }
        return class_1;
    }(Base));
}
var ONE = '1000000000000000000000000000';
function getRateGroup(ratePerSecond) {
    return (ratePerSecond === ONE) ? 0 : ratePerSecond;
}
export default AdminActions;
//# sourceMappingURL=admin.js.map