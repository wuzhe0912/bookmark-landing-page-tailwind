import CryptoJS from 'crypto-js';

export function useRSA() {
  async function encrypt(plaintext, publicKey) {
    const key = await CryptoJS.enc.Latin1.parse(publicKey);
    const iv = await CryptoJS.enc.Latin1.parse('1234567812345678');
    const encrypted = await CryptoJS.AES.encrypt(plaintext, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  async function decrypt(encrypted, privateKey) {
    const key = await CryptoJS.enc.Latin1.parse(privateKey);
    const iv = await CryptoJS.enc.Latin1.parse('1234567812345678');
    const decrypted = await CryptoJS.AES.decrypt(encrypted, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  return { encrypt, decrypt };
}
