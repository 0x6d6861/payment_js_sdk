"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROVIDERS = exports.CURRENCIES = void 0;
/**
 * All supported currencies
 * @enum {string}
 */
var CURRENCIES;
(function (CURRENCIES) {
    CURRENCIES["KES"] = "KES";
    CURRENCIES["UGX"] = "UGX";
})(CURRENCIES = exports.CURRENCIES || (exports.CURRENCIES = {}));
/**
 * All supported payment providers
 * @enum {string}
 */
var PROVIDERS;
(function (PROVIDERS) {
    PROVIDERS["MPESA"] = "MPESA";
    PROVIDERS["CARDS"] = "CARDS";
})(PROVIDERS = exports.PROVIDERS || (exports.PROVIDERS = {}));
//# sourceMappingURL=enums.js.map