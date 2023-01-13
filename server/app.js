const express = require('express');
const app = express();
const port = 3001;
const crypto = require('crypto');
const cors = require('cors');

app.get('/generate-key', (req, res) => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
  res.json({ publicKey, privateKey });
});

app.post('/encrypt', (req, res) => {
  const { plaintext, publicKey } = req.body;
  const buffer = Buffer.from(plaintext, 'utf8');
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  res.json({ encrypted: encrypted.toString('base64') });
});

app.post('/decrypt', (req, res) => {
  const { encrypted, privateKey } = req.body;
  const buffer = Buffer.from(encrypted, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  res.json({ decrypted: decrypted.toString('utf8') });
});

app.use(cors());
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
