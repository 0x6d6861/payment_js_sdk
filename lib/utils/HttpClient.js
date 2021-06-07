"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.makePostRequest = function (url, data, headers) {
        if (data === void 0) { data = {}; }
        if (headers === void 0) { headers = {}; }
        return axios_1.default
            .post(url, data, {
            headers: __assign({}, headers),
        })
            .then(function (resp) { return resp.data; });
    };
    return HttpClient;
}());
exports.default = HttpClient;
//# sourceMappingURL=HttpClient.js.map