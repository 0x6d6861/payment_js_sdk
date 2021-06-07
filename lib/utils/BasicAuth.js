"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicAuth = /** @class */ (function () {
    function BasicAuth(auth) {
        this.base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        var clientId = auth.clientId, clientSecret = auth.clientSecret, appToken = auth.appToken;
        if (!clientId || !clientSecret || !appToken) {
            throw new InvalidAuthenticationError();
        }
        if (!this.isBase64(clientSecret)) {
            throw new InvalidSecretError();
        }
        if (clientId.length !== 16) {
            throw new InvalidClientIdError();
        }
        this.auth = auth;
    }
    BasicAuth.prototype.encodeBase64 = function (str) {
        var buff = Buffer.from(str, 'utf-8');
        return buff.toString('base64');
    };
    BasicAuth.prototype.decodeBase64 = function (str) {
        var buff = Buffer.from(str, 'base64');
        return buff.toString('utf-8');
    };
    BasicAuth.prototype.isBase64 = function (str) {
        return this.base64regex.test(str);
    };
    BasicAuth.prototype.getClientId = function () {
        return this.auth.clientId;
    };
    BasicAuth.prototype.getClientSecret = function () {
        return this.auth.clientSecret;
    };
    BasicAuth.prototype.getAppToken = function () {
        return this.auth.appToken;
    };
    BasicAuth.prototype.getBasicAuth = function () {
        return "Basic " + this.encodeBase64(this.auth.clientId + ":" + this.auth.clientSecret);
    };
    return BasicAuth;
}());
exports.default = BasicAuth;
//# sourceMappingURL=BasicAuth.js.map