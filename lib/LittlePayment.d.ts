import { CURRENCIES, PROVIDERS } from './enums/enums';
import { AuthType, CheckoutDetailsType, PaymentDetailsType, ProviderDetailsType } from 'types';
export default class LittlePayment {
    private _apiAuth;
    private paymentDetails;
    private providerDetails;
    private _checkOutData;
    constructor(ApiAuthentication: AuthType);
    setKey(key: string): void;
    setCurrency(currency?: CURRENCIES): void;
    setAmount(amount?: number): void;
    setDescription(description?: string): void;
    setCallbackUrl(url?: string): void;
    setPayload(payload?: object): void;
    setPaymentProvider(provider?: PROVIDERS): void;
    setProviderDetails(details?: object): void;
    setPaymentDetails(paymentDetailValues: PaymentDetailsType): void;
    processCheckout(): Promise<CheckoutDetailsType>;
    processPayment(provider: ProviderDetailsType): Promise<object>;
    pay(): Promise<object>;
}
