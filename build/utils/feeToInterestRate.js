import { Decimal } from 'decimal.js-light';
Decimal.set({
    precision: 30,
    toExpNeg: -7,
    toExpPos: 29,
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
    // tslint:disable-next-line:no-parameter-reassignment
    if (typeof fee !== 'string' && typeof fee !== 'number') {
        fee = fee.toString();
    }
    if (lookup[fee]) {
        return lookup[fee];
    }
    var i = new Decimal(fee).div('1e27').pow(n);
    var interestRate = i.minus(1).mul(100).toSignificantDigits(2);
    var interestRateString = interestRate.toString();
    lookup[fee] = interestRateString;
    return interestRateString;
};
//# sourceMappingURL=feeToInterestRate.js.map