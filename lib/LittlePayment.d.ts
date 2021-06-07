import { CURRENCIES, PROVIDERS } from './enums/enums';
import { AuthType, CheckoutDetailsType, PaymentDetailsType, ProviderDetailsType } from 'types';
/**
 * LittlePayment class definition
 */
export default class LittlePayment {
    /** @private */
    private _apiAuth;
    /** @private */
    private paymentDetails;
    /** @private */
    private providerDetails;
    /** @private */
    private _checkOutData;
    /**
     * Little Payment Api initialization details
     * @constructor
     * @param {AuthType} ApiAuthentication
     */
    constructor(ApiAuthentication: AuthType);
    /**
     * Set the primary key in your system
     * @param {string} key
     */
    setKey(key: string): void;
    /**
     * Set payment currency
     * @param {CURRENCIES} currency
     */
    setCurrency(currency?: CURRENCIES): void;
    /**
     * Set payment amount
     * @param {number} amount
     */
    setAmount(amount?: number): void;
    /**
     * Set payment description
     * @param {string} description
     */
    setDescription(description?: string): void;
    /**
     * Set callback url for payment notification
     * @param {string} url
     */
    setCallbackUrl(url?: string): void;
    /**
     * Set payload data to be echoed back
     * @param {object} payload
     */
    setPayload(payload?: object): void;
    /**
     * Set payment provider
     * @param {PROVIDERS} provider
     */
    setPaymentProvider(provider?: PROVIDERS): void;
    /**
     * Set payment provider details
     * @param {object} details
     */
    setProviderDetails(details?: object): void;
    setPaymentDetails(paymentDetailValues: PaymentDetailsType): void;
    /**
     * Create a payment intent, this will return a checkout url to be used by the clients
     * @return {Promise<CheckoutDetailsType>}
     */
    processCheckout(): Promise<CheckoutDetailsType>;
    /**
     * Process payment, this will make the actual payment
     * @return {Promise<object>}
     */
    processPayment(provider: ProviderDetailsType): Promise<object>;
    /**
     * this created the payment intent and process the payment at the same time
     * @return {Promise<object>}
     */
    pay(): Promise<object>;
}
