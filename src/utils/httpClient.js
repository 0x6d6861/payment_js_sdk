import * as httpClient from 'https';
const createError = require('http-errors');

export function makePostRequest(url, data = {}, headers = {}){
    const parsedURL = new URL(url);
    let body = JSON.stringify(data)
    let options = {
        hostname: parsedURL.host,
        port: parsedURL.port,
        path: parsedURL.pathname,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body),
            ...headers
        }
    }

    return new Promise((resolve, reject) => {
        httpClient
            .request(options, res => {
            let data = ""
            res.on("data", d => {
                data += d
            })
            res.on("end", () => {
                let responseData = JSON.parse(data);
                // console.log({status: res.statusCode, statusText: res.statusMessage, data})
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    return resolve(responseData)
                }
                return reject(createError(res.statusCode, responseData.message));
            })
        })
        .on("error", err => reject(err))
        .end(body)
    })
}