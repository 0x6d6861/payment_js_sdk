import { CURRENCIES, PROVIDERS } from '../enums/enums';
export interface AuthType {
    clientId: string;
    clientSecret: string;
    appToken: string;
}
export interface CheckoutDetailsType {
    reference: string;
    checkoutUrl: string;
    message: string;
}
export interface PaymentDetailsType {
    amount: number;
    currency: CURRENCIES;
    description?: string;
    callbackUrl?: string;
    expiresAt: number;
    key: string;
    payload: object;
}
export interface ProviderDetailsType {
    type: PROVIDERS;
    details: object;
}
