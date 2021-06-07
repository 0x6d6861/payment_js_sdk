"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicAuth {
    constructor(auth) {
        this.base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        const { clientId, clientSecret, appToken } = auth;
        if (!clientId || !clientSecret || !appToken) {
            throw new Error('clientId or clientSecret or appToken not provided');
        }
        if (!this.isBase64(clientSecret)) {
            throw new Error('Invalid clientSecret provided');
        }
        if (clientId.length !== 16) {
            throw new Error('Invalid clientId provided');
        }
        this.auth = auth;
    }
    encodeBase64(str) {
        const buff = Buffer.from(str, 'utf-8');
        return buff.toString('base64');
    }
    decodeBase64(str) {
        const buff = Buffer.from(str, 'base64');
        return buff.toString('utf-8');
    }
    isBase64(str) {
        return this.base64regex.test(str);
    }
    getClientId() {
        return this.auth.clientId;
    }
    getClientSecret() {
        return this.auth.clientSecret;
    }
    getAppToken() {
        return this.auth.appToken;
    }
    getBasicAuth() {
        return `Basic ${this.encodeBase64(`${this.auth.clientId}:${this.auth.clientSecret}`)}`;
    }
}
exports.default = BasicAuth;
//# sourceMappingURL=BasicAuth.js.map