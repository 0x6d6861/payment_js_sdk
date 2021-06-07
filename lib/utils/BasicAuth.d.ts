import { AuthType } from 'types';
export default class BasicAuth {
    private base64regex;
    private auth;
    private encodeBase64;
    private decodeBase64;
    isBase64(str: string): boolean;
    constructor(auth: AuthType);
    getClientId(): string;
    getClientSecret(): string;
    getAppToken(): string;
    getBasicAuth(): string;
}
