import { Decimal } from 'decimal.js-light';
Decimal.set({
    precision: 28,
    toExpNeg: -7,
    toExpPos: 29,
    rounding: Decimal.ROUND_HALF_CEIL,
});
var n = new Decimal(60 * 60 * 24 * 365);
var lookup = {};
/**
 * Get interest rate in percentage points for a specified fee.
 * This function uses a lookup table for performance reasons.
 * This function uses decimal.js-light, since we need non-integer powers for our calculations here.
 * We can remove that dependency in the future if we decide to either add a hardcoded
 * lookup table for fees and interest rates or if we decide to implement the relevant
 * functions here by hand.
 * @param fee Fee
 */
export var feeToInterestRate = function (fee) {
    var feeToConvert = fee;
    if (typeof feeToConvert !== 'string' && typeof feeToConvert !== 'number') {
        feeToConvert = feeToConvert.toString();
    }
    if (feeToConvert.toString() === '0') {
        return feeToConvert.toString();
    }
    if (lookup[feeToConvert]) {
        return lookup[feeToConvert];
    }
    var i = new Decimal(feeToConvert).div('1e27').minus(1).times(n);
    var interestRate = i.mul(100).toDecimalPlaces(1);
    var interestRateString = interestRate.toString();
    lookup[feeToConvert] = interestRateString;
    return interestRateString;
};
//# sourceMappingURL=feeToInterestRate.js.map