"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LittlePayment;

var _utils = require("../utils/utils");

var _enums = require("../enums/enums");

var _httpClient = require("../utils/httpClient");

var BASE_URL = 'https://pay.little.bz';

function LittlePayment(_ref) {
  var clientId = _ref.clientId,
      clientSecret = _ref.clientSecret,
      appToken = _ref.appToken;
  var checkoutDetails = {};
  var paymentDetails = {
    amount: 0,
    currency: _enums.CURRENCIES.KES,
    description: null,
    callbackUrl: null,
    expiresAt: 5,
    // minutes
    key: null,
    payload: {}
  };
  var providerDetails = {
    type: _enums.PROVIDERS.CARDS,
    details: {}
  };
  var checkOutData = {};

  if (!clientId || !clientSecret || !appToken) {
    throw new Error("clientId or clientSecret or appToken not provided");
  }

  if (!(0, _utils.isBase64)(clientSecret)) {
    throw new Error("Invalid clientSecret provided");
  }

  if (clientId.length !== 16) {
    throw new Error("Invalid clientId provided");
  }

  var BASIC_AUTH = "Basic ".concat((0, _utils.encodeBase64)("".concat(clientId, ":").concat(clientSecret)));

  function setKey() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    // TODO: validation comes here
    paymentDetails.key = key;
  }

  function setCurrency() {
    var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _enums.CURRENCIES.KES;
    // TODO: validation comes here
    paymentDetails.currency = currency;
  }

  function setAmount() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    // TODO: validation comes here
    paymentDetails.amount = amount;
  }

  function setDescription() {
    var description = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    // TODO: validation comes here
    paymentDetails.description = description;
  }

  function setCallbackUrl() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    // TODO: validation comes here
    paymentDetails.callbackUrl = url;
  }

  function setPayload() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // TODO: validation comes here
    paymentDetails.payload = payload;
  }

  function setPaymentProvider() {
    var provider = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _enums.PROVIDERS.CARDS;
    // TODO: validation comes here
    providerDetails.type = provider;
  }

  function setProviderDetails() {
    var details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // TODO: validation comes here
    providerDetails.details = details;
  }

  function setPaymentDetails() {
    var paymentDetailValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // TODO: validation come here
    paymentDetails = paymentDetailValues;
  }

  function processCheckout() {
    var CREATE_PAYMENT_INTENT = "".concat(BASE_URL, "/api/payments/").concat(appToken, "/pay");
    return (0, _httpClient.makePostRequest)(CREATE_PAYMENT_INTENT, paymentDetails, {
      Authorization: BASIC_AUTH
    }).then(function (response) {
      // console.log(response)
      checkOutData = response; // console.log({response});

      return response;
    });
  }

  function processPayment() {
    var provider = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      type: _enums.PROVIDERS.CARDS,
      details: {}
    };
    var PROCESS_PAYMENT = "".concat(BASE_URL, "/pay/").concat(checkOutData.data.reference, "/process");
    return (0, _httpClient.makePostRequest)(PROCESS_PAYMENT, {
      type: provider.type,
      payment: provider.details
    });
  }

  function pay() {
    return processCheckout().then(function () {
      return processPayment(providerDetails);
    });
  }

  return {
    setKey: setKey,
    setCurrency: setCurrency,
    setAmount: setAmount,
    setDescription: setDescription,
    setCallbackUrl: setCallbackUrl,
    setPayload: setPayload,
    setPaymentProvider: setPaymentProvider,
    setProviderDetails: setProviderDetails,
    processPayment: processPayment,
    processCheckout: processCheckout,
    pay: pay
  };
}