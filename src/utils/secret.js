import CryptoJS from 'crypto-js'

/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 */
export const encrypt = (token, word) => {
  const key = CryptoJS.enc.Utf8.parse(token)
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  var hexStr = encrypted.ciphertext.toString().toUpperCase()

  // console.log('hexStr->' + hexStr)
  var oldHexStr = CryptoJS.enc.Hex.parse(hexStr)
  // 将密文转为Base64的字符串
  var base64Str = CryptoJS.enc.Base64.stringify(oldHexStr)
  // console.log('base64Str->' + base64Str)
  // 这里根据需求返回 base64Str 或 hexStr(解密时有小小差别)
  return base64Str
}
/**
 * 解密
 */
export const decrypt = word => {
  const key = CryptoJS.enc.Utf8.parse('JDYkSVJtUEx1aWMk') // 十六位十六进制数作为密钥
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr
}
