import HttpClient from './utils/HttpClient';
import BasicAuth from './utils/BasicAuth';
import { CURRENCIES, PROVIDERS } from './enums/enums';
import { AuthType, CheckoutDetailsType, PaymentDetailsType, ProviderDetailsType } from 'types';
import ENV from './utils/ENV';

const BASE_URL = ENV.PRODUCTION;

/**
 * LittlePayment class definition
 */
export default class LittlePayment {

  /** @private */
  private _apiAuth: BasicAuth;

  /** @private */
  private paymentDetails: PaymentDetailsType = {
    amount: 0,
    callbackUrl: '',
    currency: CURRENCIES.KES,
    description: '',
    expiresAt: 2,
    key: '',
    payload: {},
  };

  /** @private */
  private providerDetails: ProviderDetailsType = {
    type: PROVIDERS.CARDS,
    details: {},
  };

  /** @private */
  private _checkOutData: CheckoutDetailsType = {} as CheckoutDetailsType;

  /**
   * Little Payment Api initialization details
   * @constructor
   * @param {AuthType} ApiAuthentication
   */
  constructor(ApiAuthentication: AuthType) {
    this._apiAuth = new BasicAuth(ApiAuthentication);
  }

  /**
   * Set the primary key in your system
   * @param {string} key
   */
  setKey(key: string) {
    // TODO: validation comes here
    this.paymentDetails.key = key;
  }

  /**
   * Set payment currency
   * @param {CURRENCIES} currency
   */
  setCurrency(currency: CURRENCIES = CURRENCIES.KES) {
    // TODO: validation comes here
    this.paymentDetails.currency = currency;
  }

  /**
   * Set payment amount
   * @param {number} amount
   */
  setAmount(amount: number = 0) {
    // TODO: validation comes here
    this.paymentDetails.amount = amount;
  }

  /**
   * Set payment description
   * @param {string} description
   */
  setDescription(description?: string) {
    // TODO: validation comes here
    this.paymentDetails.description = description;
  }

  /**
   * Set callback url for payment notification
   * @param {string} url
   */
  setCallbackUrl(url?: string) {
    // TODO: validation comes here
    this.paymentDetails.callbackUrl = url;
  }

  /**
   * Set payload data to be echoed back
   * @param {object} payload
   */
  setPayload(payload: object = {}) {
    // TODO: validation comes here
    this.paymentDetails.payload = payload;
  }

  /**
   * Set payment provider
   * @param {PROVIDERS} provider
   */
  setPaymentProvider(provider = PROVIDERS.CARDS) {
    // TODO: validation comes here
    this.providerDetails.type = provider;
  }

  /**
   * Set payment provider details
   * @param {object} details
   */
  setProviderDetails(details: object = {}) {
    // TODO: validation comes here
    this.providerDetails.details = details;
  }

  setPaymentDetails(paymentDetailValues: PaymentDetailsType) {
    // TODO: validation come here
    this.paymentDetails = paymentDetailValues;
  }

  /**
   * Create a payment intent, this will return a checkout url to be used by the clients
   * @return {Promise<CheckoutDetailsType>}
   */
  processCheckout(): Promise<CheckoutDetailsType> {
    const CREATE_PAYMENT_INTENT = `${BASE_URL}/api/payments/${this._apiAuth.getAppToken()}/pay`;

    return HttpClient.makePostRequest(CREATE_PAYMENT_INTENT, this.paymentDetails, {
      Authorization: this._apiAuth.getBasicAuth(),
    }).then((response: any) => {
      this._checkOutData = response.data as CheckoutDetailsType;
      return this._checkOutData;
    });
  }

  /**
   * Process payment, this will make the actual payment
   * @return {Promise<object>}
   */
  processPayment(provider: ProviderDetailsType) {
    const PROCESS_PAYMENT = `${BASE_URL}/pay/${this._checkOutData.reference}/process`;
    return HttpClient.makePostRequest(PROCESS_PAYMENT, {
      type: provider.type,
      payment: provider.details,
    });
  }

  /**
   * this created the payment intent and process the payment at the same time
   * @return {Promise<object>}
   */
  pay() {
    if(Object.keys(this.providerDetails.details).length === 0) {
      throw new PaymentProviderDetailsError(`${this.providerDetails.type} details are missing`)
    }
    return this.processCheckout().then(() => {
      return this.processPayment(this.providerDetails);
    });
  }
}
