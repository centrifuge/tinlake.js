export function getLoanStatus(principal, debt) {
    if (!principal.isZero()) {
        return 'Whitelisted';
    }
    if (principal.isZero() && !debt.isZero()) {
        return 'Ongoing';
    }
    if (principal.isZero() && debt.isZero()) {
        return 'Repaid';
    }
    throw Error('Unknown loan status');
}
//# sourceMappingURL=getLoanStatus.js.map