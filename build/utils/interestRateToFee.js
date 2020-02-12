import { Decimal } from 'decimal.js-light';
Decimal.set({
    precision: 28,
    toExpNeg: -7,
    toExpPos: 29,
});
var n = new Decimal(60 * 60 * 24 * 365);
var lookup = {};
/**
 * Get fee for a specified interest rate. This function uses a lookup table for performance reasons.
 * This function uses decimal.js-light, since we need non-integer powers for our calculations here.
 * We can remove that dependency in the future if we decide to either add a hardcoded
 * lookup table for fees and interest rates or if we decide to implement the relevant
 * functions here by hand.
 * @param interestRate Interest rate in percentage points, i. e. "5" for 5 % (= 0.05)
 */
export var interestRateToFee = function (interestRate) {
    if (lookup[interestRate]) {
        return lookup[interestRate];
    }
    var i = new Decimal(interestRate).div(100).plus(1);
    var fee = i.pow(new Decimal(1).div(n)).mul('1e27').toDecimalPlaces(0);
    var feeString = fee.toString();
    lookup[interestRate] = feeString;
    return feeString;
};
//# sourceMappingURL=interestRateToFee.js.map