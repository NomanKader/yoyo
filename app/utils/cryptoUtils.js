import CryptoJS from 'crypto-js';

/**
 * Converts an object to camelCase recursively
 */
export function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
      result[camelKey] = toCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
}

/**
 * Generates AES encryption key from a deviceId
 */
export function generateAESKey(deviceId) {
  const sanitizedDeviceId = deviceId.replace(/-/g, '');
  if (sanitizedDeviceId.length >= 32) {
    return sanitizedDeviceId.substring(0, 32);
  }
  const repeatedDeviceId = sanitizedDeviceId + sanitizedDeviceId;
  return repeatedDeviceId.substring(0, 32);
}

/**
 * Generates initialization vector (IV) using deviceId
 */
export function generateIV(deviceId) {
  const sanitizedDeviceId = deviceId.replace(/-/g, '');
  const hash = CryptoJS.SHA256(sanitizedDeviceId);
  return CryptoJS.enc.Hex.parse(hash.toString());
}

/**
 * Encrypts data using AES with the provided deviceId
 */
export function encrypt(data, deviceId) {
  const key = CryptoJS.enc.Utf8.parse(generateAESKey(deviceId));
  const iv = generateIV(deviceId);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

/**
 * Generates dataSignature for API requests
 */
export function generateDataSignature(data, deviceId) {
  //const camelCaseData = toCamelCase(data); // Convert data keys to camelCase
  //const jsonString = JSON.stringify(camelCaseData);
  const dataToHash = data + deviceId;
  const hash = CryptoJS.SHA256(dataToHash).toString(CryptoJS.enc.Base64);
  return hash;
}

export default {
  toCamelCase,
  generateAESKey,
  generateIV,
  encrypt,
  generateDataSignature,
};
