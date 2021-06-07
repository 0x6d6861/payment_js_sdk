import { AuthType } from 'types';

export default class BasicAuth {
  private base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  private auth: AuthType;

  private encodeBase64(str: string) {
    const buff: Buffer = Buffer.from(str, 'utf-8');
    return buff.toString('base64');
  }

  private decodeBase64(str: string) {
    const buff: Buffer = Buffer.from(str, 'base64');
    return buff.toString('utf-8');
  }

  isBase64(str: string) {
    return this.base64regex.test(str);
  }

  constructor(auth: AuthType) {
    const { clientId, clientSecret, appToken } = auth;
    if (!clientId || !clientSecret || !appToken) {
      throw new Error('clientId or clientSecret or appToken not provided');
    }

    if (!this.isBase64(clientSecret)) {
      throw new Error('Invalid clientSecret provided');
    }

    if (clientId.length !== 16) {
      throw new Error('Invalid clientId provided');
    }

    this.auth = auth;
  }

  getClientId(): string {
    return this.auth.clientId;
  }
  getClientSecret(): string {
    return this.auth.clientSecret;
  }
  getAppToken(): string {
    return this.auth.appToken;
  }
  getBasicAuth(): string {
    return `Basic ${this.encodeBase64(`${this.auth.clientId}:${this.auth.clientSecret}`)}`;
  }
}
