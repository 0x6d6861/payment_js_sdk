export default class HttpClient {
    static makePostRequest(url: string, data?: object, headers?: object): Promise<object>;
}
