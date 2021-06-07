"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var HttpClient_1 = __importDefault(require("./utils/HttpClient"));
var BasicAuth_1 = __importDefault(require("./utils/BasicAuth"));
var enums_1 = require("./enums/enums");
var ENV_1 = __importDefault(require("./utils/ENV"));
var BASE_URL = ENV_1.default.PRODUCTION;
/**
 * LittlePayment class definition
 */
var LittlePayment = /** @class */ (function () {
    /**
     * Little Payment Api initialization details
     * @constructor
     * @param {AuthType} ApiAuthentication
     */
    function LittlePayment(ApiAuthentication) {
        /** @private */
        this.paymentDetails = {
            amount: 0,
            callbackUrl: '',
            currency: enums_1.CURRENCIES.KES,
            description: '',
            expiresAt: 2,
            key: '',
            payload: {},
        };
        /** @private */
        this.providerDetails = {
            type: enums_1.PROVIDERS.CARDS,
            details: {},
        };
        /** @private */
        this._checkOutData = {};
        this._apiAuth = new BasicAuth_1.default(ApiAuthentication);
    }
    /**
     * Set the primary key in your system
     * @param {string} key
     */
    LittlePayment.prototype.setKey = function (key) {
        // TODO: validation comes here
        this.paymentDetails.key = key;
    };
    /**
     * Set payment currency
     * @param {CURRENCIES} currency
     */
    LittlePayment.prototype.setCurrency = function (currency) {
        if (currency === void 0) { currency = enums_1.CURRENCIES.KES; }
        // TODO: validation comes here
        this.paymentDetails.currency = currency;
    };
    /**
     * Set payment amount
     * @param {number} amount
     */
    LittlePayment.prototype.setAmount = function (amount) {
        if (amount === void 0) { amount = 0; }
        // TODO: validation comes here
        this.paymentDetails.amount = amount;
    };
    /**
     * Set payment description
     * @param {string} description
     */
    LittlePayment.prototype.setDescription = function (description) {
        // TODO: validation comes here
        this.paymentDetails.description = description;
    };
    /**
     * Set callback url for payment notification
     * @param {string} url
     */
    LittlePayment.prototype.setCallbackUrl = function (url) {
        // TODO: validation comes here
        this.paymentDetails.callbackUrl = url;
    };
    /**
     * Set payload data to be echoed back
     * @param {object} payload
     */
    LittlePayment.prototype.setPayload = function (payload) {
        if (payload === void 0) { payload = {}; }
        // TODO: validation comes here
        this.paymentDetails.payload = payload;
    };
    /**
     * Set payment provider
     * @param {PROVIDERS} provider
     */
    LittlePayment.prototype.setPaymentProvider = function (provider) {
        if (provider === void 0) { provider = enums_1.PROVIDERS.CARDS; }
        // TODO: validation comes here
        this.providerDetails.type = provider;
    };
    /**
     * Set payment provider details
     * @param {object} details
     */
    LittlePayment.prototype.setProviderDetails = function (details) {
        if (details === void 0) { details = {}; }
        // TODO: validation comes here
        this.providerDetails.details = details;
    };
    LittlePayment.prototype.setPaymentDetails = function (paymentDetailValues) {
        // TODO: validation come here
        this.paymentDetails = paymentDetailValues;
    };
    /**
     * Create a payment intent, this will return a checkout url to be used by the clients
     * @return {Promise<CheckoutDetailsType>}
     */
    LittlePayment.prototype.processCheckout = function () {
        var _this = this;
        var CREATE_PAYMENT_INTENT = BASE_URL + "/api/payments/" + this._apiAuth.getAppToken() + "/pay";
        return HttpClient_1.default.makePostRequest(CREATE_PAYMENT_INTENT, this.paymentDetails, {
            Authorization: this._apiAuth.getBasicAuth(),
        }).then(function (response) {
            _this._checkOutData = response.data;
            return _this._checkOutData;
        });
    };
    /**
     * Process payment, this will make the actual payment
     * @return {Promise<object>}
     */
    LittlePayment.prototype.processPayment = function (provider) {
        var PROCESS_PAYMENT = BASE_URL + "/pay/" + this._checkOutData.reference + "/process";
        return HttpClient_1.default.makePostRequest(PROCESS_PAYMENT, {
            type: provider.type,
            payment: provider.details,
        });
    };
    /**
     * this created the payment intent and process the payment at the same time
     * @return {Promise<object>}
     */
    LittlePayment.prototype.pay = function () {
        var _this = this;
        if (Object.keys(this.providerDetails.details).length === 0) {
            throw new PaymentProviderDetailsError(this.providerDetails.type + " details are missing");
        }
        return this.processCheckout().then(function () {
            return _this.processPayment(_this.providerDetails);
        });
    };
    return LittlePayment;
}());
exports.default = LittlePayment;
//# sourceMappingURL=LittlePayment.js.map