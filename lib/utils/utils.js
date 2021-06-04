"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodeBase64 = encodeBase64;
exports.decodeBase64 = decodeBase64;
exports.isBase64 = isBase64;
var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

function encodeBase64(str) {
  var buff = new Buffer.from(str, 'utf-8');
  return buff.toString('base64');
}

function decodeBase64(str) {
  var buff = new Buffer.from(str, 'base64');
  return buff.toString('utf-8');
}

function isBase64(str) {
  return base64regex.test(str);
}