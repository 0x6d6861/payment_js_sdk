import LittlePayment from "./LittlePayment";
import {PROVIDERS} from "./enums/enums";



let pay = new LittlePayment({
    clientId: '28aae4895c0a5f17',
    clientSecret: '5BW/hXcahNsLazJXjsvDvA==',
    appToken: 'ca666020-c6a9-4534-a8af-7491214ab51'
});

pay.setKey("45");
pay.setCurrency("KES");
pay.setAmount(10);
pay.setPayload({name: "Heri Agape"});
pay.setPaymentProvider(PROVIDERS.MPESA);
pay.setProviderDetails({mobile: '0700928129'});
pay.setCallbackUrl("https://127.0.0.1/callback");
pay.setDescription("THIS IS MY DESCRIPTION");

pay.pay().then(result => console.log(result)).catch(err => console.log("ERROR: => ", err))