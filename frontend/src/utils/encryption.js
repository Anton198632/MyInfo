
export const encrypt = (publicKeyPem, data) => {

    // const textDecoder = new TextDecoder('utf-8');
      
      // const pem = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAynnby85q+ELCdoxHbAYR\nrfzdWmz/diQOuMgY6cQj9jlT7SMVNLP38wvnaNxgldl9A/6BEShR2tWnbUH+mhpF\nRAwDkOa8DSEgH83X8j6edrnPJm+EEDQiXShThuZJc55QnrCof75B1juN9I98rjU9\nk3lsOQvC6Fx8VZMgYNV7adJI9wnaHfsX0nzwlAt9Q91IlI6LpMeN77E1qpMbiGE0\nJzDF/0s8SFGZd2STsrvqRLi6jhCucybUjw+MHUKcYxOF1PdD6l24ab91K33JxUZ/\nn7He6Y5a5Y+A4JXEBD8jYzBK7XLZ7xzCYkh/2DJN70mCleR/8OzWJqTqmJ0xHSq4\nmQIDAQAB\n-----END PUBLIC KEY-----"
      
      // const pem = textDecoder.decode(publicKeyPem);

      const json_data = JSON.stringify(data)

      

      
      // Шифрование данных с использованием открытого ключа (первичного ключа)
      const forge = require('node-forge');
      
      // Создание объекта публичного ключа из PEM
      const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

      const parts = [];
      for (let i = 0; i < json_data.length; i += 170) {
        const part = json_data.substring(i, i + 170);

        // Преобразование данных в байтовый массив
        let dataBytes = forge.util.encodeUtf8(part);

        // Шифрование данных с использованием открытого ключа (первичного ключа)
        const encryptedData = publicKey.encrypt(dataBytes, 'RSA-OAEP', {
          md: forge.md.sha256.create(),
        });

        // Преобразуйте зашифрованные данные в строку base64
        const base64EncodedData = btoa(encryptedData);

        parts.push(base64EncodedData)

       }
        
      return parts

}

export const encrypt_file = (publicKeyPem, data) => {

  // Создайте объект TextDecoder с указанной кодировкой (например, 'utf-8')
  var textDecoder = new TextDecoder('utf-8');

  // Используйте TextDecoder для преобразования Uint8Array в строку
  var decodedString = textDecoder.decode(data);

  const forge = require('node-forge');
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const parts = [];
  for (let i = 0; i < decodedString.length; i += 190) {
    const part = decodedString.substring(i, i + 190);

    // Шифрование данных с использованием открытого ключа (первичного ключа)
    const encryptedData = publicKey.encrypt(part, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
    });

    // Преобразуйте зашифрованные данные в строку base64
    const base64EncodedData = btoa(encryptedData);

    parts.push(base64EncodedData)

   }
    
  return parts

}


export const createKeyPair = () => {

    const forge = require('node-forge');

    // Генерация пары ключей
    const keys = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    const publicKeyPem = forge.pki.publicKeyToPem(keys.publicKey);
    const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);

    return {clientPublicKeyPem: publicKeyPem, clientPrivateKeyPem: privateKeyPem}

} 


export const decrypt = (privateKey, encryptedDataBase64) => {

  const forge = require('node-forge');
          
  // Создание объекта приватного ключа из PEM
  const privateK = forge.pki.privateKeyFromPem(privateKey);

  const sha256 = forge.md.sha256.create()
  
    let result = [];
    for (let i=0; i<encryptedDataBase64.length; i++) {

        const encryptedData = atob(encryptedDataBase64[i]);

        const decryptedData = privateK.decrypt(encryptedData, 'RSA-OAEP', {
            md: sha256,
          });

        result.push(decryptedData)
    }

    return JSON.parse(result.join(""))
}


export const decrypt_async = async (privateKey, encryptedDataBase64) => {

  const forge = require('node-forge');
  const privateK = forge.pki.privateKeyFromPem(privateKey);

  const sha256 = forge.md.sha256.create()

  const decryptAsync = async (encryptedData64) => {
    const encryptedData = atob(encryptedData64);

    try {
      const decryptedData = await privateK.decrypt(encryptedData, 'RSA-OAEP', {
        md: sha256,
      });
      return decryptedData;
    } catch (error) {
      console.error('Ошибка дешифрации: ', error);
      return null; // Обработка ошибки
    }
  };

  const decryptedDataArray = await Promise.all(
    encryptedDataBase64.map(async (encryptedData64) => await decryptAsync(encryptedData64))
  );

  const filteredDecryptedDataArray = decryptedDataArray.filter((data) => data !== null);



  return JSON.parse(filteredDecryptedDataArray.join(''));
};