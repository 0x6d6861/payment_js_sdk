interface AuthType {
    clientId: string;
    clientSecret: string;
    appToken: string;
}

interface CurrencyType {

}

interface PaymentDetailsType {
    amount: number,
    currency: string,
    description: string,
    callbackUrl: string,
    expiresAt: number,
    key: number,
    payload: object
}