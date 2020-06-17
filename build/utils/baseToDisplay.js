export var baseToDisplay = function (base, decimals) {
    var baseStr = typeof base === 'string' ? base : base.toString();
    var neg = baseStr.includes('-');
    baseStr = baseStr.replace(/-/g, '');
    var a = baseStr.slice(0, -decimals) || '0';
    var b = baseStr.slice(-decimals).padStart(decimals, '0');
    var res = a + "." + b;
    return neg ? "-" + res : res;
};
//# sourceMappingURL=baseToDisplay.js.map