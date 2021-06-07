"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class HttpClient {
    static makePostRequest(url, data = {}, headers = {}) {
        return axios_1.default
            .post(url, data, {
            headers: Object.assign({}, headers),
        })
            .then((resp) => resp.data);
    }
}
exports.default = HttpClient;
//# sourceMappingURL=HttpClient.js.map