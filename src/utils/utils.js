const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export function encodeBase64(str) {
    let buff = new Buffer.from(str, 'utf-8');
    return buff.toString('base64');
}

export function decodeBase64(str) {
    let buff = new Buffer.from(str, 'base64');
    return buff.toString('utf-8');
}

export function isBase64(str) {
    return base64regex.test(str);
}