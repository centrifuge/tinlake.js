export var baseToDisplay = function (base, decimals) {
    var baseStr = typeof base === 'string' ? base : base.toString();
    var a = baseStr.slice(0, -decimals) || '0';
    var b = baseStr.slice(-decimals).padStart(decimals, '0');
    return a + "." + b;
};
//# sourceMappingURL=baseToDisplay.js.map