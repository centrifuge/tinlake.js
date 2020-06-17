export var displayToBase = function (display, decimals) {
    var neg = display.includes('-');
    var str = display.replace(/-/g, '');
    var a = str.split('.')[0];
    var b = (str.split('.')[1] || '').padEnd(decimals, '0').substr(0, decimals);
    var res = "" + a + b;
    return neg ? "-" + res : res;
};
//# sourceMappingURL=displayToBase.js.map