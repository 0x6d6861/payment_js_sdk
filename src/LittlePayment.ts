import {encodeBase64, isBase64} from "./utils/utils";
import {PROVIDERS, CURRENCIES} from "./enums/enums";
import {makePostRequest} from "./utils/httpClient";

const BASE_URL = 'https://pay.little.bz';

export default function LittlePayment (ApiAuthentication: AuthType) {

    const {clientId, clientSecret, appToken} = ApiAuthentication;

    const checkoutDetails = {};

    let paymentDetails : PaymentDetailsType = {
        amount: 0,
        currency: CURRENCIES.KES,
        description: null,
        callbackUrl: null,
        expiresAt: 5, // minutes
        key: null,
        payload: {}
    };

    let providerDetails = {
        type: PROVIDERS.CARDS,
        details: {}
    };

    let checkOutData = {};

    if(!clientId || !clientSecret || !appToken) {
        throw new Error("clientId or clientSecret or appToken not provided");
    }

    if(!isBase64(clientSecret)) {
        throw new Error("Invalid clientSecret provided");
    }

    if(clientId.length !== 16) {
        throw new Error("Invalid clientId provided");
    }

    const BASIC_AUTH = `Basic ${encodeBase64(`${clientId}:${clientSecret}`)}`;

    function setKey(key= ""){
        // TODO: validation comes here
        paymentDetails.key = key;
    }

    function setCurrency(currency= CURRENCIES.KES){
        // TODO: validation comes here
        paymentDetails.currency = currency;
    }

    function setAmount(amount= 0){
        // TODO: validation comes here
        paymentDetails.amount = amount;
    }

    function setDescription(description = null){
        // TODO: validation comes here
        paymentDetails.description = description;
    }

    function setCallbackUrl(url = null){
        // TODO: validation comes here
        paymentDetails.callbackUrl = url;
    }

    function setPayload(payload = {}){
        // TODO: validation comes here
        paymentDetails.payload = payload;
    }

    function setPaymentProvider(provider = PROVIDERS.CARDS) {
        // TODO: validation comes here
        providerDetails.type = provider
    }

    function setProviderDetails(details = {}) {
        // TODO: validation comes here
        providerDetails.details = details;
    }

    function setPaymentDetails(paymentDetailValues = {}) {
        // TODO: validation come here
        paymentDetails = paymentDetailValues
    }

    function processCheckout() {
        const CREATE_PAYMENT_INTENT = `${BASE_URL}/api/payments/${appToken}/pay`;

        return makePostRequest(CREATE_PAYMENT_INTENT, paymentDetails, {
            Authorization: BASIC_AUTH
        }).then(response => {
            // console.log(response)
            checkOutData = response;
            // console.log({response});
            return response;
        })
    }

    function processPayment(provider = {type: PROVIDERS.CARDS, details: {}}) {
        const PROCESS_PAYMENT = `${BASE_URL}/pay/${checkOutData.data.reference}/process`;
        return makePostRequest(PROCESS_PAYMENT, {
            type: provider.type,
            payment: provider.details
        });
    }

    function pay() {
        return processCheckout().then(() => {
            return processPayment(providerDetails);
        });

    }

    return {
        setKey,
        setCurrency,
        setAmount,
        setDescription,
        setCallbackUrl,
        setPayload,
        setPaymentProvider,
        setProviderDetails,
        processPayment,
        processCheckout,
        pay
    }
}