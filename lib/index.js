"use strict";

var _LittlePayment = _interopRequireDefault(require("./classes/LittlePayment"));

var _enums = require("./enums/enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pay = new _LittlePayment["default"]({
  clientId: '28aae4895c0a5f17',
  clientSecret: '5BW/hXcahNsLazJXjsvDvA==',
  appToken: 'ca666020-c6a9-4534-a8af-7491214ab51'
});
pay.setKey("45");
pay.setCurrency("KES");
pay.setAmount(10);
pay.setPayload({
  name: "Heri Agape"
});
pay.setPaymentProvider(_enums.PROVIDERS.MPESA);
pay.setProviderDetails({
  mobile: '0700928129'
});
pay.setCallbackUrl("https://127.0.0.1/callback");
pay.setDescription("THIS IS MY DESCRIPTION");
pay.pay().then(function (result) {
  return console.log(result);
})["catch"](function (err) {
  return console.log("ERROR: => ", err);
});