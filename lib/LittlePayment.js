"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = __importDefault(require("./utils/HttpClient"));
const BasicAuth_1 = __importDefault(require("./utils/BasicAuth"));
const enums_1 = require("./enums/enums");
const ENV_1 = __importDefault(require("./utils/ENV"));
const BASE_URL = ENV_1.default.PRODUCTION;
class LittlePayment {
    constructor(ApiAuthentication) {
        this.paymentDetails = {
            amount: 0,
            callbackUrl: '',
            currency: enums_1.CURRENCIES.KES,
            description: '',
            expiresAt: 2,
            key: '',
            payload: {},
        };
        this.providerDetails = {
            type: enums_1.PROVIDERS.CARDS,
            details: {},
        };
        this._checkOutData = {};
        this._apiAuth = new BasicAuth_1.default(ApiAuthentication);
    }
    setKey(key) {
        // TODO: validation comes here
        this.paymentDetails.key = key;
    }
    setCurrency(currency = enums_1.CURRENCIES.KES) {
        // TODO: validation comes here
        this.paymentDetails.currency = currency;
    }
    setAmount(amount = 0) {
        // TODO: validation comes here
        this.paymentDetails.amount = amount;
    }
    setDescription(description) {
        // TODO: validation comes here
        this.paymentDetails.description = description;
    }
    setCallbackUrl(url) {
        // TODO: validation comes here
        this.paymentDetails.callbackUrl = url;
    }
    setPayload(payload = {}) {
        // TODO: validation comes here
        this.paymentDetails.payload = payload;
    }
    setPaymentProvider(provider = enums_1.PROVIDERS.CARDS) {
        // TODO: validation comes here
        this.providerDetails.type = provider;
    }
    setProviderDetails(details = {}) {
        // TODO: validation comes here
        this.providerDetails.details = details;
    }
    setPaymentDetails(paymentDetailValues) {
        // TODO: validation come here
        this.paymentDetails = paymentDetailValues;
    }
    processCheckout() {
        const CREATE_PAYMENT_INTENT = `${BASE_URL}/api/payments/${this._apiAuth.getAppToken()}/pay`;
        return HttpClient_1.default.makePostRequest(CREATE_PAYMENT_INTENT, this.paymentDetails, {
            Authorization: this._apiAuth.getBasicAuth(),
        }).then((response) => {
            // console.log(response)
            this._checkOutData = response.data;
            // console.log({response});
            return this._checkOutData;
        });
    }
    processPayment(provider) {
        const PROCESS_PAYMENT = `${BASE_URL}/pay/${this._checkOutData.reference}/process`;
        return HttpClient_1.default.makePostRequest(PROCESS_PAYMENT, {
            type: provider.type,
            payment: provider.details,
        });
    }
    pay() {
        return this.processCheckout().then(() => {
            return this.processPayment(this.providerDetails);
        });
    }
}
exports.default = LittlePayment;
//# sourceMappingURL=LittlePayment.js.map