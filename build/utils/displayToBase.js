export var displayToBase = function (display, decimals) {
    var a = display.split('.')[0];
    var b = (display.split('.')[1] || '').padEnd(decimals, '0').substr(0, decimals);
    return "" + a + b;
};
//# sourceMappingURL=displayToBase.js.map