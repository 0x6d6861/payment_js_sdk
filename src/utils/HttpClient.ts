import axios from 'axios';
export default class HttpClient {
  static makePostRequest(url: string, data: object = {}, headers: object = {}): Promise<object> {
    return axios
      .post(url, data, {
        headers: {
          ...headers,
        },
      })
      .then((resp) => resp.data);
  }
}
