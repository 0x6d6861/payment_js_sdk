import HttpClient from './utils/HttpClient';
import BasicAuth from './utils/BasicAuth';
import { CURRENCIES, PROVIDERS } from './enums/enums';
import { AuthType, CheckoutDetailsType, PaymentDetailsType, ProviderDetailsType } from 'types';
import ENV from './utils/ENV';

const BASE_URL = ENV.PRODUCTION;

export default class LittlePayment {
  private _apiAuth: BasicAuth;

  private paymentDetails: PaymentDetailsType = {
    amount: 0,
    callbackUrl: '',
    currency: CURRENCIES.KES,
    description: '',
    expiresAt: 2,
    key: '',
    payload: {},
  };

  private providerDetails: ProviderDetailsType = {
    type: PROVIDERS.CARDS,
    details: {},
  };

  private _checkOutData: CheckoutDetailsType = {} as CheckoutDetailsType;

  constructor(ApiAuthentication: AuthType) {
    this._apiAuth = new BasicAuth(ApiAuthentication);
  }

  setKey(key: string) {
    // TODO: validation comes here
    this.paymentDetails.key = key;
  }

  setCurrency(currency: CURRENCIES = CURRENCIES.KES) {
    // TODO: validation comes here
    this.paymentDetails.currency = currency;
  }

  setAmount(amount: number = 0) {
    // TODO: validation comes here
    this.paymentDetails.amount = amount;
  }

  setDescription(description?: string) {
    // TODO: validation comes here
    this.paymentDetails.description = description;
  }

  setCallbackUrl(url?: string) {
    // TODO: validation comes here
    this.paymentDetails.callbackUrl = url;
  }

  setPayload(payload: object = {}) {
    // TODO: validation comes here
    this.paymentDetails.payload = payload;
  }

  setPaymentProvider(provider = PROVIDERS.CARDS) {
    // TODO: validation comes here
    this.providerDetails.type = provider;
  }

  setProviderDetails(details: object = {}) {
    // TODO: validation comes here
    this.providerDetails.details = details;
  }

  setPaymentDetails(paymentDetailValues: PaymentDetailsType) {
    // TODO: validation come here
    this.paymentDetails = paymentDetailValues;
  }
  processCheckout(): Promise<CheckoutDetailsType> {
    const CREATE_PAYMENT_INTENT = `${BASE_URL}/api/payments/${this._apiAuth.getAppToken()}/pay`;

    return HttpClient.makePostRequest(CREATE_PAYMENT_INTENT, this.paymentDetails, {
      Authorization: this._apiAuth.getBasicAuth(),
    }).then((response: any) => {
      // console.log(response)
      this._checkOutData = response.data as CheckoutDetailsType;
      // console.log({response});
      return this._checkOutData;
    });
  }

  processPayment(provider: ProviderDetailsType) {
    const PROCESS_PAYMENT = `${BASE_URL}/pay/${this._checkOutData.reference}/process`;
    return HttpClient.makePostRequest(PROCESS_PAYMENT, {
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
