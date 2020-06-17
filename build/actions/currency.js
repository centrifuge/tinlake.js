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
import { executeAndRetry, waitAndReturnEvents } from '../services/ethereum';
import BN from 'bn.js';
export function CurrencyActions(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // move out for tests only
            _this.mintCurrency = function (usr, amount) { return __awaiter(_this, void 0, void 0, function () {
                var txHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['TINLAKE_CURRENCY'].mint, [usr, amount, this.ethConfig])];
                        case 1:
                            txHash = _a.sent();
                            console.log("[Mint currency] txHash: " + txHash);
                            return [2 /*return*/];
                    }
                });
            }); };
            _this.getCurrencyBalance = function (user) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['TINLAKE_CURRENCY'].balanceOf, [user])];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res[0] || new BN(0)];
                    }
                });
            }); };
            _this.approveCurrency = function (usr, currencyAmount) { return __awaiter(_this, void 0, void 0, function () {
                var txHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, executeAndRetry(this.contracts['TINLAKE_CURRENCY'].approve, [usr, currencyAmount, this.ethConfig])];
                        case 1:
                            txHash = _a.sent();
                            console.log("[Currency.approve] txHash: " + txHash);
                            return [2 /*return*/, waitAndReturnEvents(this.eth, txHash, this.contracts['TINLAKE_CURRENCY'].abi, this.transactionTimeout)];
                    }
                });
            }); };
            _this.approveSeniorForCurrency = function (currencyAmount) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.contractAddresses['SENIOR'])
                        return [2 /*return*/];
                    return [2 /*return*/, this.approveCurrency(this.contractAddresses['SENIOR'], currencyAmount)];
                });
            }); };
            _this.approveJuniorForCurrency = function (currencyAmount) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.contractAddresses['JUNIOR'])
                        return [2 /*return*/];
                    return [2 /*return*/, this.approveCurrency(this.contractAddresses['JUNIOR'], currencyAmount)];
                });
            }); };
            return _this;
        }
        return class_1;
    }(Base));
}
export default CurrencyActions;
//# sourceMappingURL=currency.js.map